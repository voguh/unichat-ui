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

const { CopyRspackPlugin } = require("@rspack/core");

const baseConfig = require("./rspack-base.config.cjs");

/* ========================================================================== */

const SRC_DIR = path.resolve(__dirname, "src");

const ENTRIES = {};
for (const file of fs.globSync("**/*.{ts,tsx}", { cwd: SRC_DIR, exclude: ["**/*.d.ts"] })) {
    const name = file.replace(/\.tsx?$/, "");
    ENTRIES[name] = path.join(SRC_DIR, file);
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
                return callback(null, isAlias ? `${srcRoot}/${request.slice(2)}` : request);
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

    plugins: [new CopyRspackPlugin({ patterns: [{ from: "**/*.css", context: SRC_DIR }] })]
};
