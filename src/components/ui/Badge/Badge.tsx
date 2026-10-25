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
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

export type BadgeVariant = "primary" | "secondary" | "success" | "danger" | "warning" | "info";

type VanillaProps = PReact.HTMLAttributes<HTMLSpanElement>;
export interface BadgeProps extends VanillaProps {
    variant?: BadgeVariant;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
    { variant = "secondary", className, ...rest },
    ref
) {
    return (
        <span
            {...rest}
            ref={ref}
            data-part={dataPart("Badge", rest)}
            data-variant={variant}
            className={clsx(styles.root, className)}
        />
    );
});
