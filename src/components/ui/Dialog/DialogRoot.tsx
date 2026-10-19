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

import * as dialog from "@zag-js/dialog";
import { normalizeProps, useMachine } from "@zag-js/preact";

import { DialogContext } from "./context";

export interface DialogRootProps extends Partial<Omit<dialog.Props, "id">> {
    id?: string;
    children: PReact.ComponentChildren;
}

export function DialogRoot({ id, children, ...machineProps }: DialogRootProps): PReact.ComponentChildren {
    const generatedId = useId();
    const service = useMachine(dialog.machine, { ...machineProps, id: id ?? generatedId });
    const api = dialog.connect(service, normalizeProps);

    return <DialogContext.Provider value={api}>{children}</DialogContext.Provider>;
}
