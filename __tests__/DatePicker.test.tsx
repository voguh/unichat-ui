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

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DatePicker } from "~/DatePicker";

describe("DatePicker", () => {
    it("forwards ref and native props to the date input", () => {
        const ref = createRef<HTMLInputElement>();
        render(<DatePicker ref={ref} id="published-at" name="publishedAt" locale="en-US" data-testid="input" />);
        const input = screen.getByTestId("input");
        expect(ref.current).toBe(input);
        expect(input).toHaveAttribute("type", "date");
        expect(input).toHaveAttribute("id", "published-at");
        expect(input).toHaveAttribute("name", "publishedAt");
    });

    it("picks a date and fires the native input and change events", async () => {
        const onInput = rstest.fn();
        const onChange = rstest.fn();
        const { container } = render(
            <DatePicker defaultValue="2026-10-24" onInput={onInput} onChange={onChange} data-testid="input" />
        );
        const root = container.querySelector("[data-part~='DatePicker']");

        await userEvent.click(screen.getByTestId("input"));
        expect(root).toHaveAttribute("data-open");

        await userEvent.click(container.querySelector<HTMLButtonElement>("button[data-date='2026-10-15']")!);

        const input = screen.getByTestId<HTMLInputElement>("input");
        expect(input).toHaveValue("2026-10-15");
        expect(input.valueAsDate).toEqual(new Date("2026-10-15T00:00:00Z"));
        expect(root).not.toHaveAttribute("data-open");
        expect(onInput).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.lastCall![0].target).toBe(input);
    });

    it("selects the typed date in the calendar", async () => {
        const { container } = render(<DatePicker data-testid="input" />);

        await userEvent.type(screen.getByTestId("input"), "2026-02-28");

        expect(screen.getByTestId("input")).toHaveValue("2026-02-28");
        await waitFor(() => {
            expect(container.querySelector("button[data-date='2026-02-28']")).toHaveAttribute("data-selected");
        });
    });

    it("disables days outside min and max", async () => {
        const { container } = render(<DatePicker min="2026-10-05" max="2026-10-25" defaultValue="2026-10-10" />);

        await userEvent.click(container.querySelector<HTMLInputElement>("input[type='date']")!);
        expect(container.querySelector("button[data-date='2026-10-04']")).toBeDisabled();
        expect(container.querySelector("button[data-date='2026-10-05']")).toBeEnabled();
        expect(container.querySelector("button[data-date='2026-10-26']")).toBeDisabled();
        expect(await screen.findByRole("button", { name: "Previous month" })).toBeDisabled();
        expect(screen.getByRole("button", { name: "Next month" })).toBeDisabled();
    });

    it("moves through the grid with the keyboard and closes with Escape", async () => {
        const onChange = rstest.fn();
        const { container } = render(<DatePicker defaultValue="2026-10-24" onChange={onChange} data-testid="input" />);
        const root = container.querySelector("[data-part~='DatePicker']");

        await userEvent.click(screen.getByTestId("input"));
        await userEvent.keyboard("{Alt>}{ArrowDown}{/Alt}");
        expect(container.querySelector("button[data-date='2026-10-24']")).toHaveFocus();

        await userEvent.keyboard("{ArrowRight}{ArrowDown}");
        expect(container.querySelector("button[data-date='2026-11-01']")).toHaveFocus();

        await userEvent.keyboard("{Enter}");
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(screen.getByTestId("input")).toHaveValue("2026-11-01");

        await userEvent.click(screen.getByTestId("input"));
        expect(root).toHaveAttribute("data-open");
        await userEvent.keyboard("{Escape}");
        expect(root).not.toHaveAttribute("data-open");
        expect(screen.getByTestId("input")).toHaveFocus();
    });

    it("exposes the data-part and data-slot structure", () => {
        render(<DatePicker />);
        const calendar = '[data-part="DatePicker"] > [data-part~="DatePickerCalendar"]';
        expect(document.querySelector('[data-part="DatePicker"] > [data-slot="control"] > input')).not.toBeNull();
        expect(
            document.querySelector('[data-part="DatePicker"] > [data-slot="control"] > [data-slot="trigger"]')
        ).not.toBeNull();
        expect(document.querySelector(`${calendar} > [data-slot="header"] > [data-slot="title"]`)).not.toBeNull();
        expect(document.querySelector(`${calendar} > [data-slot="grid"] [data-slot="day"]`)).not.toBeNull();
    });
});
