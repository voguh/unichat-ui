/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { AccordionItem } from "./AccordionItem";
import { AccordionItemContent } from "./AccordionItemContent";
import { AccordionItemIndicator } from "./AccordionItemIndicator";
import { AccordionItemTrigger } from "./AccordionItemTrigger";
import { AccordionRoot } from "./AccordionRoot";

export * from "./AccordionItem";
export * from "./AccordionItemContent";
export * from "./AccordionItemIndicator";
export * from "./AccordionItemTrigger";
export * from "./AccordionRoot";

export const Accordion = {
    Root: AccordionRoot,
    Item: AccordionItem,
    ItemTrigger: AccordionItemTrigger,
    ItemContent: AccordionItemContent,
    ItemIndicator: AccordionItemIndicator
};
