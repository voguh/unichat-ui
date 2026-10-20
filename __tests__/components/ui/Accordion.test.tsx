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

import { Accordion } from "~/components/ui/Accordion";

describe("Accordion", () => {
    it("forwards refs and native props", () => {
        const rootRef = createRef<HTMLDivElement>();
        const itemRef = createRef<HTMLDetailsElement>();

        render(
            <Accordion.Root ref={rootRef} id="releases" data-testid="root">
                <Accordion.Item ref={itemRef} title="v1.0.0" data-testid="item">
                    Notes 1
                </Accordion.Item>
            </Accordion.Root>
        );

        expect(rootRef.current).toBe(screen.getByTestId("root"));
        expect(screen.getByTestId("root")).toHaveAttribute("id", "releases");
        expect(itemRef.current).toBe(screen.getByTestId("item"));
    });

    it("toggles items through the summary", async () => {
        render(
            <Accordion.Root>
                <Accordion.Item title="v1.0.0" data-testid="item">
                    Notes 1
                </Accordion.Item>
            </Accordion.Root>
        );

        const item = screen.getByTestId("item");
        expect(item).not.toHaveAttribute("open");

        await userEvent.click(screen.getByText("v1.0.0"));
        expect(item).toHaveAttribute("open");

        await userEvent.click(screen.getByText("v1.0.0"));
        expect(item).not.toHaveAttribute("open");
    });

    it("starts open and applies content props", () => {
        render(
            <Accordion.Item title="v1.0.0" open contentProps={{ className: "custom" }} data-testid="item">
                Notes 1
            </Accordion.Item>
        );

        expect(screen.getByTestId("item")).toHaveAttribute("open");
        expect(screen.getByText("Notes 1")).toHaveClass("custom");
    });
});
