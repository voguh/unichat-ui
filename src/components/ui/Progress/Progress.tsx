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

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "label">;
export interface ProgressProps extends VanillaProps {
    value: number | null;
    max?: number;
    label?: PReact.ComponentChildren;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
    { value, max = 100, label, className, ...rest },
    ref
) {
    const labelId = useId();
    const percent = value != null ? Math.round((value / max) * 100) : null;

    return (
        <div {...rest} ref={ref} className={clsx(styles.root, className)}>
            {(label != null || percent != null) && (
                <div className={styles.header}>
                    {label != null && (
                        <span id={labelId} className={styles.label}>
                            {label}
                        </span>
                    )}
                    {percent != null && <span className={styles.valueText}>{percent}%</span>}
                </div>
            )}
            <div
                role="progressbar"
                aria-labelledby={label != null ? labelId : undefined}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={value ?? undefined}
                className={styles.track}
            >
                <div
                    style={percent != null ? { width: `${percent}%` } : undefined}
                    className={clsx(styles.range, { [styles.indeterminate]: percent == null })}
                />
            </div>
        </div>
    );
});
