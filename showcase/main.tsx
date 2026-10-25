/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import "~/styles/global.css";
import "~/styles/tokens.css";
import { render } from "preact";

import { App } from "./App";

/* ========================================================================== */

const documentRoot = document.querySelector("#root");
if (documentRoot == null) {
    throw new Error("Root element not found");
}

render(<App />, documentRoot);
