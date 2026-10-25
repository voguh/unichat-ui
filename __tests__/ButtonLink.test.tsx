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

import { ButtonLink } from "~/Button";

describe("ButtonLink", () => {
    it("renders an anchor with button styling attributes", () => {
        const ref = createRef<HTMLAnchorElement>();
        render(
            <ButtonLink ref={ref} href="/download" variant="secondary" target="_blank">
                Download
            </ButtonLink>
        );
        const link = screen.getByRole("link", { name: "Download" });
        expect(link).toHaveAttribute("href", "/download");
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("data-variant", "secondary");
        expect(ref.current).toBe(link);
    });

    it("exposes the data-part structure", () => {
        render(<ButtonLink href="#">Open</ButtonLink>);
        expect(document.querySelector('a[data-part="ButtonLink"]')).not.toBeNull();
    });
});
