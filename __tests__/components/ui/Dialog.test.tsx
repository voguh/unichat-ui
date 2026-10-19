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

import { Dialog } from "~/components/ui/Dialog";

function renderDialog(
    props: { onOpenChange?: (details: { open: boolean }) => void; onTriggerClick?: () => void } = {}
) {
    const triggerRef = createRef<HTMLButtonElement>();
    const contentRef = createRef<HTMLDivElement>();

    render(
        <Dialog.Root onOpenChange={props.onOpenChange}>
            <Dialog.Trigger ref={triggerRef} data-testid="trigger" onClick={props.onTriggerClick}>
                Open
            </Dialog.Trigger>
            <Dialog.Content ref={contentRef} data-testid="content" className="extra">
                <Dialog.Title>Delete release?</Dialog.Title>
                <Dialog.Description>This cannot be undone.</Dialog.Description>
                <Dialog.CloseTrigger>Close</Dialog.CloseTrigger>
            </Dialog.Content>
        </Dialog.Root>
    );

    return { triggerRef, contentRef };
}

describe("Dialog", () => {
    it("forwards trigger ref and props, keeps closed by default", () => {
        const { triggerRef } = renderDialog();
        expect(triggerRef.current).toBe(screen.getByTestId("trigger"));
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("opens on trigger click chaining user and zag handlers", async () => {
        const onTriggerClick = rstest.fn();
        const onOpenChange = rstest.fn();
        const { contentRef } = renderDialog({ onTriggerClick, onOpenChange });

        await userEvent.click(screen.getByRole("button", { name: "Open" }));

        const dialog = await screen.findByRole("dialog");
        expect(onTriggerClick).toHaveBeenCalledTimes(1);
        expect(onOpenChange).toHaveBeenCalledWith(expect.objectContaining({ open: true }));
        expect(contentRef.current).toBe(dialog);
        expect(dialog).toHaveClass("extra");
        expect(dialog).toHaveAccessibleName("Delete release?");
        expect(dialog).toHaveAccessibleDescription("This cannot be undone.");
    });

    it("closes with the close trigger and Escape", async () => {
        renderDialog();

        await userEvent.click(screen.getByRole("button", { name: "Open" }));
        await userEvent.click(await screen.findByRole("button", { name: "Close" }));
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

        await userEvent.click(screen.getByRole("button", { name: "Open" }));
        await screen.findByRole("dialog");
        await userEvent.keyboard("{Escape}");
        await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    });
});
