/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
/** biome-ignore-all lint/a11y/useAriaPropsForRole: a native checkbox exposes its checked state to the switch role; a manual aria-checked would break uncontrolled usage */

import type PReact from "preact";
import { forwardRef } from "preact/compat";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, "type">;
export interface SwitchProps extends VanillaProps {
    rootProps?: PReact.LabelHTMLAttributes<HTMLLabelElement>;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    { rootProps, className, children, ...rest },
    ref
) {
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    return (
        <label {...rootProps} className={clsx(styles.root, className, rootClassName)}>
            <input {...rest} ref={ref} type="checkbox" role="switch" className={styles.input} />
            <span className={styles.control}>
                <span className={styles.thumb} />
            </span>
            {children != null && <span className={styles.label}>{children}</span>}
        </label>
    );
});
