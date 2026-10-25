/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { createRef } from "react";

import { render, screen } from "@testing-library/react";

import { Identicon } from "~/Identicon";

const USER_ID = "01a0fa1d-2385-7a73-88a5-890bbe0e3996";

function renderMarkup(value: string): string {
    const { container } = render(<Identicon value={value} />);
    return container.innerHTML;
}

describe("Identicon", () => {
    it("spreads native props and forwards ref to the svg", () => {
        const ref = createRef<SVGSVGElement>();
        render(<Identicon ref={ref} value={USER_ID} aria-label="voguh" data-testid="identicon" />);
        const svg = screen.getByRole("img", { name: "voguh" });
        expect(ref.current).toBe(svg);
        expect(svg).toHaveAttribute("data-testid", "identicon");
    });

    it("is deterministic for the same value", () => {
        expect(renderMarkup(USER_ID)).toBe(renderMarkup(USER_ID));
    });

    it("differs between values", () => {
        expect(renderMarkup(USER_ID)).not.toBe(renderMarkup("01a0fa1d-2385-7a73-88a5-890bbe0e3997"));
    });

    it("mirrors the pattern horizontally", () => {
        const { container } = render(<Identicon value={USER_ID} />);
        const cells = new Set(
            Array.from(container.querySelectorAll("g > rect")).map(
                (rect) => `${rect.getAttribute("x")},${rect.getAttribute("y")}`
            )
        );

        for (const cell of cells) {
            const [x, y] = cell.split(",").map(Number);
            expect(cells.has(`${15 - x},${y}`)).toBe(true);
        }
    });

    it("exposes the data-part structure", () => {
        render(<Identicon value="seed" />);
        expect(document.querySelector('svg[data-part="Identicon"] > rect')).not.toBeNull();
    });
});
