/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type * as React from "react";
import { Children, cloneElement } from "react";

import { mergeRefs, type Ref } from "~/utils/mergeRefs";

type Handler = (...args: unknown[]) => void;

function mergeProps(props: Record<string, unknown>, childProps: Record<string, unknown>): Record<string, unknown> {
    const merged = { ...props, ...childProps };
    for (const [key, value] of Object.entries(props)) {
        const childValue = childProps[key];
        if (key.startsWith("on") && typeof value === "function" && typeof childValue === "function") {
            merged[key] = (...args: unknown[]) => {
                (childValue as Handler)(...args);
                (value as Handler)(...args);
            };
        }
    }

    return merged;
}

/**
 * Clones the first child, merging the given props over its own (event handlers run child first) and its ref.
 *
 * @param children Element that receives the props; only the first child is used.
 * @param props Props to merge into the child.
 * @param ref Ref merged with the child's own ref.
 * @returns The cloned element.
 */
export function cloneAsChild<T>(
    children: React.ReactNode,
    props: Record<string, unknown>,
    ref: Ref<T>
): React.ReactElement {
    const child = Children.toArray(children)[0] as React.ReactElement<Record<string, unknown>> & { ref?: Ref<T> };

    return cloneElement(child, { ...mergeProps(props, child.props), ref: mergeRefs(ref, child.ref) });
}
