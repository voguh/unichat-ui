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

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

export interface InputProps extends PReact.InputHTMLAttributes<HTMLInputElement> {
    startSlot?: PReact.ComponentChildren;
    endSlot?: PReact.ComponentChildren;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { startSlot, endSlot, rootProps, type = "text", className, ...rest },
    ref
) {
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    return (
        <div
            {...rootProps}
            data-disabled={rest.disabled || undefined}
            className={clsx(styles.root, className, rootClassName)}
        >
            {startSlot != null && <span className={styles.slot}>{startSlot}</span>}
            <input {...rest} ref={ref} type={type} className={styles.input} />
            {endSlot != null && <span className={styles.slot}>{endSlot}</span>}
        </div>
    );
});
