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

import { MenuItem as HeadlessMenuItem } from "@headlessui/react";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.ButtonHTMLAttributes<HTMLButtonElement>, "disabled">;
export interface MenuItemProps extends VanillaProps {
    disabled?: boolean;
}

export const MenuItem = forwardRef<HTMLElement, MenuItemProps>(function MenuItem(
    { type = "button", className, ...rest },
    ref
) {
    return <HeadlessMenuItem {...rest} as="button" ref={ref} type={type} className={clsx(styles.root, className)} />;
});
