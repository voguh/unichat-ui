/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { render } from "@testing-library/react";

import { Markdown } from "~/Markdown";

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
        expect(container.querySelector('code > span[data-slot="swatch"]')).toHaveStyle({ backgroundColor: "#991b1b" });
    });

    it("removes inline styles, including forged swatches", () => {
        const container = renderHtml(
            '<div style="position:fixed;inset:0">Overlay</div>\n\n<code>x<span data-slot="swatch" style="position:fixed"></span></code>'
        );
        expect(container.querySelector("[style]")).toBeNull();
    });

    it("prefixes user ids and names", () => {
        const container = renderHtml('<a id="root" name="title">Anchor</a>');
        expect(container.querySelector("a")).toHaveAttribute("id", "user-content-root");
        expect(container.querySelector("a")).toHaveAttribute("name", "user-content-title");
    });

    it("exposes the data-part structure", () => {
        const container = renderHtml("Hello");
        expect(container.querySelector('div[data-part="Markdown"] > p')).toHaveTextContent("Hello");
    });

    it("renders code spans, tables and rules with the library parts", () => {
        const container = renderHtml("Run `pnpm build`\n\n---\n\n| A | B |\n| - | - |\n| 1 | 2 |");
        expect(container.querySelector('code[data-part="Code"]')).toHaveTextContent("pnpm build");
        expect(container.querySelector('hr[data-part="Separator"]')).not.toBeNull();
        expect(container.querySelector('table[data-part="Table"] > tbody > tr > td')).toHaveTextContent("1");
    });

    it("applies the library parts to raw HTML too", () => {
        const container = renderHtml('<table class="x"><tr><td>1</td></tr></table>\n\n<hr>\n\n<p><code>id</code></p>');
        expect(container.querySelector('table[data-part="Table"]')).toHaveClass("x");
        expect(container.querySelector('hr[data-part="Separator"]')).not.toBeNull();
        expect(container.querySelector('p > code[data-part="Code"]')).toHaveTextContent("id");
    });

    it("renders task list items as read-only Checkbox parts", () => {
        const container = renderHtml("- [x] done\n- [ ] pending");
        const inputs = container.querySelectorAll('li > label[data-part="Checkbox"] > input[type="checkbox"]:disabled');
        expect(inputs).toHaveLength(2);
        expect(inputs[0]).toBeChecked();
        expect(inputs[1]).not.toBeChecked();
    });

    it("adds the indicator to details summaries", () => {
        const container = renderHtml("<details><summary>More</summary><p>Hidden</p></details>");
        expect(container.querySelector('summary > i[data-slot="indicator"].fa-chevron-down')).not.toBeNull();
    });

    it("renders fenced code as a plain pre without the Code part", () => {
        const container = renderHtml("```sh\npnpm build\n```");
        const code = container.querySelector("pre > code");
        expect(code).toHaveTextContent("pnpm build");
        expect(code).not.toHaveAttribute("data-part");
    });

    it("applies the heading offset and resolves relative links", () => {
        const content = "# Title\n\n[Docs](./docs/README.md)";
        const { container } = render(
            <Markdown content={content} headingOffset={1} relativeLinksBaseUrl="https://x.dev" />
        );
        expect(container.querySelector("h2")).toHaveTextContent("Title");
        expect(container.querySelector("a")).toHaveAttribute("href", "https://x.dev/docs/README.md");
    });

    it("resolves every relative link and image form against the base url", () => {
        const content = "[a](docs/a.md) [b](../b.md) [c](./c/d.md) ![img](./images/x.png)";
        const base = "https://github.com/voguh/unichat/blob/HEAD/widgets/default";
        const { container } = render(<Markdown content={content} relativeLinksBaseUrl={base} />);
        const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));
        expect(hrefs).toEqual([
            "https://github.com/voguh/unichat/blob/HEAD/widgets/default/docs/a.md",
            "https://github.com/voguh/unichat/blob/HEAD/widgets/b.md",
            "https://github.com/voguh/unichat/blob/HEAD/widgets/default/c/d.md"
        ]);
        expect(container.querySelector("img")).toHaveAttribute("src", `${base}/images/x.png`);
    });

    it("keeps absolute, root-relative and anchor urls untouched", () => {
        const content = "[a](https://unichat.voguh.me) [b](mailto:x@y.dev) [c](/download) [d](#install)";
        const { container } = render(<Markdown content={content} relativeLinksBaseUrl="https://x.dev" />);
        const hrefs = Array.from(container.querySelectorAll("a")).map((a) => a.getAttribute("href"));
        expect(hrefs).toEqual(["https://unichat.voguh.me", "mailto:x@y.dev", "/download", "#install"]);
    });
});
