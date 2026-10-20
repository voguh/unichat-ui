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

import * as pagination from "@zag-js/pagination";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import { PaginationContext } from "./context";
import styles from "./styles.module.css";

export interface PaginationRootProps
    extends Omit<PReact.HTMLAttributes<HTMLElement>, keyof pagination.Props>,
        Partial<Omit<pagination.Props, "id">> {
    id?: string;
}

export const PaginationRoot = forwardRef<HTMLElement, PaginationRootProps>(function PaginationRoot(
    { id, className, ...props },
    ref
) {
    const [machineProps, rest] = pagination.splitProps(props);

    const machineId = useId();
    const service = useMachine(pagination.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, root: id }
    });
    const api = pagination.connect(service, normalizeProps);

    return (
        <PaginationContext.Provider value={api}>
            <nav {...mergeProps(api.getRootProps(), rest)} ref={ref} className={clsx(styles.root, className)} />
        </PaginationContext.Provider>
    );
});
