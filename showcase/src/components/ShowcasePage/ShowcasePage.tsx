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

import { Code } from "@voguh/unichat-ui/components/ui/Code";
import { Table } from "@voguh/unichat-ui/components/ui/Table";

import styles from "./styles.module.css";

export interface PropDoc {
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
}

export interface ComponentDoc {
    name: string;
    props: string;
    ref: string;
    structure?: string;
    nonStandard?: PropDoc[];
}

export interface ShowcasePageProps {
    title: string;
    description?: string;
    usage: string;
    api?: ComponentDoc[];
    children: PReact.ComponentChildren;
}

function renderPropRows(nonStandard: PropDoc[]): PReact.ComponentChildren {
    return nonStandard.map((prop) => (
        <tr key={prop.name}>
            <td>
                <Code>{prop.name}</Code>
            </td>
            <td>
                <Code>{prop.type}</Code>
            </td>
            <td>{prop.defaultValue != null && <Code>{prop.defaultValue}</Code>}</td>
            <td>{prop.description}</td>
        </tr>
    ));
}

function renderComponentDoc(doc: ComponentDoc): PReact.ComponentChildren {
    const nonStandard = doc.nonStandard ?? [];

    return (
        <section key={doc.name} className={styles.componentDoc}>
            <h3>{doc.name}</h3>
            <dl>
                <dt>Props</dt>
                <dd>
                    <Code>{doc.props}</Code>
                </dd>
                <dt>Ref</dt>
                <dd>
                    <Code>{doc.ref}</Code>
                </dd>
            </dl>
            {doc.structure != null && (
                <pre className={styles.code}>
                    <code>{doc.structure.trim()}</code>
                </pre>
            )}
            {nonStandard.length > 0 && (
                <Table aria-label={`${doc.name} non-standard props`}>
                    <thead>
                        <tr>
                            <th scope="col">Prop</th>
                            <th scope="col">Type</th>
                            <th scope="col">Default</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody>{renderPropRows(nonStandard)}</tbody>
                </Table>
            )}
        </section>
    );
}

export function ShowcasePage({
    title,
    description,
    usage,
    api,
    children
}: ShowcasePageProps): PReact.ComponentChildren {
    return (
        <article className={styles.root}>
            <header>
                <h1>{title}</h1>
                {description != null && <p>{description}</p>}
            </header>
            <section className={styles.section}>
                <h2>Usage</h2>
                <pre className={styles.code}>
                    <code>{usage.trim()}</code>
                </pre>
            </section>
            {children}
            {api != null && (
                <section className={styles.section}>
                    <h2>API</h2>
                    {api.map(renderComponentDoc)}
                </section>
            )}
        </article>
    );
}
