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

import * as fileUpload from "@zag-js/file-upload";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, keyof fileUpload.Props | "type">;
export interface FileUploadProps extends VanillaProps, Partial<Omit<fileUpload.Props, "id">> {
    id?: string;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
    { id, rootProps, className, children, ...props },
    ref
) {
    const [machineProps, rest] = fileUpload.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const machineId = useId();
    const service = useMachine(fileUpload.machine, {
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, hiddenInput: id }
    });
    const api = fileUpload.connect(service, normalizeProps);

    return (
        <div
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            <div {...api.getDropzoneProps()} className={styles.dropzone}>
                <i className="fas fa-cloud-upload-alt" aria-hidden="true" />
                {children}
            </div>
            {api.acceptedFiles.length > 0 && (
                <ul {...api.getItemGroupProps()} className={styles.itemGroup}>
                    {api.acceptedFiles.map((file) => (
                        <li key={file.name} {...api.getItemProps({ file })} className={styles.item}>
                            <span {...api.getItemNameProps({ file })} className={styles.itemName}>
                                {file.name}
                            </span>
                            <span {...api.getItemSizeTextProps({ file })} className={styles.itemSize}>
                                {api.getFileSize(file)}
                            </span>
                            <button {...api.getItemDeleteTriggerProps({ file })} className={styles.itemDeleteTrigger}>
                                <i className="fas fa-times" aria-hidden="true" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            <input {...mergeProps(api.getHiddenInputProps(), rest)} ref={ref} />
        </div>
    );
});
