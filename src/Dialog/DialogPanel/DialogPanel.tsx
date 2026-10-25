/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type * as React from "react";
import { forwardRef } from "react";

import { DialogPanel as HeadlessDialogPanel } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

export type DialogPanelSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

type VanillaProps = Omit<React.HTMLAttributes<HTMLDivElement>, "size">;
export interface DialogPanelProps extends VanillaProps {
    size?: DialogPanelSize;
}

export const DialogPanel = forwardRef<HTMLElement, DialogPanelProps>(function DialogPanel(
    { size = "md", className, ...rest },
    ref
) {
    return (
        <HeadlessDialogPanel
            {...rest}
            ref={ref}
            data-part={dataPart("DialogPanel", rest)}
            data-size={size}
            className={clsx(styles.root, className)}
        />
    );
});
