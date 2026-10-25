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

import type { Toast, ToastType } from "../store";
import styles from "./styles.module.css";

export interface ToastItemProps {
    toast: Toast;
    onDismiss: () => void;
}

const DEFAULT_ICONS: Record<ToastType, string> = {
    success: "fas fa-check-circle",
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-triangle",
    error: "fas fa-times-circle"
};

function getDefaultIcon(type: ToastType | undefined): string {
    if (type != null) {
        return DEFAULT_ICONS[type];
    }

    return "fas fa-bell";
}

export function ToastItem({ toast, onDismiss }: ToastItemProps): React.ReactNode {
    const defaultIcon = getDefaultIcon(toast.type);

    function handleAction(): void {
        toast.action!.onClick();
        onDismiss();
    }

    return (
        <div role="status" data-part="ToastItem" data-variant={toast.type} className={styles.root}>
            <span data-slot="icon" aria-hidden="true">
                {toast.icon ?? <i className={defaultIcon} />}
            </span>
            <div data-slot="body">
                {toast.title != null && <strong>{toast.title}</strong>}
                {toast.description != null && <p>{toast.description}</p>}
            </div>
            {toast.action != null && (
                <button type="button" data-slot="action" onClick={handleAction}>
                    {toast.action.label}
                </button>
            )}
            {toast.closable && (
                <button type="button" data-slot="close" aria-label="Dismiss" onClick={onDismiss}>
                    {Number.isFinite(toast.duration) && (
                        <svg viewBox="0 0 32 32" aria-hidden="true">
                            <circle cx="16" cy="16" r="14" data-slot="track" />
                            <circle
                                cx="16"
                                cy="16"
                                r="14"
                                pathLength={100}
                                data-slot="progress"
                                style={{ animationDuration: `${toast.duration}ms` }}
                            />
                        </svg>
                    )}
                    <i className="fas fa-times" aria-hidden="true" />
                </button>
            )}
        </div>
    );
}
