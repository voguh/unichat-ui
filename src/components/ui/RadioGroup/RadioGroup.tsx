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

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

export interface RadioGroupItem {
    value: string;
    label: PReact.ComponentChildren;
    disabled?: boolean;
}

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">;
export interface RadioGroupProps extends VanillaProps {
    items: RadioGroupItem[];
    name?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    onChange?: (event: PReact.TargetedEvent<HTMLInputElement, Event>) => void;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
    { items, name, value, defaultValue, disabled = false, orientation = "vertical", onChange, className, ...rest },
    ref
) {
    const generatedName = useId();

    return (
        <div
            {...rest}
            ref={ref}
            role="radiogroup"
            data-orientation={orientation}
            className={clsx(styles.root, className)}
        >
            {items.map((item) => (
                <label key={item.value} className={styles.item}>
                    <input
                        type="radio"
                        name={name ?? generatedName}
                        value={item.value}
                        checked={value != null ? value === item.value : undefined}
                        defaultChecked={defaultValue === item.value}
                        disabled={disabled || item.disabled}
                        onChange={onChange}
                        className={styles.input}
                    />
                    <span className={styles.itemControl} />
                    <span className={styles.itemText}>{item.label}</span>
                </label>
            ))}
        </div>
    );
});
