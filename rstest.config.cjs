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

const { withRspackConfig } = require("@rstest/adapter-rspack");

/* ========================================================================== */

const PREACT_ALIASES = {
    react$: "preact/compat",
    "react-dom$": "preact/compat",
    "react/jsx-runtime": "preact/jsx-runtime",
    "react/jsx-dev-runtime": "preact/jsx-dev-runtime",
    "react-dom/test-utils": "preact/test-utils",
    "@testing-library/react$": "@testing-library/preact"
};

/** @type {import("@rstest/core").ProjectConfig} */
const projectConfig = {
    extends: withRspackConfig({ cwd: __dirname, configPath: "./rspack.config.cjs" }),
    root: __dirname,
    clearMocks: true,
    testEnvironment: "jsdom",
    globals: true,
    passWithNoTests: true,
    include: ["__tests__/**/?(*.)(spec|test).[jt]s?(x)"],
    setupFiles: [path.resolve(__dirname, "__tests__/setupTests.ts")]
};

/* ========================================================================== */

/** @type {import("@rstest/core").RstestConfig} */
module.exports = {
    projects: [
        { ...projectConfig, name: "react" },
        { ...projectConfig, name: "preact", resolve: { alias: PREACT_ALIASES } }
    ],
    coverage: {
        provider: "v8",
        include: ["src/**/*.{js,jsx,ts,tsx}"],
        exclude: ["**/*.d.ts"]
    }
};
