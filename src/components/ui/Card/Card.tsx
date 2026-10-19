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

export interface CardProps extends PReact.HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card({ className, ...rest }, ref) {
    return <div {...rest} ref={ref} className={clsx(styles.root, className)} />;
});
