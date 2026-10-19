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
import { useId } from "preact/hooks";

import { normalizeProps, useMachine } from "@zag-js/preact";
import * as tooltip from "@zag-js/tooltip";

import { TooltipContext } from "./context";

export interface TooltipRootProps extends Partial<Omit<tooltip.Props, "id">> {
    id?: string;
    children: PReact.ComponentChildren;
}

export function TooltipRoot({ id, children, ...machineProps }: TooltipRootProps): PReact.ComponentChildren {
    const generatedId = useId();
    const service = useMachine(tooltip.machine, { ...machineProps, id: id ?? generatedId });
    const api = tooltip.connect(service, normalizeProps);

    return <TooltipContext.Provider value={api}>{children}</TooltipContext.Provider>;
}
