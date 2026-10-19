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

export type FieldStatus = "valid" | "invalid";

export interface FormGroupBaseProps {
    label?: PReact.ComponentChildren;
    labelProps?: PReact.LabelHTMLAttributes<HTMLLabelElement>;
    status?: FieldStatus;
    statusMessage?: PReact.ComponentChildren;
    statusMessageProps?: PReact.HTMLAttributes<HTMLElement>;
}

export interface FormGroupProps extends PReact.HTMLAttributes<HTMLDivElement>, FormGroupBaseProps {
    id?: string;
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(function FormGroup(
    { id, label, labelProps, status, statusMessage, statusMessageProps, className, children, ...rest },
    ref
) {
    const labelClassName = labelProps != null ? labelProps.className : undefined;
    const statusMessageClassName = statusMessageProps != null ? statusMessageProps.className : undefined;

    return (
        <div {...rest} ref={ref} data-status={status} className={clsx(styles.root, className)}>
            {label != null && (
                <label {...labelProps} htmlFor={id} className={clsx(styles.label, labelClassName)}>
                    {label}
                </label>
            )}
            {children}
            {status != null && statusMessage != null && (
                <small
                    {...statusMessageProps}
                    id={id != null ? `${id}-status` : undefined}
                    data-status={status}
                    className={clsx(styles.statusMessage, statusMessageClassName)}
                >
                    {statusMessage}
                </small>
            )}
        </div>
    );
});
