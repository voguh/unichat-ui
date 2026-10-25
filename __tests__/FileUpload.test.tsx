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

import { FileUpload } from "~/FileUpload";

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

    it("exposes the data-part and data-slot structure", () => {
        render(<FileUpload>Drop</FileUpload>);
        expect(document.querySelector('[data-part="FileUpload"] > [data-slot="dropzone"] > input')).not.toBeNull();
        expect(
            document.querySelector('[data-part="FileUpload"] > [data-slot="dropzone"] > [data-slot="icon"]')
        ).not.toBeNull();
    });
});
