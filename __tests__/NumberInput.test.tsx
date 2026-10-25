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

import { NumberInput } from "~/NumberInput";

describe("NumberInput", () => {
    it("forwards ref and native props to a number input", () => {
        const ref = createRef<HTMLInputElement>();
        render(<NumberInput ref={ref} id="size" name="size" min={0} max={10} step={2} placeholder="Size" />);
        const input = screen.getByPlaceholderText("Size");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("type", "number");
        expect(input).toHaveAttribute("id", "size");
        expect(input).toHaveAttribute("name", "size");
        expect(input).toHaveAttribute("step", "2");
    });

    it("emits native input events", async () => {
        const onInput = rstest.fn();
        render(<NumberInput aria-label="Size" onInput={onInput} />);

        await userEvent.type(screen.getByRole("spinbutton", { name: "Size" }), "42");
        expect(onInput).toHaveBeenCalledTimes(2);
        expect(screen.getByRole("spinbutton", { name: "Size" })).toHaveValue(42);
    });

    it("exposes the data-part structure", () => {
        render(<NumberInput />);
        expect(document.querySelector('[data-part="Input NumberInput"] > input')).not.toBeNull();
    });
});
