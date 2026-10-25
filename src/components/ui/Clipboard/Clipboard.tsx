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
import { useEffect, useId, useState } from "preact/hooks";

import { clsx } from "~/utils/clsx";
import { dataFlag, dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "label">;
export interface ClipboardProps extends VanillaProps {
    value: string;
    label?: PReact.ComponentChildren;
}

export const Clipboard = forwardRef<HTMLDivElement, ClipboardProps>(function Clipboard(
    { value, label, className, ...rest },
    ref
) {
    const inputId = useId();
    const [copied, setCopied] = useState(false);

    async function copy(): Promise<void> {
        await navigator.clipboard.writeText(value);
        setCopied(true);
    }

    function getCopyIcon(): string {
        if (copied) {
            return "fas fa-check";
        }

        return "fas fa-copy";
    }

    useEffect(() => {
        if (!copied) {
            return;
        }

        const timer = setTimeout(() => setCopied(false), 2000);

        return () => clearTimeout(timer);
    }, [copied]);

    return (
        <div {...rest} ref={ref} data-part={dataPart("Clipboard", rest)} className={clsx(styles.root, className)}>
            {label != null && <label htmlFor={inputId}>{label}</label>}
            <div data-slot="control">
                <input id={inputId} value={value} readOnly />
                <button type="button" aria-label="Copy to clipboard" data-copied={dataFlag(copied)} onClick={copy}>
                    <i className={getCopyIcon()} aria-hidden="true" />
                </button>
            </div>
        </div>
    );
});
