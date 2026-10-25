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

import { MenuButton as HeadlessMenuButton } from "@headlessui/react";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type ElementType = keyof PReact.JSX.IntrinsicElements | PReact.ComponentType<any>;

export type MenuButtonProps<T extends ElementType = "button"> = Omit<PReact.ComponentProps<T>, "as"> & {
    as?: T;
};

type MenuButtonComponent = <T extends ElementType = "button">(
    props: MenuButtonProps<T> & { ref?: PReact.Ref<HTMLElement> }
) => PReact.VNode | null;

export const MenuButton = forwardRef<HTMLElement, MenuButtonProps<ElementType>>(function MenuButton(
    { as = "button", className, ...rest },
    ref
) {
    return (
        <HeadlessMenuButton
            {...rest}
            as={as}
            ref={ref as PReact.Ref<HTMLButtonElement>}
            className={clsx(styles.root, className)}
        />
    );
}) as MenuButtonComponent;
