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

import { MenuSeparator as HeadlessMenuSeparator } from "@headlessui/react";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = PReact.HTMLAttributes<HTMLHRElement>;
export interface MenuSeparatorProps extends VanillaProps {}

export const MenuSeparator = forwardRef<HTMLElement, MenuSeparatorProps>(function MenuSeparator(
    { className, ...rest },
    ref
) {
    return <HeadlessMenuSeparator {...rest} as="hr" ref={ref} className={clsx(styles.root, className)} />;
});
