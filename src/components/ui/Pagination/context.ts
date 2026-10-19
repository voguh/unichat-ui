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

import type * as pagination from "@zag-js/pagination";
import type { PropTypes } from "@zag-js/preact";

export const PaginationContext = createContext<pagination.Api<PropTypes> | null>(null);

export function usePagination(): pagination.Api<PropTypes> {
    const api = useContext(PaginationContext);
    if (api == null) {
        throw new Error("Pagination parts must be rendered inside <Pagination.Root>");
    }

    return api;
}
