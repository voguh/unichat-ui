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
import { forwardRef, useMemo, useState } from "react";

import {
    ComboboxButton,
    ComboboxInput,
    ComboboxOptions,
    Combobox as HeadlessCombobox,
    ComboboxOption as HeadlessComboboxOption
} from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataFlag, dataPart, omitDataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

export interface ComboboxOption {
    value: string;
    label: string;
    disabled?: boolean;
}

type VanillaProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
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
    rootProps?: React.HTMLAttributes<HTMLDivElement>;
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

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
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
        <div
            {...rootProps}
            data-part={dataPart("Combobox", rest)}
            className={clsx(styles.root, className, rootProps.className)}
        >
            <HeadlessCombobox
                value={currentValue}
                onChange={handleChange}
                onClose={() => setQuery("")}
                name={name}
                disabled={disabled}
                invalid={invalid}
            >
                <div data-slot="control" data-invalid={dataFlag(invalid)}>
                    <ComboboxInput
                        {...omitDataPart(rest)}
                        ref={ref}
                        displayValue={displayValue}
                        onChange={handleInputChange}
                    />
                    <ComboboxButton data-slot="trigger">
                        <i className="fas fa-chevron-down" aria-hidden="true" />
                    </ComboboxButton>
                </div>
                <ComboboxOptions anchor="bottom start" data-part="ComboboxOptions" className={styles.options}>
                    {filteredOptions.map((option) => (
                        <HeadlessComboboxOption
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                            data-slot="option"
                        >
                            <span>{option.label}</span>
                            <i data-slot="indicator" className="fas fa-check" aria-hidden="true" />
                        </HeadlessComboboxOption>
                    ))}
                </ComboboxOptions>
            </HeadlessCombobox>
        </div>
    );
});
