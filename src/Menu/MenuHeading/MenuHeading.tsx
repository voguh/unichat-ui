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

import { MenuHeading as HeadlessMenuHeading } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = React.HTMLAttributes<HTMLElement>;
export interface MenuHeadingProps extends VanillaProps {}

export const MenuHeading = forwardRef<HTMLElement, MenuHeadingProps>(function MenuHeading({ className, ...rest }, ref) {
    return (
        <HeadlessMenuHeading
            {...rest}
            ref={ref}
            data-part={dataPart("MenuHeading", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
