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

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "~/Tabs";

describe("Tabs", () => {
    it("selects tabs by click and arrow keys", async () => {
        const onChange = rstest.fn();
        const rootRef = createRef<HTMLElement>();
        render(
            <TabGroup ref={rootRef} onChange={onChange} data-testid="root">
                <TabList>
                    <Tab>Users</Tab>
                    <Tab>Releases</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>Users panel</TabPanel>
                    <TabPanel>Releases panel</TabPanel>
                </TabPanels>
            </TabGroup>
        );

        expect(rootRef.current).toBe(screen.getByTestId("root"));
        expect(screen.getByRole("tab", { name: "Users" })).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Users panel");

        await userEvent.click(screen.getByRole("tab", { name: "Releases" }));
        expect(onChange).toHaveBeenLastCalledWith(1);
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Releases panel");

        await userEvent.keyboard("{ArrowLeft}");
        expect(screen.getByRole("tab", { name: "Users" })).toHaveFocus();
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Users panel");
    });

    it("starts on the default index", () => {
        render(
            <TabGroup defaultIndex={1}>
                <TabList>
                    <Tab>Users</Tab>
                    <Tab>Releases</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>Users panel</TabPanel>
                    <TabPanel>Releases panel</TabPanel>
                </TabPanels>
            </TabGroup>
        );

        expect(screen.getByRole("tab", { name: "Releases" })).toHaveAttribute("aria-selected", "true");
        expect(screen.getByRole("tabpanel")).toHaveTextContent("Releases panel");
    });

    it("exposes the data-part structure", () => {
        render(
            <TabGroup>
                <TabList variant="segmented">
                    <Tab>One</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>Panel</TabPanel>
                </TabPanels>
            </TabGroup>
        );
        expect(
            document.querySelector(
                '[data-part="TabGroup"] > [data-part="TabList"][data-variant="segmented"] > [data-part="Tab"]'
            )
        ).not.toBeNull();
        expect(
            document.querySelector('[data-part="TabGroup"] > [data-part="TabPanels"] > [data-part="TabPanel"]')
        ).not.toBeNull();
    });
});
