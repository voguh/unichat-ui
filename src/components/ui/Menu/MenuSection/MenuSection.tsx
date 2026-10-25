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

import { MenuSection as HeadlessMenuSection } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface MenuSectionProps extends VanillaProps {}

export const MenuSection = forwardRef<HTMLElement, MenuSectionProps>(function MenuSection({ className, ...rest }, ref) {
    return (
        <HeadlessMenuSection
            {...rest}
            ref={ref}
            data-part={dataPart("MenuSection", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
