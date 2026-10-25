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
import userEvent from "@testing-library/user-event";

import { Pagination } from "~/Pagination";

describe("Pagination", () => {
    it("renders pages and navigates", async () => {
        const onChange = rstest.fn();
        const rootRef = createRef<HTMLElement>();
        const { rerender } = render(
            <Pagination ref={rootRef} count={100} pageSize={10} page={1} onChange={onChange} aria-label="Pages" />
        );

        expect(rootRef.current!.tagName).toBe("NAV");
        expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
        expect(screen.getByText("1")).toHaveAttribute("aria-current", "page");

        await userEvent.click(screen.getByRole("button", { name: "Next page" }));
        expect(onChange).toHaveBeenLastCalledWith(2);

        await userEvent.click(screen.getByText("10"));
        expect(onChange).toHaveBeenLastCalledWith(10);

        rerender(<Pagination count={100} pageSize={10} page={10} onChange={onChange} aria-label="Pages" />);
        expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    });

    it("exposes the data-part and data-slot structure", () => {
        render(<Pagination count={100} page={1} onChange={() => {}} />);
        expect(document.querySelector('[data-part="Pagination"] > [data-slot="first"]')).not.toBeNull();
        expect(document.querySelector('[data-part="Pagination"] > [data-slot="previous"]')).not.toBeNull();
        expect(document.querySelector('[data-part="Pagination"] > button[aria-current="page"]')).not.toBeNull();
        expect(document.querySelector('[data-part="Pagination"] > [data-slot="next"]')).not.toBeNull();
        expect(document.querySelector('[data-part="Pagination"] > [data-slot="last"]')).not.toBeNull();
    });
});
