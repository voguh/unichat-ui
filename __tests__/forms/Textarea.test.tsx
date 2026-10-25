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

import { Textarea } from "~/forms/Textarea";

describe("forms/Textarea", () => {
    it("labels the textarea", () => {
        const ref = createRef<HTMLTextAreaElement>();
        render(<Textarea ref={ref} label="Notes" />);
        expect(screen.getByLabelText("Notes")).toBe(ref.current);
    });
});
