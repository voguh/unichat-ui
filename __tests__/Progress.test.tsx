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

import { Progress } from "~/Progress";

describe("Progress", () => {
    it("exposes value through progressbar role", () => {
        const rootRef = createRef<HTMLDivElement>();
        render(<Progress ref={rootRef} value={40} label="Uploading" data-testid="root" />);

        expect(rootRef.current).toBe(screen.getByTestId("root"));
        expect(screen.getByRole("progressbar", { name: "Uploading" })).toHaveAttribute("aria-valuenow", "40");
        expect(screen.getByText("40%")).toBeInTheDocument();
    });

    it("omits the value when indeterminate", () => {
        render(<Progress value={null} />);

        expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow");
        expect(screen.queryByText(/%$/)).not.toBeInTheDocument();
    });

    it("exposes the data-part and data-slot structure", () => {
        render(<Progress value={null} label="Upload" />);
        const root = '[data-part="Progress"]';
        expect(document.querySelector(`${root} > [data-slot="header"] > [data-slot="label"]`)).not.toBeNull();
        expect(
            document.querySelector(`${root} > [data-slot="track"] > [data-slot="range"][data-indeterminate]`)
        ).not.toBeNull();
    });
});
