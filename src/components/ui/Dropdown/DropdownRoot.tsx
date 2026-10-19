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

import * as menu from "@zag-js/menu";
import { normalizeProps, useMachine } from "@zag-js/preact";

import { DropdownContext } from "./context";

export interface DropdownRootProps extends Partial<Omit<menu.Props, "id">> {
    id?: string;
    children: PReact.ComponentChildren;
}

export function DropdownRoot({ id, children, ...machineProps }: DropdownRootProps): PReact.ComponentChildren {
    const generatedId = useId();
    const service = useMachine(menu.machine, { ...machineProps, id: id ?? generatedId });
    const api = menu.connect(service, normalizeProps);

    return <DropdownContext.Provider value={api}>{children}</DropdownContext.Provider>;
}
