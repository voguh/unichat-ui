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

export interface ShowcasePageProps {
    title: string;
    description?: string;
    children: PReact.ComponentChildren;
}

export function ShowcasePage({ title, description, children }: ShowcasePageProps): PReact.ComponentChildren {
    return (
        <article className={styles.root}>
            <header>
                <h1>{title}</h1>
                {description != null && <p>{description}</p>}
            </header>
            {children}
        </article>
    );
}
