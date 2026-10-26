/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

/** biome-ignore-all lint/a11y/noStaticElementInteractions: the field forwards pointer, focus and Escape handling to the native input it wraps */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: keyboard users open the calendar by focusing the input; the click is a pointer shortcut */

import type * as React from "react";
import { forwardRef, useEffect, useRef, useState } from "react";

import { flip, offset, shift } from "@floating-ui/dom";

import { useComputePosition } from "~/hooks/useComputePosition";
import { clickOutside } from "~/utils/clickOutside";
import { clsx } from "~/utils/clsx";
import { dataFlag, dataPart, omitDataPart } from "~/utils/dataAttributes";
import { mergeRefs } from "~/utils/mergeRefs";
import { setNativeValue } from "~/utils/setNativeValue";

import { DatePickerCalendar } from "./DatePickerCalendar";
import styles from "./styles.module.css";

const HIDDEN_STYLE: React.CSSProperties = { visibility: "hidden", opacity: "0" };

type VanillaProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue" | "min" | "max" | "placeholder"
>;
export interface DatePickerProps extends VanillaProps {
    value?: string;
    defaultValue?: string;
    min?: string;
    max?: string;
    locale?: string;
    invalid?: boolean;
    rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
    { value, defaultValue, min, max, locale, invalid = false, rootProps = {}, disabled, onChange, className, ...rest },
    ref
) {
    const isControlled = value != null;

    const [innerValue, setInnerValue] = useState(defaultValue ?? "");
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const refocusRef = useRef(false);
    const [controlRef, calendarRef, toggleVisualization] = useComputePosition<HTMLDivElement, HTMLDivElement>({
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [offset(4), flip(), shift({ padding: 8 })]
    });

    const currentValue = isControlled ? value : innerValue;

    function openCalendar(): void {
        if (refocusRef.current) {
            refocusRef.current = false;
        } else if (!disabled) {
            setOpen(true);
        }
    }

    function closeAndRefocus(): void {
        setOpen(false);

        const input = inputRef.current!;
        if (document.activeElement !== input) {
            refocusRef.current = true;
            input.focus();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        if (!isControlled) {
            setInnerValue(event.currentTarget.value);
        }

        if (onChange != null) {
            onChange(event);
        }
    }

    function selectDate(isoDate: string): void {
        const input = inputRef.current!;
        setNativeValue(input, isoDate);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
        closeAndRefocus();
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
        if (open && event.key === "Escape") {
            closeAndRefocus();
        } else if (open && event.altKey && event.key === "ArrowDown" && event.target instanceof HTMLInputElement) {
            event.preventDefault();
            calendarRef.current!.querySelector<HTMLButtonElement>('button[data-slot="day"][tabindex="0"]')!.focus();
        }
    }

    function handleBlur(event: React.FocusEvent<HTMLDivElement>): void {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !rootRef.current!.contains(next)) {
            setOpen(false);
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: toggleVisualization is recreated every render
    useEffect(() => {
        toggleVisualization(open);
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        return clickOutside(() => setOpen(false), rootRef);
    }, [open]);

    return (
        <div
            {...rootProps}
            ref={rootRef}
            data-part={dataPart("DatePicker", rest)}
            data-open={dataFlag(open)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={clsx(styles.root, className, rootProps.className)}
        >
            <div
                ref={controlRef}
                data-slot="control"
                data-invalid={dataFlag(invalid)}
                data-disabled={dataFlag(disabled)}
                onClick={openCalendar}
                onFocus={openCalendar}
            >
                <input
                    {...omitDataPart(rest)}
                    ref={mergeRefs(ref, inputRef)}
                    type="date"
                    value={currentValue}
                    min={min}
                    max={max}
                    disabled={disabled}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    data-slot="trigger"
                    aria-label="Open calendar"
                    disabled={disabled}
                    onClick={openCalendar}
                >
                    <i className="fas fa-calendar" aria-hidden="true" />
                </button>
            </div>
            <DatePickerCalendar
                ref={calendarRef}
                style={HIDDEN_STYLE}
                locale={locale ?? navigator.language}
                selected={currentValue === "" ? null : currentValue}
                min={min}
                max={max}
                onSelectDate={selectDate}
            />
        </div>
    );
});
