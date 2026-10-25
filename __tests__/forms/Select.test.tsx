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

import { Select } from "~/forms/Select";

describe("forms/Select", () => {
    it("labels the trigger through the FormGroup label", () => {
        const ref = createRef<HTMLSelectElement>();
        render(<Select ref={ref} label="Sort by" name="sort" options={[{ value: "a", label: "A" }]} />);
        expect(screen.getByRole("button", { name: "Sort by" })).toBeInTheDocument();
        expect(ref.current).not.toBeNull();
        expect(ref.current!.tagName).toBe("SELECT");
    });
});
