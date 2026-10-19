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
import * as colorPicker from "@zag-js/color-picker";
import * as datePicker from "@zag-js/date-picker";

import { ColorPicker } from "~/components/ui/ColorPicker";
import { DatePicker } from "~/components/ui/DatePicker";
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

    it("selects a day from the calendar", async () => {
        const onValueChange = rstest.fn();
        render(
            <DatePicker
                locale="en-US"
                defaultFocusedValue={datePicker.parse("2026-10-01")}
                onValueChange={onValueChange}
                data-testid="input"
            />
        );

        await userEvent.click(screen.getByRole("button", { name: /calendar/i }));
        await userEvent.click(await screen.findByText("15"));

        expect(onValueChange).toHaveBeenLastCalledWith(expect.objectContaining({ valueAsString: ["10/15/2026"] }));
        await waitFor(() => expect(screen.getByTestId("input")).toHaveValue("10/15/2026"));
    });
});

describe("ColorPicker", () => {
    it("forwards ref to the hidden input carrying the value", () => {
        const ref = createRef<HTMLInputElement>();
        render(<ColorPicker ref={ref} id="accent" name="accent" defaultValue={colorPicker.parse("#991b1b")} />);
        expect(ref.current).toHaveAttribute("id", "accent");
        expect(ref.current).toHaveAttribute("name", "accent");
        expect(ref.current).toHaveValue("rgba(153, 27, 27, 1)");
    });

    it("selects a swatch", async () => {
        const onValueChange = rstest.fn();
        render(<ColorPicker swatches={["#2563eb"]} onValueChange={onValueChange} />);

        await userEvent.click(screen.getAllByRole("button")[0]);
        await userEvent.click(await screen.findByRole("button", { name: /#2563eb/i }));
        expect(onValueChange).toHaveBeenLastCalledWith(
            expect.objectContaining({ valueAsString: "rgba(37, 99, 235, 1)" })
        );
    });
});

describe("FileUpload", () => {
    it("forwards ref to the file input and lists accepted files", async () => {
        const ref = createRef<HTMLInputElement>();
        const onFileChange = rstest.fn();
        render(
            <FileUpload ref={ref} id="assets" name="assets" maxFiles={2} onFileChange={onFileChange}>
                Drop files here
            </FileUpload>
        );

        expect(ref.current).toHaveAttribute("type", "file");
        expect(ref.current).toHaveAttribute("id", "assets");
        expect(screen.getByText("Drop files here")).toBeInTheDocument();

        const file = new File(["data"], "unichat.zip", { type: "application/zip" });
        await userEvent.upload(ref.current as HTMLInputElement, file);

        expect(await screen.findByText("unichat.zip")).toBeInTheDocument();
        expect(onFileChange).toHaveBeenLastCalledWith(expect.objectContaining({ acceptedFiles: [file] }));

        await userEvent.click(screen.getByRole("button", { name: /delete/i }));
        await waitFor(() => expect(screen.queryByText("unichat.zip")).not.toBeInTheDocument());
    });
});
