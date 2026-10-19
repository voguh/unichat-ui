/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { TabsContent } from "./TabsContent";
import { TabsIndicator } from "./TabsIndicator";
import { TabsList } from "./TabsList";
import { TabsRoot } from "./TabsRoot";
import { TabsTrigger } from "./TabsTrigger";

export * from "./TabsContent";
export * from "./TabsIndicator";
export * from "./TabsList";
export * from "./TabsRoot";
export * from "./TabsTrigger";

export const Tabs = {
    Root: TabsRoot,
    List: TabsList,
    Trigger: TabsTrigger,
    Content: TabsContent,
    Indicator: TabsIndicator
};
