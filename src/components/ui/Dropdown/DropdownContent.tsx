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

import { useDropdown } from "./context";
import styles from "./styles.module.css";
import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

export interface DropdownContentProps extends PReact.HTMLAttributes<HTMLDivElement> {}

export const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(function DropdownContent(
    { className, ...rest },
    ref
) {
    const api = useDropdown();

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
