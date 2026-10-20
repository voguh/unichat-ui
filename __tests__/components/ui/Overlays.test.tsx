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

import { Dropdown } from "~/components/ui/Dropdown";
import { Popover } from "~/components/ui/Popover";
import { Tooltip } from "~/components/ui/Tooltip";

describe("Popover", () => {
    it("toggles on click, keeps child props and ref, and closes on outside click", async () => {
        const ref = createRef<HTMLButtonElement>();
        render(
            <Popover title="Release" content="Published today">
                <button ref={ref} type="button" className="custom">
                    Details
                </button>
            </Popover>
        );

        const trigger = screen.getByRole("button", { name: "Details" });
        expect(ref.current).toBe(trigger);
        expect(trigger).toHaveClass("custom");
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

        await userEvent.click(trigger);
        expect(await screen.findByRole("dialog", { name: "Release" })).toHaveTextContent("Published today");
        expect(trigger).toHaveAttribute("aria-expanded", "true");

        await userEvent.click(document.body);
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    });

    it("opens while the child has focus with trigger focus", async () => {
        render(
            <Popover trigger="focus" content="Hint">
                <div>
                    <input aria-label="Channel" />
                </div>
            </Popover>
        );

        await userEvent.click(screen.getByLabelText("Channel"));
        expect(await screen.findByRole("dialog")).toHaveTextContent("Hint");

        await userEvent.tab();
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    });
});

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
});

describe("Dropdown", () => {
    it("opens the menu, navigates with keyboard and selects an item", async () => {
        const onSelect = rstest.fn();
        const itemRef = createRef<HTMLDivElement>();
        render(
            <Dropdown.Root onSelect={onSelect}>
                <Dropdown.Trigger>Actions</Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.ItemGroup id="manage">
                        <Dropdown.ItemGroupLabel htmlFor="manage">Manage</Dropdown.ItemGroupLabel>
                        <Dropdown.Item ref={itemRef} value="edit">
                            Edit
                        </Dropdown.Item>
                        <Dropdown.Separator />
                        <Dropdown.Item value="delete">Delete</Dropdown.Item>
                    </Dropdown.ItemGroup>
                </Dropdown.Content>
            </Dropdown.Root>
        );

        await userEvent.click(screen.getByRole("button", { name: "Actions" }));
        const menu = await screen.findByRole("menu");
        expect(itemRef.current).toBe(screen.getByRole("menuitem", { name: "Edit" }));

        await userEvent.click(screen.getByRole("menuitem", { name: "Delete" }));
        expect(onSelect).toHaveBeenCalledWith(expect.objectContaining({ value: "delete" }));
        await waitFor(() => expect(menu).not.toBeInTheDocument());
    });

    it("renders radio option items and reports checked changes", async () => {
        const onCheckedChange = rstest.fn();
        render(
            <Dropdown.Root>
                <Dropdown.Trigger>Language</Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.OptionItem type="radio" value="en" checked>
                        English
                    </Dropdown.OptionItem>
                    <Dropdown.OptionItem type="radio" value="pt" checked={false} onCheckedChange={onCheckedChange}>
                        Português
                    </Dropdown.OptionItem>
                </Dropdown.Content>
            </Dropdown.Root>
        );

        await userEvent.click(screen.getByRole("button", { name: "Language" }));
        expect(await screen.findByRole("menuitemradio", { name: "English" })).toHaveAttribute("aria-checked", "true");

        await userEvent.click(screen.getByRole("menuitemradio", { name: "Português" }));
        expect(onCheckedChange).toHaveBeenCalledWith(true);
    });
});
