/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import "vanilla-calendar-pro/styles/index.css";

import type PReact from "preact";
import { forwardRef } from "preact/compat";
import { useEffect, useRef } from "preact/hooks";

import { Calendar, type FormatDateString, type Options, type WeekDayID } from "vanilla-calendar-pro";

import { clsx } from "~/utils/clsx";
import { mergeRefs } from "~/utils/mergeRefs";

import styles from "./styles.module.css";

const FORMAT_TOKEN = /YYYY|MM|DD/g;
const REGEX_SPECIAL_CHARS = /[.*+?^${}()|[\]\\]/g;

export function getLocaleDateFormat(locale: string): string {
    const formatter = new Intl.DateTimeFormat(locale, { year: "numeric", month: "2-digit", day: "2-digit" });

    let format = "";
    for (const part of formatter.formatToParts(new Date(2000, 0, 2))) {
        if (part.type === "year") {
            format += "YYYY";
        } else if (part.type === "month") {
            format += "MM";
        } else if (part.type === "day") {
            format += "DD";
        } else {
            format += part.value;
        }
    }

    return format;
}

function formatIsoDate(isoDate: string, format: string): string {
    const [year, month, day] = isoDate.split("-");
    const values: Record<string, string> = { YYYY: year, MM: month, DD: day };

    return format.replace(FORMAT_TOKEN, (token) => values[token]);
}

function parseToIsoDate(text: string, format: string): string | null {
    const tokens: string[] = [];
    const source = format.replace(REGEX_SPECIAL_CHARS, "\\$&").replace(FORMAT_TOKEN, (token) => {
        tokens.push(token);
        if (token === "YYYY") {
            return "(\\d{4})";
        }

        return "(\\d{2})";
    });

    const match = new RegExp(`^${source}$`).exec(text.trim());
    if (match == null) {
        return null;
    }

    const values: Record<string, string> = {};
    for (let index = 0; index < tokens.length; index++) {
        values[tokens[index]] = match[index + 1];
    }

    return `${values.YYYY}-${values.MM}-${values.DD}`;
}

interface WeekInfo {
    firstDay: number;
    weekend: number[];
}

// Chromium exposes `getWeekInfo()`, WebKit only the older `weekInfo` getter.
function getWeekInfo(locale: string): WeekInfo | undefined {
    const intlLocale: Intl.Locale & { getWeekInfo?: () => WeekInfo; weekInfo?: WeekInfo } = new Intl.Locale(locale);
    if (intlLocale.getWeekInfo != null) {
        return intlLocale.getWeekInfo();
    }

    return intlLocale.weekInfo;
}

function toWeekDayId(day: number): WeekDayID {
    return (day % 7) as WeekDayID;
}

function toSelectedDates(text: string, format: string): string[] {
    const isoDate = parseToIsoDate(text, format);
    if (isoDate != null) {
        return [isoDate];
    }

    return [];
}

type VanillaProps = Omit<
    PReact.InputHTMLAttributes<HTMLInputElement>,
    "type" | "value" | "defaultValue" | "min" | "max"
>;
export interface DatePickerProps extends VanillaProps {
    value?: string;
    defaultValue?: string;
    format?: string;
    locale?: string;
    min?: string;
    max?: string;
    invalid?: boolean;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
    {
        value,
        defaultValue,
        format,
        locale,
        min,
        max,
        invalid = false,
        rootProps = {},
        placeholder,
        disabled,
        className,
        ...rest
    },
    ref
) {
    const resolvedLocale = locale ?? navigator.language;
    const resolvedFormat = format ?? getLocaleDateFormat(resolvedLocale);

    const inputRef = useRef<HTMLInputElement>(null);
    const calendarRef = useRef<Calendar | null>(null);

    function showCalendar(): void {
        if (calendarRef.current != null) {
            calendarRef.current.show();
        }
    }

    useEffect(() => {
        const input = inputRef.current!;
        const options: Options = {
            inputMode: true,
            selectedTheme: "dark",
            styles: { calendar: clsx("vc", styles.calendar) },
            locale: resolvedLocale,
            selectedDates: toSelectedDates(input.value, resolvedFormat),
            onClickDate(self) {
                const [isoDate] = self.context.selectedDates;
                if (isoDate == null) {
                    return;
                }

                input.value = formatIsoDate(isoDate, resolvedFormat);
                input.dispatchEvent(new Event("input", { bubbles: true }));
                input.dispatchEvent(new Event("change", { bubbles: true }));
                self.hide();
            }
        };

        const weekInfo = getWeekInfo(resolvedLocale);
        if (weekInfo != null) {
            options.firstWeekday = toWeekDayId(weekInfo.firstDay);
            options.selectedWeekends = weekInfo.weekend.map(toWeekDayId);
        }

        if (min != null) {
            options.dateMin = min as FormatDateString;
        }

        if (max != null) {
            options.dateMax = max as FormatDateString;
        }

        const calendar = new Calendar(input, options);
        calendar.init();
        calendarRef.current = calendar;

        return () => {
            calendar.destroy();
            calendarRef.current = null;
        };
    }, [resolvedLocale, resolvedFormat, min, max]);

    useEffect(() => {
        if (calendarRef.current != null && value != null) {
            calendarRef.current.set({ selectedDates: toSelectedDates(value, resolvedFormat) });
        }
    }, [value, resolvedFormat]);

    return (
        <div {...rootProps} className={clsx(styles.root, className, rootProps.className)}>
            <div data-invalid={invalid || undefined} data-disabled={disabled || undefined} className={styles.control}>
                <input
                    {...rest}
                    ref={mergeRefs(ref, inputRef)}
                    type="text"
                    value={value}
                    defaultValue={defaultValue}
                    placeholder={placeholder ?? resolvedFormat}
                    disabled={disabled}
                    className={styles.input}
                />
                <button
                    type="button"
                    aria-label="Open calendar"
                    disabled={disabled}
                    onClick={showCalendar}
                    className={styles.trigger}
                >
                    <i className="fas fa-calendar" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
});
