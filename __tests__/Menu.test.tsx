/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import { Menu, MenuButton, MenuItem, MenuItems } from "~/Menu";

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
});
