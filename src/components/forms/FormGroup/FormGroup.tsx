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
    description?: PReact.ComponentChildren;
    descriptionProps?: PReact.HTMLAttributes<HTMLElement>;
    status?: FieldStatus;
    statusMessage?: PReact.ComponentChildren;
    statusMessageProps?: PReact.HTMLAttributes<HTMLElement>;
}

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface FormGroupProps extends VanillaProps, FormGroupBaseProps {
    id?: string;
}

export function getFormGroupDescribedBy(
    id: string,
    { description, status, statusMessage }: Pick<FormGroupBaseProps, "description" | "status" | "statusMessage">
): string | undefined {
    const ids: string[] = [];
    if (description != null) {
        ids.push(`${id}-description`);
    }

    if (status != null && statusMessage != null) {
        ids.push(`${id}-status`);
    }

    return ids.length > 0 ? ids.join(" ") : undefined;
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(function FormGroup(
    {
        id,
        label,
        labelProps,
        description,
        descriptionProps,
        status,
        statusMessage,
        statusMessageProps,
        className,
        children,
        ...rest
    },
    ref
) {
    const labelClassName = labelProps != null ? labelProps.className : undefined;
    const descriptionClassName = descriptionProps != null ? descriptionProps.className : undefined;
    const statusMessageClassName = statusMessageProps != null ? statusMessageProps.className : undefined;

    return (
        <div {...rest} ref={ref} data-status={status} className={clsx(styles.root, className)}>
            {label != null && (
                <label {...labelProps} htmlFor={id} className={clsx(styles.label, labelClassName)}>
                    {label}
                </label>
            )}
            {description != null && (
                <small
                    {...descriptionProps}
                    id={id != null ? `${id}-description` : undefined}
                    className={clsx(styles.description, descriptionClassName)}
                >
                    {description}
                </small>
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
