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

import { IconButton } from "~/Button";

describe("IconButton", () => {
    it("requires an accessible label and forwards ref", () => {
        const ref = createRef<HTMLButtonElement>();
        render(
            <IconButton ref={ref} aria-label="Next page">
                <i className="fas fa-chevron-right" />
            </IconButton>
        );
        expect(screen.getByRole("button", { name: "Next page" })).toBe(ref.current);
    });

    it("accumulates an external data-part after its own", () => {
        render(
            <IconButton aria-label="Delete" data-part="DeleteButton">
                <i />
            </IconButton>
        );
        expect(document.querySelector('button[data-part="Button IconButton DeleteButton"]')).not.toBeNull();
    });
});
