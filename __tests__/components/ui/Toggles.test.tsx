/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { createRef } from "preact";

import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import { Checkbox } from "~/components/ui/Checkbox";
import { Switch } from "~/components/ui/Switch";

describe.each([
    ["Checkbox", Checkbox, "checkbox"],
    ["Switch", Switch, "switch"]
] as const)("%s", (_name, Component, role) => {
    it("forwards ref and native props to the hidden input", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <Component ref={ref} id="accept" name="accept" value="yes" required data-testid="input">
                Accept
            </Component>
        );
        const input = screen.getByTestId("input");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("id", "accept");
        expect(input).toHaveAttribute("name", "accept");
        expect(input).toHaveAttribute("value", "yes");
        expect(input).toBeRequired();
        expect(screen.getByRole(role, { name: "Accept" })).toBe(input);
    });

    it("toggles on click firing native onChange and onCheckedChange", async () => {
        const onChange = rstest.fn();
        const onCheckedChange = rstest.fn();
        render(
            <Component onChange={onChange} onCheckedChange={onCheckedChange}>
                Accept
            </Component>
        );

        await userEvent.click(screen.getByText("Accept"));
        expect(screen.getByRole(role)).toBeChecked();
        expect(onChange).toHaveBeenCalled();
        expect(onCheckedChange).toHaveBeenLastCalledWith(expect.objectContaining({ checked: true }));
    });

    it("respects controlled checked and disabled", async () => {
        const onCheckedChange = rstest.fn();
        render(
            <Component checked disabled onCheckedChange={onCheckedChange}>
                Accept
            </Component>
        );
        const input = screen.getByRole(role);
        expect(input).toBeChecked();
        expect(input).toBeDisabled();
        await userEvent.click(screen.getByText("Accept"));
        expect(onCheckedChange).not.toHaveBeenCalled();
    });

    it("toggles with the Space key when focused", async () => {
        render(<Component>Accept</Component>);
        await userEvent.tab();
        await userEvent.keyboard(" ");
        expect(screen.getByRole(role)).toBeChecked();
    });
});
