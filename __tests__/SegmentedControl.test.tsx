/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SegmentedControl } from "~/SegmentedControl";

const ITEMS = [
    { value: "en-US", label: "EN" },
    { value: "pt-BR", label: "PT" }
];

describe("SegmentedControl", () => {
    it("switches the checked segment", async () => {
        render(<SegmentedControl defaultValue="en-US" items={ITEMS} />);

        expect(screen.getByRole("radio", { name: "EN" })).toBeChecked();
        await userEvent.click(screen.getByText("PT"));
        expect(screen.getByRole("radio", { name: "PT" })).toBeChecked();
    });

    it("exposes the data-part structure", () => {
        render(<SegmentedControl items={ITEMS} />);
        expect(document.querySelector('[data-part="SegmentedControl"] > label > input')).not.toBeNull();
    });
});
