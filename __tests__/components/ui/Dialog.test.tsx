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

import { Dialog } from "~/components/ui/Dialog";

describe("Dialog", () => {
    it("renders nothing while closed", () => {
        render(
            <Dialog open={false} onClose={() => {}} title="Settings">
                Body
            </Dialog>
        );

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("forwards ref and props, renders title, actions, size and body props", async () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <Dialog
                ref={ref}
                open
                onClose={() => {}}
                size="xl"
                title="Settings"
                actions={<button type="button">Save</button>}
                bodyProps={{ className: "custom-body" }}
                className="extra"
                data-tour="settings"
            >
                Body
            </Dialog>
        );

        const dialog = await screen.findByRole("dialog");
        expect(ref.current).toBe(dialog);
        expect(dialog).toHaveClass("extra");
        expect(dialog).toHaveAttribute("data-tour", "settings");
        expect(dialog).toHaveAttribute("data-size", "xl");
        expect(dialog).toHaveAccessibleName("Settings");
        expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
        expect(screen.getByText("Body")).toHaveClass("custom-body");
    });

    it("calls onClose from the close button, Escape and outside click", async () => {
        const onClose = rstest.fn();
        render(
            <Dialog open onClose={onClose} title="Settings">
                Body
            </Dialog>
        );

        await userEvent.click(await screen.findByRole("button", { name: "Close" }));
        expect(onClose).toHaveBeenCalledTimes(1);

        await userEvent.keyboard("{Escape}");
        expect(onClose).toHaveBeenCalledTimes(2);

        await userEvent.click(document.body);
        expect(onClose).toHaveBeenCalledTimes(3);
    });

    it("respects disabled dismiss options, close button, backdrop and portal", async () => {
        const onClose = rstest.fn();
        const { container } = render(
            <Dialog
                open
                onClose={onClose}
                role="alertdialog"
                title="Tour"
                withCloseButton={false}
                backdrop={false}
                portal={false}
                closeOnEscape={false}
                closeOnInteractOutside={false}
            />
        );

        const dialog = await screen.findByRole("alertdialog");
        expect(container).toContainElement(dialog);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
        expect(container.childElementCount).toBe(1);

        await userEvent.keyboard("{Escape}");
        await userEvent.click(document.body);
        expect(onClose).not.toHaveBeenCalled();
    });
});
