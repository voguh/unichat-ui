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

import { EmptyState } from "~/EmptyState";

describe("EmptyState", () => {
    it("renders icon, title, description and children", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <EmptyState ref={ref} data-testid="empty" icon={<i>icon</i>} title="Nothing here" description="Try again">
                <button type="button">Retry</button>
            </EmptyState>
        );
        expect(ref.current).toBe(screen.getByTestId("empty"));
        expect(screen.getByRole("heading", { name: "Nothing here" })).toBeInTheDocument();
        expect(screen.getByText("Try again")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });

    it("renders the title with the requested heading level and hides the icon", () => {
        render(<EmptyState icon={<i>icon</i>} title="Page not found" titleAs="h1" />);
        expect(screen.getByRole("heading", { level: 1, name: "Page not found" })).toBeInTheDocument();
        expect(screen.getByText("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    });

    it("exposes the data-part and data-slot structure", () => {
        render(<EmptyState icon={<i />} title="Empty" description="Nothing here" />);
        expect(document.querySelector('[data-part="EmptyState"] > [data-slot="icon"]')).not.toBeNull();
        expect(document.querySelector('[data-part="EmptyState"] > h3[data-slot="title"]')).not.toBeNull();
        expect(document.querySelector('[data-part="EmptyState"] > [data-slot="description"]')).not.toBeNull();
    });
});
