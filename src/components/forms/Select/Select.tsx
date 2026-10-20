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
import { useId } from "preact/hooks";

import { FormGroup, type FormGroupBaseProps, getFormGroupDescribedBy } from "~/components/forms/FormGroup";
import { Select as UISelect, type SelectProps as UISelectProps } from "~/components/ui/Select";

export interface SelectProps extends Omit<UISelectProps, "id">, FormGroupBaseProps {
    id?: string;
    groupProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    {
        id,
        ids,
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
    const labelId = `${fieldId}-label`;
    const describedBy = getFormGroupDescribedBy(fieldId, { description, status, statusMessage });

    return (
        <FormGroup
            {...groupProps}
            id={fieldId}
            label={label}
            labelProps={{ ...labelProps, id: labelId }}
            description={description}
            descriptionProps={descriptionProps}
            status={status}
            statusMessage={statusMessage}
            statusMessageProps={statusMessageProps}
        >
            <UISelect
                aria-describedby={describedBy}
                {...rest}
                ref={ref}
                id={fieldId}
                ids={{ ...ids, label: labelId }}
                invalid={status === "invalid"}
            />
        </FormGroup>
    );
});
