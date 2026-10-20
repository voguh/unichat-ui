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

import { DialogCloseTrigger } from "./DialogCloseTrigger";
import { DialogTitle } from "./DialogTitle";
import styles from "./styles.module.css";

export interface DialogHeaderProps extends Omit<PReact.HTMLAttributes<HTMLDivElement>, "title"> {
    title?: PReact.ComponentChildren;
    actions?: PReact.ComponentChildren;
    withCloseButton?: boolean;
}

export const DialogHeader = forwardRef<HTMLDivElement, DialogHeaderProps>(function DialogHeader(
    { title, actions, withCloseButton = true, className, children, ...rest },
    ref
) {
    return (
        <div {...rest} ref={ref} className={clsx(styles.header, className)}>
            {title != null && <DialogTitle>{title}</DialogTitle>}
            {children}
            {(actions != null || withCloseButton) && (
                <div className={styles.headerActions}>
                    {actions}
                    {withCloseButton && (
                        <DialogCloseTrigger>
                            <i className="fas fa-times" aria-hidden="true" />
                        </DialogCloseTrigger>
                    )}
                </div>
            )}
        </div>
    );
});
