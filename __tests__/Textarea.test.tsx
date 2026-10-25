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

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Textarea } from "~/Textarea";

describe("Textarea", () => {
    it("spreads native props and forwards ref", () => {
        const ref = createRef<HTMLTextAreaElement>();
        render(<Textarea ref={ref} name="notes" rows={4} aria-label="Notes" className="extra" />);
        const textarea = screen.getByRole("textbox", { name: "Notes" });
        expect(ref.current).toBe(textarea);
        expect(textarea).toHaveAttribute("name", "notes");
        expect(textarea).toHaveAttribute("rows", "4");
        expect(textarea).toHaveClass("extra");
    });

    it("keeps the user onInput handler", async () => {
        const onInput = rstest.fn();
        render(<Textarea aria-label="Notes" autoResize onInput={onInput} />);
        const textarea = screen.getByRole("textbox");
        expect(textarea).toHaveAttribute("data-auto-resize");
        await userEvent.type(textarea, "ab");
        expect(onInput).toHaveBeenCalledTimes(2);
    });

    it("exposes the data-part structure", () => {
        render(<Textarea autoResize />);
        expect(document.querySelector('textarea[data-part="Textarea"][data-auto-resize]')).not.toBeNull();
    });
});
