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
import { Input } from "~/components/ui/Input";
import { Textarea } from "~/components/ui/Textarea";
import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

export function InputShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState("");

    return (
        <ShowcasePage
            title="Input"
            description="Native <input> with optional start/end slots."
            usage={`
import { Input } from "@voguh/unichat-ui/components/ui/Input";

<Input type="search" placeholder="Search plugins" startSlot={<i className="fas fa-search" />} />
`}
            api={[
                {
                    name: "Input",
                    props: "InputHTMLAttributes<HTMLInputElement>",
                    ref: "HTMLInputElement",
                    structure: `
div[data-part~="Input"][data-disabled]   (rootProps, className)
  > span[data-slot="start"]
  > input   (ref and the other props)
  > span[data-slot="end"]
`,
                    nonStandard: [
                        {
                            name: "startSlot",
                            type: "ComponentChildren",
                            description: "Content before the input, inside the field."
                        },
                        {
                            name: "endSlot",
                            type: "ComponentChildren",
                            description: "Content after the input, inside the field."
                        },
                        {
                            name: "rootProps",
                            type: "HTMLAttributes<HTMLDivElement>",
                            description: "Props of the wrapper <div> that draws the field."
                        }
                    ]
                }
            ]}
        >
            <Example title="Default" vertical>
                <Input placeholder="Type something" value={value} onInput={(e) => setValue(e.currentTarget.value)} />
                <Code>value: {JSON.stringify(value)}</Code>
            </Example>
            <Example title="Slots" vertical>
                <Input type="search" placeholder="Search plugins" startSlot={<i className="fas fa-search" />} />
                <Input placeholder="Amount" endSlot={<span>USD</span>} />
            </Example>
            <Example title="States" vertical>
                <Input placeholder="Disabled" disabled />
                <Input placeholder="Invalid" aria-invalid="true" />
                <Input value="Read only" readOnly />
            </Example>
        </ShowcasePage>
    );
}

export function TextareaShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Textarea"
            description="Native <textarea> with optional auto-resize."
            usage={`
import { Textarea } from "@voguh/unichat-ui/components/ui/Textarea";

<Textarea placeholder="Release notes" autoResize />
`}
            api={[
                {
                    name: "Textarea",
                    props: "TextareaHTMLAttributes<HTMLTextAreaElement>",
                    ref: "HTMLTextAreaElement",
                    structure: `textarea[data-part~="Textarea"][data-auto-resize]`,
                    nonStandard: [
                        {
                            name: "autoResize",
                            type: "boolean",
                            defaultValue: "false",
                            description: "Grows with the content instead of scrolling; disables manual resize."
                        }
                    ]
                }
            ]}
        >
            <Example title="Default" vertical>
                <Textarea placeholder="Release notes" rows={3} />
            </Example>
            <Example title="Auto resize" vertical>
                <Textarea placeholder="Grows while typing" autoResize />
            </Example>
            <Example title="States" vertical>
                <Textarea placeholder="Disabled" disabled />
                <Textarea placeholder="Invalid" aria-invalid="true" />
            </Example>
        </ShowcasePage>
    );
}
