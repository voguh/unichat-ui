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

import { mergeProps } from "@zag-js/preact";

import { mergeRefs, type Ref } from "~/utils/mergeRefs";

export function cloneAsChild<T>(
    children: PReact.ComponentChildren,
    props: Record<string, unknown>,
    ref: Ref<T>
): PReact.VNode {
    const child = toChildArray(children)[0] as PReact.VNode;
    const childProps = child.props as Record<string, unknown>;

    return cloneElement(child, { ...mergeProps(props, childProps), ref: mergeRefs(ref, child.ref as Ref<T>) });
}
