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

import * as passwordInput from "@zag-js/password-input";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface PasswordInputProps
    extends Omit<PReact.InputHTMLAttributes<HTMLInputElement>, keyof passwordInput.Props | "type">,
        Partial<Omit<passwordInput.Props, "id">> {
    id?: string;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
    { id, rootProps, className, ...props },
    ref
) {
    const [machineProps, rest] = passwordInput.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const machineId = useId();
    const service = useMachine(passwordInput.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, input: id }
    });
    const api = passwordInput.connect(service, normalizeProps);

    return (
        <div
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            <div {...api.getControlProps()} className={styles.control}>
                <input {...mergeProps(api.getInputProps(), rest)} ref={ref} className={styles.input} />
                <button {...api.getVisibilityTriggerProps()} className={styles.visibilityTrigger}>
                    <span {...api.getIndicatorProps()}>
                        <i className={api.visible ? "fas fa-eye-slash" : "fas fa-eye"} aria-hidden="true" />
                    </span>
                </button>
            </div>
        </div>
    );
});
