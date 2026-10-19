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

import { useDropdown } from "./context";
import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface DropdownItemProps
    extends Omit<PReact.HTMLAttributes<HTMLDivElement>, "value" | "disabled" | "valueText" | "closeOnSelect"> {
    value: string;
    disabled?: boolean;
    valueText?: string;
    closeOnSelect?: boolean;
}

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(function DropdownItem(
    { value, disabled, valueText, closeOnSelect, className, ...rest },
    ref
) {
    const api = useDropdown();

    return (
        <div
            {...mergeProps(api.getItemProps({ value, disabled, valueText, closeOnSelect }), rest)}
            ref={ref}
            className={clsx(styles.item, className)}
        />
    );
});
