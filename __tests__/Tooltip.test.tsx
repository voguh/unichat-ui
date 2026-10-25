/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Tooltip } from "~/Tooltip";

describe("Tooltip", () => {
    it("shows on focus, keeps child props and hides on Escape", async () => {
        render(
            <Tooltip content="Open settings">
                <button type="button" data-tour="settings">
                    Settings
                </button>
            </Tooltip>
        );

        expect(screen.getAllByRole("button")).toHaveLength(1);
        await userEvent.tab();
        expect(screen.getByRole("button", { name: "Settings" })).toHaveAttribute("data-tour", "settings");
        expect(await screen.findByRole("tooltip")).toHaveTextContent("Open settings");

        await userEvent.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
    });

    it("shows while a descendant of a wrapper child has focus", async () => {
        render(
            <Tooltip content="Hint">
                <div>
                    <input aria-label="Channel" />
                </div>
            </Tooltip>
        );

        await userEvent.tab();
        expect(screen.getByLabelText("Channel")).toHaveFocus();
        expect(await screen.findByRole("tooltip")).toHaveTextContent("Hint");
    });

    it("exposes the data-part and data-slot structure", () => {
        render(
            <Tooltip content="Hint">
                <button type="button">Trigger</button>
            </Tooltip>
        );
        expect(
            document.querySelector('[data-part="Tooltip"] > [data-slot="content"] > [data-slot="arrow"] > div')
        ).not.toBeNull();
    });
});
