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

function renderAccordion(props: { onValueChange?: (details: { value: string[] }) => void } = {}) {
    const rootRef = createRef<HTMLDivElement>();
    const triggerRef = createRef<HTMLButtonElement>();

    render(
        <Accordion.Root ref={rootRef} id="releases" collapsible onValueChange={props.onValueChange} data-testid="root">
            <Accordion.Item value="1.0.0">
                <Accordion.ItemTrigger ref={triggerRef}>
                    v1.0.0
                    <Accordion.ItemIndicator>v</Accordion.ItemIndicator>
                </Accordion.ItemTrigger>
                <Accordion.ItemContent>Notes 1</Accordion.ItemContent>
            </Accordion.Item>
            <Accordion.Item value="0.9.0">
                <Accordion.ItemTrigger>v0.9.0</Accordion.ItemTrigger>
                <Accordion.ItemContent>Notes 0.9</Accordion.ItemContent>
            </Accordion.Item>
        </Accordion.Root>
    );

    return { rootRef, triggerRef };
}

describe("Accordion", () => {
    it("forwards refs, native props and maps id to the root element", () => {
        const { rootRef, triggerRef } = renderAccordion();
        const root = screen.getByTestId("root");
        expect(rootRef.current).toBe(root);
        expect(root).toHaveAttribute("id", "releases");
        expect(triggerRef.current).toBe(screen.getByRole("button", { name: /v1\.0\.0/ }));
    });

    it("toggles items and reports value changes", async () => {
        const onValueChange = rstest.fn();
        renderAccordion({ onValueChange });

        const trigger = screen.getByRole("button", { name: /v1\.0\.0/ });
        expect(trigger).toHaveAttribute("aria-expanded", "false");

        await userEvent.click(trigger);
        expect(trigger).toHaveAttribute("aria-expanded", "true");
        expect(screen.getByText("Notes 1")).toBeVisible();
        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ value: ["1.0.0"] }));

        await userEvent.click(trigger);
        expect(trigger).toHaveAttribute("aria-expanded", "false");
    });

    it("moves focus between triggers with arrow keys", async () => {
        renderAccordion();
        screen.getByRole("button", { name: /v1\.0\.0/ }).focus();
        await userEvent.keyboard("{ArrowDown}");
        expect(screen.getByRole("button", { name: "v0.9.0" })).toHaveFocus();
    });
});
