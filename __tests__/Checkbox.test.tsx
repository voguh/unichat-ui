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

import { Checkbox } from "~/Checkbox";

describe("Checkbox", () => {
    it("forwards ref and native props to the hidden input", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <Checkbox ref={ref} id="accept" name="accept" value="yes" required data-testid="input">
                Accept
            </Checkbox>
        );
        const input = screen.getByTestId("input");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("id", "accept");
        expect(input).toHaveAttribute("name", "accept");
        expect(input).toHaveAttribute("value", "yes");
        expect(input).toBeRequired();
        expect(screen.getByRole("checkbox", { name: "Accept" })).toBe(input);
    });

    it("toggles on click firing native onChange", async () => {
        const onChange = rstest.fn();
        render(<Checkbox onChange={onChange}>Accept</Checkbox>);

        await userEvent.click(screen.getByText("Accept"));
        expect(screen.getByRole("checkbox")).toBeChecked();
        expect(onChange).toHaveBeenCalled();
    });

    it("respects checked and disabled", async () => {
        const onChange = rstest.fn();
        render(
            <Checkbox checked disabled onChange={onChange}>
                Accept
            </Checkbox>
        );
        const input = screen.getByRole("checkbox");
        expect(input).toBeChecked();
        expect(input).toBeDisabled();
        await userEvent.click(screen.getByText("Accept"));
        expect(onChange).not.toHaveBeenCalled();
    });

    it("toggles with the Space key when focused", async () => {
        render(<Checkbox>Accept</Checkbox>);
        await userEvent.tab();
        await userEvent.keyboard(" ");
        expect(screen.getByRole("checkbox")).toBeChecked();
    });

    it("exposes the data-part and data-slot structure", () => {
        render(<Checkbox>Accept</Checkbox>);
        expect(document.querySelector('label[data-part="Checkbox"] > input')).not.toBeNull();
        expect(
            document.querySelector('[data-part="Checkbox"] > [data-slot="control"] > [data-slot="check"]')
        ).not.toBeNull();
        expect(
            document.querySelector('[data-part="Checkbox"] > [data-slot="control"] > [data-slot="indeterminate"]')
        ).not.toBeNull();
        expect(document.querySelector('[data-part="Checkbox"] > [data-slot="label"]')).not.toBeNull();
    });
});
