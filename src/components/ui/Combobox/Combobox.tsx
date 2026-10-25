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
import { useMemo, useState } from "preact/hooks";

import {
    ComboboxButton,
    ComboboxInput,
    ComboboxOptions,
    Combobox as HeadlessCombobox,
    ComboboxOption as HeadlessComboboxOption
} from "@headlessui/react";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

export interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}

type VanillaProps = Omit<
    PReact.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "disabled" | "autoFocus" | "name"
>;
export interface ComboboxProps extends VanillaProps {
    options: ComboboxOption[];
    value?: string;
    defaultValue?: string;
    name?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    invalid?: boolean;
    onValueChange?: (value: string) => void;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
    {
        options,
        value,
        defaultValue,
        name,
        disabled = false,
        invalid = false,
        onValueChange,
        onChange,
        rootProps = {},
        className,
        ...rest
    },
    ref
) {
    const isControlled = value != null;

    const [innerValue, setInnerValue] = useState(defaultValue ?? "");
    const [query, setQuery] = useState("");
    const filteredOptions = useMemo(() => {
        const normalized = query.trim().toLowerCase();
        if (normalized === "") {
            return options;
        }

        return options.filter((option) => option.label.toLowerCase().includes(normalized));
    }, [options, query]);

    let currentValue = innerValue;
    if (isControlled) {
        currentValue = value;
    }

    function handleChange(nextValue: string | null): void {
        const resolved = nextValue ?? "";
        if (!isControlled) {
            setInnerValue(resolved);
        }

        setQuery("");
        if (onValueChange != null) {
            onValueChange(resolved);
        }
    }

    function handleInputChange(event: PReact.TargetedEvent<HTMLInputElement, Event>): void {
        setQuery(event.currentTarget.value);
        if (onChange != null) {
            onChange(event);
        }
    }

    function displayValue(optionValue: string): string {
        const option = options.find((item) => item.value === optionValue);
        if (option != null) {
            return option.label;
        }

        return "";
    }

    return (
        <div {...rootProps} className={clsx(styles.root, className, rootProps.className)}>
            <HeadlessCombobox
                value={currentValue}
                onChange={handleChange}
                onClose={() => setQuery("")}
                name={name}
                disabled={disabled}
                invalid={invalid}
            >
                <div data-invalid={invalid || undefined} className={styles.control}>
                    <ComboboxInput
                        {...rest}
                        ref={ref}
                        displayValue={displayValue}
                        onChange={handleInputChange}
                        className={styles.input}
                    />
                    <ComboboxButton className={styles.trigger}>
                        <i className="fas fa-chevron-down" aria-hidden="true" />
                    </ComboboxButton>
                </div>
                <ComboboxOptions anchor="bottom start" className={styles.content}>
                    {filteredOptions.map((option) => (
                        <HeadlessComboboxOption
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                            className={styles.item}
                        >
                            <span>{option.label}</span>
                            <i className={clsx(styles.itemIndicator, "fas fa-check")} aria-hidden="true" />
                        </HeadlessComboboxOption>
                    ))}
                </ComboboxOptions>
            </HeadlessCombobox>
        </div>
    );
});
