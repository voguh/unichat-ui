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

import { Separator } from "~/Separator";

describe("Separator", () => {
    it("renders an hr with ref", () => {
        const ref = createRef<HTMLHRElement>();
        render(<Separator ref={ref} />);
        expect(screen.getByRole("separator")).toBe(ref.current);
    });

    it("exposes the data-part structure", () => {
        render(<Separator />);
        expect(document.querySelector('hr[data-part="Separator"]')).not.toBeNull();
    });
});
