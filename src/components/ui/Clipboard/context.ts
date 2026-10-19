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

import type * as clipboard from "@zag-js/clipboard";
import type { PropTypes } from "@zag-js/preact";

export const ClipboardContext = createContext<clipboard.Api<PropTypes> | null>(null);

export function useClipboard(): clipboard.Api<PropTypes> {
    const api = useContext(ClipboardContext);
    if (api == null) {
        throw new Error("Clipboard parts must be rendered inside <Clipboard.Root>");
    }

    return api;
}
