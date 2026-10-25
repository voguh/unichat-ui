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

import type * as React from "react";
import { forwardRef } from "react";

import { clsx } from "~/utils/clsx";
import { dataPart, omitDataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
export interface SwitchProps extends VanillaProps {
    rootProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(function Switch(
    { rootProps = {}, className, children, ...rest },
    ref
) {
    return (
        <label
            {...rootProps}
            data-part={dataPart("Switch", rest)}
            className={clsx(styles.root, className, rootProps.className)}
        >
            <input {...omitDataPart(rest)} ref={ref} type="checkbox" role="switch" />
            <span data-slot="control">
                <span data-slot="thumb" />
            </span>
            {children != null && <span data-slot="label">{children}</span>}
        </label>
    );
});
