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

import { Checkbox } from "~/components/ui/Checkbox";
import { Code } from "~/components/ui/Code";
import { Combobox } from "~/components/ui/Combobox";
import { RadioGroup } from "~/components/ui/RadioGroup";
import { SegmentedControl } from "~/components/ui/SegmentedControl";
import { Select } from "~/components/ui/Select";
import { Switch } from "~/components/ui/Switch";
import { Example } from "~showcase/components/Example";
import { type PropDoc, ShowcasePage } from "~showcase/components/ShowcasePage";

const ITEMS = [
    { value: "newest", label: "Newest" },
    { value: "stars", label: "Most stars" },
    { value: "updated", label: "Recently updated" },
    { value: "name", label: "Name", disabled: true }
];

const PLATFORMS = [
    { value: "windows", label: "Windows" },
    { value: "linux", label: "Linux" },
    { value: "macos", label: "macOS" },
    { value: "android", label: "Android" },
    { value: "ios", label: "iOS" }
];

const LABEL_ROOT_PROPS: PropDoc = {
    name: "rootProps",
    type: "LabelHTMLAttributes<HTMLLabelElement>",
    description: "Props of the wrapper <label>."
};

const LABEL_CHILDREN: PropDoc = {
    name: "children",
    type: "ComponentChildren",
    description: "Label text, rendered next to the control inside the <label>."
};

const RADIO_PROPS: PropDoc[] = [
    {
        name: "items",
        type: "{ value: string; label: ComponentChildren; disabled?: boolean }[]",
        description: "One native radio input per item."
    },
    { name: "name", type: "string", defaultValue: "generated", description: "Shared name of the radio inputs." },
    { name: "value", type: "string", description: "Checked item when controlled." },
    { name: "defaultValue", type: "string", description: "Checked item when uncontrolled." },
    { name: "disabled", type: "boolean", defaultValue: "false", description: "Disables every item." },
    {
        name: "onChange",
        type: "(event: TargetedEvent<HTMLInputElement>) => void",
        description: "Change event of the radio input that was checked, not of the <div>."
    }
];

export function CheckboxShowcase(): PReact.ComponentChildren {
    const [checked, setChecked] = useState(false);

    return (
        <ShowcasePage
            title="Checkbox"
            description="Native checkbox <input> inside a <label>."
            usage={`
import { Checkbox } from "@voguh/unichat-ui/components/ui/Checkbox";

<Checkbox checked={accepted} onChange={(event) => setAccepted(event.currentTarget.checked)}>
    I accept the terms
</Checkbox>
`}
            api={[
                {
                    name: "Checkbox",
                    props: 'InputHTMLAttributes<HTMLInputElement> (without "type")',
                    ref: "HTMLInputElement",
                    nonStandard: [
                        {
                            name: "indeterminate",
                            type: "boolean",
                            defaultValue: "false",
                            description: "Sets the input's indeterminate DOM property, which has no HTML attribute."
                        },
                        LABEL_ROOT_PROPS,
                        LABEL_CHILDREN
                    ]
                }
            ]}
        >
            <Example title="States" vertical>
                <Checkbox checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}>
                    Controlled
                </Checkbox>
                <Checkbox defaultChecked>Default checked</Checkbox>
                <Checkbox indeterminate>Indeterminate</Checkbox>
                <Checkbox disabled>Disabled</Checkbox>
                <Checkbox aria-invalid="true">Invalid</Checkbox>
                <Code>checked: {JSON.stringify(checked)}</Code>
            </Example>
        </ShowcasePage>
    );
}

export function SwitchShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Switch"
            description="Native checkbox <input role='switch'> inside a <label>."
            usage={`
import { Switch } from "@voguh/unichat-ui/components/ui/Switch";

<Switch defaultChecked name="openToLan">Open to LAN</Switch>
`}
            api={[
                {
                    name: "Switch",
                    props: 'InputHTMLAttributes<HTMLInputElement> (without "type")',
                    ref: "HTMLInputElement",
                    nonStandard: [LABEL_ROOT_PROPS, LABEL_CHILDREN]
                }
            ]}
        >
            <Example title="States" vertical>
                <Switch defaultChecked>Enabled</Switch>
                <Switch>Disabled by default</Switch>
                <Switch disabled>Disabled</Switch>
            </Example>
        </ShowcasePage>
    );
}

export function RadioShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="RadioGroup"
            description="Native radio inputs inside a <div role='radiogroup'>."
            usage={`
import { RadioGroup } from "@voguh/unichat-ui/components/ui/RadioGroup";

<RadioGroup
    aria-label="Sort"
    items={[{ value: "newest", label: "Newest" }, { value: "stars", label: "Most stars" }]}
    defaultValue="newest"
    onChange={(event) => setSort(event.currentTarget.value)}
/>
`}
            api={[
                {
                    name: "RadioGroup",
                    props: 'HTMLAttributes<HTMLDivElement> (without "onChange" and "defaultValue")',
                    ref: "HTMLDivElement",
                    nonStandard: [
                        ...RADIO_PROPS,
                        {
                            name: "orientation",
                            type: '"horizontal" | "vertical"',
                            defaultValue: '"vertical"',
                            description: "Direction of the items."
                        }
                    ]
                }
            ]}
        >
            <Example title="Vertical">
                <RadioGroup aria-label="Sort" defaultValue="newest" items={ITEMS} />
            </Example>
            <Example title="Horizontal">
                <RadioGroup aria-label="Sort" orientation="horizontal" defaultValue="stars" items={ITEMS} />
            </Example>
        </ShowcasePage>
    );
}

