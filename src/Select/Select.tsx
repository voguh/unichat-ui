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

import type * as React from "react";
import { forwardRef, useMemo, useRef, useState } from "react";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataFlag, dataPart, omitDataPart } from "~/utils/dataAttributes";
import { mergeRefs } from "~/utils/mergeRefs";
import { setNativeValue } from "~/utils/setNativeValue";

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
    React.SelectHTMLAttributes<HTMLSelectElement>,
    "value" | "defaultValue" | "multiple" | "disabled" | "placeholder"
>;
export interface SelectProps extends VanillaProps {
    options: Array<SelectOption | SelectOptionGroup>;
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    invalid?: boolean;
    placeholder?: string;
    rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

const TRIGGER_PROPS = new Set(["autoFocus", "tabIndex", "title"]);
const SELECT_EVENTS = new Set(["onChange", "onInput", "onInvalid"]);

function isTriggerProp(key: string): boolean {
    return TRIGGER_PROPS.has(key) || key.startsWith("aria-") || (key.startsWith("on") && !SELECT_EVENTS.has(key));
}

function splitProps(props: Record<string, unknown>): [Record<string, unknown>, Record<string, unknown>] {
    const triggerProps: Record<string, unknown> = {};
    const selectProps: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(props)) {
        if (isTriggerProp(key)) {
            triggerProps[key] = value;
        } else {
            selectProps[key] = value;
        }
    }

    return [triggerProps, selectProps];
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
        onInvalid,
        ...rest
    },
    ref
) {
    const isControlled = value != null;
    const [triggerProps, selectProps] = splitProps(omitDataPart(rest));

    const [innerValue, setInnerValue] = useState(defaultValue ?? "");
    const selectRef = useRef<HTMLSelectElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const invalidRef = useRef(false);
    const flatOptions = useMemo(() => flattenOptions(options), [options]);

    const currentValue = isControlled ? value : innerValue;

    const selected = flatOptions.find((option) => option.value === currentValue);

    function handleChange(nextValue: string): void {
        if (!isControlled) {
            setInnerValue(nextValue);
        }

        const select = selectRef.current!;
        setNativeValue(select, nextValue);
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function handleInvalid(event: React.FormEvent<HTMLSelectElement>): void {
        invalidRef.current = true;
        if (onInvalid != null) {
            onInvalid(event);
        }
    }

    // The browser focuses an invalid control to anchor its validation message and hides it on blur.
    function handleSelectFocus(): void {
        if (invalidRef.current) {
            invalidRef.current = false;
        } else {
            triggerRef.current!.focus();
        }
    }

    function handleSelectKeyDown(event: React.KeyboardEvent<HTMLSelectElement>): void {
        if (event.key !== "Tab") {
            event.preventDefault();
            triggerRef.current!.focus();
        }
    }

    function renderOption(option: SelectOption): React.ReactElement {
        return (
            <ListboxOption
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                data-slot="option"
                className={styles.option}
            >
                <span>{option.label}</span>
                <i data-slot="indicator" className="fas fa-check" aria-hidden="true" />
            </ListboxOption>
        );
    }

    function renderNativeOption(option: SelectOption): React.ReactElement {
        return (
            <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
            </option>
        );
    }

    return (
        <div
            {...rootProps}
            data-part={dataPart("Select", rest)}
            className={clsx(styles.root, className, rootProps.className)}
        >
            <Listbox value={currentValue} onChange={handleChange} disabled={disabled} invalid={invalid}>
                <ListboxButton {...triggerProps} ref={triggerRef} id={id}>
                    <span data-slot="value" data-placeholder={dataFlag(selected == null)}>
                        {selected != null ? selected.label : placeholder}
                    </span>
                    <i data-slot="indicator" className="fas fa-chevron-down" aria-hidden="true" />
                </ListboxButton>
                <ListboxOptions anchor="bottom start" data-part="SelectOptions" className={styles.options}>
                    {options.map((option) => {
                        if (isOptionGroup(option)) {
                            return (
                                <div key={option.label} role="group" aria-label={option.label} data-slot="group">
                                    <div data-slot="group-label">{option.label}</div>
                                    {option.options.map(renderOption)}
                                </div>
                            );
                        }

                        return renderOption(option);
                    })}
                </ListboxOptions>
            </Listbox>
            <select
                {...selectProps}
                ref={mergeRefs(ref, selectRef)}
                value={currentValue}
                disabled={disabled}
                aria-hidden="true"
                tabIndex={-1}
                onInvalid={handleInvalid}
                onFocus={handleSelectFocus}
                onKeyDown={handleSelectKeyDown}
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
