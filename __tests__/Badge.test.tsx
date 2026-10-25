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

import { Badge } from "~/Badge";

describe("Badge", () => {
    it("renders a span with variant, native props and ref", () => {
        const ref = createRef<HTMLSpanElement>();
        render(
            <Badge ref={ref} variant="warning" title="Pre-release" className="extra">
                beta
            </Badge>
        );
        const badge = screen.getByText("beta");
        expect(ref.current).toBe(badge);
        expect(badge.tagName).toBe("SPAN");
        expect(badge).toHaveAttribute("data-variant", "warning");
        expect(badge).toHaveAttribute("title", "Pre-release");
        expect(badge).toHaveClass("extra");
    });

    it("defaults to the secondary variant", () => {
        render(<Badge>stable</Badge>);
        expect(screen.getByText("stable")).toHaveAttribute("data-variant", "secondary");
    });

    it("exposes the data-part structure", () => {
        render(<Badge>New</Badge>);
        expect(document.querySelector('[data-part="Badge"][data-variant]')).not.toBeNull();
    });
});
