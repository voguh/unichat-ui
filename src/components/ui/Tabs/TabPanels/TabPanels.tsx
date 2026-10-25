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

import { TabPanels as HeadlessTabPanels } from "@headlessui/react";

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface TabPanelsProps extends VanillaProps {}

export const TabPanels = forwardRef<HTMLElement, TabPanelsProps>(function TabPanels(props, ref) {
    return <HeadlessTabPanels {...props} ref={ref} />;
});
