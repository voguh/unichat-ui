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

import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface TdProps extends PReact.TdHTMLAttributes<HTMLTableCellElement> {}

export const Td = forwardRef<HTMLTableCellElement, TdProps>(function Td({ className, ...rest }, ref) {
    return <td {...rest} ref={ref} className={clsx(styles.cell, className)} />;
});
