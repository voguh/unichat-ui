/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { createContext } from "preact";
import { useContext } from "preact/hooks";

import type * as accordion from "@zag-js/accordion";
import type { PropTypes } from "@zag-js/preact";

export const AccordionContext = createContext<accordion.Api<PropTypes> | null>(null);
export const AccordionItemContext = createContext<accordion.ItemProps | null>(null);

export function useAccordion(): accordion.Api<PropTypes> {
    const api = useContext(AccordionContext);
    if (api == null) {
        throw new Error("Accordion parts must be rendered inside <Accordion.Root>");
    }

    return api;
}

export function useAccordionItem(): accordion.ItemProps {
    const item = useContext(AccordionItemContext);
    if (item == null) {
        throw new Error("Accordion item parts must be rendered inside <Accordion.Item>");
    }

    return item;
}
