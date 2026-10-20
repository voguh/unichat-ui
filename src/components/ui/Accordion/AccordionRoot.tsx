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

import * as accordion from "@zag-js/accordion";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import { AccordionContext } from "./context";
import styles from "./styles.module.css";

export interface AccordionRootProps
    extends Omit<PReact.HTMLAttributes<HTMLDivElement>, keyof accordion.Props>,
        Partial<Omit<accordion.Props, "id">> {
    id?: string;
}

export const AccordionRoot = forwardRef<HTMLDivElement, AccordionRootProps>(function AccordionRoot(
    { id, className, ...props },
    ref
) {
    const [machineProps, rest] = accordion.splitProps(props);

    const machineId = useId();
    const service = useMachine(accordion.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, root: id }
    });
    const api = accordion.connect(service, normalizeProps);

    return (
        <AccordionContext.Provider value={api}>
            <div {...mergeProps(api.getRootProps(), rest)} ref={ref} className={clsx(styles.root, className)} />
        </AccordionContext.Provider>
    );
});
