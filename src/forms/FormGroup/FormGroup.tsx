/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type * as React from "react";
import { forwardRef } from "react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

export type FieldStatus = "valid" | "invalid";

export interface FormGroupBaseProps {
    label?: React.ReactNode;
    labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
    description?: React.ReactNode;
    descriptionProps?: React.HTMLAttributes<HTMLElement>;
    status?: FieldStatus;
    statusMessage?: React.ReactNode;
    statusMessageProps?: React.HTMLAttributes<HTMLElement>;
}

type VanillaProps = React.HTMLAttributes<HTMLDivElement>;
export interface FormGroupProps extends VanillaProps, FormGroupBaseProps {
    id?: string;
}

export function getFormGroupDescribedBy(
    id: string,
    { description, status, statusMessage }: Pick<FormGroupBaseProps, "description" | "status" | "statusMessage">
): string | undefined {
    if (status != null && statusMessage != null) {
        return `${id}-status`;
    }

    if (description != null) {
        return `${id}-description`;
    }

    return undefined;
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(function FormGroup(
    {
        id,
        label,
        labelProps = {},
        description,
        descriptionProps = {},
        status,
        statusMessage,
        statusMessageProps = {},
        className,
        children,
        ...rest
    },
    ref
) {
    const hasStatusMessage = status != null && statusMessage != null;

    function partId(part: string): string | undefined {
        if (id != null) {
            return `${id}-${part}`;
        }

        return undefined;
    }

    return (
        <div
            {...rest}
            ref={ref}
            data-part={dataPart("FormGroup", rest)}
            data-status={status}
            className={clsx(styles.root, className)}
        >
            {label != null && (
                <label {...labelProps} htmlFor={id} data-slot="label">
                    {label}
                </label>
            )}
            {children}
            {!hasStatusMessage && description != null && (
                <small {...descriptionProps} id={partId("description")} data-slot="description">
                    {description}
                </small>
            )}
            {hasStatusMessage && (
                <small {...statusMessageProps} id={partId("status")} data-slot="status-message" data-status={status}>
                    {statusMessage}
                </small>
            )}
        </div>
    );
});
