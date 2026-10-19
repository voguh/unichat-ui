/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

const buildConfig = require("./rspack-build.config.cjs");
const showcaseConfig = require("./rspack-showcase.config.cjs");

/* ========================================================================== */

/** @type {(env?: Record<string, unknown>) => import("@rspack/core").Configuration} */
module.exports = (env) => {
    if (env?.RSPACK_BUILD) {
        return buildConfig;
    }

    return showcaseConfig;
};
