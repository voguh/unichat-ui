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

import type * as menu from "@zag-js/menu";
import { mergeProps } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import { useDropdown } from "../context";
import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, keyof menu.OptionItemProps>;
export interface DropdownOptionItemProps extends VanillaProps {
    type: menu.OptionItemProps["type"];
    value: string;
    checked: boolean;
    onCheckedChange?: menu.OptionItemProps["onCheckedChange"];
    disabled?: boolean;
    valueText?: string;
    closeOnSelect?: boolean;
}

export const DropdownOptionItem = forwardRef<HTMLDivElement, DropdownOptionItemProps>(function DropdownOptionItem(
    { type, value, checked, onCheckedChange, disabled, valueText, closeOnSelect, className, children, ...rest },
    ref
) {
    const option = { type, value, checked, onCheckedChange, disabled, valueText, closeOnSelect };

    const api = useDropdown();

    return (
        <div {...mergeProps(api.getOptionItemProps(option), rest)} ref={ref} className={clsx(styles.root, className)}>
            <span {...api.getItemTextProps(option)}>{children}</span>
            <span {...api.getItemIndicatorProps(option)} className={styles.indicator}>
                <i className="fas fa-check" />
            </span>
        </div>
    );
});
