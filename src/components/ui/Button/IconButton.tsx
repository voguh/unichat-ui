/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { forwardRef } from "preact/compat";

import { Button, type ButtonProps } from "./Button";
import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface IconButtonProps extends ButtonProps {
    "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
    { className, ...rest },
    ref
) {
    return <Button {...rest} ref={ref} className={clsx(styles.icon, className)} />;
});
