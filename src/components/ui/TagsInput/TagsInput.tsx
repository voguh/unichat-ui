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
import { useId } from "preact/hooks";

import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";
import * as tagsInput from "@zag-js/tags-input";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, keyof tagsInput.Props>;
export interface TagsInputProps extends VanillaProps, Partial<Omit<tagsInput.Props, "id">> {
    id?: string;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const TagsInput = forwardRef<HTMLInputElement, TagsInputProps>(function TagsInput(
    { id, rootProps, className, ...props },
    ref
) {
    const [machineProps, rest] = tagsInput.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const machineId = useId();
    const service = useMachine(tagsInput.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, input: id }
    });
    const api = tagsInput.connect(service, normalizeProps);

    return (
        <div
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            <div {...api.getControlProps()} className={styles.control}>
                {api.value.map((value, index) => {
                    const item = { index, value };

                    return (
                        <span key={value} {...api.getItemProps(item)}>
                            <span {...api.getItemPreviewProps(item)} className={styles.itemPreview}>
                                <span {...api.getItemTextProps(item)}>{value}</span>
                                <button {...api.getItemDeleteTriggerProps(item)} className={styles.itemDeleteTrigger}>
                                    <i className="fas fa-times" aria-hidden="true" />
                                </button>
                            </span>
                            <input {...api.getItemInputProps(item)} className={styles.itemInput} />
                        </span>
                    );
                })}
                <input {...mergeProps(api.getInputProps(), rest)} ref={ref} className={styles.input} />
            </div>
            <input {...api.getHiddenInputProps()} />
        </div>
    );
});
