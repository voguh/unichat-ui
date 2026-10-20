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

import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

import { useDialog } from "./context";
import styles from "./styles.module.css";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

export interface DialogContentProps extends PReact.HTMLAttributes<HTMLDivElement> {
    size?: DialogSize;
    backdrop?: boolean;
    portal?: boolean;
}

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
    { size = "md", backdrop = true, portal = true, className, ...rest },
    ref
) {
    const api = useDialog();

    if (!api.open) {
        return null;
    }

    return (
        <Portal disabled={!portal}>
            {backdrop && <div {...api.getBackdropProps()} className={styles.backdrop} />}
            <div {...api.getPositionerProps()} className={styles.positioner}>
                <div
                    {...mergeProps(api.getContentProps(), rest)}
                    ref={ref}
                    data-size={size}
                    className={clsx(styles.content, className)}
                />
            </div>
        </Portal>
    );
});
