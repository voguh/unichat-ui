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

import { TextInput } from "~/components/forms/TextInput";
import { Button } from "~/components/ui/Button";
import { Code } from "~/components/ui/Code";
import { Dialog } from "~/components/ui/Dialog";
import { Dropdown } from "~/components/ui/Dropdown";
import { Popover } from "~/components/ui/Popover";
import { Tooltip } from "~/components/ui/Tooltip";
import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

const DENSITIES = ["Compact", "Comfortable", "Spacious"];

export function DialogShowcase(): PReact.ComponentChildren {
    const [open, setOpen] = useState(false);

    return (
        <ShowcasePage title="Dialog" description="@zag-js/dialog, compound API, rendered in a portal.">
            <Example title="Default">
                <Dialog.Root>
                    <Dialog.Trigger>Open dialog</Dialog.Trigger>
                    <Dialog.Content>
                        <Dialog.Header title="Edit release" />
                        <Dialog.Body>
                            <Dialog.Description>Change the release metadata.</Dialog.Description>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Root>
            </Example>
            <Example title="Sizes and header actions">
                {(["sm", "md", "lg", "xl", "fullscreen"] as const).map((size) => (
                    <Dialog.Root key={size}>
                        <Dialog.Trigger>{size}</Dialog.Trigger>
                        <Dialog.Content size={size}>
                            <Dialog.Header
                                title={`Size ${size}`}
                                actions={
                                    <Button size="sm" variant="primary">
                                        Save
                                    </Button>
                                }
                            />
                            <Dialog.Body>Dialog body.</Dialog.Body>
                        </Dialog.Content>
                    </Dialog.Root>
                ))}
            </Example>
            <Example title="Controlled alert dialog">
                <Button variant="danger" onClick={() => setOpen(true)}>
                    Delete release
                </Button>
                <Dialog.Root role="alertdialog" open={open} onOpenChange={(details) => setOpen(details.open)}>
                    <Dialog.Content size="sm">
                        <Dialog.Header title="Delete release?" withCloseButton={false} />
                        <Dialog.Body>
                            <Dialog.Description>This cannot be undone.</Dialog.Description>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                                <Button variant="secondary" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={() => setOpen(false)}>
                                    Delete
                                </Button>
                            </div>
                        </Dialog.Body>
                    </Dialog.Content>
                </Dialog.Root>
            </Example>
        </ShowcasePage>
    );
}

export function PopoverShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Popover" description="@zag-js/popover, compound API.">
            <Example title="Default">
                <Popover.Root>
                    <Popover.Trigger>Details</Popover.Trigger>
                    <Popover.Content>
                        <Popover.Arrow />
                        <Popover.Title>Release 1.2.0</Popover.Title>
                        <Popover.Description>Published on 2026-05-20.</Popover.Description>
                        <Popover.CloseTrigger aria-label="Close">
                            <i className="fas fa-times" />
                        </Popover.CloseTrigger>
                    </Popover.Content>
                </Popover.Root>
            </Example>
            <Example title="As child">
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <Button variant="secondary">Details</Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Popover.Description>Opened from an existing Button.</Popover.Description>
                    </Popover.Content>
                </Popover.Root>
            </Example>
            <Example title="Open on focus">
                <Popover.Root openOn="focus" positioning={{ placement: "bottom-start" }}>
                    <Popover.Anchor>
                        <TextInput label="Channel" placeholder="Focus to see the hint" />
                    </Popover.Anchor>
                    <Popover.Content>
                        <Popover.Description>Paste the channel URL.</Popover.Description>
                    </Popover.Content>
                </Popover.Root>
            </Example>
        </ShowcasePage>
    );
}

export function TooltipShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Tooltip" description="@zag-js/tooltip, compound API.">
            <Example title="Placements">
                {(["top", "right", "bottom", "left"] as const).map((placement) => (
                    <Tooltip.Root key={placement} openDelay={200} positioning={{ placement }}>
                        <Tooltip.Trigger>{placement}</Tooltip.Trigger>
                        <Tooltip.Content>
                            <Tooltip.Arrow />
                            Tooltip on {placement}
                        </Tooltip.Content>
                    </Tooltip.Root>
                ))}
            </Example>
            <Example title="As child">
                <Tooltip.Root openDelay={200}>
                    <Tooltip.Trigger asChild>
                        <Button variant="secondary" aria-label="Settings">
                            <i className="fas fa-cog" aria-hidden="true" />
                        </Button>
                    </Tooltip.Trigger>
                    <Tooltip.Content>Settings</Tooltip.Content>
                </Tooltip.Root>
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
