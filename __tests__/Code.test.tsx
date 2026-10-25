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

import { Code } from "~/Code";

describe("Code", () => {
    it("renders a code element with ref", () => {
        const ref = createRef<HTMLElement>();
        render(<Code ref={ref}>sha256:abc</Code>);
        const code = screen.getByText("sha256:abc");
        expect(code.tagName).toBe("CODE");
        expect(ref.current).toBe(code);
    });

    it("exposes the data-part structure", () => {
        render(<Code>x</Code>);
        expect(document.querySelector('code[data-part="Code"]')).not.toBeNull();
    });
});
