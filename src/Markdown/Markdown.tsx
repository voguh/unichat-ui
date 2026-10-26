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

import type * as React from "react";
import { forwardRef, useMemo } from "react";

import DOMPurify from "dompurify";
import { Marked, type Token, type Tokens } from "marked";

import checkboxStyles from "~/Checkbox/styles.module.css";
import codeStyles from "~/Code/styles.module.css";
import separatorStyles from "~/Separator/styles.module.css";
import tableStyles from "~/Table/styles.module.css";
import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

/* ========================================================================== */

const purifier = DOMPurify(window);
const FORBIDDEN_TAGS = ["form", "button", "textarea", "select", "style", "meta", "base", "link"];

const PARTS: Record<string, { className: string; part: string }> = {
    CODE: { className: codeStyles.root, part: "Code" },
    HR: { className: separatorStyles.root, part: "Separator" },
    TABLE: { className: tableStyles.root, part: "Table" }
};

const SUMMARY_INDICATOR = '<i data-slot="indicator" class="fas fa-chevron-down" aria-hidden="true"></i>';
const TASK_CHECKBOX_CONTROL =
    '<span data-slot="control"><i data-slot="check" class="fas fa-check" aria-hidden="true"></i></span>';

function isReadOnlyCheckbox(element: Element): boolean {
    return element.getAttribute("type") === "checkbox" && element.hasAttribute("disabled");
}

purifier.addHook("afterSanitizeAttributes", (element) => {
    const part = PARTS[element.nodeName];
    const insidePre = element.parentElement != null && element.parentElement.nodeName === "PRE";
    if (part != null && !insidePre) {
        element.classList.add(part.className);
        element.setAttribute("data-part", part.part);
    } else if (element.nodeName === "INPUT" && !isReadOnlyCheckbox(element)) {
        element.remove();
    } else if (element.nodeName === "SUMMARY") {
        element.insertAdjacentHTML("beforeend", SUMMARY_INDICATOR);
    }
});

const colorPatterns = [
    /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/,
    /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/,
    /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/,
    /^hsl\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%\s*\)$/
];

function isColor(text: string): boolean {
    return colorPatterns.some((p) => p.test(text.trim()));
}

function appendColorSwatches(fragment: DocumentFragment): void {
    for (const code of fragment.querySelectorAll('code[data-part~="Code"]')) {
        const text = code.textContent ?? "";
        if (code.children.length === 0 && isColor(text)) {
            const swatch = document.createElement("span");
            swatch.setAttribute("data-slot", "swatch");
            swatch.setAttribute("aria-hidden", "true");
            swatch.style.background = text.trim();
            code.append(swatch);
        }
    }
}

const NON_RELATIVE_URL = /^([a-z][a-z\d+.-]*:|\/|#)/i;

function resolveRelativeUrl(href: string, baseUrl: string): string {
    if (!NON_RELATIVE_URL.test(href)) {
        return new URL(href, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`).href;
    }

    return href;
}

function tokenHasUrl(token: Token): token is Tokens.Link | Tokens.Image {
    return token.type === "link" || token.type === "image";
}

function tokenIsHeading(token: Token): token is Tokens.Heading {
    return token.type === "heading";
}

function renderMarkdown(content: string, headingOffset: number, relativeLinksBaseUrl?: string): string {
    const marked = new Marked();
    marked.use({
        renderer: {
            checkbox({ checked }) {
                const input = `<input type="checkbox" disabled${checked ? " checked" : ""}>`;
                return `<label class="${checkboxStyles.root}" data-part="Checkbox">${input}${TASK_CHECKBOX_CONTROL}</label> `;
            }
        },
        walkTokens(token) {
            if (tokenIsHeading(token)) {
                token.depth = Math.min(token.depth + headingOffset, 6);
            }

            if (tokenHasUrl(token)) {
                token.href = resolveRelativeUrl(token.href, relativeLinksBaseUrl ?? window.location.origin);
            }
        }
    });

    const parsed = marked.parse(content, { async: false, gfm: true });
    const fragment = purifier.sanitize(parsed, {
        FORBID_TAGS: FORBIDDEN_TAGS,
        FORBID_ATTR: ["style"],
        SANITIZE_NAMED_PROPS: true,
        RETURN_DOM_FRAGMENT: true
    });
    appendColorSwatches(fragment);

    const container = document.createElement("div");
    container.append(fragment);
    return container.innerHTML;
}

/* ========================================================================== */

type VanillaProps = Omit<React.HTMLAttributes<HTMLDivElement>, "content" | "dangerouslySetInnerHTML">;
export interface MarkdownProps extends VanillaProps {
    content: string | null;
    relativeLinksBaseUrl?: string;
    headingOffset?: number;
}

export const Markdown = forwardRef<HTMLDivElement, MarkdownProps>(function Markdown(
    { content, relativeLinksBaseUrl, headingOffset = 0, className, ...rest },
    ref
) {
    const html = useMemo(() => {
        if (content == null) {
            return null;
        }

        return renderMarkdown(content, headingOffset, relativeLinksBaseUrl);
    }, [content, headingOffset, relativeLinksBaseUrl]);

    if (html == null) {
        return null;
    }

    return (
        <div
            {...rest}
            ref={ref}
            data-part={dataPart("Markdown", rest)}
            className={clsx(styles.root, className)}
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
});
