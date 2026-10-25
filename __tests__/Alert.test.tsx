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

import { Alert } from "~/Alert";

describe("Alert", () => {
    it("renders an inline alert with variant, title and action", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <Alert ref={ref} variant="danger" title="Failed" action={<button type="button">Retry</button>}>
                Could not load
            </Alert>
        );
        const alert = screen.getByRole("alert");
        expect(ref.current).toBe(alert);
        expect(alert).toHaveAttribute("data-variant", "danger");
        expect(alert).toHaveTextContent("Failed");
        expect(alert).toHaveTextContent("Could not load");
        expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });

    it("uses a polite status role for non-critical variants", () => {
        render(<Alert variant="success">Saved</Alert>);
        expect(screen.getByRole("status")).toHaveTextContent("Saved");
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("renders the variant icon or a custom icon", () => {
        render(
            <>
                <Alert variant="warning">Check input</Alert>
                <Alert variant="info" icon={<i className="fas fa-users" />}>
                    Raid
                </Alert>
            </>
        );
        expect(
            screen.getByText("Check input").closest("[role='alert']")!.querySelector(".fa-exclamation-triangle")
        ).not.toBeNull();
        const raid = screen.getByText("Raid").closest("[role='status']")!;
        expect(raid.querySelector(".fa-users")).not.toBeNull();
        expect(raid.querySelector(".fa-info-circle")).toBeNull();
    });

    it("exposes the data-part and data-slot structure", () => {
        render(
            <Alert title="Title" action={<span>Retry</span>}>
                Body
            </Alert>
        );
        expect(document.querySelector('[data-part="Alert"] > [data-slot="icon"]')).not.toBeNull();
        expect(
            document.querySelector('[data-part="Alert"] > [data-slot="content"] > [data-slot="title"]')
        ).not.toBeNull();
        expect(document.querySelector('[data-part="Alert"] > [data-slot="action"]')).not.toBeNull();
    });
});
