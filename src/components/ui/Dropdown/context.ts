/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { createContext } from "preact";
import { useContext } from "preact/hooks";

import type * as menu from "@zag-js/menu";
import type { PropTypes } from "@zag-js/preact";

export const DropdownContext = createContext<menu.Api<PropTypes> | null>(null);

export function useDropdown(): menu.Api<PropTypes> {
    const api = useContext(DropdownContext);
    if (api == null) {
        throw new Error("Dropdown parts must be rendered inside <Dropdown.Root>");
    }

    return api;
}
