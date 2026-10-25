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
import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import popoverPanelStyles from "~/Popover/PopoverPanel/styles.module.css";
import { clsx } from "~/utils/clsx";
import { dataFlag } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

const DAY_MS = 86_400_000;
const GRID_DAYS = 42;
const WEEK_DAYS = 7;
const KNOWN_SUNDAY = Date.UTC(2023, 0, 1);

interface WeekInfo {
    firstDay: number;
    weekend: number[];
}

const DEFAULT_WEEK_INFO: WeekInfo = { firstDay: 7, weekend: [6, 7] };

// Chromium exposes `getWeekInfo()`, WebKit only the older `weekInfo` getter, Firefox neither.
function getWeekInfo(locale: string): WeekInfo {
    const intlLocale: Intl.Locale & { getWeekInfo?: () => WeekInfo; weekInfo?: WeekInfo } = new Intl.Locale(locale);
    if (intlLocale.getWeekInfo != null) {
        return intlLocale.getWeekInfo();
    }

    return intlLocale.weekInfo ?? DEFAULT_WEEK_INFO;
}

function toTime(isoDate: string): number {
    const [year, month, day] = isoDate.split("-").map(Number);

    return Date.UTC(year, month - 1, day);
}

function toIsoDate(time: number): string {
    return new Date(time).toISOString().slice(0, 10);
}

function addDays(isoDate: string, days: number): string {
    return toIsoDate(toTime(isoDate) + days * DAY_MS);
}

function addMonths(isoDate: string, months: number): string {
    const date = new Date(toTime(isoDate));
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth() + months;
    const lastDay = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();

    return toIsoDate(Date.UTC(year, month, Math.min(date.getUTCDate(), lastDay)));
}

function startOfMonth(isoDate: string): string {
    return `${isoDate.slice(0, 7)}-01`;
}

