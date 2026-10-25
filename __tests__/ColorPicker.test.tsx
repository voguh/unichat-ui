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

import { ColorPicker } from "~/ColorPicker";

describe("ColorPicker", () => {
    it("forwards ref and native props to the visible input", () => {
        const ref = createRef<HTMLInputElement>();
        render(<ColorPicker ref={ref} id="accent" name="accent" defaultValue="#991b1b" />);
        expect(ref.current).toHaveAttribute("id", "accent");
        expect(ref.current).toHaveAttribute("name", "accent");
        expect(ref.current).toHaveAttribute("type", "text");
        expect(ref.current).toHaveValue("#991b1b");
    });

    it("selects a swatch and dispatches a native change", async () => {
        const ref = createRef<HTMLInputElement>();
        const onChange = rstest.fn();
        render(<ColorPicker ref={ref} swatches={["#2563eb"]} onChange={onChange} />);

        await userEvent.click(ref.current as HTMLInputElement);
        await userEvent.click(await screen.findByRole("button", { name: "#2563eb" }));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(ref.current).toHaveValue("#2563eb");
    });

    it("opens on focus and closes with Escape and outside clicks", async () => {
        const ref = createRef<HTMLInputElement>();
        const { container } = render(<ColorPicker ref={ref} />);
        const root = container.querySelector("[data-part='ColorPicker']");

        await userEvent.tab();
        expect(ref.current).toHaveFocus();
        expect(root).toHaveAttribute("data-open");

        await userEvent.keyboard("{Escape}");
        expect(root).not.toHaveAttribute("data-open");

        await userEvent.click(ref.current as HTMLInputElement);
        expect(root).toHaveAttribute("data-open");

        await userEvent.click(document.body);
        expect(root).not.toHaveAttribute("data-open");
    });

    it("exposes the data-part and data-slot structure", () => {
        render(<ColorPicker swatches={["#2563eb"]} />);
        const control = '[data-part="ColorPicker"] > [data-slot="control"]';
        const popover = '[data-part="PopoverPanel ColorPickerPopover"]';
        expect(document.querySelector(`${control} > [data-slot="preview"] > [data-slot="color"]`)).not.toBeNull();
        expect(document.querySelector(`${control} > input`)).not.toBeNull();
        expect(document.querySelector(`${popover} > [data-slot="area"] > [data-slot="thumb"]`)).not.toBeNull();
        expect(document.querySelector(`${popover} > [data-slot="hue"]`)).not.toBeNull();
        expect(document.querySelector(`${popover} > [data-slot="alpha"] > [data-slot="gradient"]`)).not.toBeNull();
        expect(
            document.querySelector(`${popover} > [data-slot="swatches"] > button > [data-slot="color"]`)
        ).not.toBeNull();
    });
});
