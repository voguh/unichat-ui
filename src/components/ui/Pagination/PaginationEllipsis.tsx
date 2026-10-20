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
import { forwardRef } from "preact/compat";

import { mergeProps } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import { usePagination } from "./context";
import styles from "./styles.module.css";

export interface PaginationEllipsisProps extends Omit<PReact.HTMLAttributes<HTMLSpanElement>, "index"> {
    index: number;
}

export const PaginationEllipsis = forwardRef<HTMLSpanElement, PaginationEllipsisProps>(function PaginationEllipsis(
    { index, className, ...rest },
    ref
) {
    const api = usePagination();

    return (
        <span
            {...mergeProps(api.getEllipsisProps({ index }), rest)}
            ref={ref}
            className={clsx(styles.ellipsis, className)}
        />
    );
});
