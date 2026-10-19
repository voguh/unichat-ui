/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import "@testing-library/jest-dom";

import { cleanup } from "@testing-library/preact";

// jsdom lacks ResizeObserver and Element.scrollTo; zag positioning and listbox scrolling require them.
globalThis.ResizeObserver ??= class {
    public observe(): void {}
    public unobserve(): void {}
    public disconnect(): void {}
};
Element.prototype.scrollTo ??= () => {};

afterEach(() => {
    cleanup();
});
