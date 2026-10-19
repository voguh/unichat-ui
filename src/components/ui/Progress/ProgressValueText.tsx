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

import { mergeProps } from "@zag-js/preact";

import { useProgress } from "./context";
import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface ProgressValueTextProps extends PReact.HTMLAttributes<HTMLSpanElement> {}

export const ProgressValueText = forwardRef<HTMLSpanElement, ProgressValueTextProps>(function ProgressValueText(
    { className, children, ...rest },
    ref
) {
    const api = useProgress();

    return (
        <span {...mergeProps(api.getValueTextProps(), rest)} ref={ref} className={clsx(styles.valueText, className)}>
            {children ?? api.valueAsString}
        </span>
    );
});
