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
import { Example } from "~showcase/components/Example";
import { type PropDoc, ShowcasePage } from "~showcase/components/ShowcasePage";

const INVALID_PROP: PropDoc = {
    name: "invalid",
    type: "boolean",
    defaultValue: "false",
    description: "Invalid style on the field."
};

const ROOT_PROPS: PropDoc = {
    name: "rootProps",
    type: "HTMLAttributes<HTMLDivElement>",
    description: "Props of the wrapper <div>."
};

export function NumberInputShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState("5");

    return (
        <ShowcasePage
            title="NumberInput"
            description="Input with type=number and the native spinner."
            usage={`
import { NumberInput } from "@voguh/unichat-ui/components/ui/NumberInput";

<NumberInput min={0} max={10} value={maxFiles} onInput={(event) => setMaxFiles(event.currentTarget.value)} />
`}
            api={[
                {
                    name: "NumberInput",
                    props: 'InputProps (InputHTMLAttributes<HTMLInputElement>, without "type")',
                    ref: "HTMLInputElement",
                    nonStandard: [
                        {
                            name: "startSlot / endSlot / rootProps",
                            type: "see Input",
                            description: "Same extra props as Input."
                        }
                    ]
                }
            ]}
        >
            <Example title="Default" vertical>
                <NumberInput
                    aria-label="Max files"
                    min={0}
                    max={10}
                    value={value}
                    onInput={(event) => setValue(event.currentTarget.value)}
                />
                <Code>value: {JSON.stringify(value)}</Code>
                <NumberInput aria-label="Disabled" defaultValue="3" disabled />
            </Example>
        </ShowcasePage>
    );
}

export function PasswordInputShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="PasswordInput"
            description="Password <input> with a button that toggles visibility."
            usage={`
import { PasswordInput } from "@voguh/unichat-ui/components/ui/PasswordInput";

<PasswordInput name="clientSecret" autoComplete="new-password" />
`}
            api={[
                {
                    name: "PasswordInput",
                    props: 'InputHTMLAttributes<HTMLInputElement> (without "type")',
                    ref: "HTMLInputElement",
                    nonStandard: [ROOT_PROPS]
                }
            ]}
        >
            <Example title="States" vertical>
                <PasswordInput placeholder="Client secret" autoComplete="new-password" />
                <PasswordInput placeholder="Invalid" aria-invalid="true" autoComplete="new-password" />
            </Example>
        </ShowcasePage>
    );
}

export function DatePickerShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState("");

    return (
        <ShowcasePage
            title="DatePicker"
            description="vanilla-calendar-pro bound to a native text input."
            usage={`
import { DatePicker } from "@voguh/unichat-ui/components/ui/DatePicker";

<DatePicker format="YYYY-MM-DD" min="2026-01-01" value={date} onInput={(event) => setDate(event.currentTarget.value)} />
`}
            api={[
                {
                    name: "DatePicker",
                    props: 'InputHTMLAttributes<HTMLInputElement> (text input, without "type")',
                    ref: "HTMLInputElement",
                    nonStandard: [
                        {
                            name: "value / defaultValue",
                            type: "string",
                            description: "Date as text in the chosen format, not an ISO date."
                        },
                        {
                            name: "format",
                            type: "string",
                            defaultValue: "locale format",
                            description: "Tokens YYYY, MM and DD, e.g. DD/MM/YYYY."
                        },
                        {
                            name: "locale",
                            type: "string",
                            defaultValue: "navigator.language",
                            description: "Month names, first weekday and weekend of the calendar."
                        },
                        { name: "min / max", type: "string", description: "Bounds as ISO dates (YYYY-MM-DD)." },
                        {
                            name: "placeholder",
                            type: "string",
                            defaultValue: "format",
                            description: "Defaults to the resolved format."
                        },
                        INVALID_PROP,
                        ROOT_PROPS
                    ]
                }
            ]}
        >
            <Example title="Locale format" vertical>
                <DatePicker value={value} onInput={(event) => setValue(event.currentTarget.value)} />
                <Code>value: {JSON.stringify(value)}</Code>
            </Example>
            <Example title="Custom format and bounds" vertical>
                <DatePicker format="YYYY-MM-DD" min="2026-01-01" max="2026-12-31" />
            </Example>
        </ShowcasePage>
    );
}

export function ColorPickerShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState("#991b1b");

    return (
        <ShowcasePage
            title="ColorPicker"
            description="Native text input with a color popover."
            usage={`
import { ColorPicker } from "@voguh/unichat-ui/components/ui/ColorPicker";

<ColorPicker value={color} swatches={["#991b1b", "#2563eb"]} onInput={(event) => setColor(event.currentTarget.value)} />
`}
            api={[
                {
                    name: "ColorPicker",
                    props: 'InputHTMLAttributes<HTMLInputElement> (text input, without "type")',
                    ref: "HTMLInputElement",
                    nonStandard: [
                        {
                            name: "value / defaultValue",
                            type: "string",
                            description: "Any CSS color; picking a color writes #rrggbb, or #rrggbbaa with alpha."
                        },
                        {
                            name: "swatches",
                            type: "string[]",
                            description: "Preset colors shown below the sliders."
                        },
                        INVALID_PROP,
                        {
                            name: "rootProps",
                            type: 'Omit<HTMLAttributes<HTMLDivElement>, "ref">',
                            description: "Props of the wrapper <div>."
                        }
                    ]
                }
            ]}
        >
            <Example title="With swatches" vertical>
                <ColorPicker
                    value={value}
                    swatches={["#991b1b", "#2563eb", "#16a34a", "#ca8a04", "#78716c"]}
                    onInput={(event) => setValue(event.currentTarget.value)}
                />
                <Code>value: {value}</Code>
            </Example>
        </ShowcasePage>
    );
}

export function FileUploadShowcase(): PReact.ComponentChildren {
    const [files, setFiles] = useState<string[]>([]);

    function handleChange(event: PReact.TargetedEvent<HTMLInputElement, Event>): void {
        const names: string[] = [];
        for (const file of event.currentTarget.files ?? []) {
            names.push(file.name);
        }

        setFiles(names);
    }

    return (
        <ShowcasePage
            title="FileUpload"
            description="Native <input type=file> with a drop zone."
            usage={`
import { FileUpload } from "@voguh/unichat-ui/components/ui/FileUpload";

<FileUpload accept="application/zip" multiple onChange={(event) => upload(event.currentTarget.files)}>
    Drop release assets here or click to choose
</FileUpload>
`}
            api={[
                {
                    name: "FileUpload",
                    props: 'InputHTMLAttributes<HTMLInputElement> (without "type", "value" and "defaultValue")',
                    ref: "HTMLInputElement",
                    nonStandard: [
                        {
                            name: "children",
                            type: "ComponentChildren",
                            description: "Text of the drop zone."
                        },
                        INVALID_PROP,
                        ROOT_PROPS
                    ]
                }
            ]}
        >
            <Example title="Multiple files" vertical>
                <FileUpload multiple onChange={handleChange}>
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
