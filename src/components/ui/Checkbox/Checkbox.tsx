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
import { useLayoutEffect, useRef } from "preact/hooks";

import { clsx } from "~/utils/clsx";
import { mergeRefs } from "~/utils/mergeRefs";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, "type">;
export interface CheckboxProps extends VanillaProps {
    indeterminate?: boolean;
    rootProps?: PReact.LabelHTMLAttributes<HTMLLabelElement>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { indeterminate = false, rootProps, className, children, ...rest },
    ref
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    useLayoutEffect(() => {
        inputRef.current!.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
        <label {...rootProps} className={clsx(styles.root, className, rootClassName)}>
            <input {...rest} ref={mergeRefs(ref, inputRef)} type="checkbox" className={styles.input} />
            <span className={styles.control}>
                <i className={clsx(styles.checkIcon, "fas fa-check")} aria-hidden="true" />
                <i className={clsx(styles.indeterminateIcon, "fas fa-minus")} aria-hidden="true" />
            </span>
            {children != null && <span className={styles.label}>{children}</span>}
        </label>
    );
});
