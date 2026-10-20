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
import { useId } from "preact/hooks";

import * as datePicker from "@zag-js/date-picker";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, keyof datePicker.Props>;
export interface DatePickerProps extends VanillaProps, Partial<Omit<datePicker.Props, "id">> {
    id?: string;
    locale?: string;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(function DatePicker(
    { id, rootProps, className, locale, ...props },
    ref
) {
    const [machineProps, rest] = datePicker.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const machineId = useId();
    const service = useMachine(datePicker.machine, {
        locale: locale ?? navigator.language,
        ...machineProps,
        id: machineId,
        ids: id != null ? { ...machineProps.ids, input: () => id } : machineProps.ids
    });
    const api = datePicker.connect(service, normalizeProps);

    return (
        <div
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            <div {...api.getControlProps()} className={styles.control}>
                <input {...mergeProps(api.getInputProps(), rest)} ref={ref} className={styles.input} />
                <button {...api.getTriggerProps()} className={styles.trigger}>
                    <i className="fas fa-calendar" aria-hidden="true" />
                </button>
            </div>
            <Portal>
                <div {...api.getPositionerProps()}>
                    <div {...api.getContentProps()} className={styles.content}>
                        <div hidden={api.view !== "day"}>
                            <div {...api.getViewControlProps({ view: "day" })} className={styles.viewControl}>
                                <button {...api.getPrevTriggerProps()} className={styles.navTrigger}>
                                    <i className="fas fa-chevron-left" aria-hidden="true" />
                                </button>
                                <button {...api.getViewTriggerProps()} className={styles.viewTrigger}>
                                    {api.visibleRangeText.start}
                                </button>
                                <button {...api.getNextTriggerProps()} className={styles.navTrigger}>
                                    <i className="fas fa-chevron-right" aria-hidden="true" />
                                </button>
                            </div>
                            <table {...api.getTableProps({ view: "day" })} className={styles.table}>
                                <thead {...api.getTableHeadProps({ view: "day" })}>
                                    <tr {...api.getTableRowProps({ view: "day" })}>
                                        {api.weekDays.map((day) => (
                                            <th
                                                key={day.long}
                                                scope="col"
                                                aria-label={day.long}
                                                className={styles.weekDay}
                                            >
                                                {day.narrow}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody {...api.getTableBodyProps({ view: "day" })}>
                                    {api.weeks.map((week) => (
                                        <tr key={week[0].toString()} {...api.getTableRowProps({ view: "day" })}>
                                            {week.map((value) => (
                                                <td key={value.toString()} {...api.getDayTableCellProps({ value })}>
                                                    <div
                                                        {...api.getDayTableCellTriggerProps({ value })}
                                                        className={styles.cellTrigger}
                                                    >
                                                        {value.day}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div hidden={api.view !== "month"}>
                            <div {...api.getViewControlProps({ view: "month" })} className={styles.viewControl}>
                                <button {...api.getPrevTriggerProps({ view: "month" })} className={styles.navTrigger}>
                                    <i className="fas fa-chevron-left" aria-hidden="true" />
                                </button>
                                <button {...api.getViewTriggerProps({ view: "month" })} className={styles.viewTrigger}>
                                    {api.visibleRange.start.year}
                                </button>
                                <button {...api.getNextTriggerProps({ view: "month" })} className={styles.navTrigger}>
                                    <i className="fas fa-chevron-right" aria-hidden="true" />
                                </button>
                            </div>
                            <table {...api.getTableProps({ view: "month", columns: 4 })} className={styles.table}>
                                <tbody {...api.getTableBodyProps({ view: "month" })}>
                                    {api.getMonthsGrid({ columns: 4, format: "short" }).map((months) => (
                                        <tr key={months[0].value} {...api.getTableRowProps()}>
                                            {months.map((month) => (
                                                <td
                                                    key={month.value}
                                                    {...api.getMonthTableCellProps({ ...month, columns: 4 })}
                                                >
                                                    <div
                                                        {...api.getMonthTableCellTriggerProps({ ...month, columns: 4 })}
                                                        className={styles.cellTrigger}
                                                    >
                                                        {month.label}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div hidden={api.view !== "year"}>
                            <div {...api.getViewControlProps({ view: "year" })} className={styles.viewControl}>
                                <button {...api.getPrevTriggerProps({ view: "year" })} className={styles.navTrigger}>
                                    <i className="fas fa-chevron-left" aria-hidden="true" />
                                </button>
                                <span className={styles.viewTrigger}>
                                    {api.getDecade().start} - {api.getDecade().end}
                                </span>
                                <button {...api.getNextTriggerProps({ view: "year" })} className={styles.navTrigger}>
                                    <i className="fas fa-chevron-right" aria-hidden="true" />
                                </button>
                            </div>
                            <table {...api.getTableProps({ view: "year", columns: 4 })} className={styles.table}>
                                <tbody {...api.getTableBodyProps({ view: "year" })}>
                                    {api.getYearsGrid({ columns: 4 }).map((years) => (
                                        <tr key={years[0].value} {...api.getTableRowProps({ view: "year" })}>
                                            {years.map((year) => (
                                                <td
                                                    key={year.value}
                                                    {...api.getYearTableCellProps({ ...year, columns: 4 })}
                                                >
                                                    <div
                                                        {...api.getYearTableCellTriggerProps({ ...year, columns: 4 })}
                                                        className={styles.cellTrigger}
                                                    >
                                                        {year.label}
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Portal>
        </div>
    );
});
