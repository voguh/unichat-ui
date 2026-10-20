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

import * as popover from "@zag-js/popover";
import { normalizeProps, useMachine } from "@zag-js/preact";

import { PopoverContext, type PopoverOpenOn, PopoverOpenOnContext } from "./context";

export type { PopoverOpenOn } from "./context";

export interface PopoverRootProps extends Partial<Omit<popover.Props, "id">> {
    id?: string;
    openOn?: PopoverOpenOn;
    children: PReact.ComponentChildren;
}

export function PopoverRoot({
    id,
    openOn = "click",
    children,
    ...machineProps
}: PopoverRootProps): PReact.ComponentChildren {
    const generatedId = useId();
    const service = useMachine(popover.machine, {
        ...(openOn === "focus" && { autoFocus: false, closeOnInteractOutside: false }),
        ...machineProps,
        id: id ?? generatedId
    });
    const api = popover.connect(service, normalizeProps);

    return (
        <PopoverContext.Provider value={api}>
            <PopoverOpenOnContext.Provider value={openOn}>{children}</PopoverOpenOnContext.Provider>
        </PopoverContext.Provider>
    );
}
