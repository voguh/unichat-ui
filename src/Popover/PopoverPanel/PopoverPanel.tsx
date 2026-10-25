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

import {
    PopoverPanel as HeadlessPopoverPanel,
    type PopoverPanelProps as HeadlessPopoverPanelProps
} from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = React.HTMLAttributes<HTMLDivElement>;
export interface PopoverPanelProps
    extends VanillaProps,
        Pick<HeadlessPopoverPanelProps, "anchor" | "portal" | "modal"> {}

export const PopoverPanel = forwardRef<HTMLElement, PopoverPanelProps>(function PopoverPanel(
    { anchor = "bottom", className, ...rest },
    ref
) {
    return (
        <HeadlessPopoverPanel
            {...rest}
            ref={ref}
            anchor={anchor}
            data-part={dataPart("PopoverPanel", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
