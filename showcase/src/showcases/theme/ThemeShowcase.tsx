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

import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

import styles from "./styles.module.css";

const COLOR_TOKENS = [
    "surface-sunken",
    "surface",
    "surface-raised",
    "surface-hover",
    "surface-active",
    "border-subtle",
    "border",
    "border-strong",
    "text",
    "text-secondary",
    "text-muted",
    "text-placeholder",
    "text-disabled",
    "focus",
    "invalid",
    "overlay"
];

const VARIANT_TOKENS = ["primary", "secondary", "success", "danger", "warning", "info"];

const OTHER_TOKENS = [
    "font-sans",
    "font-mono",
    "font-size-xs",
    "font-size-sm",
    "font-size-base",
    "font-size-lg",
    "font-size-xl",
    "font-size-2xl",
    "font-size-3xl",
    "font-size-4xl",
    "radius",
    "radius-sm",
    "spacing"
];

function getTokenValue(name: string): string {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function renderColorRow(token: string): PReact.ComponentChildren {
    const name = `--ucui-color-${token}`;

    return (
        <tr key={name}>
            <td>
                <span className={styles.swatch} style={{ backgroundColor: `var(${name})` }} />
            </td>
            <td>
                <Code>{name}</Code>
            </td>
            <td>
                <Code>{getTokenValue(name)}</Code>
            </td>
        </tr>
    );
}

function renderVariantRow(token: string): PReact.ComponentChildren {
    const name = `--ucui-color-${token}`;

    return (
        <tr key={name}>
            <td>
                <span
                    className={styles.swatch}
                    style={{ backgroundColor: `var(${name})`, color: `var(${name}-contrast)` }}
                >
                    Aa
                </span>
            </td>
            <td>
                <Code>{name}</Code>
                <br />
                <Code>{`${name}-contrast`}</Code>
            </td>
            <td>
                <Code>{getTokenValue(name)}</Code>
                <br />
                <Code>{getTokenValue(`${name}-contrast`)}</Code>
            </td>
        </tr>
    );
}

function renderOtherRow(token: string): PReact.ComponentChildren {
    const name = `--ucui-${token}`;

    return (
        <tr key={name}>
            <td>
                <Code>{name}</Code>
            </td>
            <td>
                <Code>{getTokenValue(name)}</Code>
            </td>
        </tr>
    );
}

export function ThemeShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Theme"
            description="CSS variables read by every component; values below are the ones in effect on this page."
            usage={`
/* Components import their own CSS and the tokens. Without Tailwind, import the preflight once: */
import "@voguh/unichat-ui/styles/preflight.css";

/* Unlayered CSS overrides the tokens: */
:root {
    --ucui-color-primary: #2563eb;
    --ucui-font-size-base: 0.875rem;
}
`}
        >
            <Example title="Colors" vertical>
                <Table aria-label="Color tokens">
                    <thead>
                        <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Token</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>{COLOR_TOKENS.map(renderColorRow)}</tbody>
                </Table>
            </Example>
            <Example title="Variants" vertical>
                <Table aria-label="Variant tokens">
                    <thead>
                        <tr>
                            <th scope="col">Preview</th>
                            <th scope="col">Token</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>{VARIANT_TOKENS.map(renderVariantRow)}</tbody>
                </Table>
            </Example>
            <Example title="Typography, radius and spacing" vertical>
                <Table aria-label="Other tokens">
                    <thead>
                        <tr>
                            <th scope="col">Token</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>{OTHER_TOKENS.map(renderOtherRow)}</tbody>
                </Table>
            </Example>
        </ShowcasePage>
    );
}
