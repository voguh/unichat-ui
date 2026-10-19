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

import { Clipboard } from "~/components/ui/Clipboard";
import { Pagination } from "~/components/ui/Pagination";
import { Progress } from "~/components/ui/Progress";
import { QrCode } from "~/components/ui/QrCode";
import { Toaster, toaster } from "~/components/ui/Toast";

describe("Pagination", () => {
    it("renders pages and navigates", async () => {
        const onPageChange = rstest.fn();
        const rootRef = createRef<HTMLElement>();
        render(
            <Pagination.Root ref={rootRef} count={100} pageSize={10} onPageChange={onPageChange} aria-label="Pages">
                <Pagination.PrevTrigger>Prev</Pagination.PrevTrigger>
                <Pagination.Items />
                <Pagination.NextTrigger>Next</Pagination.NextTrigger>
            </Pagination.Root>
        );

        expect(rootRef.current).not.toBeNull();
        expect(rootRef.current!.tagName).toBe("NAV");
        expect(screen.getByRole("button", { name: "previous page" })).toBeDisabled();

        await userEvent.click(screen.getByRole("button", { name: "next page" }));
        expect(onPageChange).toHaveBeenLastCalledWith(expect.objectContaining({ page: 2 }));

        await userEvent.click(screen.getByText("10"));
        expect(onPageChange).toHaveBeenLastCalledWith(expect.objectContaining({ page: 10 }));
        expect(screen.getByRole("button", { name: "next page" })).toBeDisabled();
    });
});

describe("Progress", () => {
    it("exposes value through progressbar role", () => {
        const rootRef = createRef<HTMLDivElement>();
        render(
            <Progress.Root ref={rootRef} value={40} data-testid="root">
                <Progress.Label>Uploading</Progress.Label>
                <Progress.ValueText />
                <Progress.Track>
                    <Progress.Range />
                </Progress.Track>
            </Progress.Root>
        );

        expect(rootRef.current).toBe(screen.getByTestId("root"));
        expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "40");
        expect(screen.getByText("40%")).toBeInTheDocument();
    });
});

describe("Clipboard", () => {
    it("copies the value and flags the copied state", async () => {
        const user = userEvent.setup();
        const onStatusChange = rstest.fn();
        const inputRef = createRef<HTMLInputElement>();
        render(
            <Clipboard.Root value="sha256:abc" onStatusChange={onStatusChange}>
                <Clipboard.Label>Digest</Clipboard.Label>
                <Clipboard.Control>
                    <Clipboard.Input ref={inputRef} />
                    <Clipboard.Trigger>
                        <Clipboard.Indicator copied>Copied</Clipboard.Indicator>
                        <Clipboard.Indicator copied={false}>Copy</Clipboard.Indicator>
                    </Clipboard.Trigger>
                </Clipboard.Control>
            </Clipboard.Root>
        );

        expect(inputRef.current).toHaveValue("sha256:abc");
        await user.click(screen.getByRole("button"));
        await waitFor(() => expect(onStatusChange).toHaveBeenCalledWith(expect.objectContaining({ copied: true })));
        expect(await navigator.clipboard.readText()).toBe("sha256:abc");
    });
});

describe("QrCode", () => {
    it("renders the svg pattern for the value", () => {
        const frameRef = createRef<SVGSVGElement>();
        render(
            <QrCode.Root value="https://unichat.voguh.me" data-testid="root">
                <QrCode.Frame ref={frameRef} />
                <QrCode.DownloadTrigger fileName="qr.png">Download</QrCode.DownloadTrigger>
            </QrCode.Root>
        );

        expect(frameRef.current).not.toBeNull();
        expect(frameRef.current!.tagName.toLowerCase()).toBe("svg");

        const path = frameRef.current!.querySelector("path");
        expect(path).not.toBeNull();
        expect(path!.getAttribute("d")).toBeTruthy();
        expect(screen.getByRole("button", { name: "Download" })).toBeInTheDocument();
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
});
