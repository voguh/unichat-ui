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

import { normalizeProps, useMachine } from "@zag-js/preact";
import * as toast from "@zag-js/toast";

import styles from "./styles.module.css";

export interface ToastItemProps {
    toast: toast.Props;
    index: number;
    parent: toast.GroupService;
}

export function ToastItem({ toast: toastProps, index, parent }: ToastItemProps): PReact.ComponentChildren {
    const service = useMachine(toast.machine, { ...toastProps, index, parent });
    const api = toast.connect(service, normalizeProps);

    return (
        <div {...api.getRootProps()} className={styles.toast}>
            <span {...api.getGhostBeforeProps()} />
            <div className={styles.body}>
                {api.title != null && (
                    <strong {...api.getTitleProps()} className={styles.title}>
                        {api.title}
                    </strong>
                )}
                {api.description != null && (
                    <p {...api.getDescriptionProps()} className={styles.description}>
                        {api.description}
                    </p>
                )}
            </div>
            {toastProps.action != null && (
                <button {...api.getActionTriggerProps()} className={styles.actionTrigger}>
                    {toastProps.action.label}
                </button>
            )}
            {api.closable && (
                <button {...api.getCloseTriggerProps()} className={styles.closeTrigger}>
                    <i className="fas fa-times" aria-hidden="true" />
                </button>
            )}
            <span {...api.getGhostAfterProps()} />
        </div>
    );
}
