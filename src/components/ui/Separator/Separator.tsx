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

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

export interface SeparatorProps extends PReact.HTMLAttributes<HTMLHRElement> {}

export const Separator = forwardRef<HTMLHRElement, SeparatorProps>(function Separator({ className, ...rest }, ref) {
    return <hr {...rest} ref={ref} className={clsx(styles.root, className)} />;
});
