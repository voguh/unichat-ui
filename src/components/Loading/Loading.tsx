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

import styles from "./styles.module.css";

export interface LoadingProps {
    show?: boolean;
    label: string;
}

export function Loading({ show = true, label }: LoadingProps): PReact.ComponentChildren {
    if (!show) {
        return null;
    }

    return (
        <div role="status" className={styles.root}>
            <i className="fas fa-spinner fa-spin fa-fw fa-2x" aria-hidden="true" />
            <span className="sr-only">{label}</span>
        </div>
    );
}
