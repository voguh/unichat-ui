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
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

export type AlertVariant = "info" | "success" | "warning" | "danger";

const DEFAULT_ICONS: Record<AlertVariant, string> = {
    info: "fas fa-info-circle",
    success: "fas fa-check-circle",
    warning: "fas fa-exclamation-triangle",
    danger: "fas fa-times-circle"
};

const ROLES: Record<AlertVariant, "alert" | "status"> = {
    info: "status",
    success: "status",
    warning: "alert",
    danger: "alert"
};

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
            role={ROLES[variant]}
            data-part={dataPart("Alert", rest)}
            data-variant={variant}
            className={clsx(styles.root, className)}
        >
            <span data-slot="icon" aria-hidden="true">
                {icon ?? <i className={DEFAULT_ICONS[variant]} />}
            </span>
            <div data-slot="content">
                {title != null && <strong data-slot="title">{title}</strong>}
                {children}
            </div>
            {action != null && <div data-slot="action">{action}</div>}
        </div>
    );
});
