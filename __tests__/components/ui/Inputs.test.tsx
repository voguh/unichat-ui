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

import { render, screen, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import { NumberInput } from "~/components/ui/NumberInput";
import { PasswordInput } from "~/components/ui/PasswordInput";
import { TagsInput } from "~/components/ui/TagsInput";

describe("NumberInput", () => {
    it("forwards ref and native props to the input", () => {
        const ref = createRef<HTMLInputElement>();
        render(<NumberInput ref={ref} id="size" name="size" placeholder="Size" aria-describedby="hint" />);
        const input = screen.getByPlaceholderText("Size");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("id", "size");
        expect(input).toHaveAttribute("name", "size");
        expect(input).toHaveAttribute("aria-describedby", "hint");
    });

    it("increments with the trigger", async () => {
        render(<NumberInput defaultValue="1" max={2} aria-label="Size" />);
        await userEvent.click(screen.getByRole("button", { name: /increment/i }));
        expect(screen.getByRole("spinbutton", { name: "Size" })).toHaveValue("2");
    });

    it("steps with arrow keys clamping to min", async () => {
        const onValueChange = rstest.fn();
        render(<NumberInput defaultValue="1" min={0} onValueChange={onValueChange} aria-label="Size" />);
        const input = screen.getByRole("spinbutton", { name: "Size" });

        input.focus();
        await userEvent.keyboard("{ArrowDown}{ArrowDown}");
        expect(input).toHaveValue("0");
        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ valueAsNumber: 0 }));
    });
});

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
});

describe("TagsInput", () => {
    it("adds a tag on Enter and clears the input", async () => {
        const ref = createRef<HTMLInputElement>();
        const onValueChange = rstest.fn();
        render(<TagsInput ref={ref} placeholder="Add scope" onValueChange={onValueChange} />);
        const input = screen.getByPlaceholderText("Add scope");
        expect(ref.current).toBe(input);

        // zag syncs the input value asynchronously; zero-delay typing races it.
        await userEvent.setup({ delay: 30 }).type(input, "read:user{Enter}");
        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ["read:user"] }));
        await waitFor(() => expect(input).toHaveValue(""));
    });

    it("removes tags with the delete trigger and syncs the hidden input", async () => {
        const onValueChange = rstest.fn();
        render(<TagsInput name="scopes" defaultValue={["read:user", "user:email"]} onValueChange={onValueChange} />);
        expect(document.querySelector('input[name="scopes"]')).toHaveValue("read:user, user:email");

        await userEvent.click(screen.getByRole("button", { name: "Delete tag read:user" }));
        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ["user:email"] }));
        await waitFor(() => expect(document.querySelector('input[name="scopes"]')).toHaveValue("user:email"));
    });
});
