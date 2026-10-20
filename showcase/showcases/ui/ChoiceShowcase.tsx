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
import { ShowcasePage } from "~showcase/components/ShowcasePage";

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

export function CheckboxShowcase(): PReact.ComponentChildren {
    const [checked, setChecked] = useState(false);

    return (
        <ShowcasePage title="Checkbox & Switch" description="Spread and ref go to the native input.">
            <Example title="Checkbox" vertical>
                <Checkbox checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)}>
                    Controlled
                </Checkbox>
                <Checkbox defaultChecked>Default checked</Checkbox>
                <Checkbox indeterminate>Indeterminate</Checkbox>
                <Checkbox disabled>Disabled</Checkbox>
                <Checkbox aria-invalid="true">Invalid</Checkbox>
                <Code>checked: {JSON.stringify(checked)}</Code>
            </Example>
            <Example title="Switch" vertical>
                <Switch defaultChecked>Enabled</Switch>
                <Switch>Disabled by default</Switch>
                <Switch disabled>Disabled</Switch>
            </Example>
        </ShowcasePage>
    );
}

export function RadioShowcase(): PReact.ComponentChildren {
    const [locale, setLocale] = useState("en-US");

    return (
        <ShowcasePage title="RadioGroup & SegmentedControl" description="Native radio inputs.">
            <Example title="RadioGroup vertical">
                <RadioGroup aria-label="Sort" defaultValue="newest" items={ITEMS} />
            </Example>
            <Example title="RadioGroup horizontal">
                <RadioGroup aria-label="Sort" orientation="horizontal" defaultValue="stars" items={ITEMS} />
            </Example>
            <Example title="SegmentedControl" vertical>
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
    const [value, setValue] = useState<string[]>([]);
    const [multiple, setMultiple] = useState<string[]>(["windows"]);

    return (
        <ShowcasePage title="Select" description="@zag-js/select. Spread and ref go to the hidden native <select>.">
            <Example title="Single" vertical>
                <Select
                    items={ITEMS}
                    placeholder="Sort by"
                    value={value}
                    onValueChange={(details) => setValue(details.value)}
                />
                <Code>value: {JSON.stringify(value)}</Code>
            </Example>
            <Example title="Multiple" vertical>
                <Select
                    items={PLATFORMS}
                    multiple
                    placeholder="Platforms"
                    value={multiple}
                    onValueChange={(details) => setMultiple(details.value)}
                />
                <Code>value: {JSON.stringify(multiple)}</Code>
            </Example>
            <Example title="Groups">
                <Select
                    placeholder="Platform"
                    items={[
                        { label: "Desktop", items: PLATFORMS.slice(0, 3) },
                        { label: "Mobile", items: PLATFORMS.slice(3) }
                    ]}
                />
            </Example>
            <Example title="Anchored to the end">
                <div style={{ marginLeft: "auto" }}>
                    <Select items={ITEMS} defaultValue={["newest"]} positioning={{ placement: "bottom-end" }} />
                </div>
            </Example>
            <Example title="States" vertical>
                <Select items={ITEMS} placeholder="Disabled" disabled />
                <Select items={ITEMS} placeholder="Invalid" invalid />
            </Example>
        </ShowcasePage>
    );
}

export function ComboboxShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState<string[]>([]);

    return (
        <ShowcasePage title="Combobox" description="@zag-js/combobox with built-in label filtering.">
            <Example title="Default" vertical>
                <Combobox
                    items={PLATFORMS}
                    placeholder="Search platform"
                    value={value}
                    onValueChange={(details) => setValue(details.value)}
                />
                <Code>value: {JSON.stringify(value)}</Code>
            </Example>
            <Example title="States" vertical>
                <Combobox items={PLATFORMS} placeholder="Disabled" disabled />
                <Combobox items={PLATFORMS} placeholder="Invalid" invalid />
            </Example>
        </ShowcasePage>
    );
}
