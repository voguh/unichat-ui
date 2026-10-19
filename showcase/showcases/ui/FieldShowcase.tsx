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
import { useState } from "preact/hooks";

import { Code } from "~/components/ui/Code";
import { ColorPicker } from "~/components/ui/ColorPicker";
import { DatePicker } from "~/components/ui/DatePicker";
import { FileUpload } from "~/components/ui/FileUpload";
import { NumberInput } from "~/components/ui/NumberInput";
import { PasswordInput } from "~/components/ui/PasswordInput";
import { TagsInput } from "~/components/ui/TagsInput";
import { parseColor } from "~/utils/colorUtils";
import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

export function NumberInputShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState("5");

    return (
        <ShowcasePage title="NumberInput & PasswordInput" description="Spread and ref go to the visible native input.">
            <Example title="NumberInput" vertical>
                <NumberInput
                    aria-label="Max files"
                    min={0}
                    max={10}
                    value={value}
                    onValueChange={(details) => setValue(details.value)}
                />
                <Code>value: {JSON.stringify(value)}</Code>
                <NumberInput aria-label="Disabled" defaultValue="3" disabled />
            </Example>
            <Example title="PasswordInput" vertical>
                <PasswordInput placeholder="Client secret" autoComplete="new-password" />
                <PasswordInput placeholder="Invalid" invalid autoComplete="new-password" />
            </Example>
        </ShowcasePage>
    );
}

export function TagsInputShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState(["read:user", "user:email"]);

    return (
        <ShowcasePage
            title="TagsInput"
            description="@zag-js/tags-input. Enter adds, Backspace removes, double click edits."
        >
            <Example title="Default" vertical>
                <TagsInput
                    placeholder="Add scope"
                    name="scopes"
                    value={value}
                    onValueChange={(details) => setValue(details.value)}
                />
                <Code>value: {JSON.stringify(value)}</Code>
            </Example>
            <Example title="States" vertical>
                <TagsInput placeholder="Disabled" defaultValue={["locked"]} disabled />
                <TagsInput placeholder="Invalid" invalid />
            </Example>
        </ShowcasePage>
    );
}

export function DatePickerShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState<string[]>([]);

    return (
        <ShowcasePage title="DatePicker" description="@zag-js/date-picker with day, month and year views.">
            <Example title="Single" vertical>
                <DatePicker placeholder="Published at" onValueChange={(details) => setValue(details.valueAsString)} />
                <Code>value: {JSON.stringify(value)}</Code>
            </Example>
            <Example title="Range" vertical>
                <DatePicker selectionMode="range" placeholder="Period" />
            </Example>
        </ShowcasePage>
    );
}

export function ColorPickerShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState("rgba(153, 27, 27, 1)");

    return (
        <ShowcasePage title="ColorPicker" description="@zag-js/color-picker. Spread and ref go to the hidden input.">
            <Example title="With swatches" vertical>
                <ColorPicker
                    defaultValue={parseColor("#991b1b")}
                    swatches={["#991b1b", "#2563eb", "#16a34a", "#ca8a04", "#78716c"]}
                    onValueChange={(details) => setValue(details.valueAsString)}
                />
                <Code>value: {value}</Code>
            </Example>
        </ShowcasePage>
    );
}

export function FileUploadShowcase(): PReact.ComponentChildren {
    const [files, setFiles] = useState<string[]>([]);

    return (
        <ShowcasePage title="FileUpload" description="@zag-js/file-upload. Spread and ref go to the hidden file input.">
            <Example title="Multiple files" vertical>
                <FileUpload maxFiles={3} onFileChange={(details) => setFiles(details.acceptedFiles.map((f) => f.name))}>
                    Drop release assets here or click to choose
                </FileUpload>
                <Code>files: {JSON.stringify(files)}</Code>
            </Example>
            <Example title="Accept only zip" vertical>
                <FileUpload accept="application/zip">Only .zip files</FileUpload>
            </Example>
        </ShowcasePage>
    );
}
