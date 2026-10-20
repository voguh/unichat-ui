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

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.DetailsHTMLAttributes<HTMLDetailsElement>, "title">;
export interface AccordionItemProps extends VanillaProps {
    title: PReact.ComponentChildren;
    contentProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const AccordionItem = forwardRef<HTMLDetailsElement, AccordionItemProps>(function AccordionItem(
    { title, contentProps, className, children, ...rest },
    ref
) {
    const contentClassName = contentProps != null ? contentProps.className : undefined;

    return (
        <details {...rest} ref={ref} className={clsx(styles.root, className)}>
            <summary className={styles.trigger}>
                <span className={styles.title}>{title}</span>
                <i className={clsx(styles.indicator, "fas fa-chevron-down")} aria-hidden="true" />
            </summary>
            <div {...contentProps} className={clsx(styles.content, contentClassName)}>
                {children}
            </div>
        </details>
    );
});
