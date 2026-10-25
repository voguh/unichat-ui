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

import { CloseButton } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "autoFocus" | "type">;
export interface DialogCloseButtonProps extends VanillaProps {
    disabled?: boolean;
    autoFocus?: boolean;
    type?: "button" | "submit" | "reset";
}

export const DialogCloseButton = forwardRef<HTMLElement, DialogCloseButtonProps>(function DialogCloseButton(
    { "aria-label": ariaLabel = "Close", className, children, ...rest },
    ref
) {
    return (
        <CloseButton
            {...rest}
            ref={ref}
            aria-label={ariaLabel}
            data-part={dataPart("DialogCloseButton", rest)}
            className={clsx(styles.root, className)}
        >
            {children ?? <i className="fas fa-times" aria-hidden="true" />}
        </CloseButton>
    );
});
