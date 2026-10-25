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

import { MenuItems as HeadlessMenuItems, type MenuItemsProps as HeadlessMenuItemsProps } from "@headlessui/react";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface MenuItemsProps extends VanillaProps, Pick<HeadlessMenuItemsProps, "anchor" | "portal" | "modal"> {}

export const MenuItems = forwardRef<HTMLElement, MenuItemsProps>(function MenuItems(
    { anchor = "bottom start", className, ...rest },
    ref
) {
    return <HeadlessMenuItems {...rest} ref={ref} anchor={anchor} className={clsx(styles.root, className)} />;
});
