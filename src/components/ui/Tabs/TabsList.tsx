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

import { useTabs } from "./context";
import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface TabsListProps extends PReact.HTMLAttributes<HTMLDivElement> {}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList({ className, ...rest }, ref) {
    const api = useTabs();

    return <div {...mergeProps(api.getListProps(), rest)} ref={ref} className={clsx(styles.list, className)} />;
});
