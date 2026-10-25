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

import { DisclosureButton as HeadlessDisclosureButton } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "disabled" | "autoFocus" | "type">;
export interface DisclosureButtonProps extends VanillaProps {
    disabled?: boolean;
    autoFocus?: boolean;
    type?: "button" | "submit" | "reset";
}

export const DisclosureButton = forwardRef<HTMLButtonElement, DisclosureButtonProps>(function DisclosureButton(
    { className, children, ...rest },
    ref
) {
    return (
        <HeadlessDisclosureButton
            {...rest}
            ref={ref}
            data-part={dataPart("DisclosureButton", rest)}
            className={clsx(styles.root, className)}
        >
            <span data-slot="title">{children}</span>
            <i data-slot="indicator" className="fas fa-chevron-down" aria-hidden="true" />
        </HeadlessDisclosureButton>
    );
});
