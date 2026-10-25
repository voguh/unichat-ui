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

import { Checkbox } from "~/forms/Checkbox";

describe("forms/Checkbox", () => {
    it("labels the input with the group and inline labels and forwards ref", () => {
        const ref = createRef<HTMLInputElement>();
        render(
            <Checkbox ref={ref} label="Visibility" status="invalid" statusMessage="Required">
                Prerelease
            </Checkbox>
        );
        const input = screen.getByRole("checkbox", { name: "Visibility Prerelease" });
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("aria-invalid", "true");
        expect(input).toHaveAccessibleDescription("Required");
    });
});
