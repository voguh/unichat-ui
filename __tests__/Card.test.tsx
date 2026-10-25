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

import { Card, CardBody, CardFooter, CardHeader } from "~/Card";

describe("Card", () => {
    it("renders parts as divs with forwarded refs", () => {
        const cardRef = createRef<HTMLDivElement>();
        const bodyRef = createRef<HTMLDivElement>();
        render(
            <Card ref={cardRef} data-testid="card">
                <CardHeader>header</CardHeader>
                <CardBody ref={bodyRef}>body</CardBody>
                <CardFooter>footer</CardFooter>
            </Card>
        );
        expect(cardRef.current).toBe(screen.getByTestId("card"));
        expect(bodyRef.current).toBe(screen.getByText("body"));
        expect(screen.getByText("header")).toBeInTheDocument();
        expect(screen.getByText("footer")).toBeInTheDocument();
    });

    it("exposes the data-part structure", () => {
        render(
            <Card>
                <CardHeader />
                <CardBody />
                <CardFooter />
            </Card>
        );
        expect(document.querySelector('[data-part="Card"] > [data-part="CardHeader"]')).not.toBeNull();
        expect(document.querySelector('[data-part="Card"] > [data-part="CardBody"]')).not.toBeNull();
        expect(document.querySelector('[data-part="Card"] > [data-part="CardFooter"]')).not.toBeNull();
    });
});
