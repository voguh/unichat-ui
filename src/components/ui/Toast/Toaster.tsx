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
import { useId } from "preact/hooks";

import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";
import * as toast from "@zag-js/toast";

import styles from "./styles.module.css";
import { ToastItem } from "./ToastItem";
import { toaster } from "./toaster";
import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

export interface ToasterProps extends PReact.HTMLAttributes<HTMLDivElement> {
    store?: toast.Store;
}

export const Toaster = forwardRef<HTMLDivElement, ToasterProps>(function Toaster(
    { store = toaster, className, ...rest },
    ref
) {
    const service = useMachine(toast.group.machine, { id: useId(), store });
    const api = toast.group.connect(service, normalizeProps);

    return (
        <Portal>
            <div {...mergeProps(api.getGroupProps(), rest)} ref={ref} className={clsx(styles.group, className)}>
                {api.getToasts().map((toastProps, index) => (
                    <ToastItem key={toastProps.id} toast={toastProps} index={index} parent={service} />
                ))}
            </div>
        </Portal>
    );
});
