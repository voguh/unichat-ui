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
import { useId } from "preact/hooks";

import * as clipboard from "@zag-js/clipboard";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import { ClipboardContext } from "./context";
import styles from "./styles.module.css";

export interface ClipboardRootProps
    extends Omit<PReact.HTMLAttributes<HTMLDivElement>, keyof clipboard.Props>,
        Partial<Omit<clipboard.Props, "id">> {
    id?: string;
}

export const ClipboardRoot = forwardRef<HTMLDivElement, ClipboardRootProps>(function ClipboardRoot(
    {
        id,
        ids,
        value,
        defaultValue,
        onValueChange,
        onStatusChange,
        timeout,
        translations,
        getRootNode,
        className,
        ...rest
    },
    ref
) {
    const machineId = useId();
    const service = useMachine(clipboard.machine, {
        id: machineId,
        ids: { ...ids, root: id },
        value,
        defaultValue,
        onValueChange,
        onStatusChange,
        timeout,
        translations,
        getRootNode
    });
    const api = clipboard.connect(service, normalizeProps);

    return (
        <ClipboardContext.Provider value={api}>
            <div {...mergeProps(api.getRootProps(), rest)} ref={ref} className={clsx(styles.root, className)} />
        </ClipboardContext.Provider>
    );
});
