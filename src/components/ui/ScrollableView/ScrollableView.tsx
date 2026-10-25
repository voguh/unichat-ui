/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type PReact from "preact";
import { forwardRef } from "preact/compat";
import { useEffect, useRef, useState } from "preact/hooks";

import { clsx } from "~/utils/clsx";
import { mergeRefs } from "~/utils/mergeRefs";

import styles from "./styles.module.css";

const HIDE_DELAY = 1000;

type Axis = "vertical" | "horizontal";

interface AxisSizes {
    position: number;
    clientSize: number;
    scrollSize: number;
}

interface AxisMetrics {
    ratio: number;
    progress: number;
}

interface Metrics {
    vertical: AxisMetrics | null;
    horizontal: AxisMetrics | null;
}

interface DragState {
    pointer: number;
    position: number;
    scale: number;
}

function readAxis(viewport: HTMLElement, axis: Axis): AxisSizes {
    if (axis === "vertical") {
        return { position: viewport.scrollTop, clientSize: viewport.clientHeight, scrollSize: viewport.scrollHeight };
    }

    return { position: viewport.scrollLeft, clientSize: viewport.clientWidth, scrollSize: viewport.scrollWidth };
}

function setAxisPosition(viewport: HTMLElement, axis: Axis, position: number): void {
    if (axis === "vertical") {
        viewport.scrollTop = position;
    } else {
        viewport.scrollLeft = position;
    }
}

function measureAxis(viewport: HTMLElement, axis: Axis): AxisMetrics | null {
    const { position, clientSize, scrollSize } = readAxis(viewport, axis);
    if (scrollSize > clientSize) {
        return { ratio: clientSize / scrollSize, progress: position / (scrollSize - clientSize) };
    }

    return null;
}

function pointerCoord(event: PointerEvent, axis: Axis): number {
    if (axis === "vertical") {
        return event.clientY;
    }

    return event.clientX;
}

function rectStart(rect: DOMRect, axis: Axis): number {
    if (axis === "vertical") {
        return rect.top;
    }

    return rect.left;
}

function rectLength(rect: DOMRect, axis: Axis): number {
    if (axis === "vertical") {
        return rect.height;
    }

    return rect.width;
}

interface ScrollTrackProps {
    axis: Axis;
    metrics: AxisMetrics;
    active: boolean;
    crossed: boolean;
    viewportRef: PReact.RefObject<HTMLDivElement>;
}

function ScrollTrack({ axis, metrics, active, crossed, viewportRef }: ScrollTrackProps): PReact.ComponentChildren {
    const [dragging, setDragging] = useState(false);
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<DragState | null>(null);

    function handleTrackPointerDown(event: PReact.TargetedPointerEvent<HTMLDivElement>): void {
        if (event.target !== event.currentTarget) {
            return;
        }

        const viewport = viewportRef.current!;
        const { position, clientSize } = readAxis(viewport, axis);
        const thumbRect = thumbRef.current!.getBoundingClientRect();
        if (pointerCoord(event, axis) < rectStart(thumbRect, axis)) {
            setAxisPosition(viewport, axis, position - clientSize);
        } else {
            setAxisPosition(viewport, axis, position + clientSize);
        }
    }

    function handleThumbPointerDown(event: PReact.TargetedPointerEvent<HTMLDivElement>): void {
        event.preventDefault();

        const { position, clientSize, scrollSize } = readAxis(viewportRef.current!, axis);
        const trackLength = rectLength(trackRef.current!.getBoundingClientRect(), axis);
        const thumbLength = rectLength(event.currentTarget.getBoundingClientRect(), axis);

        dragRef.current = {
            pointer: pointerCoord(event, axis),
            position,
            scale: (scrollSize - clientSize) / (trackLength - thumbLength)
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
    }

    function handleThumbPointerMove(event: PReact.TargetedPointerEvent<HTMLDivElement>): void {
        const drag = dragRef.current;
        if (drag != null) {
            const delta = (pointerCoord(event, axis) - drag.pointer) * drag.scale;
            setAxisPosition(viewportRef.current!, axis, drag.position + delta);
        }
    }

    function handleThumbPointerUp(): void {
        dragRef.current = null;
        setDragging(false);
    }

    return (
        <div
            ref={trackRef}
            aria-hidden="true"
            data-axis={axis}
            data-active={active || undefined}
            data-crossed={crossed || undefined}
            data-dragging={dragging || undefined}
            onPointerDown={handleTrackPointerDown}
            className={styles.track}
        >
            <div
                ref={thumbRef}
                style={`--scroll-ratio: ${metrics.ratio}; --scroll-progress: ${metrics.progress}`}
                onPointerDown={handleThumbPointerDown}
                onPointerMove={handleThumbPointerMove}
                onPointerUp={handleThumbPointerUp}
                onPointerCancel={handleThumbPointerUp}
                className={styles.thumb}
            />
        </div>
    );
}

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface ScrollableViewProps extends VanillaProps {
    alwaysVisible?: boolean;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const ScrollableView = forwardRef<HTMLDivElement, ScrollableViewProps>(function ScrollableView(
    { alwaysVisible = false, rootProps = {}, onScroll, className, children, ...rest },
    ref
) {
    const [metrics, setMetrics] = useState<Metrics>({ vertical: null, horizontal: null });
    const [active, setActive] = useState(false);
    const viewportRef = useRef<HTMLDivElement>(null);
    const hideTimerRef = useRef<ReturnType<typeof setTimeout>>();

    const crossed = metrics.vertical != null && metrics.horizontal != null;
    const visible = active || alwaysVisible;

    function updateMetrics(): void {
        const viewport = viewportRef.current!;
        setMetrics({ vertical: measureAxis(viewport, "vertical"), horizontal: measureAxis(viewport, "horizontal") });
    }

    function handleScroll(event: PReact.TargetedUIEvent<HTMLDivElement>): void {
        updateMetrics();
        setActive(true);
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = setTimeout(() => setActive(false), HIDE_DELAY);

        if (onScroll != null) {
            onScroll(event);
        }
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: observers only need the mounted viewport
    useEffect(() => {
        const viewport = viewportRef.current!;
        const resizeObserver = new ResizeObserver(updateMetrics);

        function observeChildren(): void {
            resizeObserver.disconnect();
            resizeObserver.observe(viewport);
            for (const child of Array.from(viewport.children)) {
                resizeObserver.observe(child);
            }

            updateMetrics();
        }

        const mutationObserver = new MutationObserver(observeChildren);
        mutationObserver.observe(viewport, { childList: true });
        observeChildren();

        return () => {
            mutationObserver.disconnect();
            resizeObserver.disconnect();
            clearTimeout(hideTimerRef.current);
        };
    }, []);

    return (
        <div {...rootProps} className={clsx(styles.root, rootProps.className)}>
            <div
                {...rest}
                ref={mergeRefs(ref, viewportRef)}
                onScroll={handleScroll}
                className={clsx(styles.viewport, className)}
            >
                {children}
            </div>
            {metrics.vertical != null && (
                <ScrollTrack
                    axis="vertical"
                    metrics={metrics.vertical}
                    active={visible}
                    crossed={crossed}
                    viewportRef={viewportRef}
                />
            )}
            {metrics.horizontal != null && (
                <ScrollTrack
                    axis="horizontal"
                    metrics={metrics.horizontal}
                    active={visible}
                    crossed={crossed}
                    viewportRef={viewportRef}
                />
            )}
        </div>
    );
});
