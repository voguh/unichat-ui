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
import { forwardRef, useMemo, useRef, useState } from "react";

import {
    ComboboxButton,
    ComboboxInput,
    ComboboxOptions,
    Combobox as HeadlessCombobox,
    ComboboxOption as HeadlessComboboxOption
} from "@headlessui/react";

import { ScrollableView } from "~/ScrollableView";
import { clsx } from "~/utils/clsx";
import { dataFlag, dataPart, omitDataPart } from "~/utils/dataAttributes";
import { mergeRefs } from "~/utils/mergeRefs";
import { setNativeValue } from "~/utils/setNativeValue";

import styles from "./styles.module.css";

export interface ComboboxOption {
    value: string;
    label?: string;
    disabled?: boolean;
}

type VanillaProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "disabled" | "autoFocus"
>;
export interface ComboboxProps extends VanillaProps {
    options: ComboboxOption[];
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    invalid?: boolean;
    rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Combobox = forwardRef<HTMLInputElement, ComboboxProps>(function Combobox(
    { options, value, defaultValue, disabled = false, invalid = false, onChange, rootProps = {}, className, ...rest },
    ref
) {
    const isControlled = value != null;

    const [innerValue, setInnerValue] = useState(defaultValue ?? "");
    const inputRef = useRef<HTMLInputElement>(null);

    const currentValue = isControlled ? value : innerValue;

    const filteredOptions = useMemo(() => {
        const normalized = currentValue.trim().toLowerCase();
        if (normalized === "") {
            return options;
        }

        return options.filter((option) => {
            const label = option.label ?? "";
            return option.value.toLowerCase().includes(normalized) || label.toLowerCase().includes(normalized);
        });
    }, [options, currentValue]);

    function handleSelect(optionValue: string | null): void {
        const input = inputRef.current!;
        setNativeValue(input, optionValue ?? "");
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (!isControlled) {
            setInnerValue(event.currentTarget.value);
        }

        if (onChange != null) {
            onChange(event);
        }
    }

    return (
        <div
            {...rootProps}
            data-part={dataPart("Combobox", rest)}
            className={clsx(styles.root, className, rootProps.className)}
        >
            <HeadlessCombobox value={currentValue} onChange={handleSelect} disabled={disabled} invalid={invalid}>
                <div data-slot="control" data-invalid={dataFlag(invalid)}>
                    <ComboboxInput
                        {...omitDataPart(rest)}
                        ref={mergeRefs(ref, inputRef)}
                        displayValue={(text: string) => text}
                        onChange={handleInputChange}
                    />
                    <ComboboxButton data-slot="trigger">
                        <i className="fas fa-chevron-down" aria-hidden="true" />
                    </ComboboxButton>
                </div>
                <ComboboxOptions anchor="bottom start" data-part="ComboboxOptions" className={styles.options}>
                    {filteredOptions.length > 0 && (
                        <ScrollableView>
                            {filteredOptions.map((option) => (
                                <HeadlessComboboxOption
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    data-slot="option"
                                >
                                    <span>{option.value}</span>
                                    {option.label != null && option.label !== option.value && (
                                        <small data-slot="label">{option.label}</small>
                                    )}
                                    <i data-slot="indicator" className="fas fa-check" aria-hidden="true" />
                                </HeadlessComboboxOption>
                            ))}
                        </ScrollableView>
                    )}
                </ComboboxOptions>
            </HeadlessCombobox>
        </div>
    );
});
