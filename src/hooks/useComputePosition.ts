/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { RefObject } from "react";
import { useEffect, useRef } from "react";

import { autoUpdate, computePosition, type FloatingElement, type ReferenceElement } from "@floating-ui/dom";

export type AdjustFloatingPosition<Reference extends ReferenceElement, Floating extends FloatingElement> = (
    reference: Reference,
    floating: Floating,
    values: Awaited<ReturnType<typeof computePosition>>
) => [number, number];

/**
 * Positions a floating element against a reference with Floating UI, kept updated while visible.
 *
 * @param options Options passed to `computePosition`.
 * @param adjustFloatingPosition Replaces the computed `x`/`y` before they are applied.
 * @returns The reference ref, the floating ref and the function that shows (`true`) or hides (`false`) the floating
 * element.
 */
export function useComputePosition<Reference extends ReferenceElement, Floating extends FloatingElement>(
    options?: Parameters<typeof computePosition>[2],
    adjustFloatingPosition?: AdjustFloatingPosition<Reference, Floating>
): [RefObject<Reference>, RefObject<Floating>, (visible: boolean) => void] {
    const referenceRef = useRef<Reference>(null);
    const floatingRef = useRef<Floating>(null);
    const autoUpdateRef = useRef<(() => void) | null>(null);

    function toggleVisualization(visible: boolean): void {
        const referenceElem = referenceRef.current;
        const floatingElem = floatingRef.current;

        if (!referenceElem || !floatingElem) {
            return;
        }

        if (typeof autoUpdateRef.current === "function") {
            autoUpdateRef.current();
            autoUpdateRef.current = null;
        }

        if (!visible) {
            Object.assign(floatingElem.style, { visibility: "hidden", opacity: "0" });
        } else {
            Object.assign(floatingElem.style, { visibility: "visible", opacity: "1" });

            autoUpdateRef.current = autoUpdate(referenceElem, floatingElem, async () => {
                const values = await computePosition(referenceElem, floatingElem, options);

                if (typeof adjustFloatingPosition === "function") {
                    const [customX, customY] = adjustFloatingPosition(referenceElem, floatingElem, values);
                    Object.assign(floatingElem.style, { left: `${customX}px`, top: `${customY}px` });
                } else {
                    const { x, y } = values;
                    Object.assign(floatingElem.style, { left: `${x}px`, top: `${y}px` });
                }
            });
        }
    }

    useEffect(() => {
        return () => {
            if (typeof autoUpdateRef.current === "function") {
                autoUpdateRef.current();
            }
        };
    }, []);

    return [referenceRef, floatingRef, toggleVisualization];
}
