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
import { createPortal } from "preact/compat";

export interface PortalProps {
    container?: HTMLElement;
    disabled?: boolean;
    children: PReact.ComponentChildren;
}

// @zag-js/preact's Portal references a global React and breaks at runtime.
export function Portal({ container, disabled = false, children }: PortalProps): PReact.ComponentChildren {
    if (disabled) {
        return children;
    }

    return createPortal(children, container ?? document.body);
}
