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

import { FormGroup, type FormGroupBaseProps, getFormGroupDescribedBy } from "~/forms/FormGroup";
import { Textarea as UITextarea, type TextareaProps as UITextareaProps } from "~/Textarea";

export interface TextareaProps extends Omit<UITextareaProps, "id">, FormGroupBaseProps {
    id?: string;
    groupProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
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
            <UITextarea
                aria-describedby={describedBy}
                {...rest}
                ref={ref}
                id={fieldId}
                aria-invalid={status === "invalid" || undefined}
            />
        </FormGroup>
    );
});
