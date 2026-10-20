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

import { Checkbox } from "~/components/forms/Checkbox";
import { ColorPicker } from "~/components/forms/ColorPicker";
import { Combobox } from "~/components/forms/Combobox";
import { DatePicker } from "~/components/forms/DatePicker";
import { FileUpload } from "~/components/forms/FileUpload";
import { type FieldStatus, FormGroup } from "~/components/forms/FormGroup";
import { NumberInput } from "~/components/forms/NumberInput";
import { PasswordInput } from "~/components/forms/PasswordInput";
import { RadioGroup } from "~/components/forms/RadioGroup";
import { Select } from "~/components/forms/Select";
import { Switch } from "~/components/forms/Switch";
import { TagsInput } from "~/components/forms/TagsInput";
import { Textarea } from "~/components/forms/Textarea";
import { TextInput } from "~/components/forms/TextInput";
import { SegmentedControl } from "~/components/ui/SegmentedControl";
import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

const ITEMS = [
    { value: "stable", label: "Stable" },
    { value: "beta", label: "Beta" },
    { value: "nightly", label: "Nightly" }
];

const STATUS_ITEMS = [
    { value: "none", label: "None" },
    { value: "valid", label: "Valid" },
    { value: "invalid", label: "Invalid" }
];

export function FormGroupShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="FormGroup" description="Wrapper <div> with an embedded <label> and status <small>.">
            <Example title="Status" vertical>
                <FormGroup id="fg-none" label="Without status">
                    <input id="fg-none" placeholder="Raw input" />
                </FormGroup>
                <FormGroup id="fg-valid" label="Valid" status="valid" statusMessage="Looks good.">
                    <input id="fg-valid" placeholder="Raw input" />
                </FormGroup>
                <FormGroup id="fg-invalid" label="Invalid" status="invalid" statusMessage="Field is required.">
                    <input id="fg-invalid" placeholder="Raw input" />
                </FormGroup>
            </Example>
            <Example title="Description" vertical>
                <FormGroup id="fg-description" label="Channel" description="Paste the channel URL.">
                    <input id="fg-description" placeholder="Raw input" aria-describedby="fg-description-description" />
                </FormGroup>
            </Example>
        </ShowcasePage>
    );
}

export function FormFieldsShowcase(): PReact.ComponentChildren {
    const [statusValue, setStatusValue] = useState("none");

    const status = statusValue === "none" ? undefined : (statusValue as FieldStatus);
    const statusMessage = status === "invalid" ? "This field has an error." : "Looks good.";
    const field = { status, statusMessage };

    return (
        <ShowcasePage title="Form fields" description="ui controls wrapped by FormGroup (label, status, aria wiring).">
            <Example title="Status">
                <SegmentedControl
                    value={statusValue}
                    onValueChange={(details) => details.value != null && setStatusValue(details.value)}
                    items={STATUS_ITEMS}
                />
            </Example>
            <Example title="Text" vertical>
                <TextInput label="Nickname" placeholder="voguh" {...field} />
                <PasswordInput label="Client secret" autoComplete="new-password" {...field} />
                <Textarea label="Notes" placeholder="Release notes" {...field} />
                <NumberInput label="Max files" defaultValue="3" {...field} />
                <TagsInput label="Scopes" placeholder="Add scope" {...field} />
            </Example>
            <Example title="Choice" vertical>
                <Select label="Channel" items={ITEMS} placeholder="Select a channel" {...field} />
                <Combobox label="Channel (search)" items={ITEMS} placeholder="Search" {...field} />
                <RadioGroup label="Channel (radio)" items={ITEMS} orientation="horizontal" {...field} />
                <Checkbox label="Visibility" {...field}>
                    Prerelease
                </Checkbox>
                <Switch label="Enabled" {...field}>
                    Published
                </Switch>
            </Example>
            <Example title="Pickers" vertical>
                <DatePicker label="Published at" {...field} />
                <ColorPicker label="Accent color" {...field} />
                <FileUpload label="Assets" {...field}>
                    Drop files here
                </FileUpload>
            </Example>
        </ShowcasePage>
    );
}
