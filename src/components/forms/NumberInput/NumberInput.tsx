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

import { FormGroup, type FormGroupBaseProps } from "~/components/forms/FormGroup";
import { NumberInput as UINumberInput, type NumberInputProps as UINumberInputProps } from "~/components/ui/NumberInput";

export interface NumberInputProps extends Omit<UINumberInputProps, "id">, FormGroupBaseProps {
    id?: string;
    groupProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
    { id, ids, label, labelProps, status, statusMessage, statusMessageProps, groupProps, ...rest },
    ref
) {
    const generatedId = useId();
    const fieldId = id ?? generatedId;
    const labelId = `${fieldId}-label`;
    const statusId = status != null && statusMessage != null ? `${fieldId}-status` : undefined;

    return (
        <FormGroup
            {...groupProps}
            id={fieldId}
            label={label}
            labelProps={{ ...labelProps, id: labelId }}
            status={status}
            statusMessage={statusMessage}
            statusMessageProps={statusMessageProps}
        >
            <UINumberInput
                aria-describedby={statusId}
                {...rest}
                ref={ref}
                id={fieldId}
                ids={{ ...ids, label: labelId }}
                invalid={status === "invalid"}
            />
        </FormGroup>
    );
});
