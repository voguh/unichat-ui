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

import { TabPanel as HeadlessTabPanel, type TabPanelProps as HeadlessTabPanelProps } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "id" | "tabIndex">;
export interface TabPanelProps extends VanillaProps, Pick<HeadlessTabPanelProps, "unmount" | "static"> {
    id?: string;
    tabIndex?: number;
}

export const TabPanel = forwardRef<HTMLElement, TabPanelProps>(function TabPanel({ className, ...rest }, ref) {
    return (
        <HeadlessTabPanel
            {...rest}
            ref={ref}
            data-part={dataPart("TabPanel", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
