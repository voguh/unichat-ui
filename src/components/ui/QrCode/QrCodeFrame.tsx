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

import { clsx } from "~/utils/clsx";

import { useQrCode } from "./context";
import styles from "./styles.module.css";

export interface QrCodeFrameProps extends PReact.SVGAttributes<SVGSVGElement> {}

export const QrCodeFrame = forwardRef<SVGSVGElement, QrCodeFrameProps>(function QrCodeFrame(
    { className, ...rest },
    ref
) {
    const api = useQrCode();

    return (
        // biome-ignore lint/a11y/noSvgWithoutTitle: accessible name comes from consumer props (aria-label)
        <svg {...mergeProps(api.getFrameProps(), rest)} ref={ref} className={clsx(styles.frame, className)}>
            <path {...api.getPatternProps()} className={styles.pattern} />
        </svg>
    );
});
