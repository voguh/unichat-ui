/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
/** biome-ignore-all lint/a11y/noLabelWithoutControl: htmlFor comes from zag label props */

import type PReact from "preact";
import { forwardRef } from "preact/compat";
import { useId, useMemo } from "preact/hooks";

import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";
import * as select from "@zag-js/select";

import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

export interface SelectItem {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectItemGroup {
    label: string;
    items: SelectItem[];
}

interface SelectCollectionItem extends SelectItem {
    group?: string;
}

type VanillaProps = Omit<PReact.SelectHTMLAttributes<HTMLSelectElement>, keyof select.Props>;
export interface SelectProps extends VanillaProps, Partial<Omit<select.Props, "id" | "collection">> {
    id?: string;
    items: Array<SelectItem | SelectItemGroup>;
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
            select.collection<SelectCollectionItem>({
                items: items.flatMap((item) =>
                    "items" in item ? item.items.map((child) => ({ ...child, group: item.label })) : [item]
                ),
                itemToValue: (item) => item.value,
                itemToString: (item) => item.label,
                isItemDisabled: (item) => item.disabled === true,
                groupBy: (item) => item.group ?? ""
            }),
        [items]
    );
    const groups = collection.group();
    const service = useMachine(select.machine, {
        ...machineProps,
        positioning: { sameWidth: true, ...machineProps.positioning },
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
                <div {...api.getPositionerProps()}>
                    <ul {...api.getContentProps()} className={styles.content}>
                        {groups.map(([group, groupItems]) => {
                            const renderedItems = groupItems.map((item) => (
                                <li key={item.value} {...api.getItemProps({ item })} className={styles.item}>
                                    <span {...api.getItemTextProps({ item })}>{item.label}</span>
                                    <span {...api.getItemIndicatorProps({ item })} className={styles.itemIndicator}>
                                        <i className="fas fa-check" aria-hidden="true" />
                                    </span>
                                </li>
                            ));

                            if (group === "") {
                                return renderedItems;
                            }

                            return (
                                <li key={group} {...api.getItemGroupProps({ id: group })}>
                                    <div
                                        {...api.getItemGroupLabelProps({ htmlFor: group })}
                                        className={styles.itemGroupLabel}
                                    >
                                        {group}
                                    </div>
                                    <ul>{renderedItems}</ul>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </Portal>
            <select {...mergeProps(api.getHiddenSelectProps(), rest)} ref={ref}>
                {groups.map(([group, groupItems]) => {
                    const renderedOptions = groupItems.map((item) => (
                        <option key={item.value} value={item.value} disabled={item.disabled}>
                            {item.label}
                        </option>
                    ));

                    if (group === "") {
                        return renderedOptions;
                    }

                    return (
                        <optgroup key={group} label={group}>
                            {renderedOptions}
                        </optgroup>
                    );
                })}
            </select>
        </div>
    );
});
