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

import { Disclosure, DisclosureButton, DisclosurePanel } from "~/Disclosure";

describe("Disclosure", () => {
    it("forwards ref and native props and toggles the panel", async () => {
        const ref = createRef<HTMLElement>();
        render(
            <Disclosure ref={ref} id="releases" data-testid="root">
                <DisclosureButton>v1.0.0</DisclosureButton>
                <DisclosurePanel>Notes 1</DisclosurePanel>
            </Disclosure>
        );

        expect(ref.current).toBe(screen.getByTestId("root"));
        expect(screen.getByTestId("root")).toHaveAttribute("id", "releases");
        expect(screen.queryByText("Notes 1")).not.toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: "v1.0.0" }));
        expect(screen.getByText("Notes 1")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: "v1.0.0" }));
        expect(screen.queryByText("Notes 1")).not.toBeInTheDocument();
    });

    it("starts open with defaultOpen", () => {
        render(
            <Disclosure defaultOpen>
                <DisclosureButton>v1.0.0</DisclosureButton>
                <DisclosurePanel className="custom">Notes 1</DisclosurePanel>
            </Disclosure>
        );

        expect(screen.getByText("Notes 1")).toHaveClass("custom");
    });

    it("keeps a single item open per name", async () => {
        render(
            <>
                <Disclosure name="releases">
                    <DisclosureButton>v1.0.0</DisclosureButton>
                    <DisclosurePanel>Notes 1</DisclosurePanel>
                </Disclosure>
                <Disclosure name="releases">
                    <DisclosureButton>v2.0.0</DisclosureButton>
                    <DisclosurePanel>Notes 2</DisclosurePanel>
                </Disclosure>
            </>
        );

        await userEvent.click(screen.getByRole("button", { name: "v1.0.0" }));
        expect(screen.getByText("Notes 1")).toBeInTheDocument();

        await userEvent.click(screen.getByRole("button", { name: "v2.0.0" }));
        expect(screen.getByText("Notes 2")).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByText("Notes 1")).not.toBeInTheDocument());
    });
});
