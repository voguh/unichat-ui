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

import { QrCode } from "~/QrCode";

// jsdom has no canvas for lean-qr's toDataURL.
rstest.mock("lean-qr", () => ({ generate: () => ({ toDataURL: () => "data:image/png;base64,qr" }) }));

describe("QrCode", () => {
    it("renders the generated image for the value", () => {
        const ref = createRef<HTMLImageElement>();
        render(<QrCode ref={ref} value="https://unichat.voguh.me" alt="QR code" />);

        expect(ref.current).toBe(screen.getByRole("img", { name: "QR code" }));
        expect(ref.current).toHaveAttribute("src", "data:image/png;base64,qr");
    });
});
