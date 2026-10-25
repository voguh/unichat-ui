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

import { Switch } from "~/Switch";

describe("Switch", () => {
    it("forwards ref and native props to the hidden input", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <Switch ref={ref} id="accept" name="accept" value="yes" required data-testid="input">
                Accept
            </Switch>
        );
        const input = screen.getByTestId("input");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("id", "accept");
        expect(input).toHaveAttribute("name", "accept");
        expect(input).toHaveAttribute("value", "yes");
        expect(input).toBeRequired();
        expect(screen.getByRole("switch", { name: "Accept" })).toBe(input);
    });

    it("toggles on click firing native onChange", async () => {
        const onChange = rstest.fn();
        render(<Switch onChange={onChange}>Accept</Switch>);

        await userEvent.click(screen.getByText("Accept"));
        expect(screen.getByRole("switch")).toBeChecked();
        expect(onChange).toHaveBeenCalled();
    });

    it("respects checked and disabled", async () => {
        const onChange = rstest.fn();
        render(
            <Switch checked disabled onChange={onChange}>
                Accept
            </Switch>
        );
        const input = screen.getByRole("switch");
        expect(input).toBeChecked();
        expect(input).toBeDisabled();
        await userEvent.click(screen.getByText("Accept"));
        expect(onChange).not.toHaveBeenCalled();
    });

    it("toggles with the Space key when focused", async () => {
        render(<Switch>Accept</Switch>);
        await userEvent.tab();
        await userEvent.keyboard(" ");
        expect(screen.getByRole("switch")).toBeChecked();
    });

    it("exposes the data-part and data-slot structure", () => {
        render(<Switch>On</Switch>);
        expect(document.querySelector('label[data-part="Switch"] > input')).not.toBeNull();
        expect(
            document.querySelector('[data-part="Switch"] > [data-slot="control"] > [data-slot="thumb"]')
        ).not.toBeNull();
        expect(document.querySelector('[data-part="Switch"] > [data-slot="label"]')).not.toBeNull();
    });
});
