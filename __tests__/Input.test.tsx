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

import { Input } from "~/Input";

describe("Input", () => {
    it("spreads native props and forwards ref to the input", () => {
        const ref = createRef<HTMLInputElement>();
        render(<Input ref={ref} name="query" placeholder="Search" aria-label="Search" maxLength={10} />);
        const input = screen.getByRole("textbox", { name: "Search" });
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("name", "query");
        expect(input).toHaveAttribute("type", "text");
        expect(input).toHaveAttribute("maxlength", "10");
    });

    it("applies className and rootProps to the wrapper", () => {
        render(<Input aria-label="Search" className="extra" rootProps={{ "data-testid": "root" } as any} />);
        const root = screen.getByTestId("root");
        expect(root).toHaveClass("extra");
        expect(root).toContainElement(screen.getByRole("textbox"));
    });

    it("renders slots around the input", () => {
        render(<Input aria-label="Search" startSlot={<span>start</span>} endSlot={<span>end</span>} />);
        expect(screen.getByText("start")).toBeInTheDocument();
        expect(screen.getByText("end")).toBeInTheDocument();
    });

    it("calls onInput as the user types", async () => {
        const onInput = rstest.fn();
        render(<Input aria-label="Search" onInput={onInput} />);
        await userEvent.type(screen.getByRole("textbox"), "abc");
        expect(onInput).toHaveBeenCalledTimes(3);
    });
});
