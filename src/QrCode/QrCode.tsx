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
import { forwardRef, useMemo } from "react";

import { generate } from "lean-qr";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "alt">;
export interface QrCodeProps extends VanillaProps {
    value: string;
    alt: string;
}

export const QrCode = forwardRef<HTMLImageElement, QrCodeProps>(function QrCode(
    { value, alt, className, ...rest },
    ref
) {
    const src = useMemo(() => generate(value).toDataURL({ scale: 10, pad: 1 }), [value]);

    return (
        <img
            {...rest}
            ref={ref}
            src={src}
            alt={alt}
            data-part={dataPart("QrCode", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
