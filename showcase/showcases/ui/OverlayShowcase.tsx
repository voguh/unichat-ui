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

import type { Placement } from "@floating-ui/dom";

import { TextInput } from "~/components/forms/TextInput";
import { Button } from "~/components/ui/Button";
import { Code } from "~/components/ui/Code";
import { Dialog, type DialogSize } from "~/components/ui/Dialog";
import { Dropdown } from "~/components/ui/Dropdown";
import { Popover } from "~/components/ui/Popover";
import { Tooltip } from "~/components/ui/Tooltip";
import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

const DENSITIES = ["Compact", "Comfortable", "Spacious"];

const DIALOG_SIZES: DialogSize[] = ["sm", "md", "lg", "xl", "fullscreen"];

export function DialogShowcase(): PReact.ComponentChildren {
    const [openedSize, setOpenedSize] = useState<DialogSize | null>(null);
    const [alertOpen, setAlertOpen] = useState(false);

    return (
        <ShowcasePage title="Dialog" description="Controlled dialog rendered in a portal.">
            <Example title="Sizes and header actions">
                {DIALOG_SIZES.map((size) => (
                    <Button key={size} variant="secondary" onClick={() => setOpenedSize(size)}>
                        {size}
                    </Button>
                ))}
                <Dialog
                    open={openedSize != null}
                    onClose={() => setOpenedSize(null)}
                    size={openedSize ?? undefined}
                    title={`Size ${openedSize}`}
                    actions={
                        <Button size="sm" variant="primary">
                            Save
                        </Button>
                    }
                >
                    Dialog body.
                </Dialog>
            </Example>
            <Example title="Alert dialog">
                <Button variant="danger" onClick={() => setAlertOpen(true)}>
                    Delete release
                </Button>
                <Dialog
                    role="alertdialog"
                    open={alertOpen}
                    onClose={() => setAlertOpen(false)}
                    size="sm"
                    title="Delete release?"
                    withCloseButton={false}
                >
                    <p>This cannot be undone.</p>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <Button variant="secondary" onClick={() => setAlertOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={() => setAlertOpen(false)}>
                            Delete
                        </Button>
                    </div>
                </Dialog>
            </Example>
        </ShowcasePage>
    );
}

export function PopoverShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Popover" description="Wraps its trigger, positioned with Floating UI.">
            <Example title="On click">
                <Popover title="Release 1.2.0" content="Published on 2026-05-20.">
                    <Button variant="secondary">Details</Button>
                </Popover>
            </Example>
            <Example title="On focus">
                <Popover trigger="focus" placement="bottom-start" content="Paste the channel URL.">
                    <div>
                        <TextInput label="Channel" placeholder="Focus to see the hint" />
                    </div>
                </Popover>
            </Example>
        </ShowcasePage>
    );
}

const TOOLTIP_PLACEMENTS: Placement[] = ["top", "right", "bottom", "left"];

export function TooltipShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Tooltip" description="Wraps its trigger, positioned with Floating UI.">
            <Example title="Placements">
                {TOOLTIP_PLACEMENTS.map((placement) => (
                    <Tooltip key={placement} placement={placement} openDelay={200} content={`Tooltip on ${placement}`}>
                        <Button variant="secondary">{placement}</Button>
                    </Tooltip>
                ))}
            </Example>
        </ShowcasePage>
    );
}

export function DropdownShowcase(): PReact.ComponentChildren {
    const [selected, setSelected] = useState<string | null>(null);
    const [density, setDensity] = useState("Comfortable");

    return (
        <ShowcasePage title="Dropdown" description="@zag-js/menu, compound API.">
            <Example title="Actions" vertical>
                <div>
                    <Dropdown.Root onSelect={(details) => setSelected(details.value)}>
                        <Dropdown.Trigger>
                            Actions <i className="fas fa-chevron-down" />
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.ItemGroup id="release">
                                <Dropdown.ItemGroupLabel htmlFor="release">Release</Dropdown.ItemGroupLabel>
                                <Dropdown.Item value="edit">
                                    <i className="fas fa-pen" /> Edit
                                </Dropdown.Item>
                                <Dropdown.Item value="duplicate">
                                    <i className="fas fa-copy" /> Duplicate
                                </Dropdown.Item>
                                <Dropdown.Item value="archive" disabled>
                                    <i className="fas fa-archive" /> Archive
                                </Dropdown.Item>
                            </Dropdown.ItemGroup>
                            <Dropdown.Separator />
                            <Dropdown.Item value="delete">
                                <i className="fas fa-trash" /> Delete
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                </div>
                <Code>selected: {JSON.stringify(selected)}</Code>
            </Example>
            <Example title="Option items" vertical>
                <div>
                    <Dropdown.Root>
                        <Dropdown.Trigger>
                            Density <i className="fas fa-chevron-down" />
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            {DENSITIES.map((item) => (
                                <Dropdown.OptionItem
                                    key={item}
                                    type="radio"
                                    value={item}
                                    checked={density === item}
                                    onCheckedChange={() => setDensity(item)}
                                >
                                    {item}
                                </Dropdown.OptionItem>
                            ))}
                        </Dropdown.Content>
                    </Dropdown.Root>
                </div>
                <Code>density: {JSON.stringify(density)}</Code>
            </Example>
        </ShowcasePage>
    );
}