function todayIsoDate(): string {
    const now = new Date();

    return toIsoDate(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

function clampIsoDate(isoDate: string, min: string | undefined, max: string | undefined): string {
    if (min != null && isoDate < min) {
        return min;
    } else if (max != null && isoDate > max) {
        return max;
    }

    return isoDate;
}

export interface DatePickerCalendarProps extends React.HTMLAttributes<HTMLDivElement> {
    locale: string;
    selected: string | null;
    min?: string;
    max?: string;
    onSelectDate: (isoDate: string) => void;
}

export const DatePickerCalendar = forwardRef<HTMLDivElement, DatePickerCalendarProps>(function DatePickerCalendar(
    { locale, selected, min, max, onSelectDate, className, ...rest },
    ref
) {
    const weekInfo = getWeekInfo(locale);
    const firstDay = weekInfo.firstDay % WEEK_DAYS;
    const weekend = weekInfo.weekend.map((day) => day % WEEK_DAYS);
    const today = todayIsoDate();

    const [focusedDate, setFocusedDate] = useState(() => clampIsoDate(selected ?? today, min, max));
    const gridRef = useRef<HTMLTableElement>(null);
    const keyboardRef = useRef(false);
    const formatters = useMemo(() => {
        return {
            title: new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }),
            weekday: new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }),
            day: new Intl.DateTimeFormat(locale, { dateStyle: "full", timeZone: "UTC" })
        };
    }, [locale]);

    const monthStart = startOfMonth(focusedDate);
    const monthOffset = (new Date(toTime(monthStart)).getUTCDay() - firstDay + WEEK_DAYS) % WEEK_DAYS;
    const gridStart = addDays(monthStart, -monthOffset);
    const title = formatters.title.format(toTime(monthStart));

    const weekdays: string[] = [];
    for (let index = 0; index < WEEK_DAYS; index++) {
        weekdays.push(formatters.weekday.format(KNOWN_SUNDAY + ((firstDay + index) % WEEK_DAYS) * DAY_MS));
    }

    const weeks: string[][] = [];
    for (let index = 0; index < GRID_DAYS; index++) {
        if (index % WEEK_DAYS === 0) {
            weeks.push([]);
        }

        weeks[weeks.length - 1].push(addDays(gridStart, index));
    }

    function isDisabled(isoDate: string): boolean {
        return (min != null && isoDate < min) || (max != null && isoDate > max);
    }

    function moveFocus(isoDate: string): void {
        setFocusedDate(clampIsoDate(isoDate, min, max));
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
        const weekOffset = (new Date(toTime(focusedDate)).getUTCDay() - firstDay + WEEK_DAYS) % WEEK_DAYS;
        const weekStart = addDays(focusedDate, -weekOffset);

        let next: string;
        switch (event.key) {
            case "ArrowLeft":
                next = addDays(focusedDate, -1);
                break;
            case "ArrowRight":
                next = addDays(focusedDate, 1);
                break;
            case "ArrowUp":
                next = addDays(focusedDate, -WEEK_DAYS);
                break;
            case "ArrowDown":
                next = addDays(focusedDate, WEEK_DAYS);
                break;
            case "PageUp":
                next = addMonths(focusedDate, event.shiftKey ? -12 : -1);
                break;
            case "PageDown":
                next = addMonths(focusedDate, event.shiftKey ? 12 : 1);
                break;
            case "Home":
                next = weekStart;
                break;
            case "End":
                next = addDays(weekStart, WEEK_DAYS - 1);
                break;
            default:
                return;
        }

        event.preventDefault();
        keyboardRef.current = true;
        moveFocus(next);
    }

    function renderDay(isoDate: string): React.ReactElement {
        const weekDay = new Date(toTime(isoDate)).getUTCDay();

        return (
            <td key={isoDate}>
                <button
                    type="button"
                    tabIndex={isoDate === focusedDate ? 0 : -1}
                    aria-pressed={isoDate === selected}
                    aria-label={formatters.day.format(toTime(isoDate))}
                    aria-current={isoDate === today ? "date" : undefined}
                    disabled={isDisabled(isoDate)}
                    data-slot="day"
                    data-date={isoDate}
                    data-outside={dataFlag(startOfMonth(isoDate) !== monthStart)}
                    data-today={dataFlag(isoDate === today)}
                    data-weekend={dataFlag(weekend.includes(weekDay))}
                    data-selected={dataFlag(isoDate === selected)}
                    onClick={() => onSelectDate(isoDate)}
                >
                    {Number(isoDate.slice(8))}
                </button>
            </td>
        );
    }

    useEffect(() => {
        if (selected != null) {
            setFocusedDate(selected);
        }
    }, [selected]);

    useLayoutEffect(() => {
        if (keyboardRef.current) {
            keyboardRef.current = false;
            gridRef.current!.querySelector<HTMLButtonElement>(`button[data-date="${focusedDate}"]`)!.focus();
        }
    }, [focusedDate]);

    return (
        <div
            {...rest}
            ref={ref}
            data-part="PopoverPanel DatePickerCalendar"
            className={clsx(popoverPanelStyles.root, styles.root, className)}
        >
            <div data-slot="header">
                <button
                    type="button"
                    data-slot="previous"
                    aria-label="Previous month"
                    disabled={min != null && addDays(monthStart, -1) < min}
                    onClick={() => moveFocus(addMonths(focusedDate, -1))}
                >
                    <i className="fas fa-chevron-left" aria-hidden="true" />
                </button>
                <span data-slot="title" aria-live="polite">
                    {title}
                </span>
                <button
                    type="button"
                    data-slot="next"
                    aria-label="Next month"
                    disabled={max != null && addMonths(monthStart, 1) > max}
                    onClick={() => moveFocus(addMonths(focusedDate, 1))}
                >
                    <i className="fas fa-chevron-right" aria-hidden="true" />
                </button>
            </div>
            <table ref={gridRef} aria-label={title} data-slot="grid" onKeyDown={handleKeyDown}>
                <thead>
                    <tr>
                        {weekdays.map((weekday) => (
                            <th key={weekday} scope="col">
                                {weekday}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {weeks.map((week) => (
                        <tr key={week[0]}>{week.map(renderDay)}</tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
});
