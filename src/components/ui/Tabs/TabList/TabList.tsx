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

import { TabList as HeadlessTabList } from "@headlessui/react";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

export type TabListVariant = "default" | "segmented";

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface TabListProps extends VanillaProps {
    variant?: TabListVariant;
}

export const TabList = forwardRef<HTMLElement, TabListProps>(function TabList(
    { variant = "default", className, ...rest },
    ref
) {
    return <HeadlessTabList {...rest} ref={ref} data-variant={variant} className={clsx(styles.root, className)} />;
});
