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
import { forwardRef, useState } from "react";

import { clsx } from "~/utils/clsx";
import { dataPart, omitDataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
export interface PasswordInputProps extends VanillaProps {
    rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
    { rootProps = {}, className, ...rest },
    ref
) {
    const [visible, setVisible] = useState(false);

    function getType(): string {
        if (visible) {
            return "text";
        }

        return "password";
    }

    function getToggleLabel(): string {
        if (visible) {
            return "Hide password";
        }

        return "Show password";
    }

    function getToggleIcon(): string {
        if (visible) {
            return "fas fa-eye-slash";
        }

        return "fas fa-eye";
    }

    return (
        <div
            {...rootProps}
            data-part={dataPart("PasswordInput", rest)}
            className={clsx(styles.root, className, rootProps.className)}
        >
            <input {...omitDataPart(rest)} ref={ref} type={getType()} data-part="Input" />
            <button
                type="button"
                data-slot="trigger"
                aria-label={getToggleLabel()}
                disabled={rest.disabled}
                onClick={() => setVisible(!visible)}
            >
                <i className={getToggleIcon()} aria-hidden="true" />
            </button>
        </div>
    );
});
