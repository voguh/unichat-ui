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

import type { PropTypes } from "@zag-js/preact";
import type * as tooltip from "@zag-js/tooltip";

export const TooltipContext = createContext<tooltip.Api<PropTypes> | null>(null);

export function useTooltip(): tooltip.Api<PropTypes> {
    const api = useContext(TooltipContext);
    if (api == null) {
        throw new Error("Tooltip parts must be rendered inside <Tooltip.Root>");
    }

    return api;
}
