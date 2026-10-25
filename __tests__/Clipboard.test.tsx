/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Clipboard } from "~/Clipboard";

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

    it("exposes the data-part and data-slot structure", () => {
        render(<Clipboard label="URL" value="https://unichat.voguh.me" />);
        expect(document.querySelector('[data-part="Clipboard"] > label')).not.toBeNull();
        expect(document.querySelector('[data-part="Clipboard"] > [data-slot="control"] > button')).not.toBeNull();
    });
});
