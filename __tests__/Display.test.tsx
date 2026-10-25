/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { createRef } from "preact";

import { render, screen } from "@testing-library/preact";

import { Alert } from "~/Alert";
import { Badge } from "~/Badge";
import { Card, CardBody, CardFooter, CardHeader } from "~/Card";
import { Code } from "~/Code";
import { EmptyState } from "~/EmptyState";
import { Separator } from "~/Separator";
import { Skeleton } from "~/Skeleton";
import { Spinner } from "~/Spinner";

describe("Badge", () => {
    it("renders a span with variant, native props and ref", () => {
        const ref = createRef<HTMLSpanElement>();
        render(
            <Badge ref={ref} variant="warning" title="Pre-release" className="extra">
                beta
            </Badge>
        );
        const badge = screen.getByText("beta");
        expect(ref.current).toBe(badge);
        expect(badge.tagName).toBe("SPAN");
        expect(badge).toHaveAttribute("data-variant", "warning");
        expect(badge).toHaveAttribute("title", "Pre-release");
        expect(badge).toHaveClass("extra");
    });

    it("defaults to the secondary variant", () => {
        render(<Badge>stable</Badge>);
        expect(screen.getByText("stable")).toHaveAttribute("data-variant", "secondary");
    });
});

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
});

describe("Spinner", () => {
    it("renders a status element with size and native props", () => {
        const ref = createRef<HTMLSpanElement>();
        render(<Spinner ref={ref} size="lg" aria-label="Loading" />);
        const spinner = screen.getByRole("status", { name: "Loading" });
        expect(ref.current).toBe(spinner);
        expect(spinner).toHaveAttribute("data-size", "lg");
    });
});

describe("Skeleton", () => {
    it("is hidden from assistive tech by default", () => {
        const ref = createRef<HTMLDivElement>();
        render(<Skeleton ref={ref} data-testid="skeleton" style={{ height: "10px" }} />);
        const skeleton = screen.getByTestId("skeleton");
        expect(ref.current).toBe(skeleton);
        expect(skeleton).toHaveAttribute("aria-hidden", "true");
        expect(skeleton).toHaveStyle({ height: "10px" });
    });
});

describe("EmptyState", () => {
    it("renders icon, title, description and children", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <EmptyState ref={ref} data-testid="empty" icon={<i>icon</i>} title="Nothing here" description="Try again">
                <button type="button">Retry</button>
            </EmptyState>
        );
        expect(ref.current).toBe(screen.getByTestId("empty"));
        expect(screen.getByRole("heading", { name: "Nothing here" })).toBeInTheDocument();
        expect(screen.getByText("Try again")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    });

    it("renders the title with the requested heading level and hides the icon", () => {
        render(<EmptyState icon={<i>icon</i>} title="Page not found" titleAs="h1" />);
        expect(screen.getByRole("heading", { level: 1, name: "Page not found" })).toBeInTheDocument();
        expect(screen.getByText("icon").parentElement).toHaveAttribute("aria-hidden", "true");
    });
});

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
});

describe("Separator", () => {
    it("renders an hr with ref", () => {
        const ref = createRef<HTMLHRElement>();
        render(<Separator ref={ref} />);
        expect(screen.getByRole("separator")).toBe(ref.current);
    });
});

describe("Code", () => {
    it("renders a code element with ref", () => {
        const ref = createRef<HTMLElement>();
        render(<Code ref={ref}>sha256:abc</Code>);
        const code = screen.getByText("sha256:abc");
        expect(code.tagName).toBe("CODE");
        expect(ref.current).toBe(code);
    });
});
