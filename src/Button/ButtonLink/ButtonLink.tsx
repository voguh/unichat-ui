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

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import type { ButtonSize, ButtonVariant } from "../Button";
import buttonStyles from "../styles.module.css";

type VanillaProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;
export interface ButtonLinkProps extends VanillaProps {
    variant?: ButtonVariant;
    size?: ButtonSize;
}

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
    { variant = "default", size = "md", className, ...rest },
    ref
) {
    return (
        <a
            {...rest}
            ref={ref}
            data-part={dataPart("ButtonLink", rest)}
            data-variant={variant}
            data-size={size}
            className={clsx(buttonStyles.root, className)}
        />
    );
});
