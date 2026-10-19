/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { DropdownContent } from "./DropdownContent";
import { DropdownItem } from "./DropdownItem";
import { DropdownItemGroup } from "./DropdownItemGroup";
import { DropdownItemGroupLabel } from "./DropdownItemGroupLabel";
import { DropdownOptionItem } from "./DropdownOptionItem";
import { DropdownRoot } from "./DropdownRoot";
import { DropdownSeparator } from "./DropdownSeparator";
import { DropdownTrigger } from "./DropdownTrigger";

export * from "./DropdownContent";
export * from "./DropdownItem";
export * from "./DropdownItemGroup";
export * from "./DropdownItemGroupLabel";
export * from "./DropdownOptionItem";
export * from "./DropdownRoot";
export * from "./DropdownSeparator";
export * from "./DropdownTrigger";

export const Dropdown = {
    Root: DropdownRoot,
    Trigger: DropdownTrigger,
    Content: DropdownContent,
    Item: DropdownItem,
    ItemGroup: DropdownItemGroup,
    ItemGroupLabel: DropdownItemGroupLabel,
    OptionItem: DropdownOptionItem,
    Separator: DropdownSeparator
};
