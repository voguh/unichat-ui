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
import { cloneElement, toChildArray } from "preact";

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

export function cloneAsChild<T>(
    children: PReact.ComponentChildren,
    props: Record<string, unknown>,
    ref: Ref<T>
): PReact.VNode {
    const child = toChildArray(children)[0] as PReact.VNode;
    const childProps = child.props as Record<string, unknown>;

    return cloneElement(child, { ...mergeProps(props, childProps), ref: mergeRefs(ref, child.ref as Ref<T>) });
}
