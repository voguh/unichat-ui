/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { PopoverAnchor } from "./PopoverAnchor";
import { PopoverArrow } from "./PopoverArrow";
import { PopoverCloseTrigger } from "./PopoverCloseTrigger";
import { PopoverContent } from "./PopoverContent";
import { PopoverDescription } from "./PopoverDescription";
import { PopoverRoot } from "./PopoverRoot";
import { PopoverTitle } from "./PopoverTitle";
import { PopoverTrigger } from "./PopoverTrigger";

export * from "./PopoverAnchor";
export * from "./PopoverArrow";
export * from "./PopoverCloseTrigger";
export * from "./PopoverContent";
export * from "./PopoverDescription";
export * from "./PopoverRoot";
export * from "./PopoverTitle";
export * from "./PopoverTrigger";

export const Popover = {
    Root: PopoverRoot,
    Trigger: PopoverTrigger,
    Anchor: PopoverAnchor,
    Content: PopoverContent,
    Arrow: PopoverArrow,
    Title: PopoverTitle,
    Description: PopoverDescription,
    CloseTrigger: PopoverCloseTrigger
};
