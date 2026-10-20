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

import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";
import * as radioGroup from "@zag-js/radio-group";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

export interface SegmentedControlItem {
    value: string;
    label: PReact.ComponentChildren;
    disabled?: boolean;
}

export interface SegmentedControlProps
    extends Omit<PReact.HTMLAttributes<HTMLDivElement>, keyof radioGroup.Props>,
        Partial<Omit<radioGroup.Props, "id">> {
    id?: string;
    items: SegmentedControlItem[];
}

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(function SegmentedControl(
    { id, items, className, ...props },
    ref
) {
    const [machineProps, rest] = radioGroup.splitProps(props);

    const machineId = useId();
    const service = useMachine(radioGroup.machine, {
        orientation: "horizontal",
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, root: id }
    });
    const api = radioGroup.connect(service, normalizeProps);

    return (
        <div {...mergeProps(api.getRootProps(), rest)} ref={ref} className={clsx(styles.root, className)}>
            <div {...api.getIndicatorProps()} className={styles.indicator} />
            {items.map((item) => (
                <label key={item.value} {...api.getItemProps(item)} className={styles.item}>
                    <span {...api.getItemTextProps(item)}>{item.label}</span>
                    <input {...api.getItemHiddenInputProps(item)} />
                </label>
            ))}
        </div>
    );
});
