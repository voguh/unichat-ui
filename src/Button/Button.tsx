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

export type ButtonVariant = "default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info";
export type ButtonSize = "sm" | "md" | "lg";

type VanillaProps = React.ButtonHTMLAttributes<HTMLButtonElement>;
export interface ButtonProps extends VanillaProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
    { variant = "default", size = "md", loading = false, disabled, type = "button", className, children, ...rest },
    ref
) {
    return (
        <button
            {...rest}
            ref={ref}
            type={type}
            disabled={disabled || loading}
            aria-busy={loading || undefined}
            data-part={dataPart("Button", rest)}
            data-variant={variant}
            data-size={size}
            className={clsx(styles.root, className)}
        >
            {loading && <i data-slot="spinner" className="fas fa-spinner fa-spin" aria-hidden="true" />}
            {children}
        </button>
    );
});
