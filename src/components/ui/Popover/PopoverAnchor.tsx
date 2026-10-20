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
import { forwardRef } from "preact/compat";
import { useContext } from "preact/hooks";

import { mergeProps } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import { PopoverOpenOnContext, usePopover } from "./context";
import styles from "./styles.module.css";

export interface PopoverAnchorProps extends PReact.HTMLAttributes<HTMLDivElement> {}

export const PopoverAnchor = forwardRef<HTMLDivElement, PopoverAnchorProps>(function PopoverAnchor(
    { className, ...rest },
    ref
) {
    const api = usePopover();
    const openOn = useContext(PopoverOpenOnContext);
    const focusProps: PReact.HTMLAttributes<HTMLDivElement> =
        openOn === "focus" ? { onFocusIn: () => api.setOpen(true), onFocusOut: () => api.setOpen(false) } : {};

    return (
        <div
            {...mergeProps(api.getAnchorProps(), focusProps, rest)}
            ref={ref}
            className={clsx(styles.anchor, className)}
        />
    );
});
