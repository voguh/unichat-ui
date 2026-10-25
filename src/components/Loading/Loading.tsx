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

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = PReact.HTMLAttributes<HTMLDivElement>;
export interface LoadingProps extends VanillaProps {
    show?: boolean;
    label: string;
}

export const Loading = forwardRef<HTMLDivElement, LoadingProps>(function Loading(
    { show = true, label, className, ...rest },
    ref
) {
    if (!show) {
        return null;
    }

    return (
        <div
            role="status"
            {...rest}
            ref={ref}
            data-part={dataPart("Loading", rest)}
            className={clsx(styles.root, className)}
        >
            <i className="fas fa-spinner fa-spin fa-fw fa-2x" aria-hidden="true" />
            <span>{label}</span>
        </div>
    );
});
