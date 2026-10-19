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
        <ShowcasePage title="Input" description="Native <input> with optional start/end slots.">
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
        <ShowcasePage title="Textarea" description="Native <textarea> with optional auto-resize.">
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
