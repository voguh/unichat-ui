/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { DialogBody } from "./DialogBody";
import { DialogCloseTrigger } from "./DialogCloseTrigger";
import { DialogContent } from "./DialogContent";
import { DialogDescription } from "./DialogDescription";
import { DialogHeader } from "./DialogHeader";
import { DialogRoot } from "./DialogRoot";
import { DialogTitle } from "./DialogTitle";
import { DialogTrigger } from "./DialogTrigger";

export * from "./DialogBody";
export * from "./DialogCloseTrigger";
export * from "./DialogContent";
export * from "./DialogDescription";
export * from "./DialogHeader";
export * from "./DialogRoot";
export * from "./DialogTitle";
export * from "./DialogTrigger";

export const Dialog = {
    Root: DialogRoot,
    Trigger: DialogTrigger,
    Content: DialogContent,
    Header: DialogHeader,
    Body: DialogBody,
    Title: DialogTitle,
    Description: DialogDescription,
    CloseTrigger: DialogCloseTrigger
};
