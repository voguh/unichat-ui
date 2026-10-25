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

import { FormGroup } from "~/components/forms/FormGroup";

describe("FormGroup", () => {
    it("links the label to the control id and forwards ref", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <FormGroup ref={ref} id="nickname" label="Nickname" data-testid="group">
                <input id="nickname" />
            </FormGroup>
        );
        expect(ref.current).toBe(screen.getByTestId("group"));
        expect(screen.getByLabelText("Nickname")).toHaveAttribute("id", "nickname");
    });

    it("renders the status message only with a status", () => {
        const { rerender } = render(
            <FormGroup id="nickname" statusMessage="Too long">
                <input id="nickname" />
            </FormGroup>
        );
        expect(screen.queryByText("Too long")).not.toBeInTheDocument();

        rerender(
            <FormGroup id="nickname" status="invalid" statusMessage="Too long">
                <input id="nickname" />
            </FormGroup>
        );
        const message = screen.getByText("Too long");
        expect(message.tagName).toBe("SMALL");
        expect(message).toHaveAttribute("id", "nickname-status");
        expect(message).toHaveAttribute("data-status", "invalid");
    });

    it("renders the description after the control", () => {
        render(
            <FormGroup id="nickname" label="Nickname" description="Shown in chat" data-testid="group">
                <input id="nickname" />
            </FormGroup>
        );
        const description = screen.getByText("Shown in chat");
        expect(description.tagName).toBe("SMALL");
        expect(description).toHaveAttribute("id", "nickname-description");
        expect(screen.getByTestId("group").children[2]).toBe(description);
    });

    it("hides the description when a status message is shown", () => {
        render(
            <FormGroup id="nickname" description="Shown in chat" status="invalid" statusMessage="Too long">
                <input id="nickname" />
            </FormGroup>
        );
        expect(screen.queryByText("Shown in chat")).not.toBeInTheDocument();
        expect(screen.getByText("Too long")).toBeInTheDocument();
    });
});
