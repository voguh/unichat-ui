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

import type { ButtonSize, ButtonVariant } from "./Button";
import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface ButtonLinkProps extends PReact.AnchorHTMLAttributes<HTMLAnchorElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
    { variant = "primary", size = "md", className, ...rest },
    ref
) {
    return <a {...rest} ref={ref} data-variant={variant} data-size={size} className={clsx(styles.root, className)} />;
});
