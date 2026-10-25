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

import { Menu as HeadlessMenu } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface MenuProps extends VanillaProps {}

export const Menu = forwardRef<HTMLElement, MenuProps>(function Menu({ className, ...rest }, ref) {
    return (
        <HeadlessMenu
            {...rest}
            as="div"
            ref={ref}
            data-part={dataPart("Menu", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
