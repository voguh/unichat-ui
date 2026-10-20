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

import { Checkbox } from "~/components/forms/Checkbox";
import { NumberInput } from "~/components/forms/NumberInput";
import { RadioGroup } from "~/components/forms/RadioGroup";
import { Select } from "~/components/forms/Select";
import { Textarea } from "~/components/forms/Textarea";
import { TextInput } from "~/components/forms/TextInput";

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

    it("describes the input with description and status message", () => {
        render(<TextInput label="Nickname" description="Shown in chat" status="invalid" statusMessage="Too long" />);
        expect(screen.getByLabelText("Nickname")).toHaveAccessibleDescription("Shown in chat Too long");
    });
});

describe("forms/Textarea", () => {
    it("labels the textarea", () => {
        const ref = createRef<HTMLTextAreaElement>();
        render(<Textarea ref={ref} label="Notes" />);
        expect(screen.getByLabelText("Notes")).toBe(ref.current);
    });
});

describe("forms/Checkbox", () => {
    it("keeps the inline label and forwards ref to the hidden input", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <Checkbox ref={ref} label="Visibility" status="invalid" statusMessage="Required">
                Prerelease
            </Checkbox>
        );
        const input = screen.getByRole("checkbox", { name: "Prerelease" });
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAccessibleDescription("Required");
    });
});

describe("forms/Select", () => {
    it("labels the trigger through the FormGroup label", () => {
        const ref = createRef<HTMLSelectElement>();
        render(<Select ref={ref} label="Sort by" name="sort" items={[{ value: "a", label: "A" }]} />);
        expect(screen.getByRole("combobox", { name: "Sort by" })).toBeInTheDocument();
        expect(ref.current).not.toBeNull();
        expect(ref.current!.tagName).toBe("SELECT");
    });
});

describe("forms/NumberInput", () => {
    it("labels the spinbutton", () => {
        render(<NumberInput label="Max files" />);
        expect(screen.getByRole("spinbutton", { name: "Max files" })).toBeInTheDocument();
    });
});

describe("forms/RadioGroup", () => {
    it("labels the radiogroup and forwards ref to the root", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <RadioGroup
                ref={ref}
                label="Channel"
                items={[
                    { value: "stable", label: "Stable" },
                    { value: "beta", label: "Beta" }
                ]}
            />
        );
        expect(screen.getByRole("radiogroup", { name: "Channel" })).toBe(ref.current);
    });
});
