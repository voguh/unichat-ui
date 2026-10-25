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

import { TextInput } from "~/forms/TextInput";

describe("forms/TextInput", () => {
    it("labels the input, forwards ref and wires invalid status", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <TextInput
                ref={ref}
                id="nickname"
                name="nickname"
                label="Nickname"
                status="invalid"
                statusMessage="Too long"
                groupProps={{ "data-testid": "group" } as any}
            />
        );

        const input = screen.getByLabelText("Nickname");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("name", "nickname");
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAccessibleDescription("Too long");
        expect(screen.getByTestId("group")).toContainElement(input);
    });

    it("generates an id when none is given", () => {
        render(<TextInput label="Email" />);
        expect(screen.getByLabelText("Email").id).not.toBe("");
    });

    it("describes the input with the status message over the description", () => {
        render(<TextInput label="Nickname" description="Shown in chat" status="invalid" statusMessage="Too long" />);
        expect(screen.getByLabelText("Nickname")).toHaveAccessibleDescription("Too long");
    });
});
