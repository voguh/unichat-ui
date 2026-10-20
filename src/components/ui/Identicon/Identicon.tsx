/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
/** biome-ignore-all lint/a11y/noSvgWithoutTitle: accessible name comes from consumer props (aria-label) */

import type PReact from "preact";
import { forwardRef } from "preact/compat";
import { useMemo } from "preact/hooks";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

const GRID_SIZE = 16;
const HALF_SIZE = GRID_SIZE / 2;

type VanillaProps = PReact.SVGAttributes<SVGSVGElement>;
export interface IdenticonProps extends VanillaProps {
    value: string;
}

interface IdenticonCell {
    x: number;
    y: number;
}

function fnv1a(str: string, seed = 0x811c9dc5): number {
    let hash = seed;
    for (let i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = Math.imul(hash, 0x01000193) >>> 0;
    }

    return hash;
}

function buildIdenticon(value: string): { color: string; cells: IdenticonCell[] } {
    const h1 = fnv1a(value);
    const h2 = fnv1a(value, h1);
    const h3 = fnv1a(value, h2);
    const h4 = fnv1a(value, h3);
    const h5 = fnv1a(value, h4);
    const bits = [h2, h3, h4, h5];

    const hue = h1 % 360;
    const saturation = 45 + ((h1 >>> 8) % 25);
    const lightness = 40 + ((h1 >>> 16) % 20);

    const cells: IdenticonCell[] = [];
    for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
            const mirroredX = x >= HALF_SIZE ? GRID_SIZE - 1 - x : x;
            const bitIndex = y * HALF_SIZE + mirroredX;
            if (((bits[bitIndex >>> 5] >>> (bitIndex & 31)) & 1) === 1) {
                cells.push({ x, y });
            }
        }
    }

    return { color: `hsl(${hue}, ${saturation}%, ${lightness}%)`, cells };
}

export const Identicon = forwardRef<SVGSVGElement, IdenticonProps>(function Identicon(
    { value, className, ...rest },
    ref
) {
    const { color, cells } = useMemo(() => buildIdenticon(value), [value]);

    return (
        <svg
            role="img"
            {...rest}
            ref={ref}
            viewBox={`0 0 ${GRID_SIZE} ${GRID_SIZE}`}
            shapeRendering="crispEdges"
            className={clsx(styles.root, className)}
        >
            <rect width={GRID_SIZE} height={GRID_SIZE} className={styles.background} />
            <g fill={color}>
                {cells.map((cell) => (
                    <rect key={`${cell.x}-${cell.y}`} x={cell.x} y={cell.y} width={1} height={1} />
                ))}
            </g>
        </svg>
    );
});
