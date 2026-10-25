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

import { MenuItems as HeadlessMenuItems, type MenuItemsProps as HeadlessMenuItemsProps } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = React.HTMLAttributes<HTMLDivElement>;
export interface MenuItemsProps extends VanillaProps, Pick<HeadlessMenuItemsProps, "anchor" | "portal" | "modal"> {}

export const MenuItems = forwardRef<HTMLElement, MenuItemsProps>(function MenuItems(
    { anchor = "bottom start", className, ...rest },
    ref
) {
    return (
        <HeadlessMenuItems
            {...rest}
            ref={ref}
            anchor={anchor}
            data-part={dataPart("MenuItems", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
