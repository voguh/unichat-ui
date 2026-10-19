/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { ClipboardControl } from "./ClipboardControl";
import { ClipboardIndicator } from "./ClipboardIndicator";
import { ClipboardInput } from "./ClipboardInput";
import { ClipboardLabel } from "./ClipboardLabel";
import { ClipboardRoot } from "./ClipboardRoot";
import { ClipboardTrigger } from "./ClipboardTrigger";

export * from "./ClipboardControl";
export * from "./ClipboardIndicator";
export * from "./ClipboardInput";
export * from "./ClipboardLabel";
export * from "./ClipboardRoot";
export * from "./ClipboardTrigger";

export const Clipboard = {
    Root: ClipboardRoot,
    Label: ClipboardLabel,
    Control: ClipboardControl,
    Input: ClipboardInput,
    Trigger: ClipboardTrigger,
    Indicator: ClipboardIndicator
};
