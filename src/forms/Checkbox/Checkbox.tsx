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
import { forwardRef, useId } from "react";

import { Checkbox as UICheckbox, type CheckboxProps as UICheckboxProps } from "~/Checkbox";
import { FormGroup, type FormGroupBaseProps, getFormGroupDescribedBy } from "~/forms/FormGroup";

export interface CheckboxProps extends Omit<UICheckboxProps, "id">, FormGroupBaseProps {
    id?: string;
    groupProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    {
        id,
        label,
        labelProps,
        description,
        descriptionProps,
        status,
        statusMessage,
        statusMessageProps,
        groupProps,
        ...rest
    },
    ref
) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const describedBy = getFormGroupDescribedBy(fieldId, { description, status, statusMessage });

    return (
        <FormGroup
            {...groupProps}
            id={fieldId}
            label={label}
            labelProps={labelProps}
            description={description}
            descriptionProps={descriptionProps}
            status={status}
            statusMessage={statusMessage}
            statusMessageProps={statusMessageProps}
        >
            <UICheckbox
                aria-describedby={describedBy}
                {...rest}
                ref={ref}
                id={fieldId}
                aria-invalid={status === "invalid" || undefined}
            />
        </FormGroup>
    );
});
