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
import { useId, useMemo } from "preact/hooks";

import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";
import * as select from "@zag-js/select";

import styles from "./styles.module.css";
import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

export interface SelectItem {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps
    extends Omit<PReact.SelectHTMLAttributes<HTMLSelectElement>, keyof select.Props>,
        Partial<Omit<select.Props, "id" | "collection">> {
    id?: string;
    items: SelectItem[];
    placeholder?: string;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    { id, items, placeholder, rootProps, className, "aria-label": ariaLabel, ...props },
    ref
) {
    const [machineProps, rest] = select.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const machineId = useId();
    const collection = useMemo(
        () =>
            select.collection<SelectItem>({
                items,
                itemToValue: (item) => item.value,
                itemToString: (item) => item.label,
                isItemDisabled: (item) => item.disabled === true
            }),
        [items]
    );
    const service = useMachine(select.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, hiddenSelect: id },
        collection
    });
    const api = select.connect(service, normalizeProps);

    return (
        <div
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            {ariaLabel != null && (
                // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor comes from zag label props
                <label {...api.getLabelProps()} className="sr-only">
                    {ariaLabel}
                </label>
            )}
            <div {...api.getControlProps()} className={styles.control}>
                <button {...api.getTriggerProps()} className={styles.trigger}>
                    <span {...api.getValueTextProps()} className={styles.valueText}>
                        {api.valueAsString || placeholder}
                    </span>
                    <span {...api.getIndicatorProps()} className={styles.indicator}>
                        <i className="fas fa-chevron-down" aria-hidden="true" />
                    </span>
                </button>
            </div>
            <Portal>
                <div {...api.getPositionerProps()} className={styles.positioner}>
                    <ul {...api.getContentProps()} className={styles.content}>
                        {items.map((item) => (
                            <li key={item.value} {...api.getItemProps({ item })} className={styles.item}>
                                <span {...api.getItemTextProps({ item })}>{item.label}</span>
                                <span {...api.getItemIndicatorProps({ item })} className={styles.itemIndicator}>
                                    <i className="fas fa-check" aria-hidden="true" />
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </Portal>
            <select {...mergeProps(api.getHiddenSelectProps(), rest)} ref={ref}>
                {items.map((item) => (
                    <option key={item.value} value={item.value} disabled={item.disabled}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
});
