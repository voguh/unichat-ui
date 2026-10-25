/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { render, screen } from "@testing-library/react";

import { Toaster, toaster } from "~/Toast";

describe("Toaster", () => {
    it("renders toasts created through the store", async () => {
        render(<Toaster data-testid="group" />);
        toaster.create({ title: "Saved", description: "Release updated", type: "success" });

        expect(await screen.findByText("Saved")).toBeInTheDocument();
        expect(screen.getByText("Release updated")).toBeInTheDocument();
        toaster.remove();
    });

    it("renders the type icon or a custom icon", async () => {
        render(<Toaster />);
        toaster.create({ title: "Saved", type: "success" });
        toaster.create({ title: "Raid", type: "info", icon: <i className="fas fa-users" /> });

        const saved = (await screen.findByText("Saved")).closest("[role='status']");
        const raid = (await screen.findByText("Raid")).closest("[role='status']");
        expect(saved!.querySelector(".fa-check-circle")).not.toBeNull();
        expect(raid!.querySelector(".fa-users")).not.toBeNull();
        expect(raid!.querySelector(".fa-info-circle")).toBeNull();
        toaster.remove();
    });

    it("exposes the data-part and data-slot structure", async () => {
        render(<Toaster />);
        toaster.create({ type: "success", title: "Saved", action: { label: "Undo", onClick: () => {} } });
        await screen.findByText("Saved");
        const item = '[data-part="Toaster"] > [data-part="ToastItem"][data-variant="success"]';
        expect(document.querySelector(`${item} > [data-slot="icon"]`)).not.toBeNull();
        expect(document.querySelector(`${item} > [data-slot="body"] > strong`)).not.toBeNull();
        expect(document.querySelector(`${item} > [data-slot="action"]`)).not.toBeNull();
        expect(document.querySelector(`${item} > [data-slot="close"] > svg > [data-slot="progress"]`)).not.toBeNull();
        toaster.remove();
    });
});
