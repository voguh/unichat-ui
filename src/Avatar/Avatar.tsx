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
import { forwardRef, useState } from "react";

import { clsx } from "~/utils/clsx";
import { dataPart } from "~/utils/dataAttributes";

import styles from "./styles.module.css";

type VanillaProps = React.ImgHTMLAttributes<HTMLImageElement>;
export interface AvatarProps extends VanillaProps {
    fallback?: React.ReactNode;
}

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(function Avatar(
    { src, alt, fallback = <i className="fas fa-image" aria-hidden="true" />, onError, className, ...rest },
    ref
) {
    const [failedSrc, setFailedSrc] = useState<AvatarProps["src"]>(undefined);

    function handleError(event: React.SyntheticEvent<HTMLImageElement, Event>): void {
        setFailedSrc(src);
        if (onError != null) {
            onError(event);
        }
    }

    if (src == null || src === "" || src === failedSrc) {
        if (alt === "") {
            return (
                <span
                    {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
                    aria-hidden="true"
                    data-part={dataPart("Avatar", rest)}
                    data-fallback=""
                    className={clsx(styles.root, className)}
                >
                    {fallback}
                </span>
            );
        }

        return (
            <span
                {...(rest as React.HTMLAttributes<HTMLSpanElement>)}
                role="img"
                aria-label={typeof alt === "string" ? alt : undefined}
                data-part={dataPart("Avatar", rest)}
                data-fallback=""
                className={clsx(styles.root, className)}
            >
                {fallback}
            </span>
        );
    }

    return (
        <img
            {...rest}
            ref={ref}
            src={src}
            alt={alt}
            onError={handleError}
            data-part={dataPart("Avatar", rest)}
            className={clsx(styles.root, className)}
        />
    );
});
