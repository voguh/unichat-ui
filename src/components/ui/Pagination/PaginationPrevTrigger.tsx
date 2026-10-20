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

export interface PaginationPrevTriggerProps extends PReact.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PaginationPrevTrigger = forwardRef<HTMLButtonElement, PaginationPrevTriggerProps>(
    function PaginationPrevTrigger({ className, ...rest }, ref) {
        const api = usePagination();

        return (
            <button
                {...mergeProps(api.getPrevTriggerProps(), rest)}
                ref={ref}
                className={clsx(styles.trigger, className)}
            />
        );
    }
);
