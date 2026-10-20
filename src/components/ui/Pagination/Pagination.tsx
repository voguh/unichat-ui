/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/
/** biome-ignore-all lint/suspicious/noArrayIndexKey: ellipses have no identity besides their position */

import type PReact from "preact";
import { forwardRef } from "preact/compat";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLElement>, "onChange">;
export interface PaginationProps extends VanillaProps {
    count: number;
    pageSize?: number;
    page: number;
    siblingCount?: number;
    onChange: (page: number) => void;
}

function range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function getPages(page: number, totalPages: number, siblingCount: number): Array<number | null> {
    const edgeCount = siblingCount * 2 + 3;
    if (totalPages <= edgeCount + 2) {
        return range(1, totalPages);
    }

    if (page - siblingCount <= 3) {
        return [...range(1, edgeCount), null, totalPages];
    }

    if (page + siblingCount >= totalPages - 2) {
        return [1, null, ...range(totalPages - edgeCount + 1, totalPages)];
    }

    return [1, null, ...range(page - siblingCount, page + siblingCount), null, totalPages];
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
    { count, pageSize = 10, page, siblingCount = 1, onChange, className, ...rest },
    ref
) {
    const totalPages = Math.max(1, Math.ceil(count / pageSize));

    return (
        <nav {...rest} ref={ref} className={clsx(styles.root, className)}>
            <button
                type="button"
                aria-label="First page"
                disabled={page <= 1}
                onClick={() => onChange(1)}
                className={styles.item}
            >
                <i className="fas fa-angle-double-left" aria-hidden="true" />
            </button>
            <button
                type="button"
                aria-label="Previous page"
                disabled={page <= 1}
                onClick={() => onChange(page - 1)}
                className={styles.item}
            >
                <i className="fas fa-chevron-left" aria-hidden="true" />
            </button>
            {getPages(page, totalPages, siblingCount).map((value, index) =>
                value != null ? (
                    <button
                        key={value}
                        type="button"
                        aria-current={value === page ? "page" : undefined}
                        onClick={() => onChange(value)}
                        className={styles.item}
                    >
                        {value}
                    </button>
                ) : (
                    <span key={`ellipsis-${index}`} aria-hidden="true" className={styles.ellipsis}>
                        &#8230;
                    </span>
                )
            )}
            <button
                type="button"
                aria-label="Next page"
                disabled={page >= totalPages}
                onClick={() => onChange(page + 1)}
                className={styles.item}
            >
                <i className="fas fa-chevron-right" aria-hidden="true" />
            </button>
            <button
                type="button"
                aria-label="Last page"
                disabled={page >= totalPages}
                onClick={() => onChange(totalPages)}
                className={styles.item}
            >
                <i className="fas fa-angle-double-right" aria-hidden="true" />
            </button>
        </nav>
    );
});
