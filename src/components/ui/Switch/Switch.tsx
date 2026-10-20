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

import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";
import * as zagSwitch from "@zag-js/switch";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

export interface SwitchProps
    extends Omit<PReact.InputHTMLAttributes<HTMLInputElement>, keyof zagSwitch.Props | "type">,
        Partial<Omit<zagSwitch.Props, "id">> {
    id?: string;
    rootProps?: PReact.LabelHTMLAttributes<HTMLLabelElement>;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    { id, rootProps, className, children, ...props },
    ref
) {
    const [machineProps, rest] = zagSwitch.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const machineId = useId();
    const service = useMachine(zagSwitch.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, hiddenInput: id }
    });
    const api = zagSwitch.connect(service, normalizeProps);

    return (
        <label
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            <span {...api.getControlProps()} className={styles.control}>
                <span {...api.getThumbProps()} className={styles.thumb} />
            </span>
            {children != null && (
                <span {...api.getLabelProps()} className={styles.label}>
                    {children}
                </span>
            )}
            <input {...mergeProps(api.getHiddenInputProps(), { role: "switch" }, rest)} ref={ref} />
        </label>
    );
});
