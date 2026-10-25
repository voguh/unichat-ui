/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: HTML sanitized by DOMPurify */

import type PReact from "preact";
import { forwardRef } from "preact/compat";
import { useMemo } from "preact/hooks";

import DOMPurify from "dompurify";
import { Marked, type Token } from "marked";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "content" | "dangerouslySetInnerHTML">;
export interface MarkdownProps extends VanillaProps {
    content: string | null;
    relativeLinksBaseUrl?: string;
    headingOffset?: number;
}

const purifier = DOMPurify(window);
const FORBIDDEN_TAGS = ["form", "input", "button", "textarea", "select", "style", "meta", "base", "link"];

const colorPatterns = [
    /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
    /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/,
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    /^hsl\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*\)$/
];

function isColor(text: string): boolean {
    return colorPatterns.some((p) => p.test(text.trim()));
}

function tokenIsLink(token: Token): token is import("marked").Tokens.Link {
    return token.type === "link";
}

function tokenIsHeading(token: Token): token is import("marked").Tokens.Heading {
    return token.type === "heading";
}

export const Markdown = forwardRef<HTMLDivElement, MarkdownProps>(function Markdown(
    { content, relativeLinksBaseUrl, headingOffset = 0, className, ...rest },
    ref
) {
    const marked = useMemo(() => {
        const marked = new Marked();

        marked.use({
            renderer: {
                codespan({ text }) {
                    if (isColor(text)) {
                        const color = text.trim();
                        return `<code>${color}<span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${color};margin-left:8px;vertical-align:middle;" aria-hidden="true"></span></code>`;
                    }

                    return false;
                }
            },
            walkTokens(token) {
                if (tokenIsHeading(token)) {
                    token.depth = Math.min(token.depth + headingOffset, 6);
                }

                if (tokenIsLink(token)) {
                    const href = token.href;
                    if (href.startsWith("./")) {
                        const normalizedHref = href.slice(2);
                        const dummyBaseUrl = `${window.location.protocol}//${window.location.host}`;
                        token.href = `${relativeLinksBaseUrl ?? dummyBaseUrl}/${normalizedHref}`;
                    }
                }
            }
        });

        return (str: string) => {
            const parsed = marked.parse(str, { async: false, gfm: true });
            return purifier.sanitize(parsed, { FORBID_TAGS: FORBIDDEN_TAGS });
        };
    }, [relativeLinksBaseUrl, headingOffset]);

    if (content == null) {
        return null;
    }

    return (
        <div
            {...rest}
            ref={ref}
            className={clsx(styles.root, "prose prose-invert max-w-none overflow-y-auto", className)}
            dangerouslySetInnerHTML={{ __html: marked(content) }}
        />
    );
});
