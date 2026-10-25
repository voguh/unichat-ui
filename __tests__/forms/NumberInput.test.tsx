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

import { NumberInput } from "~/forms/NumberInput";

describe("forms/NumberInput", () => {
    it("labels the spinbutton", () => {
        render(<NumberInput label="Max files" />);
        expect(screen.getByRole("spinbutton", { name: "Max files" })).toBeInTheDocument();
    });
});
