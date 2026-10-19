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

import { fireEvent, render, screen } from "@testing-library/preact";
import userEvent from "@testing-library/user-event";

import { Button, ButtonLink, IconButton } from "~/components/ui/Button";

describe("Button", () => {
    it("defaults to type button, primary variant and md size", () => {
        render(<Button>Save</Button>);
        const button = screen.getByRole("button", { name: "Save" });
        expect(button).toHaveAttribute("type", "button");
        expect(button).toHaveAttribute("data-variant", "primary");
        expect(button).toHaveAttribute("data-size", "md");
    });

    it("spreads native props and appends className", () => {
        render(
            <Button id="save" data-testid="btn" aria-describedby="hint" className="extra">
                Save
            </Button>
        );
        const button = screen.getByTestId("btn");
        expect(button).toHaveAttribute("id", "save");
        expect(button).toHaveAttribute("aria-describedby", "hint");
        expect(button).toHaveClass("extra");
    });

    it("calls onClick", () => {
        const onClick = rstest.fn();
        render(<Button onClick={onClick}>Save</Button>);
        fireEvent.click(screen.getByRole("button"));
        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("disables and marks busy while loading", async () => {
        const onClick = rstest.fn();
        render(
            <Button loading onClick={onClick}>
                Save
            </Button>
        );
        const button = screen.getByRole("button");
        expect(button).toBeDisabled();
        expect(button).toHaveAttribute("aria-busy", "true");
        await userEvent.click(button);
        expect(onClick).not.toHaveBeenCalled();
    });

    it("forwards ref to the native button", () => {
        const ref = createRef<HTMLButtonElement>();
        render(<Button ref={ref}>Save</Button>);
        expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    });
});

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
});

describe("IconButton", () => {
    it("requires an accessible label and forwards ref", () => {
        const ref = createRef<HTMLButtonElement>();
        render(
            <IconButton ref={ref} aria-label="Next page">
                <i className="fas fa-chevron-right" />
            </IconButton>
        );
        expect(screen.getByRole("button", { name: "Next page" })).toBe(ref.current);
    });
});
