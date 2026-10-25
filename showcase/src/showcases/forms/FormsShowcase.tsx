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

import { Checkbox } from "@voguh/unichat-ui/forms/Checkbox";
import { ColorPicker } from "@voguh/unichat-ui/forms/ColorPicker";
import { Combobox } from "@voguh/unichat-ui/forms/Combobox";
import { DatePicker } from "@voguh/unichat-ui/forms/DatePicker";
import { FileUpload } from "@voguh/unichat-ui/forms/FileUpload";
import { type FieldStatus, FormGroup } from "@voguh/unichat-ui/forms/FormGroup";
import { NumberInput } from "@voguh/unichat-ui/forms/NumberInput";
import { PasswordInput } from "@voguh/unichat-ui/forms/PasswordInput";
import { RadioGroup } from "@voguh/unichat-ui/forms/RadioGroup";
import { Select } from "@voguh/unichat-ui/forms/Select";
import { Switch } from "@voguh/unichat-ui/forms/Switch";
import { Textarea } from "@voguh/unichat-ui/forms/Textarea";
import { TextInput } from "@voguh/unichat-ui/forms/TextInput";
import { SegmentedControl } from "@voguh/unichat-ui/SegmentedControl";

import { Example } from "~showcase/components/Example";
import { type PropDoc, ShowcasePage } from "~showcase/components/ShowcasePage";

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

const FORM_GROUP_PROPS: PropDoc[] = [
    { name: "label", type: "ComponentChildren", description: "Rendered in a <label> above the control." },
    { name: "labelProps", type: "LabelHTMLAttributes<HTMLLabelElement>", description: "Props of the <label>." },
    {
        name: "description",
        type: "ComponentChildren",
        description: "Hint below the control; hidden while a status message is shown."
    },
    { name: "descriptionProps", type: "HTMLAttributes<HTMLElement>", description: "Props of the description <small>." },
    { name: "status", type: '"valid" | "invalid"', description: "Color of the status message." },
    {
        name: "statusMessage",
        type: "ComponentChildren",
        description: "Shown below the control when status is set, replacing the description."
    },
    {
        name: "statusMessageProps",
        type: "HTMLAttributes<HTMLElement>",
        description: "Props of the status message <small>."
    }
];

export function FormGroupShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="FormGroup"
            description="Wrapper <div> with an embedded <label> and status <small>."
            usage={`
import { FormGroup, getFormGroupDescribedBy } from "@voguh/unichat-ui/forms/FormGroup";

<FormGroup id="nickname" label="Nickname" status="invalid" statusMessage="Too long">
    <input id="nickname" aria-describedby={getFormGroupDescribedBy("nickname", { status, statusMessage })} />
</FormGroup>
`}
            api={[
                {
                    name: "FormGroup",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLDivElement",
                    structure: `
div[data-part~="FormGroup"][data-status]
  > label[data-slot="label"]
  > (children)
  > small[data-slot="description"]
  > small[data-slot="status-message"][data-status]
`,
                    nonStandard: [
                        {
                            name: "id",
                            type: "string",
                            description:
                                "Id of the control: sets the label's htmlFor and the ids <id>-description and <id>-status."
                        },
                        ...FORM_GROUP_PROPS
                    ]
                }
            ]}
        >
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

function toFieldStatus(value: string): FieldStatus | undefined {
    if (value !== "none") {
        return value as FieldStatus;
    }

    return undefined;
}

function getStatusMessage(status: FieldStatus | undefined): string {
    if (status === "invalid") {
        return "This field has an error.";
    }

    return "Looks good.";
}

export function FormFieldsShowcase(): PReact.ComponentChildren {
    const [statusValue, setStatusValue] = useState("none");

    const status = toFieldStatus(statusValue);
    const field = { status, statusMessage: getStatusMessage(status) };

    return (
        <ShowcasePage
            title="Form fields"
            description="ui controls wrapped by FormGroup (label, status, aria wiring)."
            usage={`
import { Select } from "@voguh/unichat-ui/forms/Select";

<Select label="Channel" description="Release channel to follow." options={channels} status="invalid" statusMessage="Required" />
`}
            api={[
                {
                    name: "forms/* (TextInput, PasswordInput, Textarea, NumberInput, Select, Combobox, RadioGroup, Checkbox, Switch, DatePicker, ColorPicker, FileUpload)",
                    props: "props of the ui component with the same name, plus the FormGroup props",
                    ref: "same element as the ui component",
                    structure: `
div[data-part~="FormGroup"]   (groupProps)
  > label[data-slot="label"]
  > (ui component, with its own data-part)
  > small[data-slot="description"]
  > small[data-slot="status-message"]
`,
                    nonStandard: [
                        {
                            name: "id",
                            type: "string",
                            defaultValue: "generated",
                            description: "Id of the control, linked to the label."
                        },
                        ...FORM_GROUP_PROPS,
                        {
                            name: 'status="invalid"',
                            type: "---",
                            description: "Also marks the control as invalid (invalid or aria-invalid)."
                        },
                        {
                            name: "groupProps",
                            type: "HTMLAttributes<HTMLDivElement>",
                            description: "Props of the FormGroup <div>."
                        }
                    ]
                }
            ]}
        >
            <Example title="Status">
                <SegmentedControl
                    value={statusValue}
                    onChange={(event) => setStatusValue(event.currentTarget.value)}
                    items={STATUS_ITEMS}
                />
            </Example>
            <Example title="Text" vertical>
                <TextInput label="Nickname" placeholder="voguh" {...field} />
                <PasswordInput label="Client secret" autoComplete="new-password" {...field} />
                <Textarea label="Notes" placeholder="Release notes" {...field} />
                <NumberInput label="Max files" defaultValue="3" {...field} />
            </Example>
            <Example title="Choice" vertical>
                <Select label="Channel" options={ITEMS} placeholder="Select a channel" {...field} />
                <Combobox label="Channel (search)" options={ITEMS} placeholder="Search" {...field} />
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
