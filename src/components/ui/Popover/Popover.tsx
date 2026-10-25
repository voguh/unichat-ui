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

import { Popover as HeadlessPopover } from "@headlessui/react";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface PopoverProps extends VanillaProps {}

export const Popover = forwardRef<HTMLElement, PopoverProps>(function Popover({ className, ...rest }, ref) {
    return <HeadlessPopover {...rest} as="div" ref={ref} className={clsx(styles.root, className)} />;
});
