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

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ColorPicker } from "~/ColorPicker";
import { DatePicker } from "~/DatePicker";
import { FileUpload } from "~/FileUpload";

describe("DatePicker", () => {
    it("forwards ref and native props to the date input", () => {
        const ref = createRef<HTMLInputElement>();
        render(<DatePicker ref={ref} id="published-at" name="publishedAt" locale="en-US" data-testid="input" />);
        const input = screen.getByTestId("input");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("type", "date");
        expect(input).toHaveAttribute("id", "published-at");
        expect(input).toHaveAttribute("name", "publishedAt");
    });

    it("picks a date and fires the native input and change events", async () => {
        const onInput = rstest.fn();
        const onChange = rstest.fn();
        const { container } = render(
            <DatePicker defaultValue="2026-10-24" onInput={onInput} onChange={onChange} data-testid="input" />
        );
        const root = container.querySelector("[data-part~='DatePicker']");

        await userEvent.click(screen.getByTestId("input"));
        expect(root).toHaveAttribute("data-open");

        await userEvent.click(container.querySelector<HTMLButtonElement>("button[data-date='2026-10-15']")!);

        const input = screen.getByTestId<HTMLInputElement>("input");
        expect(input).toHaveValue("2026-10-15");
        expect(input.valueAsDate).toEqual(new Date("2026-10-15T00:00:00Z"));
        expect(root).not.toHaveAttribute("data-open");
        expect(onInput).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.lastCall![0].target).toBe(input);
    });

    it("selects the typed date in the calendar", async () => {
        const { container } = render(<DatePicker data-testid="input" />);

        await userEvent.type(screen.getByTestId("input"), "2026-02-28");

        expect(screen.getByTestId("input")).toHaveValue("2026-02-28");
        await waitFor(() => {
            expect(container.querySelector("button[data-date='2026-02-28']")).toHaveAttribute("data-selected");
        });
    });

    it("disables days outside min and max", async () => {
        const { container } = render(<DatePicker min="2026-10-05" max="2026-10-25" defaultValue="2026-10-10" />);

        await userEvent.click(container.querySelector<HTMLInputElement>("input[type='date']")!);
        expect(container.querySelector("button[data-date='2026-10-04']")).toBeDisabled();
        expect(container.querySelector("button[data-date='2026-10-05']")).toBeEnabled();
        expect(container.querySelector("button[data-date='2026-10-26']")).toBeDisabled();
        expect(await screen.findByRole("button", { name: "Previous month" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
    });

    it("moves through the grid with the keyboard and closes with Escape", async () => {
        const onChange = rstest.fn();
        const { container } = render(<DatePicker defaultValue="2026-10-24" onChange={onChange} data-testid="input" />);
        const root = container.querySelector("[data-part~='DatePicker']");

        await userEvent.click(screen.getByTestId("input"));
        await userEvent.keyboard("{Alt>}{ArrowDown}{/Alt}");
        expect(container.querySelector("button[data-date='2026-10-24']")).toHaveFocus();

        await userEvent.keyboard("{ArrowRight}{ArrowDown}");
        expect(container.querySelector("button[data-date='2026-11-01']")).toHaveFocus();

        await userEvent.keyboard("{Enter}");
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId("input")).toHaveValue("2026-11-01");

        await userEvent.click(screen.getByTestId("input"));
        expect(root).toHaveAttribute("data-open");
        await userEvent.keyboard("{Escape}");
        expect(root).not.toHaveAttribute("data-open");
        expect(screen.getByTestId("input")).toHaveFocus();
    });
});

describe("ColorPicker", () => {
    it("forwards ref and native props to the visible input", () => {
        const ref = createRef<HTMLInputElement>();
        render(<ColorPicker ref={ref} id="accent" name="accent" defaultValue="#991b1b" />);
        expect(ref.current).toHaveAttribute("id", "accent");
        expect(ref.current).toHaveAttribute("name", "accent");
        expect(ref.current).toHaveAttribute("type", "text");
        expect(ref.current).toHaveValue("#991b1b");
    });

    it("selects a swatch and dispatches a native change", async () => {
        const ref = createRef<HTMLInputElement>();
        const onChange = rstest.fn();
        render(<ColorPicker ref={ref} swatches={["#2563eb"]} onChange={onChange} />);

        await userEvent.click(ref.current as HTMLInputElement);
        await userEvent.click(await screen.findByRole("button", { name: "#2563eb" }));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(ref.current).toHaveValue("#2563eb");
    });

    it("opens on focus and closes with Escape and outside clicks", async () => {
        const ref = createRef<HTMLInputElement>();
        const { container } = render(<ColorPicker ref={ref} />);
        const root = container.querySelector("[data-part='ColorPicker']");

        await userEvent.tab();
        expect(ref.current).toHaveFocus();
        expect(root).toHaveAttribute("data-open");

        await userEvent.keyboard("{Escape}");
        expect(root).not.toHaveAttribute("data-open");

        await userEvent.click(ref.current as HTMLInputElement);
        expect(root).toHaveAttribute("data-open");

        await userEvent.click(document.body);
        expect(root).not.toHaveAttribute("data-open");
    });
});

describe("FileUpload", () => {
    it("forwards ref to the file input, lists and removes selected files", async () => {
        const ref = createRef<HTMLInputElement>();
        const onChange = rstest.fn();
        render(
            <FileUpload ref={ref} id="assets" name="assets" onChange={onChange}>
                Drop files here
            </FileUpload>
        );

        expect(ref.current).toHaveAttribute("type", "file");
        expect(ref.current).toHaveAttribute("id", "assets");
        expect(screen.getByText("Drop files here")).toBeInTheDocument();

        const file = new File(["data"], "unichat.zip", { type: "application/zip" });
        await userEvent.upload(ref.current as HTMLInputElement, file);

        expect(await screen.findByText("unichat.zip")).toBeInTheDocument();
        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("marks the dropzone while dragging", () => {
        render(<FileUpload data-testid="input">Drop files here</FileUpload>);
        const dropzone = screen.getByText("Drop files here");

        fireEvent.dragOver(dropzone);
        expect(dropzone).toHaveAttribute("data-dragging");

        fireEvent.dragLeave(dropzone);
        return waitFor(() => expect(dropzone).not.toHaveAttribute("data-dragging"));
    });
});
