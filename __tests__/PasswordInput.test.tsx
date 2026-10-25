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

import { PasswordInput } from "~/PasswordInput";

describe("PasswordInput", () => {
    it("forwards ref and toggles visibility", async () => {
        const ref = createRef<HTMLInputElement>();
        render(<PasswordInput ref={ref} name="secret" placeholder="Secret" autoComplete="new-password" />);
        const input = screen.getByPlaceholderText("Secret");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("type", "password");
        expect(input).toHaveAttribute("name", "secret");

        await userEvent.click(screen.getByRole("button"));
        expect(input).toHaveAttribute("type", "text");
    });

    it("exposes the data-part and data-slot structure", () => {
        render(<PasswordInput />);
        expect(document.querySelector('[data-part="PasswordInput"] > input[data-part="Input"]')).not.toBeNull();
        expect(document.querySelector('[data-part="PasswordInput"] > [data-slot="trigger"]')).not.toBeNull();
    });
});
