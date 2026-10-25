/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type { MutableRefObject, Ref as ReactRef } from "react";

export type Ref<T> = ReactRef<T> | undefined;

/**
 * Combines refs into one callback ref.
 *
 * @param refs Callback refs and ref objects; `null` and `undefined` are skipped.
 * @returns Callback ref that assigns the instance to every ref.
 */
export function mergeRefs<T>(...refs: Ref<T>[]): (instance: T | null) => void {
    return (instance: T | null): void => {
        for (const refObject of refs) {
            if (refObject != null) {
                if (typeof refObject === "function") {
                    refObject(instance);
                } else {
                    (refObject as MutableRefObject<T | null>).current = instance;
                }
            }
        }
    };
}
