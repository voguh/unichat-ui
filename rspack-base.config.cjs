/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

const path = require("node:path");

/* ================================================================================================================== */

/** @type {import("@rspack/core").Configuration} */
module.exports = {
    context: __dirname,

    module: {
        parser: { "css/auto": { namedExports: false } },
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
                resourceQuery: { not: [/raw/] },
                type: "css/auto",
                use: ["postcss-loader"]
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg)$/,
                resourceQuery: { not: [/raw/] },
                type: "asset/resource"
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                resourceQuery: { not: [/raw/] },
                type: "asset/resource"
            },
            {
                resourceQuery: /raw/,
                type: "asset/source"
            }
        ]
    },

    resolve: {
        fullySpecified: false,
        extensions: [".ts", ".tsx", ".js", ".jsx"],
        alias: {
            "~": path.resolve(__dirname, "src"),
            react: "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
            "react/jsx-runtime": "preact/jsx-runtime"
        }
    }
};
