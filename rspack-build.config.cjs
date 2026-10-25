/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

const fs = require("node:fs");
const path = require("node:path");

const { Compilation, sources } = require("@rspack/core");
const { transform } = require("lightningcss");
const postcss = require("postcss");

const baseConfig = require("./rspack-base.config.cjs");
const postcssConfig = require("./postcss.config.cjs");

/* ========================================================================== */

const SRC_DIR = path.resolve(__dirname, "src");
const TOKENS_STYLESHEET = "styles/tokens.css";

// Tailwind v4 browser baseline.
const CSS_TARGETS = { chrome: 111 << 16, firefox: 128 << 16, safari: (16 << 16) | (4 << 8) };

// lightningcss drops from the order statement every layer the file does not use, so it is written back after it.
const LAYER_ORDER = "@layer theme, base, unichat-ui, components, utilities;\n";

const ENTRIES = {};
for (const file of fs.globSync("**/*.{ts,tsx}", { cwd: SRC_DIR, exclude: ["**/*.d.ts"] })) {
    const name = file.replace(/\.tsx?$/, "");
    ENTRIES[name] = path.join(SRC_DIR, file);
}

/* ========================================================================== */

// Compiles every stylesheet so consumers need neither Tailwind nor CSS Modules: X.module.css becomes X.css plus
// X.module.mjs, which imports the tokens and X.css and exports the class names.
class CompileStylesPlugin {
    apply(compiler) {
        compiler.hooks.thisCompilation.tap("CompileStylesPlugin", (compilation) => {
            compilation.hooks.processAssets.tapPromise(
                { name: "CompileStylesPlugin", stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL },
                async () => {
                    const files = fs.globSync("**/*.css", { cwd: SRC_DIR, exclude: ["styles/global.css"] });
                    for (const file of files) {
                        await this.compile(compilation, file.split(path.sep).join("/"));
                    }
                }
            );
        });
    }

    async compile(compilation, file) {
        const from = path.join(SRC_DIR, file);
        const result = await postcss(postcssConfig.plugins).process(fs.readFileSync(from, "utf8"), { from });

        const isModule = file.endsWith(".module.css");
        const { code, exports } = transform({
            filename: file,
            code: Buffer.from(result.css),
            cssModules: isModule && { pattern: "[local]_[hash]" },
            targets: CSS_TARGETS
        });

        const css = LAYER_ORDER + code.toString();
        if (!isModule) {
            compilation.emitAsset(file, new sources.RawSource(css));
            return;
        }

        const cssFile = file.replace(/\.module\.css$/, ".css");
        compilation.emitAsset(cssFile, new sources.RawSource(css));

        const classNames = {};
        for (const [name, entry] of Object.entries(exports)) {
            classNames[name] = entry.name;
        }

        const tokensImport = path.posix.relative(path.posix.dirname(file), TOKENS_STYLESHEET);
        const module = [
            `import "${tokensImport}";`,
            `import "./${path.posix.basename(cssFile)}";`,
            "",
            `export default ${JSON.stringify(classNames, null, 4)};`,
            ""
        ].join("\n");
        compilation.emitAsset(file.replace(/\.css$/, ".mjs"), new sources.RawSource(module));
    }
}

/* ========================================================================== */

/** @type {import("@rspack/core").Configuration} */
module.exports = {
    ...baseConfig,
    mode: "production",
    devtool: false,

    entry: ENTRIES,
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].mjs",
        library: { type: "modern-module" },
        clean: true
    },

    externalsType: "module",
    externals: ({ context, request, contextInfo, getResolve }, callback) => {
        if (!contextInfo.issuer) {
            return callback();
        }

        const isAlias = request.startsWith("~/");
        if (!isAlias && !request.startsWith(".")) {
            return callback(null, request);
        }

        const resolver = getResolve();
        resolver(context, request, (error, resolved) => {
            if (error) {
                return callback(error);
            }

            if (!/\.tsx?$/.test(resolved)) {
                const srcRoot = path.relative(context, SRC_DIR) || ".";
                const target = isAlias ? `${srcRoot}/${request.slice(2)}` : request;
                return callback(null, target.replace(/\.module\.css$/, ".module.mjs"));
            }

            const relative = path
                .relative(context, resolved)
                .replace(/\.tsx?$/, ".mjs")
                .split(path.sep)
                .join("/");
            return callback(null, relative.startsWith(".") ? relative : `./${relative}`);
        });
    },

    optimization: { minimize: false },

    plugins: [new CompileStylesPlugin()]
};
