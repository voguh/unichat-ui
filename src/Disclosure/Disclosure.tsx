/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type * as React from "react";
import { forwardRef, useEffect, useRef } from "react";

import { Disclosure as HeadlessDisclosure } from "@headlessui/react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

const OPEN_BY_NAME = new Map<string, Set<() => void>>();

interface ExclusiveGroupProps {
    name?: string;
    open: boolean;
    close: () => void;
    children: React.ReactNode;
}

function ExclusiveGroup({ name, open, close, children }: ExclusiveGroupProps): React.ReactNode {
    const closeRef = useRef(close);
    closeRef.current = close;

    useEffect(() => {
        if (name == null || !open) {
            return;
        }

        function closeSelf(): void {
            closeRef.current();
        }

        const group = OPEN_BY_NAME.get(name) ?? new Set();
        for (const closeOther of group) {
            closeOther();
        }

        group.clear();
        group.add(closeSelf);
        OPEN_BY_NAME.set(name, group);

        return () => {
            group.delete(closeSelf);
        };
    }, [name, open]);

    return children;
}

type VanillaProps = React.HTMLAttributes<HTMLDivElement>;
export interface DisclosureProps extends VanillaProps {
    defaultOpen?: boolean;
    name?: string;
}

export const Disclosure = forwardRef<HTMLElement, DisclosureProps>(function Disclosure(
    { defaultOpen, name, className, children, ...rest },
    ref
) {
    return (
        <HeadlessDisclosure
            {...rest}
            as="div"
            ref={ref}
            defaultOpen={defaultOpen}
            data-part={dataPart("Disclosure", rest)}
            className={clsx(styles.root, className)}
        >
            {({ open, close }) => (
                <ExclusiveGroup name={name} open={open} close={close}>
                    {children}
                </ExclusiveGroup>
            )}
        </HeadlessDisclosure>
    );
});
