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
import { useState } from "preact/hooks";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, "type">;
export interface PasswordInputProps extends VanillaProps {
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
    { rootProps, className, ...rest },
    ref
) {
    const [visible, setVisible] = useState(false);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    return (
        <div {...rootProps} className={clsx(styles.root, className, rootClassName)}>
            <input {...rest} ref={ref} type={visible ? "text" : "password"} className={styles.input} />
            <button
                type="button"
                aria-label={visible ? "Hide password" : "Show password"}
                disabled={rest.disabled}
                onClick={() => setVisible(!visible)}
                className={styles.visibilityTrigger}
            >
                <i className={visible ? "fas fa-eye-slash" : "fas fa-eye"} aria-hidden="true" />
            </button>
        </div>
    );
});
