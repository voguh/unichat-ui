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
import { useRef, useState } from "preact/hooks";

import { clsx } from "~/utils/clsx";
import { dataFlag, dataPart, omitDataPart } from "~/utils/dataAttributes";
import { mergeRefs } from "~/utils/mergeRefs";

import styles from "./styles.module.css";

const SIZE_UNITS = ["B", "KB", "MB", "GB"];

function formatFileSize(bytes: number): string {
    let size = bytes;
    let unit = 0;
    while (size >= 1024 && unit < SIZE_UNITS.length - 1) {
        size /= 1024;
        unit++;
    }

    return `${Number(size.toFixed(1))} ${SIZE_UNITS[unit]}`;
}

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue">;
export interface FileUploadProps extends VanillaProps {
    invalid?: boolean;
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(function FileUpload(
    { invalid = false, rootProps = {}, multiple, disabled, onChange, className, children, ...rest },
    ref
) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);

    function assignFiles(selected: File[]): void {
        const transfer = new DataTransfer();
        for (const file of selected) {
            transfer.items.add(file);
        }

        const input = inputRef.current!;
        input.files = transfer.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function handleChange(event: PReact.TargetedEvent<HTMLInputElement, Event>): void {
        setFiles(Array.from(event.currentTarget.files ?? []));
        if (onChange != null) {
            onChange(event);
        }
    }

    function handleDragOver(event: PReact.TargetedDragEvent<HTMLLabelElement>): void {
        event.preventDefault();
        if (!disabled) {
            setDragging(true);
        }
    }

    function handleDrop(event: PReact.TargetedDragEvent<HTMLLabelElement>): void {
        event.preventDefault();
        setDragging(false);
        if (disabled || event.dataTransfer == null) {
            return;
        }

        const dropped = Array.from(event.dataTransfer.files);
        if (multiple) {
            assignFiles(dropped);
        } else {
            assignFiles(dropped.slice(0, 1));
        }
    }

    return (
        <div
            {...rootProps}
            data-part={dataPart("FileUpload", rest)}
            className={clsx(styles.root, className, rootProps.className)}
        >
            <label
                data-slot="dropzone"
                data-dragging={dataFlag(dragging)}
                data-invalid={dataFlag(invalid)}
                data-disabled={dataFlag(disabled)}
                onDragOver={handleDragOver}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
            >
                <input
                    {...omitDataPart(rest)}
                    ref={mergeRefs(ref, inputRef)}
                    type="file"
                    multiple={multiple}
                    disabled={disabled}
                    onChange={handleChange}
                />
                <i data-slot="icon" className="fas fa-cloud-upload-alt" aria-hidden="true" />
                {children}
            </label>
            {files.length > 0 && (
                <ul>
                    {files.map((file, index) => (
                        <li key={`${file.name}-${file.lastModified}`}>
                            <span data-slot="name">{file.name}</span>
                            <span data-slot="size">{formatFileSize(file.size)}</span>
                            <button
                                type="button"
                                aria-label={`Remove ${file.name}`}
                                disabled={disabled}
                                onClick={() => assignFiles(files.filter((_, current) => current !== index))}
                            >
                                <i className="fas fa-times" aria-hidden="true" />
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});
