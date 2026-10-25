/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

export type ClassPrimitive = string | number | bigint | symbol | null | undefined;
export type ClassDictionary = Record<string, boolean>;
export type ClassValue = ClassDictionary | ClassPrimitive;

/**
 * Joins class names, skipping `null`, `undefined` and booleans; a dictionary contributes its truthy keys.
 *
 * @param args Class names and dictionaries.
 * @returns The space-separated class string.
 */
export function clsx(...args: ClassValue[]): string {
    const str: string[] = [];

    for (const arg of args) {
        if (arg == null || typeof arg === "boolean") {
            continue;
        }

        if (typeof arg !== "object") {
            str.push(String(arg));
        } else {
            for (const [key, enabled] of Object.entries(arg)) {
                if (enabled) {
                    str.push(key);
                }
            }
        }
    }

    return str.join(" ");
}
