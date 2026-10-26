/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type * as React from "react";
import { forwardRef, useId } from "react";

import { clsx } from "~/utils/clsx";
import { dataFlag, dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<React.HTMLAttributes<HTMLDivElement>, "label">;
export interface ProgressProps extends VanillaProps {
    value: number | null;
    max?: number;
    label?: React.ReactNode;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
    { value, max = 100, label, className, ...rest },
    ref
) {
    const percent = value != null ? Math.round((value / max) * 100) : null;

    const labelId = useId();

    return (
        <div {...rest} ref={ref} data-part={dataPart("Progress", rest)} className={clsx(styles.root, className)}>
            {(label != null || percent != null) && (
                <div data-slot="header">
                    {label != null && (
                        <span id={labelId} data-slot="label">
                            {label}
                        </span>
                    )}
                    {percent != null && <span data-slot="value">{percent}%</span>}
                </div>
            )}
            <div
                role="progressbar"
                aria-labelledby={label != null ? labelId : undefined}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={value ?? undefined}
                data-slot="track"
            >
                <div
                    data-slot="range"
                    data-indeterminate={dataFlag(percent == null)}
                    style={percent != null ? { width: `${percent}%` } : undefined}
                />
            </div>
        </div>
    );
});
