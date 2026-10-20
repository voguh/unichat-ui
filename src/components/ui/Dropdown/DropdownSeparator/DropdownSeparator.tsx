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

import { mergeProps } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import { useDropdown } from "../context";
import styles from "./styles.module.css";

type VanillaProps = PReact.HTMLAttributes<HTMLHRElement>;
export interface DropdownSeparatorProps extends VanillaProps {}

export const DropdownSeparator = forwardRef<HTMLHRElement, DropdownSeparatorProps>(function DropdownSeparator(
    { className, ...rest },
    ref
) {
    const api = useDropdown();

    return <hr {...mergeProps(api.getSeparatorProps(), rest)} ref={ref} className={clsx(styles.root, className)} />;
});
