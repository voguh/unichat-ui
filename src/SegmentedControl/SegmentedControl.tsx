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

export interface SegmentedControlItem {
    value: string;
    label: React.ReactNode;
    disabled?: boolean;
}

type VanillaProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">;
export interface SegmentedControlProps extends VanillaProps {
    items: SegmentedControlItem[];
    name?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
    { items, name, value, defaultValue, disabled = false, onChange, className, ...rest },
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
            data-part={dataPart("SegmentedControl", rest)}
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
                    {item.label}
                </label>
            ))}
        </div>
    );
});
