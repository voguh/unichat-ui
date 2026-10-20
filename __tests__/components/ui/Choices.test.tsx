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

import { Combobox } from "~/components/ui/Combobox";
import { RadioGroup } from "~/components/ui/RadioGroup";
import { SegmentedControl } from "~/components/ui/SegmentedControl";
import { Select } from "~/components/ui/Select";

const ITEMS = [
    { value: "newest", label: "Newest" },
    { value: "stars", label: "Most stars" },
    { value: "name", label: "Name", disabled: true }
];

describe("Select", () => {
    it("forwards ref and native props to the hidden select", () => {
        const ref = createRef<HTMLSelectElement>();
        render(<Select ref={ref} id="sort" name="sort" items={ITEMS} required data-testid="select" />);
        const hidden = screen.getByTestId("select");
        expect(ref.current).toBe(hidden);
        expect(hidden.tagName).toBe("SELECT");
        expect(hidden).toHaveAttribute("id", "sort");
        expect(hidden).toHaveAttribute("name", "sort");
        expect(hidden).toBeRequired();
    });

    it("names the trigger with aria-label instead of the hidden select", () => {
        render(<Select items={ITEMS} aria-label="Sort by" data-testid="select" />);
        expect(screen.getByRole("combobox", { name: "Sort by" })).toBeInTheDocument();
        expect(screen.getByTestId("select")).not.toHaveAttribute("aria-label");
    });

    it("selects an item from the listbox and syncs the hidden select", async () => {
        const ref = createRef<HTMLSelectElement>();
        const onValueChange = rstest.fn();
        render(<Select ref={ref} items={ITEMS} placeholder="Sort by" onValueChange={onValueChange} />);

        const trigger = screen.getByRole("combobox");
        expect(trigger).toHaveTextContent("Sort by");

        await userEvent.click(trigger);
        await userEvent.click(await screen.findByRole("option", { name: "Most stars" }));

        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ["stars"] }));
        expect(trigger).toHaveTextContent("Most stars");
        expect(ref.current).toHaveValue("stars");
    });

    it("supports keyboard selection", async () => {
        const onValueChange = rstest.fn();
        render(<Select items={ITEMS} onValueChange={onValueChange} />);

        screen.getByRole("combobox").focus();
        await userEvent.keyboard("{ArrowDown}");
        await waitFor(() => expect(screen.getByRole("option", { name: "Newest" })).toHaveAttribute("data-highlighted"));
        await userEvent.keyboard("{ArrowDown}");
        await waitFor(() =>
            expect(screen.getByRole("option", { name: "Most stars" })).toHaveAttribute("data-highlighted")
        );
        await userEvent.keyboard("{Enter}");
        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ["stars"] }));
    });

    it("renders item groups in the listbox and optgroups in the hidden select", async () => {
        render(
            <Select
                data-testid="select"
                items={[
                    { value: "all", label: "All" },
                    { label: "Desktop", items: [{ value: "linux", label: "Linux" }] }
                ]}
            />
        );

        await userEvent.click(screen.getByRole("combobox"));
        const group = await screen.findByRole("group");
        expect(group).toHaveTextContent("Desktop");
        expect(group).toContainElement(screen.getByRole("option", { name: "Linux" }));
        expect(group).not.toContainElement(screen.getByRole("option", { name: "All" }));
        expect(screen.getByTestId("select").querySelector("optgroup")).toHaveAttribute("label", "Desktop");
    });
});

describe("Combobox", () => {
    it("filters items by typed text and selects one", async () => {
        const ref = createRef<HTMLInputElement>();
        const onValueChange = rstest.fn();
        render(<Combobox ref={ref} items={ITEMS} placeholder="Search" name="sort" onValueChange={onValueChange} />);

        const input = screen.getByPlaceholderText("Search");
        expect(ref.current).toBe(input);

        // zag syncs the input value asynchronously; zero-delay typing races it.
        const user = userEvent.setup({ delay: 30 });
        await user.type(input, "sta");
        await waitFor(() => expect(screen.getAllByRole("option")).toHaveLength(1));
        await user.click(screen.getByRole("option", { name: "Most stars" }));

        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ["stars"] }));
        expect(input).toHaveValue("Most stars");
    });
});

describe("RadioGroup", () => {
    it("forwards ref to the root and selects items", async () => {
        const ref = createRef<HTMLDivElement>();
        const onValueChange = rstest.fn();
        render(
            <RadioGroup ref={ref} id="sort" name="sort" items={ITEMS} onValueChange={onValueChange} aria-label="Sort" />
        );

        expect(ref.current).toBe(screen.getByRole("radiogroup", { name: "Sort" }));
        expect(ref.current).toHaveAttribute("id", "sort");

        await userEvent.click(screen.getByText("Most stars"));
        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: "stars" }));
        expect(screen.getByRole("radio", { name: "Most stars" })).toBeChecked();
        expect(screen.getByRole("radio", { name: "Name" })).toBeDisabled();
    });
});

describe("SegmentedControl", () => {
    it("switches the checked segment", async () => {
        const onValueChange = rstest.fn();
        render(
            <SegmentedControl
                defaultValue="en-US"
                onValueChange={onValueChange}
                items={[
                    { value: "en-US", label: "EN" },
                    { value: "pt-BR", label: "PT" }
                ]}
            />
        );

        expect(screen.getByRole("radio", { name: "EN" })).toBeChecked();
        await userEvent.click(screen.getByText("PT"));
        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: "pt-BR" }));
    });
});
