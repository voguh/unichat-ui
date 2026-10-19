/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { PaginationEllipsis } from "./PaginationEllipsis";
import { PaginationFirstTrigger } from "./PaginationFirstTrigger";
import { PaginationItem } from "./PaginationItem";
import { PaginationItems } from "./PaginationItems";
import { PaginationLastTrigger } from "./PaginationLastTrigger";
import { PaginationNextTrigger } from "./PaginationNextTrigger";
import { PaginationPrevTrigger } from "./PaginationPrevTrigger";
import { PaginationRoot } from "./PaginationRoot";

export * from "./PaginationEllipsis";
export * from "./PaginationFirstTrigger";
export * from "./PaginationItem";
export * from "./PaginationItems";
export * from "./PaginationLastTrigger";
export * from "./PaginationNextTrigger";
export * from "./PaginationPrevTrigger";
export * from "./PaginationRoot";

export const Pagination = {
    Root: PaginationRoot,
    PrevTrigger: PaginationPrevTrigger,
    NextTrigger: PaginationNextTrigger,
    FirstTrigger: PaginationFirstTrigger,
    LastTrigger: PaginationLastTrigger,
    Item: PaginationItem,
    Ellipsis: PaginationEllipsis,
    Items: PaginationItems
};
