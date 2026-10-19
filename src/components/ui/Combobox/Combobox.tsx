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
import { useId, useMemo, useState } from "preact/hooks";

import * as combobox from "@zag-js/combobox";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import styles from "./styles.module.css";
import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

export interface ComboboxItem {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface ComboboxProps
    extends Omit<PReact.InputHTMLAttributes<HTMLInputElement>, keyof combobox.Props>,
        Partial<Omit<combobox.Props, "id" | "collection">> {
    id?: string;
    items: ComboboxItem[];
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
    { id, items, rootProps, className, ...props },
    ref
) {
    const [machineProps, rest] = combobox.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const machineId = useId();
    const [query, setQuery] = useState("");
    const filteredItems = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        return normalized === "" ? items : items.filter((item) => item.label.toLowerCase().includes(normalized));
    }, [items, query]);
    const collection = useMemo(
        () =>
            combobox.collection<ComboboxItem>({
                items: filteredItems,
                itemToValue: (item) => item.value,
                itemToString: (item) => item.label,
                isItemDisabled: (item) => item.disabled === true
            }),
        [filteredItems]
    );
    const service = useMachine(combobox.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, input: id },
        collection,
        onInputValueChange: handleInputValueChange
    });
    const api = combobox.connect(service, normalizeProps);

    function handleInputValueChange(details: combobox.InputValueChangeDetails): void {
        setQuery(details.reason === "input-change" ? details.inputValue : "");
        if (machineProps.onInputValueChange != null) {
            machineProps.onInputValueChange(details);
        }
    }

    return (
        <div
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            <div {...api.getControlProps()} className={styles.control}>
                <input {...mergeProps(api.getInputProps(), rest)} ref={ref} className={styles.input} />
                <button {...api.getTriggerProps()} className={styles.trigger}>
                    <i className="fas fa-chevron-down" aria-hidden="true" />
                </button>
            </div>
            <Portal>
                <div {...api.getPositionerProps()} className={styles.positioner}>
                    <ul {...api.getContentProps()} className={styles.content}>
                        {filteredItems.map((item) => (
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
        </div>
    );
});
