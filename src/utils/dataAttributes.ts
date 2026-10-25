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

export function dataFlag(value: unknown): "" | undefined {
    if (value) {
        return "";
    }

    return undefined;
}

export function joinDataPart(name: string, external: string | undefined): string {
    if (external != null && external !== "") {
        return `${name} ${external}`;
    }

    return name;
}

export function dataPart(name: string, props: object): string {
    return joinDataPart(name, (props as DataPartProps)["data-part"]);
}

export function omitDataPart<T extends object>(props: T): T {
    const { "data-part": _external, ...others } = props as T & DataPartProps;

    return others as T;
}
