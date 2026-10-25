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

const { CopyRspackPlugin, HtmlRspackPlugin } = require("@rspack/core");

const { WatchLibraryPlugin } = require("./zztools/WatchLibraryPlugin.cjs");

/* ========================================================================== */

/** @type {(env?: Record<string, unknown>) => import("@rspack/core").Configuration} */
module.exports = (env) => {
    const plugins = [
        new CopyRspackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public"),
                    globOptions: { ignore: ["**/index.html"] }
                }
            ]
        }),
        new HtmlRspackPlugin({ template: path.resolve(__dirname, "public/index.html") })
    ];

    if (env != null && env.RSPACK_SERVE) {
        plugins.push(new WatchLibraryPlugin());
    }

    return {
        context: __dirname,
        mode: "development",
        devtool: "source-map",

        entry: { main: path.resolve(__dirname, "src/main.tsx") },
        output: {
            path: path.resolve(__dirname, "dist"),
            publicPath: "/",
            filename: "assets/[name]-[contenthash].js",
            chunkFilename: "assets/[name]-[contenthash].js",
            cssFilename: "assets/[name]-[contenthash].css",
            cssChunkFilename: "assets/[name]-[contenthash].css",
            clean: true
        },

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
                    type: "css/auto",
                    use: ["postcss-loader"]
                }
            ]
        },

        resolve: {
            fullySpecified: false,
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            alias: {
                "~showcase": path.resolve(__dirname, "src"),
                react: "preact/compat",
                "react-dom": "preact/compat",
                "react/jsx-runtime": "preact/jsx-runtime"
            }
        },

        devServer: {
            port: 6006,
            hot: false,
            liveReload: true,
            historyApiFallback: true
        },

        performance: { hints: false },

        plugins
    };
};
