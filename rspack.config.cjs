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

const { CompileStylesPlugin } = require("./zztools/CompileStylesPlugin.cjs");

/* ========================================================================== */

const SRC_DIR = path.resolve(__dirname, "src");

const ENTRIES = {};
for (const file of fs.globSync("**/*.{ts,tsx}", { cwd: SRC_DIR, exclude: ["**/*.d.ts"] })) {
    const name = file.replace(/\.tsx?$/, "");
    ENTRIES[name] = path.join(SRC_DIR, file);
}

/* ========================================================================== */

/** @type {import("@rspack/core").Configuration} */
const baseConfig = {
    context: __dirname,

    module: {
        parser: { "css/auto": { namedExports: false } },
        generator: { "css/auto": { localIdentName: "ucui-[hash]-[local]" } },
        rules: [
            {
                test: /\.m?js$/,
                type: "javascript/auto",
                resolve: { fullySpecified: false }
            },
            {
                test: /\.([tj]sx?)$/,
                type: "javascript/auto",
                exclude: /node_modules/,
                use: [
                    {
                        loader: "builtin:swc-loader",
                        options: {
                            jsc: {
                                target: "es2023",
                                parser: { syntax: "typescript", tsx: true },
                                transform: { react: { runtime: "automatic", importSource: "preact" } }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                type: "css/auto",
                use: ["postcss-loader"]
            }
        ]
    },

    resolve: {
        fullySpecified: false,
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "~": SRC_DIR,
            react: "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
            "react/jsx-runtime": "preact/jsx-runtime"
        }
    }
};

/** @type {import("@rspack/core").Configuration} */
const buildConfig = {
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
                let target = request;
                if (isAlias) {
                    target = `${path.relative(context, SRC_DIR) || "."}/${request.slice(2)}`;
                }

                return callback(null, target.replace(/\.module\.css$/, ".module.mjs"));
            }

            const relative = path
                .relative(context, resolved)
                .replace(/\.tsx?$/, ".mjs")
                .split(path.sep)
                .join("/");
            if (relative.startsWith(".")) {
                return callback(null, relative);
            }

            return callback(null, `./${relative}`);
        });
    },

    optimization: { minimize: false },

    plugins: [new CompileStylesPlugin()]
};

/* ========================================================================== */

// rstest loads this file without env.
/** @type {(env?: Record<string, unknown>) => import("@rspack/core").Configuration} */
module.exports = (env) => {
    if (env != null && env.RSPACK_BUILD) {
        return buildConfig;
    }

    return baseConfig;
};
