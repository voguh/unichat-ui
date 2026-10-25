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
import { forwardRef, useLayoutEffect, useRef } from "react";

import { clsx } from "~/utils/clsx";
import { dataPart, omitDataPart } from "~/utils/dataAttributes";
import { mergeRefs } from "~/utils/mergeRefs";

import styles from "./styles.module.css";

type VanillaProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;
export interface CheckboxProps extends VanillaProps {
    indeterminate?: boolean;
    rootProps?: React.LabelHTMLAttributes<HTMLLabelElement>;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
    { indeterminate = false, rootProps = {}, className, children, ...rest },
    ref
) {
    const inputRef = useRef<HTMLInputElement>(null);

    useLayoutEffect(() => {
        inputRef.current!.indeterminate = indeterminate;
    }, [indeterminate]);

    return (
        <label
            {...rootProps}
            data-part={dataPart("Checkbox", rest)}
            className={clsx(styles.root, className, rootProps.className)}
        >
            <input {...omitDataPart(rest)} ref={mergeRefs(ref, inputRef)} type="checkbox" />
            <span data-slot="control">
                <i data-slot="check" className="fas fa-check" aria-hidden="true" />
                <i data-slot="indeterminate" className="fas fa-minus" aria-hidden="true" />
            </span>
            {children != null && <span data-slot="label">{children}</span>}
        </label>
    );
});
