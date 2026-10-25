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

const { rspack } = require("@rspack/core");

const libraryConfig = require("../../rspack.config.cjs");

/* ========================================================================== */

// rspack does not watch node_modules, where the injected library copy lives.
class WatchLibraryPlugin {
    static PLUGIN_NAME = "WatchLibraryPlugin";

    apply(compiler) {
        const logger = compiler.getInfrastructureLogger(WatchLibraryPlugin.PLUGIN_NAME);
        const buildConfig = libraryConfig({ RSPACK_BUILD: true });
        const installedLibrary = fs.realpathSync(path.resolve(__dirname, "../node_modules/@voguh/unichat-ui"));
        const outputPath = path.join(installedLibrary, "dist");
        const output = { ...buildConfig.output, path: outputPath, clean: { keep: /\.d\.ts$/ } };
        const config = { ...buildConfig, output };
        const emittedFiles = new Set();
        let watching = null;
        let initialBuild = true;
        let idle = Promise.resolve();
        let markIdle = null;

        function markBusy() {
            if (markIdle == null) {
                idle = new Promise((resolve) => {
                    markIdle = resolve;
                });
            }
        }

        function finish() {
            if (markIdle != null) {
                markIdle();
                markIdle = null;
            }
        }

        function trackEmitted(_file, info) {
            emittedFiles.add(info.targetPath);
        }

        function rebuildShowcase() {
            if (initialBuild) {
                initialBuild = false;
            } else if (compiler.watching != null && emittedFiles.size > 0) {
                compiler.watching.invalidateWithChangesAndRemovals(new Set(emittedFiles), new Set());
            }

            emittedFiles.clear();
        }

        compiler.hooks.watchRun.tapPromise(WatchLibraryPlugin.PLUGIN_NAME, () => {
            if (watching == null) {
                const library = rspack(config);
                library.hooks.watchRun.tap(WatchLibraryPlugin.PLUGIN_NAME, markBusy);
                library.hooks.assetEmitted.tap(WatchLibraryPlugin.PLUGIN_NAME, trackEmitted);
                library.hooks.done.tap(WatchLibraryPlugin.PLUGIN_NAME, finish);
                library.hooks.done.tap(WatchLibraryPlugin.PLUGIN_NAME, rebuildShowcase);

                markBusy();
                watching = library.watch({}, (error, stats) => {
                    if (error != null) {
                        logger.error(error);
                        finish();
                    } else if (stats.hasErrors()) {
                        logger.error(stats.toString("errors-only"));
                    }
                });
            }

            return idle;
        });

        compiler.hooks.watchClose.tap(WatchLibraryPlugin.PLUGIN_NAME, () => {
            if (watching != null) {
                watching.close(() => {});
            }
        });
    }
}

module.exports = { WatchLibraryPlugin };
