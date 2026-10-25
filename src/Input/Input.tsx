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
import { dataFlag, dataPart, omitDataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = React.InputHTMLAttributes<HTMLInputElement>;
export interface InputProps extends VanillaProps {
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
    rootProps?: React.HTMLAttributes<HTMLDivElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
    { startSlot, endSlot, rootProps = {}, type = "text", className, ...rest },
    ref
) {
    return (
        <div
            {...rootProps}
            data-part={dataPart("Input", rest)}
            data-disabled={dataFlag(rest.disabled)}
            className={clsx(styles.root, className, rootProps.className)}
        >
            {startSlot != null && <span data-slot="start">{startSlot}</span>}
            <input {...omitDataPart(rest)} ref={ref} type={type} />
            {endSlot != null && <span data-slot="end">{endSlot}</span>}
        </div>
    );
});
