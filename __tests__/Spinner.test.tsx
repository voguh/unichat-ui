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

import { Spinner } from "~/Spinner";

describe("Spinner", () => {
    it("renders a status element with size and native props", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<Spinner ref={ref} size="lg" aria-label="Loading" />);
        const spinner = screen.getByRole("status", { name: "Loading" });
        expect(ref.current).toBe(spinner);
        expect(spinner).toHaveAttribute("data-size", "lg");
    });

    it("exposes the data-part structure", () => {
        render(<Spinner aria-label="Loading" />);
        expect(document.querySelector('[data-part="Spinner"] > i')).not.toBeNull();
    });
});
