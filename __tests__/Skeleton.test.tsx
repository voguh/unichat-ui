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

import { Skeleton } from "~/Skeleton";

describe("Skeleton", () => {
    it("is hidden from assistive tech by default", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Skeleton ref={ref} data-testid="skeleton" style={{ height: "10px" }} />);
        const skeleton = screen.getByTestId("skeleton");
        expect(ref.current).toBe(skeleton);
        expect(skeleton).toHaveAttribute("aria-hidden", "true");
        expect(skeleton).toHaveStyle({ height: "10px" });
    });

    it("exposes the data-part structure", () => {
        render(<Skeleton />);
        expect(document.querySelector('[data-part="Skeleton"]')).not.toBeNull();
    });
});
