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

import { Clipboard } from "~/Clipboard";
import { Pagination } from "~/Pagination";
import { Progress } from "~/Progress";
import { QrCode } from "~/QrCode";
import { Toaster, toaster } from "~/Toast";

// jsdom has no canvas for lean-qr's toDataURL.
rstest.mock("lean-qr", () => ({ generate: () => ({ toDataURL: () => "data:image/png;base64,qr" }) }));

describe("Pagination", () => {
    it("renders pages and navigates", async () => {
        const onChange = rstest.fn();
        const rootRef = createRef<HTMLElement>();
        const { rerender } = render(
            <Pagination ref={rootRef} count={100} pageSize={10} page={1} onChange={onChange} aria-label="Pages" />
        );

        expect(rootRef.current!.tagName).toBe("NAV");
        expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
        expect(screen.getByText("1")).toHaveAttribute("aria-current", "page");

        await userEvent.click(screen.getByRole("button", { name: "Next page" }));
        expect(onChange).toHaveBeenLastCalledWith(2);

        await userEvent.click(screen.getByText("10"));
        expect(onChange).toHaveBeenLastCalledWith(10);

        rerender(<Pagination count={100} pageSize={10} page={10} onChange={onChange} aria-label="Pages" />);
        expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
    });
});

describe("Progress", () => {
    it("exposes value through progressbar role", () => {
        const rootRef = createRef<HTMLDivElement>();
        render(<Progress ref={rootRef} value={40} label="Uploading" data-testid="root" />);

        expect(rootRef.current).toBe(screen.getByTestId("root"));
        expect(screen.getByRole("progressbar", { name: "Uploading" })).toHaveAttribute("aria-valuenow", "40");
        expect(screen.getByText("40%")).toBeInTheDocument();
    });

    it("omits the value when indeterminate", () => {
        render(<Progress value={null} />);

        expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
        expect(screen.queryByText(/%$/)).not.toBeInTheDocument();
    });
});

describe("Clipboard", () => {
    it("copies the value and flags the copied state", async () => {
        const user = userEvent.setup();
        render(<Clipboard value="sha256:abc" label="Digest" />);

        expect(screen.getByLabelText("Digest")).toHaveValue("sha256:abc");
        const trigger = screen.getByRole("button", { name: "Copy to clipboard" });
        await user.click(trigger);

        expect(await navigator.clipboard.readText()).toBe("sha256:abc");
        expect(trigger.querySelector(".fa-check")).not.toBeNull();
    });
});

describe("QrCode", () => {
    it("renders the generated image for the value", () => {
        const ref = createRef<HTMLImageElement>();
        render(<QrCode ref={ref} value="https://unichat.voguh.me" alt="QR code" />);

        expect(ref.current).toBe(screen.getByRole("img", { name: "QR code" }));
        expect(ref.current).toHaveAttribute("src", "data:image/png;base64,qr");
    });
});

describe("Toaster", () => {
    it("renders toasts created through the store", async () => {
        render(<Toaster data-testid="group" />);
        toaster.create({ title: "Saved", description: "Release updated", type: "success" });

        expect(await screen.findByText("Saved")).toBeInTheDocument();
        expect(screen.getByText("Release updated")).toBeInTheDocument();
        toaster.remove();
    });

    it("renders the type icon or a custom icon", async () => {
        render(<Toaster />);
        toaster.create({ title: "Saved", type: "success" });
        toaster.create({ title: "Raid", type: "info", icon: <i className="fas fa-users" /> });

        const saved = (await screen.findByText("Saved")).closest("[role='status']");
        const raid = (await screen.findByText("Raid")).closest("[role='status']");
        expect(saved!.querySelector(".fa-check-circle")).not.toBeNull();
        expect(raid!.querySelector(".fa-users")).not.toBeNull();
        expect(raid!.querySelector(".fa-info-circle")).toBeNull();
        toaster.remove();
    });
});
