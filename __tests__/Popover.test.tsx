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

import { Button } from "~/Button";
import { Popover, PopoverButton, PopoverPanel } from "~/Popover";

describe("Popover", () => {
    it("toggles on click, forwards refs and closes on outside click", async () => {
        const buttonRef = createRef<HTMLButtonElement>();
        render(
            <Popover>
                <PopoverButton ref={buttonRef} className="custom">
                    Details
                </PopoverButton>
                <PopoverPanel>Published today</PopoverPanel>
            </Popover>
        );

        const trigger = screen.getByRole("button", { name: "Details" });
        expect(buttonRef.current).toBe(trigger);
        expect(trigger).toHaveClass("custom");
        expect(screen.queryByText("Published today")).not.toBeInTheDocument();

        await userEvent.click(trigger);
        expect(await screen.findByText("Published today")).toBeInTheDocument();
        expect(trigger).toHaveAttribute("aria-expanded", "true");

        await userEvent.click(document.body);
        await waitFor(() => expect(screen.queryByText("Published today")).not.toBeInTheDocument());
    });

    it("exposes the data-part structure", async () => {
        render(
            <Popover>
                <PopoverButton as={Button}>Details</PopoverButton>
                <PopoverPanel>Panel</PopoverPanel>
            </Popover>
        );
        await userEvent.click(screen.getByRole("button", { name: "Details" }));
        await screen.findByText("Panel");
        expect(document.querySelector('[data-part="Popover"] > [data-part="Button PopoverButton"]')).not.toBeNull();
        expect(document.querySelector('[data-part="PopoverPanel"]')).not.toBeNull();
    });
});
