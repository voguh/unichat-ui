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

import * as checkbox from "@zag-js/checkbox";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface CheckboxProps
    extends Omit<PReact.InputHTMLAttributes<HTMLInputElement>, keyof checkbox.Props | "type">,
        Partial<Omit<checkbox.Props, "id">> {
    id?: string;
    rootProps?: PReact.LabelHTMLAttributes<HTMLLabelElement>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { id, rootProps, className, children, ...props },
    ref
) {
    const [machineProps, rest] = checkbox.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const machineId = useId();
    const service = useMachine(checkbox.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, hiddenInput: id }
    });
    const api = checkbox.connect(service, normalizeProps);

    return (
        <label
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            <div {...api.getControlProps()} className={styles.control}>
                <div {...api.getIndicatorProps()} className={styles.indicator}>
                    <i className={api.indeterminate ? "fas fa-minus" : "fas fa-check"} aria-hidden="true" />
                </div>
            </div>
            {children != null && (
                <span {...api.getLabelProps()} className={styles.label}>
                    {children}
                </span>
            )}
            <input {...mergeProps(api.getHiddenInputProps(), rest)} ref={ref} />
        </label>
    );
});
