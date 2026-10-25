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
import { dataPart } from "~/utils/dataAttributes";

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
    const outsidePointerRef = useRef(false);

    function handleClose(): void {
        if (!closeOnInteractOutside && outsidePointerRef.current) {
            return;
        }

        onClose();
    }

    useEffect(() => {
        if (!open || closeOnInteractOutside) {
            return;
        }

        function markPointer(event: PointerEvent): void {
            const target = event.target as Element;
            outsidePointerRef.current = target.closest('[data-part~="DialogPanel"]') == null;
        }

        function markKeyboard(): void {
            outsidePointerRef.current = false;
        }

        // Headless reports Escape, outside clicks and CloseButton through the same onClose.
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
            data-part={dataPart("Dialog", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
