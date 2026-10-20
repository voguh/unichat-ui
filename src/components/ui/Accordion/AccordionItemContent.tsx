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

import { useAccordion, useAccordionItem } from "./context";
import styles from "./styles.module.css";

export interface AccordionItemContentProps extends PReact.HTMLAttributes<HTMLDivElement> {}

export const AccordionItemContent = forwardRef<HTMLDivElement, AccordionItemContentProps>(function AccordionItemContent(
    { className, ...rest },
    ref
) {
    const api = useAccordion();
    const item = useAccordionItem();

    return (
        <div
            {...mergeProps(api.getItemContentProps(item), rest)}
            ref={ref}
            className={clsx(styles.itemContent, className)}
        />
    );
});
