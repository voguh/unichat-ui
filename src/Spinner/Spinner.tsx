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
import { forwardRef } from "react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

export type SpinnerSize = "sm" | "md" | "lg";

type VanillaProps = React.HTMLAttributes<HTMLSpanElement>;
export interface SpinnerProps extends VanillaProps {
    size?: SpinnerSize;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
    { size = "md", className, ...rest },
    ref
) {
    return (
        <span
            {...rest}
            ref={ref}
            role="status"
            data-part={dataPart("Spinner", rest)}
            data-size={size}
            className={clsx(styles.root, className)}
        >
            <i className="fas fa-spinner fa-spin" aria-hidden="true" />
        </span>
    );
});
