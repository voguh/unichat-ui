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
import * as qrCode from "@zag-js/qr-code";

import { QrCodeContext } from "./context";
import styles from "./styles.module.css";
import { clsx } from "~/utils/clsx";

export interface QrCodeRootProps
    extends Omit<PReact.HTMLAttributes<HTMLDivElement>, keyof qrCode.Props>,
        Partial<Omit<qrCode.Props, "id">> {
    id?: string;
}

export const QrCodeRoot = forwardRef<HTMLDivElement, QrCodeRootProps>(function QrCodeRoot(
    { id, className, ...props },
    ref
) {
    const [machineProps, rest] = qrCode.splitProps(props);

    const machineId = useId();
    const service = useMachine(qrCode.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, root: id }
    });
    const api = qrCode.connect(service, normalizeProps);

    return (
        <QrCodeContext.Provider value={api}>
            <div {...mergeProps(api.getRootProps(), rest)} ref={ref} className={clsx(styles.root, className)} />
        </QrCodeContext.Provider>
    );
});
