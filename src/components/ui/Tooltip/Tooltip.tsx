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
import { useEffect, useId, useRef } from "preact/hooks";

import { type ComputePositionReturn, flip, offset, type Placement, shift } from "@floating-ui/dom";

import { Portal } from "~/components/ui/Portal";
import { useComputePosition } from "~/hooks/useComputePosition";
import { cloneAsChild } from "~/utils/asChild";

import styles from "./styles.module.css";

const HIDDEN_STYLE = { visibility: "hidden", opacity: "0" };

export interface TooltipProps {
    content: PReact.ComponentChildren;
    placement?: Placement;
    openDelay?: number;
    children: PReact.VNode;
}

export function Tooltip({ content, placement = "top", openDelay = 400, children }: TooltipProps): PReact.VNode {
    const contentId = useId();
    const arrowRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    const pointerDownRef = useRef(false);

    function adjustFloatingPosition(
        reference: HTMLElement,
        floating: HTMLDivElement,
        values: ComputePositionReturn
    ): [number, number] {
        const side = values.placement.split("-")[0];
        const bounds = reference.getBoundingClientRect();

        floating.dataset.side = side;
        if (side === "top" || side === "bottom") {
            Object.assign(arrowRef.current!.style, { left: `${bounds.x + bounds.width / 2 - values.x}px`, top: "" });
        } else {
            Object.assign(arrowRef.current!.style, { left: "", top: `${bounds.y + bounds.height / 2 - values.y}px` });
        }

        return [values.x, values.y];
    }

    const [referenceRef, floatingRef, toggleVisualization] = useComputePosition<HTMLElement, HTMLDivElement>(
        { strategy: "fixed", placement, middleware: [offset(8), flip(), shift({ padding: 8 })] },
        adjustFloatingPosition
    );

    useEffect(() => () => clearTimeout(timerRef.current), []);

    function show(delay: number): void {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => toggleVisualization(true), delay);
    }

    function hide(): void {
        clearTimeout(timerRef.current);
        toggleVisualization(false);
    }

    const trigger = cloneAsChild(
        children,
        {
            "aria-describedby": contentId,
            onPointerEnter: () => show(openDelay),
            onPointerLeave: hide,
            onPointerDown: () => {
                pointerDownRef.current = true;
                hide();
            },
            onFocus: () => !pointerDownRef.current && show(0),
            onBlur: () => {
                pointerDownRef.current = false;
                hide();
            },
            onKeyDown: (event: KeyboardEvent) => event.key === "Escape" && hide()
        },
        referenceRef
    );

    return (
        <>
            {trigger}
            <Portal>
                <div ref={floatingRef} style={HIDDEN_STYLE} className={styles.positioner}>
                    <div id={contentId} role="tooltip" className={styles.content}>
                        <div ref={arrowRef} className={styles.arrow}>
                            <div className={styles.arrowTip} />
                        </div>
                        {content}
                    </div>
                </div>
            </Portal>
        </>
    );
}
