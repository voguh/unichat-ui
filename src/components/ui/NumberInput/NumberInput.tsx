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

import * as numberInput from "@zag-js/number-input";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, keyof numberInput.Props | "type">;
export interface NumberInputProps extends VanillaProps, Partial<Omit<numberInput.Props, "id">> {
    id?: string;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(
    { id, rootProps, className, ...props },
    ref
) {
    const [machineProps, rest] = numberInput.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const machineId = useId();
    const service = useMachine(numberInput.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, input: id }
    });
    const api = numberInput.connect(service, normalizeProps);

    return (
        <div
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            <div {...api.getControlProps()} className={styles.control}>
                <input {...mergeProps(api.getInputProps(), rest)} ref={ref} className={styles.input} />
                <div className={styles.triggers}>
                    <button {...api.getIncrementTriggerProps()} className={styles.trigger}>
                        <i className="fas fa-chevron-up" aria-hidden="true" />
                    </button>
                    <button {...api.getDecrementTriggerProps()} className={styles.trigger}>
                        <i className="fas fa-chevron-down" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>
    );
});
