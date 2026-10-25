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

import {
    Dialog,
    DialogBackdrop,
    DialogBody,
    DialogCloseButton,
    DialogHeader,
    DialogPanel,
    DialogTitle
} from "~/components/ui/Dialog";

describe("Dialog", () => {
    it("renders nothing while closed", () => {
        render(
            <Dialog open={false} onClose={() => {}}>
                <DialogPanel>Body</DialogPanel>
            </Dialog>
        );

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("forwards ref and props, names the dialog by its title and sizes the panel", async () => {
        const ref = createRef<HTMLElement>();
        const panelRef = createRef<HTMLElement>();
        render(
            <Dialog ref={ref} open onClose={() => {}} className="extra" data-tour="settings">
                <DialogBackdrop />
                <DialogPanel ref={panelRef} size="xl">
                    <DialogHeader>
                        <DialogTitle>Settings</DialogTitle>
                        <DialogCloseButton />
                    </DialogHeader>
                    <DialogBody className="custom-body">Body</DialogBody>
                </DialogPanel>
            </Dialog>
        );

        const dialog = await screen.findByRole("dialog");
        expect(ref.current).toBe(dialog);
        expect(dialog).toHaveClass("extra");
        expect(dialog).toHaveAttribute("data-tour", "settings");
        expect(dialog).toHaveAccessibleName("Settings");
        expect(panelRef.current).toHaveAttribute("data-size", "xl");
        expect(screen.getByText("Body")).toHaveClass("custom-body");
    });

    it("calls onClose from the close button and Escape", async () => {
        const onClose = rstest.fn();
        render(
            <Dialog open onClose={onClose}>
                <DialogPanel>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogCloseButton />
                </DialogPanel>
            </Dialog>
        );

        await userEvent.click(await screen.findByRole("button", { name: "Close" }));
        expect(onClose).toHaveBeenCalledTimes(1);

        await userEvent.keyboard("{Escape}");
        expect(onClose).toHaveBeenCalledTimes(2);
    });

    it("ignores outside clicks with closeOnInteractOutside disabled but still closes on Escape", async () => {
        const onClose = rstest.fn();
        render(
            <Dialog open onClose={onClose} closeOnInteractOutside={false}>
                <DialogBackdrop data-testid="backdrop" />
                <DialogPanel>
                    <DialogTitle>Tour</DialogTitle>
                </DialogPanel>
            </Dialog>
        );

        await screen.findByRole("dialog");
        await userEvent.click(screen.getByTestId("backdrop"));
        expect(onClose).not.toHaveBeenCalled();

        await userEvent.keyboard("{Escape}");
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("calls onClose from the close button with closeOnInteractOutside disabled", async () => {
        const onClose = rstest.fn();
        render(
            <Dialog open onClose={onClose} closeOnInteractOutside={false}>
                <DialogBackdrop />
                <DialogPanel>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogCloseButton />
                </DialogPanel>
            </Dialog>
        );

        await userEvent.click(await screen.findByRole("button", { name: "Close" }));
        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
