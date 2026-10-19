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

import { usePagination } from "./context";
import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface PaginationLastTriggerProps extends PReact.ButtonHTMLAttributes<HTMLButtonElement> {}

export const PaginationLastTrigger = forwardRef<HTMLButtonElement, PaginationLastTriggerProps>(
    function PaginationLastTrigger({ className, ...rest }, ref) {
        const api = usePagination();

        return (
            <button
                {...mergeProps(api.getLastTriggerProps(), rest)}
                ref={ref}
                className={clsx(styles.trigger, className)}
            />
        );
    }
);
