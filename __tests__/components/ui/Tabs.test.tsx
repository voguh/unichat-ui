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

import { Tabs } from "~/components/ui/Tabs";

describe("Tabs", () => {
    it("selects tabs by click and arrow keys", async () => {
        const onValueChange = rstest.fn();
        const rootRef = createRef<HTMLDivElement>();
        render(
            <Tabs.Root ref={rootRef} defaultValue="users" onValueChange={onValueChange} data-testid="root">
                <Tabs.List>
                    <Tabs.Trigger value="users">Users</Tabs.Trigger>
                    <Tabs.Trigger value="releases">Releases</Tabs.Trigger>
                    <Tabs.Indicator />
                </Tabs.List>
                <Tabs.Content value="users">Users panel</Tabs.Content>
                <Tabs.Content value="releases">Releases panel</Tabs.Content>
            </Tabs.Root>
        );

        expect(rootRef.current).toBe(screen.getByTestId("root"));
        expect(screen.getByRole("tab", { name: "Users" })).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Users panel");

        await userEvent.click(screen.getByRole("tab", { name: "Releases" }));
        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: "releases" }));
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Releases panel");

        await userEvent.keyboard("{ArrowLeft}");
        await waitFor(() => expect(screen.getByRole("tab", { name: "Users" })).toHaveFocus());
    });
});
