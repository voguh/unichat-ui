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

export type AlertVariant = "info" | "success" | "warning" | "danger";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "title">;
export interface AlertProps extends VanillaProps {
    variant?: AlertVariant;
    icon?: PReact.ComponentChildren;
    title?: PReact.ComponentChildren;
    action?: PReact.ComponentChildren;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    { variant = "info", icon, title, action, className, children, ...rest },
    ref
) {
    return (
        <div
            {...rest}
            ref={ref}
            role={variant === "danger" || variant === "warning" ? "alert" : "status"}
            data-variant={variant}
            className={clsx(styles.root, className)}
        >
            {icon != null && (
                <span className={styles.icon} aria-hidden="true">
                    {icon}
                </span>
            )}
            <div className={styles.content}>
                {title != null && <strong className={styles.title}>{title}</strong>}
                {children}
            </div>
            {action != null && <div className={styles.action}>{action}</div>}
        </div>
    );
});
