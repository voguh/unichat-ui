/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

interface DataPartProps {
    "data-part"?: string;
}

/**
 * Value for a boolean `data-*` state: present and empty when truthy, absent otherwise.
 *
 * @param value State to flag.
 * @returns `""` when truthy, `undefined` otherwise.
 */
export function dataFlag(value: unknown): "" | undefined {
    if (value) {
        return "";
    }

    return undefined;
}

/**
 * Accumulates `data-part` from generic to specific.
 *
 * @param name The component's own part.
 * @param external Part received from outside, appended after `name`.
 * @returns `name` alone when `external` is empty, otherwise both separated by a space.
 */
export function joinDataPart(name: string, external: string | undefined): string {
    if (external != null && external !== "") {
        return `${name} ${external}`;
    }

    return name;
}

/**
 * {@link joinDataPart} with the `data-part` read from props.
 *
 * @param name The component's own part.
 * @param props Props that may carry an external `data-part`.
 * @returns The accumulated part.
 */
export function dataPart(name: string, props: object): string {
    return joinDataPart(name, (props as DataPartProps)["data-part"]);
}

/**
 * Removes `data-part` from props, for split components that forward the rest to an inner element.
 *
 * @param props Props to copy.
 * @returns A copy without `data-part`.
 */
export function omitDataPart<T extends object>(props: T): T {
    const { "data-part": _external, ...others } = props as T & DataPartProps;

    return others as T;
}
