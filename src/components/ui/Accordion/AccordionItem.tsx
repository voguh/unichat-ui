/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type PReact from "preact";
import { forwardRef } from "preact/compat";

import { mergeProps } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import { AccordionItemContext, useAccordion } from "./context";
import styles from "./styles.module.css";

export interface AccordionItemProps extends PReact.HTMLAttributes<HTMLDivElement> {
    value: string;
    disabled?: boolean;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
    { value, disabled, className, ...rest },
    ref
) {
    const item = { value, disabled };

    const api = useAccordion();

    return (
        <AccordionItemContext.Provider value={item}>
            <div {...mergeProps(api.getItemProps(item), rest)} ref={ref} className={clsx(styles.item, className)} />
        </AccordionItemContext.Provider>
    );
});
