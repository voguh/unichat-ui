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

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Select } from "~/Select";

const ITEMS = [
    { value: "newest", label: "Newest" },
    { value: "stars", label: "Most stars" },
    { value: "name", label: "Name", disabled: true }
];

describe("Select", () => {
    it("forwards ref and native props to the hidden select", () => {
        const ref = createRef<HTMLSelectElement>();
        render(<Select ref={ref} name="sort" options={ITEMS} required data-testid="select" />);
        const hidden = screen.getByTestId("select");
        expect(ref.current).toBe(hidden);
        expect(hidden.tagName).toBe("SELECT");
        expect(hidden).toHaveAttribute("name", "sort");
        expect(hidden).toBeRequired();
    });

    it("puts id and aria-label on the trigger instead of the hidden select", () => {
        render(<Select id="sort" options={ITEMS} aria-label="Sort by" data-testid="select" />);
        const trigger = screen.getByRole("button", { name: "Sort by" });
        expect(trigger).toHaveAttribute("id", "sort");
        expect(screen.getByTestId("select")).not.toHaveAttribute("aria-label");
    });

    it("selects an option and dispatches a native change on the hidden select", async () => {
        const ref = createRef<HTMLSelectElement>();
        const onChange = rstest.fn();
        render(<Select ref={ref} options={ITEMS} placeholder="Sort by" aria-label="Sort" onChange={onChange} />);

        const trigger = screen.getByRole("button", { name: "Sort" });
        expect(trigger).toHaveTextContent("Sort by");

        await userEvent.click(trigger);
        await userEvent.click(await screen.findByRole("option", { name: "Most stars" }));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.lastCall![0].target.value).toBe("stars");
        expect(trigger).toHaveTextContent("Most stars");
        expect(ref.current).toHaveValue("stars");
    });

    it("dispatches input before change", async () => {
        const events: string[] = [];
        render(
            <Select
                options={ITEMS}
                aria-label="Sort"
                onInput={() => events.push("input")}
                onChange={() => events.push("change")}
            />
        );

        await userEvent.click(screen.getByRole("button", { name: "Sort" }));
        await userEvent.click(await screen.findByRole("option", { name: "Most stars" }));

        expect(events).toEqual(["input", "change"]);
    });

    it("runs interaction handlers on the trigger", async () => {
        const onFocus = rstest.fn();
        const onKeyDown = rstest.fn();
        const onBlur = rstest.fn();
        render(<Select options={ITEMS} aria-label="Sort" onFocus={onFocus} onKeyDown={onKeyDown} onBlur={onBlur} />);

        await userEvent.tab();
        expect(screen.getByRole("button", { name: "Sort" })).toHaveFocus();
        expect(onFocus).toHaveBeenCalledTimes(1);

        await userEvent.keyboard("a");
        expect(onKeyDown).toHaveBeenCalled();

        await userEvent.tab();
        expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it("moves focus from the select to the trigger, except to anchor a validation message", async () => {
        const ref = createRef<HTMLSelectElement>();
        render(<Select ref={ref} options={ITEMS} aria-label="Sort" required />);
        const trigger = screen.getByRole("button", { name: "Sort" });

        ref.current!.focus();
        expect(trigger).toHaveFocus();

        fireEvent.invalid(ref.current!);
        ref.current!.focus();
        expect(ref.current).toHaveFocus();

        await userEvent.keyboard(" ");
        expect(trigger).toHaveFocus();
    });

    it("follows the controlled value", () => {
        const { rerender } = render(<Select options={ITEMS} value="newest" aria-label="Sort" />);
        expect(screen.getByRole("button", { name: "Sort" })).toHaveTextContent("Newest");

        rerender(<Select options={ITEMS} value="stars" aria-label="Sort" />);
        expect(screen.getByRole("button", { name: "Sort" })).toHaveTextContent("Most stars");
    });

    it("renders option groups in the listbox and optgroups in the hidden select", async () => {
        render(
            <Select
                data-testid="select"
                aria-label="Platform"
                options={[
                    { value: "all", label: "All" },
                    { label: "Desktop", options: [{ value: "linux", label: "Linux" }] }
                ]}
            />
        );

        await userEvent.click(screen.getByRole("button", { name: "Platform" }));
        const group = await screen.findByRole("group");
        expect(group).toHaveTextContent("Desktop");
        expect(group).toContainElement(screen.getByRole("option", { name: "Linux" }));
        expect(group).not.toContainElement(screen.getByRole("option", { name: "All" }));
        expect(screen.getByTestId("select").querySelector("optgroup")).toHaveAttribute("label", "Desktop");
    });

    it("exposes the data-part and data-slot structure", async () => {
        render(<Select options={[{ label: "Group", options: ITEMS }]} aria-label="Select" />);
        expect(document.querySelector('[data-part="Select"] > button > [data-slot="value"]')).not.toBeNull();
        expect(document.querySelector('[data-part="Select"] > button > [data-slot="indicator"]')).not.toBeNull();
        expect(document.querySelector('[data-part="Select"] > select')).not.toBeNull();

        await userEvent.click(screen.getByRole("button", { name: "Select" }));
        await screen.findByRole("listbox");
        const viewport = '[data-part="SelectOptions"] > [data-part="ScrollableView"] > [data-slot="viewport"]';
        const group = `${viewport} > [data-slot="group"]`;
        expect(document.querySelector(`${group} > [data-slot="group-label"]`)).not.toBeNull();
        expect(document.querySelector(`${group} > [data-slot="option"] > [data-slot="indicator"]`)).not.toBeNull();
    });
});
