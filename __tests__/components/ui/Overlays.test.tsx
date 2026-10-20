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
    it("opens content in a portal and closes with the close trigger", async () => {
        const contentRef = createRef<HTMLDivElement>();
        render(
            <Popover.Root>
                <Popover.Trigger>Details</Popover.Trigger>
                <Popover.Content ref={contentRef} data-testid="content">
                    <Popover.Arrow />
                    <Popover.Title>Release</Popover.Title>
                    <Popover.Description>Published today</Popover.Description>
                    <Popover.CloseTrigger>Close</Popover.CloseTrigger>
                </Popover.Content>
            </Popover.Root>
        );

        expect(screen.queryByTestId("content")).not.toBeInTheDocument();
        await userEvent.click(screen.getByRole("button", { name: "Details" }));

        const content = await screen.findByTestId("content");
        expect(contentRef.current).toBe(content);
        expect(content).toHaveAttribute("role", "dialog");
        expect(screen.getByRole("heading", { name: "Release" })).toBeInTheDocument();

        await userEvent.click(screen.getByText("Close"));
        await waitFor(() => expect(screen.queryByTestId("content")).not.toBeInTheDocument());
    });

    it("uses the child as trigger with asChild", async () => {
        const ref = createRef<HTMLButtonElement>();
        render(
            <Popover.Root>
                <Popover.Trigger asChild ref={ref}>
                    <button type="button" className="custom">
                        Details
                    </button>
                </Popover.Trigger>
                <Popover.Content data-testid="content">Release</Popover.Content>
            </Popover.Root>
        );

        const trigger = screen.getByRole("button", { name: "Details" });
        expect(ref.current).toBe(trigger);
        expect(trigger).toHaveClass("custom");
        await userEvent.click(trigger);
        expect(await screen.findByTestId("content")).toBeInTheDocument();
    });

    it("opens while the anchor has focus with openOn focus", async () => {
        render(
            <Popover.Root openOn="focus">
                <Popover.Anchor>
                    <input aria-label="Channel" />
                </Popover.Anchor>
                <Popover.Content data-testid="content">Hint</Popover.Content>
            </Popover.Root>
        );

        await userEvent.click(screen.getByLabelText("Channel"));
        expect(await screen.findByTestId("content")).toBeInTheDocument();

        await userEvent.tab();
        await waitFor(() => expect(screen.queryByTestId("content")).not.toBeInTheDocument());
    });
});

describe("Tooltip", () => {
    it("shows on focus and hides on Escape", async () => {
        render(
            <Tooltip.Root openDelay={0} closeDelay={0}>
                <Tooltip.Trigger>Info</Tooltip.Trigger>
                <Tooltip.Content>
                    <Tooltip.Arrow />
                    Helpful text
                </Tooltip.Content>
            </Tooltip.Root>
        );

        await userEvent.tab();
        expect(screen.getByRole("button", { name: "Info" })).toHaveFocus();
        expect(await screen.findByRole("tooltip")).toHaveTextContent("Helpful text");

        await userEvent.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("tooltip")).not.toBeInTheDocument());
    });

    it("uses the child as trigger with asChild", async () => {
        render(
            <Tooltip.Root openDelay={0} closeDelay={0}>
                <Tooltip.Trigger asChild>
                    <button type="button" data-tour="settings">
                        Settings
                    </button>
                </Tooltip.Trigger>
                <Tooltip.Content>Open settings</Tooltip.Content>
            </Tooltip.Root>
        );

        expect(screen.getAllByRole("button")).toHaveLength(1);
        await userEvent.tab();
        expect(screen.getByRole("button", { name: "Settings" })).toHaveAttribute("data-tour", "settings");
        expect(await screen.findByRole("tooltip")).toHaveTextContent("Open settings");
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
