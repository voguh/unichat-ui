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

import { Menu, MenuButton, MenuHeading, MenuItem, MenuItems, MenuSection, MenuSeparator } from "~/Menu";

describe("Menu", () => {
    it("opens the items and runs the item click", async () => {
        const onClick = rstest.fn();
        const user = userEvent.setup();
        render(
            <Menu>
                <MenuButton>Actions</MenuButton>
                <MenuItems>
                    <MenuItem onClick={onClick}>Edit</MenuItem>
                </MenuItems>
            </Menu>
        );

        await user.click(screen.getByRole("button", { name: "Actions" }));
        await user.click(await screen.findByRole("menuitem", { name: "Edit" }));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("exposes the data-part structure", async () => {
        render(
            <Menu>
                <MenuButton>Actions</MenuButton>
                <MenuItems>
                    <MenuSection>
                        <MenuHeading>Release</MenuHeading>
                        <MenuItem>Edit</MenuItem>
                    </MenuSection>
                    <MenuSeparator />
                </MenuItems>
            </Menu>
        );
        await userEvent.click(screen.getByRole("button", { name: "Actions" }));
        await screen.findByRole("menu");
        expect(document.querySelector('[data-part="Menu"] > [data-part="MenuButton"]')).not.toBeNull();
        expect(document.querySelector('[data-part="MenuItems"] > [data-part="MenuSection"]')).not.toBeNull();
        expect(document.querySelector('[data-part="MenuSection"] > [data-part="MenuHeading"]')).not.toBeNull();
        expect(document.querySelector('[data-part="MenuSection"] > [data-part="MenuItem"]')).not.toBeNull();
        expect(document.querySelector('[data-part="MenuItems"] > [data-part="MenuSeparator"]')).not.toBeNull();
    });
});
