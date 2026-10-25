/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { forwardRef, useEffect, useRef } from "react";

import { Input, type InputProps } from "~/Input";
import { dataPart } from "~/utils/dataAttributes";
import { mergeRefs } from "~/utils/mergeRefs";

const INVALID_CHARS = /[^0-9eE+\-.]/g;

// Mirrors Chromium, which drops these characters; a number input has no selection API, so execCommand.
function filterInsertedText(event: InputEvent): void {
    let text = event.data;
    if (text == null && event.dataTransfer != null) {
        text = event.dataTransfer.getData("text/plain");
    }

    if (text == null) {
        return;
    }

    const filtered = text.replace(INVALID_CHARS, "");
    if (filtered !== text) {
        event.preventDefault();
        if (filtered !== "") {
            document.execCommand("insertText", false, filtered);
        }
    }
}

export interface NumberInputProps extends Omit<InputProps, "type"> {}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(props, ref) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = inputRef.current!;
        input.addEventListener("beforeinput", filterInsertedText);

        return () => input.removeEventListener("beforeinput", filterInsertedText);
    }, []);

    return <Input {...props} ref={mergeRefs(ref, inputRef)} type="number" data-part={dataPart("NumberInput", props)} />;
});
