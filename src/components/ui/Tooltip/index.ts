/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { TooltipArrow } from "./TooltipArrow";
import { TooltipContent } from "./TooltipContent";
import { TooltipRoot } from "./TooltipRoot";
import { TooltipTrigger } from "./TooltipTrigger";

export * from "./TooltipArrow";
export * from "./TooltipContent";
export * from "./TooltipRoot";
export * from "./TooltipTrigger";

export const Tooltip = {
    Root: TooltipRoot,
    Trigger: TooltipTrigger,
    Content: TooltipContent,
    Arrow: TooltipArrow
};
