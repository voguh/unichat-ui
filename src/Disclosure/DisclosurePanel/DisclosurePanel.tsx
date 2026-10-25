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

import {
    DisclosurePanel as HeadlessDisclosurePanel,
    type DisclosurePanelProps as HeadlessDisclosurePanelProps
} from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "id">;
export interface DisclosurePanelProps extends VanillaProps, Pick<HeadlessDisclosurePanelProps, "unmount" | "static"> {
    id?: string;
}

export const DisclosurePanel = forwardRef<HTMLElement, DisclosurePanelProps>(function DisclosurePanel(
    { className, ...rest },
    ref
) {
    return (
        <HeadlessDisclosurePanel
            {...rest}
            ref={ref}
            data-part={dataPart("DisclosurePanel", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
