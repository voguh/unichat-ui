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

import { RadioGroup } from "~/RadioGroup";

const ITEMS = [
    { value: "newest", label: "Newest" },
    { value: "stars", label: "Most stars" },
    { value: "name", label: "Name", disabled: true }
];

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

    it("exposes the data-part and data-slot structure", () => {
        render(<RadioGroup items={ITEMS} />);
        expect(document.querySelector('[data-part="RadioGroup"] > label > input')).not.toBeNull();
        expect(document.querySelector('[data-part="RadioGroup"] > label > [data-slot="control"]')).not.toBeNull();
        expect(document.querySelector('[data-part="RadioGroup"] > label > [data-slot="label"]')).not.toBeNull();
    });
});
