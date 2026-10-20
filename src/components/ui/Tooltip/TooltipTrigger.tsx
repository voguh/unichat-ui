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

import { cloneAsChild } from "~/utils/asChild";
import { clsx } from "~/utils/clsx";

import { useTooltip } from "./context";
import styles from "./styles.module.css";

export interface TooltipTriggerProps extends PReact.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
}

export const TooltipTrigger = forwardRef<HTMLButtonElement, TooltipTriggerProps>(function TooltipTrigger(
    { asChild = false, className, children, ...rest },
    ref
) {
    const api = useTooltip();

    if (asChild) {
        return cloneAsChild(children, mergeProps(api.getTriggerProps(), { ...rest, className }), ref);
    }

    return (
        <button {...mergeProps(api.getTriggerProps(), rest)} ref={ref} className={clsx(styles.trigger, className)}>
            {children}
        </button>
    );
});
