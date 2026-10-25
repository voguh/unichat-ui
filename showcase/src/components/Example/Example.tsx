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

export interface ExampleProps {
    title: string;
    vertical?: boolean;
    children: PReact.ComponentChildren;
}

export function Example({ title, vertical = false, children }: ExampleProps): PReact.ComponentChildren {
    return (
        <section className={styles.root}>
            <h2>{title}</h2>
            <div data-vertical={vertical}>{children}</div>
        </section>
    );
}
