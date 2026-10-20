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
import { useLayoutEffect, useRef } from "preact/hooks";

import { clsx } from "~/utils/clsx";
import { mergeRefs } from "~/utils/mergeRefs";

import styles from "./styles.module.css";

export interface TextareaProps extends PReact.TextareaHTMLAttributes<HTMLTextAreaElement> {
    autoResize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
    { autoResize = false, value, onInput, className, ...rest },
    ref
) {
    const innerRef = useRef<HTMLTextAreaElement>(null);

    function resize(): void {
        const element = innerRef.current;
        if (!autoResize || element == null) {
            return;
        }

        element.style.height = "auto";
        element.style.height = `${element.scrollHeight}px`;
    }

    function handleInput(event: PReact.TargetedInputEvent<HTMLTextAreaElement>): void {
        if (onInput != null) {
            onInput(event);
        }

        resize();
    }

    useLayoutEffect(() => {
        resize();
    });

    return (
        <textarea
            {...rest}
            ref={mergeRefs(innerRef, ref)}
            value={value}
            onInput={handleInput}
            data-auto-resize={autoResize || undefined}
            className={clsx(styles.root, className)}
        />
    );
});
