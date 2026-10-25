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

/**
 * Calls `cb` on every pointerdown outside all of the given elements (capture phase).
 *
 * @param cb Callback that receives the pointer event.
 * @param elements Refs of the elements that count as inside; a ref without element is ignored.
 * @returns Function that removes the listener.
 * @throws {TypeError} If an element is not a ref object.
 */
export function clickOutside(cb: (event?: Event) => void, ...elements: RefObject<Element>[]): () => void {
    if (!elements.every((el) => el != null && "current" in el)) {
        throw new TypeError("All elements must be ref-like objects with a 'current' property.");
    }

    function handler(event: Event): void {
        if (!(event.target instanceof Node)) {
            return;
        }

        for (const ref of elements) {
            if (ref.current != null && ref.current.contains(event.target)) {
                return;
            }
        }

        cb(event);
    }

    document.addEventListener("pointerdown", handler, true);

    return () => {
        document.removeEventListener("pointerdown", handler, true);
    };
}
