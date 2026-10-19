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

import { usePagination } from "./context";
import { PaginationEllipsis } from "./PaginationEllipsis";
import { PaginationItem } from "./PaginationItem";

export function PaginationItems(): PReact.ComponentChildren {
    const api = usePagination();

    return api.pages.map((page, index) =>
        page.type === "page" ? (
            <PaginationItem key={page.value} value={page.value}>
                {page.value}
            </PaginationItem>
        ) : (
            // biome-ignore lint/suspicious/noArrayIndexKey: zag identifies ellipses by position
            <PaginationEllipsis key={`ellipsis-${index}`} index={index}>
                <span aria-hidden="true">&#8230;</span>
            </PaginationEllipsis>
        )
    );
}
