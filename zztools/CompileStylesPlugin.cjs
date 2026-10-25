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

const postcssConfig = require("../postcss.config.cjs");

/* ========================================================================== */

const SRC_DIR = path.resolve(__dirname, "../src");
const TOKENS_STYLESHEET = "tokens.css";

// Tailwind v4 browser baseline.
const CSS_TARGETS = { chrome: 111 << 16, firefox: 128 << 16, safari: (16 << 16) | (4 << 8) };

// lightningcss drops from the order statement every layer the file does not use.
const LAYER_ORDER = "@layer theme, base, unichat-ui, components, utilities;\n";

/* ========================================================================== */

class CompileStylesPlugin {
    static PLUGIN_NAME = "CompileStylesPlugin";

    apply(compiler) {
        compiler.hooks.thisCompilation.tap(CompileStylesPlugin.PLUGIN_NAME, (compilation) => {
            compilation.hooks.processAssets.tapPromise(
                { name: CompileStylesPlugin.PLUGIN_NAME, stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL },
                async () => {
                    // Stylesheets are externals, invisible to watch mode.
                    compilation.contextDependencies.add(SRC_DIR);
                    compilation.fileDependencies.add(path.join(SRC_DIR, "global.css"));

                    const files = fs.globSync("**/*.css", { cwd: SRC_DIR, exclude: ["global.css"] });
                    for (const file of files) {
                        await this.compile(compilation, file.split(path.sep).join("/"));
                    }
                }
            );
        });
    }

    async compile(compilation, file) {
        const from = path.join(SRC_DIR, file);
        compilation.fileDependencies.add(from);

        const result = await postcss(postcssConfig.plugins).process(fs.readFileSync(from, "utf8"), { from });

        const isModule = file.endsWith(".module.css");
        const { code, exports } = transform({
            filename: file,
            code: Buffer.from(result.css),
            cssModules: isModule && { pattern: "ucui-[hash]-[local]" },
            targets: CSS_TARGETS
        });

        const css = LAYER_ORDER + code.toString();
        if (!isModule) {
            compilation.emitAsset(file, new sources.RawSource(css));
            return;
        }

        const cssFile = file.replace(/\.module\.css$/, ".css");
        compilation.emitAsset(cssFile, new sources.RawSource(css));

        // lightningcss returns the exports in no stable order.
        const classNames = {};
        for (const name of Object.keys(exports).sort()) {
            classNames[name] = exports[name].name;
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

module.exports = { CompileStylesPlugin };
