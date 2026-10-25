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

import { Tab as HeadlessTab } from "@headlessui/react";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "autoFocus" | "type">;
export interface TabProps extends VanillaProps {
    disabled?: boolean;
    autoFocus?: boolean;
    type?: "button" | "submit" | "reset";
}

export const Tab = forwardRef<HTMLElement, TabProps>(function Tab({ className, ...rest }, ref) {
    return <HeadlessTab {...rest} ref={ref} className={clsx(styles.root, className)} />;
});
