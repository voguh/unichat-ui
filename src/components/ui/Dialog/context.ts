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

import type * as dialog from "@zag-js/dialog";
import type { PropTypes } from "@zag-js/preact";

export const DialogContext = createContext<dialog.Api<PropTypes> | null>(null);

export function useDialog(): dialog.Api<PropTypes> {
    const api = useContext(DialogContext);
    if (api == null) {
        throw new Error("Dialog parts must be rendered inside <Dialog.Root>");
    }

    return api;
}
