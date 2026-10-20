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
import { useEffect, useId } from "preact/hooks";

import { Portal } from "~/components/ui/Portal";
import { useClickOutside } from "~/hooks/useClickOutside";
import { clsx } from "~/utils/clsx";
import { mergeRefs } from "~/utils/mergeRefs";

import styles from "./styles.module.css";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "fullscreen";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "title" | "size">;
export interface DialogProps extends VanillaProps {
    open: boolean;
    onClose: () => void;
    size?: DialogSize;
    title?: PReact.ComponentChildren;
    actions?: PReact.ComponentChildren;
    withCloseButton?: boolean;
    backdrop?: boolean;
    portal?: boolean;
    closeOnEscape?: boolean;
    closeOnInteractOutside?: boolean;
    bodyProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(
    {
        open,
        onClose,
        size = "md",
        title,
        actions,
        withCloseButton = true,
        backdrop = true,
        portal = true,
        closeOnEscape = true,
        closeOnInteractOutside = true,
        bodyProps,
        onKeyDown,
        className,
        children,
        ...rest
    },
    ref
) {
    const titleId = useId();
    const bodyClassName = bodyProps != null ? bodyProps.className : undefined;

    const contentRef = useClickOutside<HTMLDivElement>(() => {
        if (open && closeOnInteractOutside) {
            onClose();
        }
    });

    function handleKeyDown(event: PReact.TargetedKeyboardEvent<HTMLDivElement>): void {
        if (onKeyDown != null) {
            onKeyDown(event);
        }

        if (closeOnEscape && event.key === "Escape") {
            onClose();
        }
    }

    useEffect(() => {
        if (!open) {
            return;
        }

        const previousFocus = document.activeElement;
        contentRef.current!.focus();

        return () => {
            if (previousFocus instanceof HTMLElement) {
                previousFocus.focus();
            }
        };
    }, [open, contentRef]);

    if (!open) {
        return null;
    }

    return (
        <Portal disabled={!portal}>
            {backdrop && <div className={styles.backdrop} />}
            <div className={styles.positioner}>
                <div
                    role="dialog"
                    aria-labelledby={title != null ? titleId : undefined}
                    {...rest}
                    ref={mergeRefs(ref, contentRef)}
                    tabIndex={-1}
                    onKeyDown={handleKeyDown}
                    data-size={size}
                    className={clsx(styles.content, className)}
                >
                    {(title != null || actions != null || withCloseButton) && (
                        <div className={styles.header}>
                            {title != null && (
                                <h2 id={titleId} className={styles.title}>
                                    {title}
                                </h2>
                            )}
                            <div className={styles.headerActions}>
                                {actions}
                                {withCloseButton && (
                                    <button
                                        type="button"
                                        aria-label="Close"
                                        onClick={onClose}
                                        className={styles.closeButton}
                                    >
                                        <i className="fas fa-times" aria-hidden="true" />
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                    {children != null && (
                        <div {...bodyProps} className={clsx(styles.body, bodyClassName)}>
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </Portal>
    );
});
