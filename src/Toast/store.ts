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

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPlacement = "top-start" | "top" | "top-end" | "bottom-start" | "bottom" | "bottom-end";

export interface ToastOptions {
    id?: string;
    type?: ToastType;
    title?: React.ReactNode;
    description?: React.ReactNode;
    icon?: React.ReactNode;
    duration?: number;
    closable?: boolean;
    action?: { label: React.ReactNode; onClick: () => void };
}

export interface Toast extends ToastOptions {
    id: string;
    duration: number;
}

export interface ToasterOptions {
    placement?: ToastPlacement;
    max?: number;
    duration?: number;
}

export interface ToasterStore {
    placement: ToastPlacement;
    create: (options: ToastOptions) => string;
    success: (options: Omit<ToastOptions, "type">) => string;
    error: (options: Omit<ToastOptions, "type">) => string;
    warning: (options: Omit<ToastOptions, "type">) => string;
    info: (options: Omit<ToastOptions, "type">) => string;
    remove: (id?: string) => void;
    subscribe: (listener: () => void) => () => void;
    getToasts: () => Toast[];
}

export function createToaster({
    placement = "bottom-end",
    max = Number.POSITIVE_INFINITY,
    duration = 5000
}: ToasterOptions = {}): ToasterStore {
    let counter = 0;
    let toasts: Toast[] = [];
    const listeners = new Set<() => void>();
    const timers = new Map<string, ReturnType<typeof setTimeout>>();

    function emit(): void {
        for (const listener of listeners) {
            listener();
        }
    }

    function remove(id?: string): void {
        for (const toast of toasts) {
            if (id == null || toast.id === id) {
                clearTimeout(timers.get(toast.id));
                timers.delete(toast.id);
            }
        }

        if (id != null) {
            toasts = toasts.filter((toast) => toast.id !== id);
        } else {
            toasts = [];
        }

        emit();
    }

    function create(options: ToastOptions): string {
        const id = options.id ?? `toast-${counter++}`;
        const toastDuration = options.duration ?? duration;

        clearTimeout(timers.get(id));
        toasts = [
            ...toasts.filter((toast) => toast.id !== id),
            { closable: true, ...options, id, duration: toastDuration }
        ].slice(-max);
        if (Number.isFinite(toastDuration)) {
            timers.set(
                id,
                setTimeout(() => remove(id), toastDuration)
            );
        }

        emit();

        return id;
    }

    return {
        placement,
        create,
        success: (options) => create({ ...options, type: "success" }),
        error: (options) => create({ ...options, type: "error" }),
        warning: (options) => create({ ...options, type: "warning" }),
        info: (options) => create({ ...options, type: "info" }),
        remove,
        subscribe: (listener) => {
            listeners.add(listener);

            return () => listeners.delete(listener);
        },
        getToasts: () => toasts
    };
}

export const toaster = createToaster();
