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

export interface SegmentedControlItem {
    value: string;
    label: PReact.ComponentChildren;
    disabled?: boolean;
}

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">;
export interface SegmentedControlProps extends VanillaProps {
    items: SegmentedControlItem[];
    name?: string;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    onChange?: (event: PReact.TargetedEvent<HTMLInputElement, Event>) => void;
}

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
    { items, name, value, defaultValue, disabled = false, onChange, className, ...rest },
    ref
) {
    const generatedName = useId();

    return (
        <div {...rest} ref={ref} role="radiogroup" className={clsx(styles.root, className)}>
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
                    {item.label}
                </label>
            ))}
        </div>
    );
});
