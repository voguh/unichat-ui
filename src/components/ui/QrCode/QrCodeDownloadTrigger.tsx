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

import { mergeProps } from "@zag-js/preact";
import type * as qrCode from "@zag-js/qr-code";

import { clsx } from "~/utils/clsx";

import { useQrCode } from "./context";
import styles from "./styles.module.css";

type DownloadOptions = Parameters<qrCode.Api["getDownloadTriggerProps"]>[0];

export interface QrCodeDownloadTriggerProps extends PReact.ButtonHTMLAttributes<HTMLButtonElement> {
    fileName: string;
    mimeType?: DownloadOptions["mimeType"];
    quality?: number;
}

export const QrCodeDownloadTrigger = forwardRef<HTMLButtonElement, QrCodeDownloadTriggerProps>(
    function QrCodeDownloadTrigger({ fileName, mimeType = "image/png", quality, className, ...rest }, ref) {
        const api = useQrCode();

        return (
            <button
                {...mergeProps(api.getDownloadTriggerProps({ fileName, mimeType, quality }), rest)}
                ref={ref}
                className={clsx(styles.downloadTrigger, className)}
            />
        );
    }
);
