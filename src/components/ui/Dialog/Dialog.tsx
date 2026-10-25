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
import { useEffect, useRef } from "preact/hooks";

import { Dialog as HeadlessDialog } from "@headlessui/react";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "role" | "autoFocus">;
export interface DialogProps extends VanillaProps {
    role?: "dialog" | "alertdialog";
    autoFocus?: boolean;
    open: boolean;
    onClose: () => void;
    closeOnInteractOutside?: boolean;
}

export const Dialog = forwardRef<HTMLElement, DialogProps>(function Dialog(
    { open, onClose, closeOnInteractOutside = true, className, ...rest },
    ref
) {
    const pointerInteractionRef = useRef(false);

    function handleClose(): void {
        if (!closeOnInteractOutside && pointerInteractionRef.current) {
            return;
        }

        onClose();
    }

    useEffect(() => {
        if (!open || closeOnInteractOutside) {
            return;
        }

        function markPointer(): void {
            pointerInteractionRef.current = true;
        }

        function markKeyboard(): void {
            pointerInteractionRef.current = false;
        }

        // Headless reports Escape and outside clicks through the same onClose; the last input tells them apart.
        window.addEventListener("pointerdown", markPointer, true);
        window.addEventListener("keydown", markKeyboard, true);

        return () => {
            window.removeEventListener("pointerdown", markPointer, true);
            window.removeEventListener("keydown", markKeyboard, true);
        };
    }, [open, closeOnInteractOutside]);

    return (
        <HeadlessDialog
            {...rest}
            ref={ref}
            open={open}
            onClose={handleClose}
            className={clsx(styles.root, className)}
        />
    );
});
