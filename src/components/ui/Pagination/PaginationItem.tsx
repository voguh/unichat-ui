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

export interface PaginationItemProps extends Omit<PReact.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
    value: number;
}

export const PaginationItem = forwardRef<HTMLButtonElement, PaginationItemProps>(function PaginationItem(
    { value, className, ...rest },
    ref
) {
    const api = usePagination();

    return (
        <button
            {...mergeProps(api.getItemProps({ type: "page", value }), rest)}
            ref={ref}
            className={clsx(styles.item, className)}
        />
    );
});
