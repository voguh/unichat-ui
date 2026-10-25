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

import { Code } from "~/components/ui/Code";
import { Table, TBody, Td, THead, Th, Tr } from "~/components/ui/Table";

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
    nonStandard?: PropDoc[];
}

export interface ShowcasePageProps {
    title: string;
    description?: string;
    usage: string;
    api: ComponentDoc[];
    children: PReact.ComponentChildren;
}

function renderPropRows(nonStandard: PropDoc[]): PReact.ComponentChildren {
    return nonStandard.map((prop) => (
        <Tr key={prop.name}>
            <Td>
                <Code>{prop.name}</Code>
            </Td>
            <Td>
                <Code>{prop.type}</Code>
            </Td>
            <Td>{prop.defaultValue != null && <Code>{prop.defaultValue}</Code>}</Td>
            <Td>{prop.description}</Td>
        </Tr>
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
            {nonStandard.length > 0 && (
                <Table aria-label={`${doc.name} non-standard props`}>
                    <THead>
                        <Tr>
                            <Th scope="col">Prop</Th>
                            <Th scope="col">Type</Th>
                            <Th scope="col">Default</Th>
                            <Th scope="col">Description</Th>
                        </Tr>
                    </THead>
                    <TBody>{renderPropRows(nonStandard)}</TBody>
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
                <pre className={styles.usage}>
                    <code>{usage.trim()}</code>
                </pre>
            </section>
            {children}
            <section className={styles.section}>
                <h2>API</h2>
                {api.map(renderComponentDoc)}
            </section>
        </article>
    );
}
