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

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

export interface RadioGroupItem {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}

type VanillaProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">;
export interface RadioGroupProps extends VanillaProps {
    items: RadioGroupItem[];
    name?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
    { items, name, value, defaultValue, disabled = false, orientation = "vertical", onChange, className, ...rest },
    ref
) {
    const generatedName = useId();

    function isChecked(itemValue: string): boolean | undefined {
        if (value != null) {
            return value === itemValue;
        }

        return undefined;
    }

    return (
        <div
            {...rest}
            ref={ref}
            role="radiogroup"
            data-part={dataPart("RadioGroup", rest)}
            data-orientation={orientation}
            className={clsx(styles.root, className)}
        >
            {items.map((item) => (
                <label key={item.value}>
                    <input
                        type="radio"
                        name={name ?? generatedName}
                        value={item.value}
                        checked={isChecked(item.value)}
                        defaultChecked={defaultValue === item.value}
                        disabled={disabled || item.disabled}
                        onChange={onChange}
                    />
                    <span data-slot="control" />
                    <span data-slot="label">{item.label}</span>
                </label>
            ))}
        </div>
    );
});
