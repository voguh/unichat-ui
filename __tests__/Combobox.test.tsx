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

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Combobox } from "~/Combobox";

const ITEMS = [
    { value: "newest", label: "Newest" },
    { value: "stars", label: "Most stars" },
    { value: "name", label: "Name", disabled: true }
];

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

    it("exposes the data-part and data-slot structure", async () => {
        render(<Combobox options={ITEMS} aria-label="Combobox" />);
        expect(document.querySelector('[data-part="Combobox"] > [data-slot="control"] > input')).not.toBeNull();
        expect(
            document.querySelector('[data-part="Combobox"] > [data-slot="control"] > [data-slot="trigger"]')
        ).not.toBeNull();

        await userEvent.click(screen.getByRole("combobox", { name: "Combobox" }));
        await userEvent.keyboard("{ArrowDown}");
        await screen.findByRole("listbox");
        const viewport = '[data-part="ComboboxOptions"] > [data-part="ScrollableView"] > [data-slot="viewport"]';
        expect(document.querySelector(`${viewport} > [data-slot="option"]`)).not.toBeNull();
    });
});
