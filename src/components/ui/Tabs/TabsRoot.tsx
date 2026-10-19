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
import * as tabs from "@zag-js/tabs";

import { TabsContext } from "./context";
import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface TabsRootProps
    extends Omit<PReact.HTMLAttributes<HTMLDivElement>, keyof tabs.Props>,
        Partial<Omit<tabs.Props, "id">> {
    id?: string;
}

export const TabsRoot = forwardRef<HTMLDivElement, TabsRootProps>(function TabsRoot({ id, className, ...props }, ref) {
    const [machineProps, rest] = tabs.splitProps(props);

    const machineId = useId();
    const service = useMachine(tabs.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, root: id }
    });
    const api = tabs.connect(service, normalizeProps);

    return (
        <TabsContext.Provider value={api}>
            <div {...mergeProps(api.getRootProps(), rest)} ref={ref} className={clsx(styles.root, className)} />
        </TabsContext.Provider>
    );
});
