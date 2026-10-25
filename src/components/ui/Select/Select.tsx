/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

/** biome-ignore-all lint/a11y/useSemanticElements: option groups live inside the listbox popup, where a fieldset has no meaning */

import type PReact from "preact";
import { forwardRef } from "preact/compat";
import { useMemo, useRef, useState } from "preact/hooks";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { mergeRefs } from "~/utils/mergeRefs";

import styles from "./styles.module.css";

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectOptionGroup {
    label: string;
    options: SelectOption[];
}

type VanillaProps = Omit<
    PReact.SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "defaultValue" | "multiple" | "disabled" | "placeholder"
>;
export interface SelectProps extends VanillaProps {
    options: Array<SelectOption | SelectOptionGroup>;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    invalid?: boolean;
    placeholder?: string;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

function isOptionGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
    return "options" in option;
}

function flattenOptions(options: Array<SelectOption | SelectOptionGroup>): SelectOption[] {
    const flat: SelectOption[] = [];
    for (const option of options) {
        if (isOptionGroup(option)) {
            flat.push(...option.options);
        } else {
            flat.push(option);
        }
    }

    return flat;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
    {
        options,
        value,
        defaultValue,
        disabled = false,
        invalid = false,
        placeholder,
        rootProps = {},
        id,
        className,
        "aria-label": ariaLabel,
        "aria-describedby": ariaDescribedBy,
        ...rest
    },
    ref
) {
    const isControlled = value != null;

    const [innerValue, setInnerValue] = useState(defaultValue ?? "");
    const selectRef = useRef<HTMLSelectElement>(null);
    const flatOptions = useMemo(() => flattenOptions(options), [options]);

    let currentValue = innerValue;
    if (isControlled) {
        currentValue = value;
    }

    const selected = flatOptions.find((option) => option.value === currentValue);

    function handleChange(nextValue: string): void {
        if (!isControlled) {
            setInnerValue(nextValue);
        }

        const select = selectRef.current!;
        select.value = nextValue;
        select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function renderOption(option: SelectOption): PReact.VNode {
        return (
            <ListboxOption key={option.value} value={option.value} disabled={option.disabled} className={styles.item}>
                <span>{option.label}</span>
                <i className={clsx(styles.itemIndicator, "fas fa-check")} aria-hidden="true" />
            </ListboxOption>
        );
    }

    function renderValueText(): string | undefined {
        if (selected != null) {
            return selected.label;
        }

        return placeholder;
    }

    function renderNativeOption(option: SelectOption): PReact.VNode {
        return (
            <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
            </option>
        );
    }

    return (
        <div {...rootProps} className={clsx(styles.root, className, rootProps.className)}>
            <Listbox value={currentValue} onChange={handleChange} disabled={disabled} invalid={invalid}>
                <ListboxButton
                    id={id}
                    aria-label={ariaLabel}
                    aria-describedby={ariaDescribedBy}
                    className={styles.trigger}
                >
                    <span data-placeholder={selected == null || undefined} className={styles.valueText}>
                        {renderValueText()}
                    </span>
                    <i className={clsx(styles.indicator, "fas fa-chevron-down")} aria-hidden="true" />
                </ListboxButton>
                <ListboxOptions anchor="bottom start" className={styles.content}>
                    {options.map((option) => {
                        if (isOptionGroup(option)) {
                            return (
                                <div key={option.label} role="group" aria-label={option.label}>
                                    <div className={styles.itemGroupLabel}>{option.label}</div>
                                    {option.options.map(renderOption)}
                                </div>
                            );
                        }

                        return renderOption(option);
                    })}
                </ListboxOptions>
            </Listbox>
            <select
                {...rest}
                ref={mergeRefs(ref, selectRef)}
                value={currentValue}
                disabled={disabled}
                hidden
                aria-hidden="true"
                tabIndex={-1}
            >
                {options.map((option) => {
                    if (isOptionGroup(option)) {
                        return (
                            <optgroup key={option.label} label={option.label}>
                                {option.options.map(renderNativeOption)}
                            </optgroup>
                        );
                    }

                    return renderNativeOption(option);
                })}
            </select>
        </div>
    );
});
