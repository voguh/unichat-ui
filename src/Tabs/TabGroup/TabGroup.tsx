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

import { TabGroup as HeadlessTabGroup, type TabGroupProps as HeadlessTabGroupProps } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;
export interface TabGroupProps
    extends VanillaProps,
        Pick<HeadlessTabGroupProps, "defaultIndex" | "selectedIndex" | "onChange" | "vertical" | "manual"> {}

export const TabGroup = forwardRef<HTMLElement, TabGroupProps>(function TabGroup({ className, ...rest }, ref) {
    return (
        <HeadlessTabGroup
            {...rest}
            ref={ref}
            data-part={dataPart("TabGroup", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
