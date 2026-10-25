/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

/**
 * Assigns the value through the prototype setter, so an `input`/`change` dispatched next reaches React's `onChange`;
 * React's value tracker ignores the event when the value is assigned through the element itself.
 *
 * @param element Input or select to update.
 * @param value New value.
 */
export function setNativeValue(element: HTMLInputElement | HTMLSelectElement, value: string): void {
    const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(element), "value");
    descriptor!.set!.call(element, value);
}
