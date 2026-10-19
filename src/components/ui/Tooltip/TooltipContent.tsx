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

import { useTooltip } from "./context";
import styles from "./styles.module.css";
import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

export interface TooltipContentProps extends PReact.HTMLAttributes<HTMLDivElement> {}

export const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(function TooltipContent(
    { className, ...rest },
    ref
) {
    const api = useTooltip();

    if (!api.open) {
        return null;
    }

    return (
        <Portal>
            <div {...api.getPositionerProps()} className={styles.positioner}>
                <div
                    {...mergeProps(api.getContentProps(), rest)}
                    ref={ref}
                    className={clsx(styles.content, className)}
                />
            </div>
        </Portal>
    );
});