export function SegmentedControlShowcase(): PReact.ComponentChildren {
    const [locale, setLocale] = useState("en-US");

    return (
        <ShowcasePage
            title="SegmentedControl"
            description="Native radio inputs drawn as a button group inside a <div role='radiogroup'>."
            usage={`
import { SegmentedControl } from "@voguh/unichat-ui/components/ui/SegmentedControl";

<SegmentedControl
    items={[{ value: "en-US", label: "EN" }, { value: "pt-BR", label: "PT" }]}
    value={locale}
    onChange={(event) => setLocale(event.currentTarget.value)}
/>
`}
            api={[
                {
                    name: "SegmentedControl",
                    props: 'HTMLAttributes<HTMLDivElement> (without "onChange" and "defaultValue")',
                    ref: "HTMLDivElement",
                    nonStandard: RADIO_PROPS
                }
            ]}
        >
            <Example title="Controlled" vertical>
                <div>
                    <SegmentedControl
                        value={locale}
                        onChange={(event) => setLocale(event.currentTarget.value)}
                        items={[
                            { value: "en-US", label: "EN" },
                            { value: "pt-BR", label: "PT" }
                        ]}
                    />
                </div>
                <Code>value: {locale}</Code>
            </Example>
        </ShowcasePage>
    );
}

export function SelectShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState("");

    return (
        <ShowcasePage
            title="Select"
            description="Headless UI Listbox. Ref and form props go to a hidden <select>."
            usage={`
import { Select } from "@voguh/unichat-ui/components/ui/Select";

<Select
    name="sort"
    placeholder="Sort by"
    options={[{ value: "newest", label: "Newest" }, { label: "Other", options: [{ value: "name", label: "Name" }] }]}
    value={sort}
    onChange={(event) => setSort(event.currentTarget.value)}
/>
`}
            api={[
                {
                    name: "Select",
                    props: "SelectHTMLAttributes<HTMLSelectElement> (hidden <select>)",
                    ref: "HTMLSelectElement",
                    nonStandard: [
                        {
                            name: "options",
                            type: "Array<{ value; label; disabled? } | { label; options }>",
                            description: "Options and option groups; replaces <option> children."
                        },
                        { name: "value", type: "string", description: "Selected value when controlled." },
                        { name: "defaultValue", type: "string", description: "Selected value when uncontrolled." },
                        {
                            name: "multiple",
                            type: "—",
                            description: "Not supported: always a single selection."
                        },
                        {
                            name: "placeholder",
                            type: "string",
                            description: "Shown in the button while nothing is selected (no native equivalent)."
                        },
                        {
                            name: "invalid",
                            type: "boolean",
                            defaultValue: "false",
                            description: "Invalid style and aria-invalid on the button."
                        },
                        {
                            name: "id / aria-label / aria-describedby",
                            type: "string",
                            description: "Applied to the visible button, not to the hidden <select>."
                        },
                        {
                            name: "rootProps",
                            type: "HTMLAttributes<HTMLDivElement>",
                            description: "Props of the wrapper <div>."
                        }
                    ]
                }
            ]}
        >
            <Example title="Single" vertical>
                <Select
                    options={ITEMS}
                    placeholder="Sort by"
                    value={value}
                    onChange={(event) => setValue(event.currentTarget.value)}
                />
                <Code>value: {JSON.stringify(value)}</Code>
            </Example>
            <Example title="Groups">
                <Select
                    placeholder="Platform"
                    options={[
                        { label: "Desktop", options: PLATFORMS.slice(0, 3) },
                        { label: "Mobile", options: PLATFORMS.slice(3) }
                    ]}
                />
            </Example>
            <Example title="States" vertical>
                <Select options={ITEMS} placeholder="Disabled" disabled />
                <Select options={ITEMS} placeholder="Invalid" invalid />
            </Example>
        </ShowcasePage>
    );
}

export function ComboboxShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState("");

    return (
        <ShowcasePage
            title="Combobox"
            description="Headless UI Combobox with built-in label filtering."
            usage={`
import { Combobox } from "@voguh/unichat-ui/components/ui/Combobox";

<Combobox
    name="platform"
    placeholder="Search platform"
    options={[{ value: "windows", label: "Windows" }, { value: "linux", label: "Linux" }]}
    value={platform}
    onValueChange={setPlatform}
/>
`}
            api={[
                {
                    name: "Combobox",
                    props: "InputHTMLAttributes<HTMLInputElement> (visible text input)",
                    ref: "HTMLInputElement",
                    nonStandard: [
                        {
                            name: "options",
                            type: "{ value: string; label: string; disabled?: boolean }[]",
                            description: "Options filtered by the typed label."
                        },
                        {
                            name: "value / defaultValue",
                            type: "string",
                            description: "Selected option value, not the typed text."
                        },
                        {
                            name: "onValueChange",
                            type: "(value: string) => void",
                            description: "Called when an option is selected."
                        },
                        {
                            name: "onChange",
                            type: "(event) => void",
                            description: "Native change of the text input: fires while typing the filter."
                        },
                        {
                            name: "name",
                            type: "string",
                            description: "Submitted through a hidden input with the selected value."
                        },
                        {
                            name: "invalid",
                            type: "boolean",
                            defaultValue: "false",
                            description: "Invalid style and aria-invalid."
                        },
                        {
                            name: "rootProps",
                            type: "HTMLAttributes<HTMLDivElement>",
                            description: "Props of the wrapper <div>."
                        }
                    ]
                }
            ]}
        >
            <Example title="Default" vertical>
                <Combobox options={PLATFORMS} placeholder="Search platform" value={value} onValueChange={setValue} />
                <Code>value: {JSON.stringify(value)}</Code>
            </Example>
            <Example title="States" vertical>
                <Combobox options={PLATFORMS} placeholder="Disabled" disabled />
                <Combobox options={PLATFORMS} placeholder="Invalid" invalid />
            </Example>
        </ShowcasePage>
    );
}
