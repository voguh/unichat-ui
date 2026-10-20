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
import { useEffect, useState } from "preact/hooks";

import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";
import { ToastItem } from "./ToastItem";
import { type ToasterStore, toaster } from "./toaster";

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface ToasterProps extends VanillaProps {
    store?: ToasterStore;
}

export const Toaster = forwardRef<HTMLDivElement, ToasterProps>(function Toaster(
    { store = toaster, className, ...rest },
    ref
) {
    const [toasts, setToasts] = useState(store.getToasts());

    useEffect(() => {
        setToasts(store.getToasts());

        return store.subscribe(() => setToasts(store.getToasts()));
    }, [store]);

    return (
        <Portal>
            <div
                {...rest}
                ref={ref}
                aria-live="polite"
                data-placement={store.placement}
                className={clsx(styles.root, className)}
            >
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onDismiss={() => store.remove(toast.id)} />
                ))}
            </div>
        </Portal>
    );
});
