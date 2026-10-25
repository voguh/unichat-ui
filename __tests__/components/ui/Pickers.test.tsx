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

import { fireEvent, render, screen, waitFor } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import { ColorPicker } from "~/components/ui/ColorPicker";
import { DatePicker, getLocaleDateFormat } from "~/components/ui/DatePicker";
import { FileUpload } from "~/components/ui/FileUpload";

describe("DatePicker", () => {
    it("forwards ref and native props to the input", () => {
        const ref = createRef<HTMLInputElement>();
        render(<DatePicker ref={ref} id="published-at" name="publishedAt" locale="en-US" data-testid="input" />);
        const input = screen.getByTestId("input");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("id", "published-at");
        expect(input).toHaveAttribute("name", "publishedAt");
    });

    it("derives the default format from the locale", () => {
        expect(getLocaleDateFormat("en-US")).toBe("MM/DD/YYYY");
        expect(getLocaleDateFormat("pt-BR")).toBe("DD/MM/YYYY");

        render(<DatePicker locale="pt-BR" data-testid="input" />);
        expect(screen.getByTestId("input")).toHaveAttribute("placeholder", "DD/MM/YYYY");
    });

    it("uses the format prop over the locale", () => {
        render(<DatePicker locale="pt-BR" format="YYYY-MM-DD" defaultValue="2026-10-24" data-testid="input" />);
        const input = screen.getByTestId("input");
        expect(input).toHaveAttribute("placeholder", "YYYY-MM-DD");
        expect(input).toHaveValue("2026-10-24");
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

        await userEvent.click(screen.getByRole("button", { name: "Open color picker" }));
        await userEvent.click(await screen.findByRole("button", { name: "#2563eb" }));

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(ref.current).toHaveValue("#2563eb");
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
