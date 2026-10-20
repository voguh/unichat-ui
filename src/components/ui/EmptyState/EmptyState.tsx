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

export interface EmptyStateProps extends Omit<PReact.HTMLAttributes<HTMLDivElement>, "title"> {
    icon?: PReact.ComponentChildren;
    title?: PReact.ComponentChildren;
    description?: PReact.ComponentChildren;
    titleAs?: "h1" | "h2" | "h3";
}

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
    { icon, title, description, titleAs: Title = "h3", className, children, ...rest },
    ref
) {
    return (
        <div {...rest} ref={ref} className={clsx(styles.root, className)}>
            {icon != null && (
                <span className={styles.icon} aria-hidden="true">
                    {icon}
                </span>
            )}
            {title != null && <Title className={styles.title}>{title}</Title>}
            {description != null && <p className={styles.description}>{description}</p>}
            {children}
        </div>
    );
});
