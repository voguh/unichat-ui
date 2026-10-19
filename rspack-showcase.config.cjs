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

const baseConfig = require("./rspack-base.config.cjs");

/* ========================================================================== */

/** @type {import("@rspack/core").Configuration} */
module.exports = {
    ...baseConfig,
    mode: "development",
    devtool: "source-map",

    entry: { main: path.resolve(__dirname, "showcase/main.tsx") },
    output: {
        path: path.resolve(__dirname, "dist-showcase"),
        publicPath: "/",
        filename: "assets/[name]-[contenthash].js",
        chunkFilename: "assets/[name]-[contenthash].js",
        cssFilename: "assets/[name]-[contenthash].css",
        cssChunkFilename: "assets/[name]-[contenthash].css",
        assetModuleFilename: "assets/[name]-[contenthash][ext]",
        clean: true
    },

    resolve: {
        ...baseConfig.resolve,
        alias: {
            ...baseConfig.resolve.alias,
            "~showcase": path.resolve(__dirname, "showcase")
        }
    },

    devServer: {
        port: 6006,
        hot: false,
        liveReload: true,
        historyApiFallback: true
    },

    performance: { hints: false },

    plugins: [
        new CopyRspackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "public"),
                    globOptions: { ignore: ["**/index.html"] }
                }
            ]
        }),
        new HtmlRspackPlugin({ template: path.resolve(__dirname, "public/index.html") })
    ]
};
