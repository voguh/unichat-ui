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

import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";
import * as progress from "@zag-js/progress";

import { ProgressContext } from "./context";
import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface ProgressRootProps
    extends Omit<PReact.HTMLAttributes<HTMLDivElement>, keyof progress.Props>,
        Partial<Omit<progress.Props, "id">> {
    id?: string;
}

export const ProgressRoot = forwardRef<HTMLDivElement, ProgressRootProps>(function ProgressRoot(
    { id, className, ...props },
    ref
) {
    const [machineProps, rest] = progress.splitProps(props);

    const machineId = useId();
    const service = useMachine(progress.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, root: id }
    });
    const api = progress.connect(service, normalizeProps);

    return (
        <ProgressContext.Provider value={api}>
            <div {...mergeProps(api.getRootProps(), rest)} ref={ref} className={clsx(styles.root, className)} />
        </ProgressContext.Provider>
    );
});
