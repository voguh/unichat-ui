/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { render } from "@testing-library/preact";

import { Markdown } from "~/components/Markdown";

function renderHtml(content: string): Element {
    const { container } = render(<Markdown content={content} />);
    return container;
}

describe("Markdown", () => {
    it("keeps harmless HTML", () => {
        const container = renderHtml(
            '<details><summary>More</summary>Hidden</details>\n\n<img src="/logo.png" alt="Logo" width="64">\n\n<kbd>Ctrl</kbd>'
        );
        expect(container.querySelector("details summary")).toHaveTextContent("More");
        expect(container.querySelector("img")).toHaveAttribute("width", "64");
        expect(container.querySelector("kbd")).toHaveTextContent("Ctrl");
    });

    it("removes scripts, event handlers and javascript: urls", () => {
        const container = renderHtml(
            '<script>alert(1)</script>\n\n<img src="x" onerror="alert(1)">\n\n<a href="javascript:alert(1)">click</a>'
        );
        expect(container.querySelector("script")).toBeNull();
        expect(container.querySelector("img")).not.toHaveAttribute("onerror");
        expect(container.querySelector("a")).not.toHaveAttribute("href");
    });

    it("removes forms, styles and page-level tags", () => {
        const container = renderHtml(
            '<form action="https://evil.example"><input name="password"><button>Login</button></form>\n\n<style>body{display:none}</style>\n\n<meta http-equiv="refresh" content="0;url=https://evil.example">'
        );
        expect(container.querySelector("form, input, button, style, meta")).toBeNull();
    });

    it("keeps the color swatch rendered for color code spans", () => {
        const container = renderHtml("`#991b1b`");
        expect(container.querySelector("code span")).toHaveStyle({ backgroundColor: "#991b1b" });
    });
});
