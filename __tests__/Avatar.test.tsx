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

import { fireEvent, render, screen } from "@testing-library/react";

import { Avatar } from "~/Avatar";

describe("Avatar", () => {
    it("renders the image with native props and ref", () => {
        const ref = createRef<HTMLImageElement>();
        render(<Avatar ref={ref} src="/icon.png" alt="Plugin" width={48} />);
        const img = screen.getByRole("img", { name: "Plugin" });
        expect(ref.current).toBe(img);
        expect(img).toHaveAttribute("src", "/icon.png");
        expect(img).toHaveAttribute("width", "48");
    });

    it("renders the fallback when src is missing", () => {
        render(<Avatar alt="Plugin" fallback={<span>fb</span>} />);
        expect(screen.getByRole("img", { name: "Plugin" })).toHaveAttribute("data-fallback");
        expect(screen.getByText("fb")).toBeInTheDocument();
    });

    it("hides a decorative fallback from assistive technology", () => {
        render(<Avatar alt="" fallback={<span>fb</span>} />);
        expect(screen.queryByRole("img")).not.toBeInTheDocument();
        expect(screen.getByText("fb").parentElement).toHaveAttribute("aria-hidden", "true");
    });

    it("switches to the fallback on error and calls onError", () => {
        const onError = rstest.fn();
        render(<Avatar src="/broken.png" alt="Plugin" onError={onError} fallback={<span>fb</span>} />);
        fireEvent.error(screen.getByRole("img"));
        expect(onError).toHaveBeenCalledTimes(1);
        expect(screen.getByText("fb")).toBeInTheDocument();
    });

    it("retries when src changes after an error", () => {
        const { rerender } = render(<Avatar src="/broken.png" alt="Plugin" fallback={<span>fb</span>} />);
        fireEvent.error(screen.getByRole("img"));
        rerender(<Avatar src="/other.png" alt="Plugin" fallback={<span>fb</span>} />);
        expect(screen.getByRole("img")).toHaveAttribute("src", "/other.png");
    });
});
