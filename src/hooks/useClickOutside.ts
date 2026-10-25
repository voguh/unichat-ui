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

import { clickOutside } from "~/utils/clickOutside";

/**
 * {@link clickOutside} bound to a ref, active while the component is mounted.
 *
 * @param cb Callback that receives the pointer event.
 * @returns Ref for the element that counts as inside.
 */
export function useClickOutside<T extends Element = Element>(cb: (event?: Event) => void): RefObject<T> {
    const ref = useRef<T | null>(null);

    useEffect(() => clickOutside(cb, ref), [cb]);

    return ref;
}
