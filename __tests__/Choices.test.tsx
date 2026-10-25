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

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Combobox } from "~/Combobox";
import { RadioGroup } from "~/RadioGroup";
import { SegmentedControl } from "~/SegmentedControl";
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
});

describe("Combobox", () => {
    it("keeps free text and fires the native events while typing", async () => {
        const ref = createRef<HTMLInputElement>();
        const onInput = rstest.fn();
        const onChange = rstest.fn();
        render(
            <Combobox
                ref={ref}
                options={ITEMS}
                placeholder="Search"
                name="sort"
                onInput={onInput}
                onChange={onChange}
            />
        );

        const input = screen.getByPlaceholderText("Search");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("name", "sort");

        await userEvent.type(input, "custom");
        expect(onInput).toHaveBeenCalledTimes(6);
        expect(onChange).toHaveBeenCalledTimes(6);
        expect(onChange.mock.lastCall![0].target.value).toBe("custom");
        expect(input).toHaveValue("custom");
    });

    it("filters by value or label and inserts the option value like a datalist", async () => {
        const onInput = rstest.fn();
        const onChange = rstest.fn();
        render(<Combobox options={ITEMS} placeholder="Search" onInput={onInput} onChange={onChange} />);

        const input = screen.getByPlaceholderText("Search");
        await userEvent.type(input, "most");
        await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));
        onInput.mockClear();
        onChange.mockClear();

        await userEvent.click(screen.getByRole("option", { name: /stars/ }));

        expect(input).toHaveValue("stars");
        expect(onInput).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.lastCall![0].target.value).toBe("stars");
    });
});

describe("RadioGroup", () => {
    it("forwards ref to the root and selects items", async () => {
        const ref = createRef<HTMLDivElement>();
        const onChange = rstest.fn();
        render(<RadioGroup ref={ref} id="sort" name="sort" items={ITEMS} onChange={onChange} aria-label="Sort" />);

        expect(ref.current).toBe(screen.getByRole("radiogroup", { name: "Sort" }));
        expect(ref.current).toHaveAttribute("id", "sort");

        await userEvent.click(screen.getByText("Most stars"));
        expect(onChange.mock.lastCall![0].target.value).toBe("stars");
        expect(screen.getByRole("radio", { name: "Most stars" })).toBeChecked();
        expect(screen.getByRole("radio", { name: "Name" })).toBeDisabled();
    });
});

describe("SegmentedControl", () => {
    it("switches the checked segment", async () => {
        render(
            <SegmentedControl
                defaultValue="en-US"
                items={[
                    { value: "en-US", label: "EN" },
                    { value: "pt-BR", label: "PT" }
                ]}
            />
        );

        expect(screen.getByRole("radio", { name: "EN" })).toBeChecked();
        await userEvent.click(screen.getByText("PT"));
        expect(screen.getByRole("radio", { name: "PT" })).toBeChecked();
    });
});
