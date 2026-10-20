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

import { render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import { Tabs } from "~/components/ui/Tabs";

describe("Tabs", () => {
    it("selects tabs by click and arrow keys", async () => {
        const onChange = rstest.fn();
        const rootRef = createRef<HTMLDivElement>();
        render(
            <Tabs
                ref={rootRef}
                items={[
                    { value: "users", label: "Users", content: "Users panel" },
                    { value: "releases", label: "Releases", content: "Releases panel" }
                ]}
                onChange={onChange}
                data-testid="root"
            />
        );

        expect(rootRef.current).toBe(screen.getByTestId("root"));
        expect(screen.getByRole("tab", { name: "Users" })).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Users panel");

        await userEvent.click(screen.getByRole("tab", { name: "Releases" }));
        expect(onChange).toHaveBeenLastCalledWith("releases");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Releases panel");

        await userEvent.keyboard("{ArrowLeft}");
        expect(screen.getByRole("tab", { name: "Users" })).toHaveFocus();
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Users panel");
    });

    it("starts on the default value", () => {
        render(
            <Tabs
                items={[
                    { value: "users", label: "Users", content: "Users panel" },
                    { value: "releases", label: "Releases", content: "Releases panel" }
                ]}
                defaultValue="releases"
            />
        );

        expect(screen.getByRole("tab", { name: "Releases" })).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Releases panel");
    });
});
