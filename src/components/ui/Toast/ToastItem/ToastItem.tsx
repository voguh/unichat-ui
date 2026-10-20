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

import type { Toast, ToastType } from "../store";
import styles from "./styles.module.css";

export interface ToastItemProps {
    toast: Toast;
    onDismiss: () => void;
}

const DEFAULT_ICONS: Record<ToastType, string> = {
    success: "fas fa-check",
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-triangle",
    error: "fas fa-ban"
};

export function ToastItem({ toast, onDismiss }: ToastItemProps): PReact.ComponentChildren {
    const defaultIcon = toast.type != null ? DEFAULT_ICONS[toast.type] : "fas fa-bell";

    return (
        <div role="status" data-type={toast.type} className={styles.root}>
            <span className={styles.icon} aria-hidden="true">
                {toast.icon ?? <i className={defaultIcon} />}
            </span>
            <div className={styles.body}>
                {toast.title != null && <strong className={styles.title}>{toast.title}</strong>}
                {toast.description != null && <p className={styles.description}>{toast.description}</p>}
            </div>
            {toast.action != null && (
                <button
                    type="button"
                    onClick={() => {
                        toast.action!.onClick();
                        onDismiss();
                    }}
                    className={styles.actionTrigger}
                >
                    {toast.action.label}
                </button>
            )}
            {toast.closable && (
                <button type="button" aria-label="Dismiss" onClick={onDismiss} className={styles.closeTrigger}>
                    <i className="fas fa-times" aria-hidden="true" />
                </button>
            )}
        </div>
    );
}
