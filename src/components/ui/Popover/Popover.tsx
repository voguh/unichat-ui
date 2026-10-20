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
import { useEffect, useId, useRef, useState } from "preact/hooks";

import { type ComputePositionReturn, flip, offset, type Placement, shift } from "@floating-ui/dom";

import { Portal } from "~/components/ui/Portal";
import { useComputePosition } from "~/hooks/useComputePosition";
import { cloneAsChild } from "~/utils/asChild";
import { clickOutside } from "~/utils/clickOutside";

import styles from "./styles.module.css";

const HIDDEN_STYLE = { visibility: "hidden", opacity: "0" };

export interface PopoverProps {
    content: PReact.ComponentChildren;
    title?: PReact.ComponentChildren;
    placement?: Placement;
    trigger?: "click" | "focus";
    children: PReact.VNode;
}

export function Popover({
    content,
    title,
    placement = "bottom",
    trigger = "click",
    children
}: PopoverProps): PReact.VNode {
    const id = useId();
    const [open, setOpen] = useState(false);
    const arrowRef = useRef<HTMLDivElement>(null);
    const unlistenRef = useRef<() => void>(null);

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

    function show(): void {
        setOpen(true);
        toggleVisualization(true);

        if (trigger === "click") {
            unlistenRef.current = clickOutside(hide, referenceRef, floatingRef);
        }
    }

    function hide(): void {
        setOpen(false);
        toggleVisualization(false);

        if (unlistenRef.current != null) {
            unlistenRef.current();
            unlistenRef.current = null;
        }
    }

    useEffect(() => {
        return () => {
            if (unlistenRef.current != null) {
                unlistenRef.current();
            }
        };
    }, []);

    const triggerProps =
        trigger === "click"
            ? {
                  "aria-haspopup": "dialog",
                  "aria-expanded": open,
                  "aria-controls": `${id}-content`,
                  onClick: () => (open ? hide() : show()),
                  onKeyDown: (event: KeyboardEvent) => event.key === "Escape" && hide()
              }
            : {
                  onFocusIn: show,
                  onFocusOut: hide,
                  onKeyDown: (event: KeyboardEvent) => event.key === "Escape" && hide()
              };

    return (
        <>
            {cloneAsChild(children, triggerProps, referenceRef)}
            <Portal>
                <div ref={floatingRef} style={HIDDEN_STYLE} className={styles.positioner}>
                    <div
                        id={`${id}-content`}
                        role="dialog"
                        aria-labelledby={title != null ? `${id}-title` : undefined}
                        className={styles.content}
                    >
                        <div ref={arrowRef} className={styles.arrow}>
                            <div className={styles.arrowTip} />
                        </div>
                        {title != null && (
                            <h3 id={`${id}-title`} className={styles.title}>
                                {title}
                            </h3>
                        )}
                        {content}
                    </div>
                </div>
            </Portal>
        </>
    );
}
