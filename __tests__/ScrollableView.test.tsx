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

import { act, fireEvent, render, screen } from "@testing-library/react";

import { ScrollableView } from "~/ScrollableView";

function overflowVertically(viewport: HTMLElement): void {
    Object.defineProperty(viewport, "clientHeight", { configurable: true, value: 100 });
    Object.defineProperty(viewport, "scrollHeight", { configurable: true, value: 400 });
}

function getVerticalTrack(container: Element): HTMLElement | null {
    return container.querySelector<HTMLElement>("[data-axis='vertical']");
}

describe("ScrollableView", () => {
    afterEach(() => {
        rstest.useRealTimers();
    });

    it("forwards ref and props to the viewport and rootProps to the wrapper", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <ScrollableView ref={ref} data-testid="viewport" className="extra" rootProps={{ className: "outer" }}>
                Content
            </ScrollableView>
        );

        const viewport = screen.getByTestId("viewport");
        expect(ref.current).toBe(viewport);
        expect(viewport).toHaveClass("extra");
        expect(viewport.parentElement).toHaveClass("outer");
    });

    it("renders a track only for an axis that overflows", () => {
        const { container } = render(<ScrollableView data-testid="viewport">Content</ScrollableView>);
        expect(getVerticalTrack(container)).toBeNull();

        const viewport = screen.getByTestId("viewport");
        overflowVertically(viewport);
        fireEvent.scroll(viewport);

        expect(getVerticalTrack(container)).toBeInTheDocument();
        expect(container.querySelector("[data-axis='horizontal']")).toBeNull();
    });

    it("keeps the track visible with alwaysVisible", () => {
        rstest.useFakeTimers();
        const { container } = render(
            <ScrollableView data-testid="viewport" alwaysVisible>
                Content
            </ScrollableView>
        );

        const viewport = screen.getByTestId("viewport");
        overflowVertically(viewport);
        fireEvent.scroll(viewport);

        act(() => {
            rstest.advanceTimersByTime(1000);
        });
        expect(getVerticalTrack(container)).toHaveAttribute("data-active");
    });

    it("shows the track while scrolling and hides it after a delay when not always visible", () => {
        rstest.useFakeTimers();
        const onScroll = rstest.fn();
        const { container } = render(
            <ScrollableView data-testid="viewport" alwaysVisible={false} onScroll={onScroll}>
                Content
            </ScrollableView>
        );

        const viewport = screen.getByTestId("viewport");
        overflowVertically(viewport);
        fireEvent.scroll(viewport);

        expect(onScroll).toHaveBeenCalledTimes(1);
        expect(getVerticalTrack(container)).toHaveAttribute("data-active");

        act(() => {
            rstest.advanceTimersByTime(1000);
        });
        expect(getVerticalTrack(container)).not.toHaveAttribute("data-active");
    });

    it("shows the track again when the pointer moves over it", () => {
        rstest.useFakeTimers();
        const onPointerMove = rstest.fn();
        const { container } = render(
            <ScrollableView data-testid="viewport" rootProps={{ onPointerMove }}>
                Content
            </ScrollableView>
        );

        const viewport = screen.getByTestId("viewport");
        overflowVertically(viewport);
        fireEvent.scroll(viewport);
        act(() => {
            rstest.advanceTimersByTime(1000);
        });

        fireEvent.pointerMove(viewport);

        expect(onPointerMove).toHaveBeenCalledTimes(1);
        expect(getVerticalTrack(container)).toHaveAttribute("data-active");

        act(() => {
            rstest.advanceTimersByTime(1000);
        });
        expect(getVerticalTrack(container)).not.toHaveAttribute("data-active");
    });

    it("pages towards the clicked side of the track", () => {
        const { container } = render(<ScrollableView data-testid="viewport">Content</ScrollableView>);

        const viewport = screen.getByTestId("viewport");
        overflowVertically(viewport);
        fireEvent.scroll(viewport);

        const track = getVerticalTrack(container)!;
        const thumb = track.firstElementChild as HTMLElement;
        thumb.getBoundingClientRect = () => new DOMRect(0, 0, 4, 25);

        fireEvent.pointerDown(track, { clientY: 80 });
        expect(viewport.scrollTop).toBe(100);

        thumb.getBoundingClientRect = () => new DOMRect(0, 40, 4, 25);
        fireEvent.pointerDown(track, { clientY: 10 });
        expect(viewport.scrollTop).toBe(0);
    });
});
