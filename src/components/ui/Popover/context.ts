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

import type * as popover from "@zag-js/popover";
import type { PropTypes } from "@zag-js/preact";

export type PopoverOpenOn = "click" | "focus";

export const PopoverContext = createContext<popover.Api<PropTypes> | null>(null);
export const PopoverOpenOnContext = createContext<PopoverOpenOn>("click");

export function usePopover(): popover.Api<PropTypes> {
    const api = useContext(PopoverContext);
    if (api == null) {
        throw new Error("Popover parts must be rendered inside <Popover.Root>");
    }

    return api;
}
