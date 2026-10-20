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

import { mergeProps } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import { useClipboard } from "./context";
import styles from "./styles.module.css";

export interface ClipboardLabelProps extends PReact.LabelHTMLAttributes<HTMLLabelElement> {}

export const ClipboardLabel = forwardRef<HTMLLabelElement, ClipboardLabelProps>(function ClipboardLabel(
    { className, ...rest },
    ref
) {
    const api = useClipboard();

    // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor comes from zag label props
    return <label {...mergeProps(api.getLabelProps(), rest)} ref={ref} className={clsx(styles.label, className)} />;
});
