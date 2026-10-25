/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

/** biome-ignore-all lint/suspicious/noExplicitAny: `as` accepts any component, whatever its props */

import type PReact from "preact";
import { forwardRef } from "preact/compat";

import { PopoverButton as HeadlessPopoverButton } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type ElementType = keyof PReact.JSX.IntrinsicElements | PReact.ComponentType<any>;

export type PopoverButtonProps<T extends ElementType = "button"> = Omit<PReact.ComponentProps<T>, "as"> & {
    as?: T;
};

export const PopoverButton = forwardRef<HTMLElement, PopoverButtonProps<ElementType>>(function PopoverButton(
    { as = "button", className, ...rest },
    ref
) {
    return (
        <HeadlessPopoverButton
            {...rest}
            as={as}
            ref={ref as PReact.Ref<HTMLButtonElement>}
            data-part={dataPart("PopoverButton", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
