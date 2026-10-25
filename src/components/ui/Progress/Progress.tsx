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
import { dataFlag, dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "label">;
export interface ProgressProps extends VanillaProps {
    value: number | null;
    max?: number;
    label?: PReact.ComponentChildren;
}

function toPercent(value: number | null, max: number): number | null {
    if (value != null) {
        return Math.round((value / max) * 100);
    }

    return null;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
    { value, max = 100, label, className, ...rest },
    ref
) {
    const percent = toPercent(value, max);

    const labelId = useId();

    function getLabelledBy(): string | undefined {
        if (label != null) {
            return labelId;
        }

        return undefined;
    }

    function getRangeStyle(): PReact.CSSProperties | undefined {
        if (percent != null) {
            return { width: `${percent}%` };
        }

        return undefined;
    }

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
                aria-labelledby={getLabelledBy()}
                aria-valuemin={0}
                aria-valuemax={max}
                aria-valuenow={value ?? undefined}
                data-slot="track"
            >
                <div data-slot="range" data-indeterminate={dataFlag(percent == null)} style={getRangeStyle()} />
            </div>
        </div>
    );
});
