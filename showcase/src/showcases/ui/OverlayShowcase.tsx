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
import { Button } from "@voguh/unichat-ui/Button";
import { Code } from "@voguh/unichat-ui/Code";
import {
    Dialog,
    DialogBackdrop,
    DialogBody,
    DialogCloseButton,
    DialogHeader,
    DialogPanel,
    type DialogPanelSize,
    DialogTitle
} from "@voguh/unichat-ui/Dialog";
import { TextInput } from "@voguh/unichat-ui/forms/TextInput";
import { Menu, MenuButton, MenuHeading, MenuItem, MenuItems, MenuSection, MenuSeparator } from "@voguh/unichat-ui/Menu";
import { Popover, PopoverButton, PopoverPanel } from "@voguh/unichat-ui/Popover";
import { Tooltip } from "@voguh/unichat-ui/Tooltip";

import { Example } from "~showcase/components/Example";
import { type PropDoc, ShowcasePage } from "~showcase/components/ShowcasePage";

const DIALOG_SIZES: DialogPanelSize[] = ["sm", "md", "lg", "xl", "fullscreen"];
const TOOLTIP_PLACEMENTS: Placement[] = ["top", "right", "bottom", "left"];

const AS_PROP: PropDoc = {
    name: "as",
    type: "keyof IntrinsicElements | ComponentType",
    defaultValue: '"button"',
    description: "Element or component rendered as the trigger; the other props follow its type."
};

function anchorProps(defaultAnchor: string, defaultModal: boolean): PropDoc[] {
    return [
        {
            name: "anchor",
            type: '"top" | "bottom" | "left" | "right" + " start" | " end"',
            defaultValue: `"${defaultAnchor}"`,
            description: "Position relative to the trigger; the panel is rendered in a portal."
        },
        {
            name: "portal",
            type: "boolean",
            defaultValue: "true with anchor",
            description: "Renders the panel in a portal."
        },
        {
            name: "modal",
            type: "boolean",
            defaultValue: String(defaultModal),
            description: "Locks page scroll and makes the rest of the page inert while open."
        }
    ];
}

export function DialogShowcase(): PReact.ComponentChildren {
    const [openedSize, setOpenedSize] = useState<DialogPanelSize | null>(null);
    const [alertOpen, setAlertOpen] = useState(false);

    return (
        <ShowcasePage
            title="Dialog"
            description="Headless UI Dialog, always rendered in a portal."
            usage={`
import {
    Dialog,
    DialogBackdrop,
    DialogBody,
    DialogCloseButton,
    DialogHeader,
    DialogPanel,
    DialogTitle
} from "@voguh/unichat-ui/Dialog";

<Dialog open={open} onClose={() => setOpen(false)}>
    <DialogBackdrop />
    <DialogPanel size="sm">
        <DialogHeader>
            <DialogTitle>Delete release?</DialogTitle>
            <DialogCloseButton />
        </DialogHeader>
        <DialogBody>This cannot be undone.</DialogBody>
    </DialogPanel>
</Dialog>
`}
            api={[
                {
                    name: "Dialog",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    structure: `
div[data-part~="Dialog"][role]   (portal)
  > div[data-part~="DialogBackdrop"]
  > div[data-part~="DialogPanel"][data-size]
    > div[data-part~="DialogHeader"]
      > h2[data-part~="DialogTitle"]
      > button[data-part~="DialogCloseButton"]
        > i   (when there are no children)
    > div[data-part~="DialogBody"]
`,
                    nonStandard: [
                        { name: "open", type: "boolean", description: "Required: whether the dialog is shown." },
                        {
                            name: "onClose",
                            type: "() => void",
                            description: "Required: called on Escape, outside click and DialogCloseButton."
                        },
                        {
                            name: "closeOnInteractOutside",
                            type: "boolean",
                            defaultValue: "true",
                            description: "When false, outside clicks do not call onClose; Escape still does."
                        },
                        {
                            name: "role",
                            type: '"dialog" | "alertdialog"',
                            defaultValue: '"dialog"',
                            description: "Restricted to the dialog roles."
                        }
                    ]
                },
                { name: "DialogBackdrop", props: "HTMLAttributes<HTMLDivElement>", ref: "HTMLElement" },
                {
                    name: "DialogPanel",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    nonStandard: [
                        {
                            name: "size",
                            type: '"sm" | "md" | "lg" | "xl" | "fullscreen"',
                            defaultValue: '"md"',
                            description: "Panel width; fullscreen covers the viewport."
                        }
                    ]
                },
                { name: "DialogHeader", props: "HTMLAttributes<HTMLDivElement>", ref: "HTMLDivElement" },
                {
                    name: "DialogTitle",
                    props: "HTMLAttributes<HTMLHeadingElement>",
                    ref: "HTMLElement",
                    nonStandard: [
                        {
                            name: "---",
                            type: "---",
                            description: "Rendered as <h2> and used as the dialog's accessible name."
                        }
                    ]
                },
                { name: "DialogBody", props: "HTMLAttributes<HTMLDivElement>", ref: "HTMLDivElement" },
                {
                    name: "DialogCloseButton",
                    props: "ButtonHTMLAttributes<HTMLButtonElement>",
                    ref: "HTMLElement",
                    nonStandard: [
                        {
                            name: "aria-label",
                            type: "string",
                            defaultValue: '"Close"',
                            description: "Accessible name of the icon button."
                        },
                        {
                            name: "children",
                            type: "ComponentChildren",
                            defaultValue: "times icon",
                            description: "Content of the button."
                        }
                    ]
                }
            ]}
        >
            <Example title="Sizes and header actions">
                {DIALOG_SIZES.map((size) => (
                    <Button key={size} variant="secondary" onClick={() => setOpenedSize(size)}>
                        {size}
                    </Button>
                ))}
                <Dialog open={openedSize != null} onClose={() => setOpenedSize(null)}>
                    <DialogBackdrop />
                    <DialogPanel size={openedSize ?? undefined}>
                        <DialogHeader>
                            <DialogTitle>Size {openedSize}</DialogTitle>
                            <Button size="sm" variant="primary">
                                Save
                            </Button>
                            <DialogCloseButton />
                        </DialogHeader>
                        <DialogBody>Dialog body.</DialogBody>
                    </DialogPanel>
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
                    closeOnInteractOutside={false}
                >
                    <DialogBackdrop />
                    <DialogPanel size="sm">
                        <DialogHeader>
                            <DialogTitle>Delete release?</DialogTitle>
                        </DialogHeader>
                        <DialogBody>
                            <p>This cannot be undone.</p>
                            <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                                <Button variant="secondary" onClick={() => setAlertOpen(false)}>
                                    Cancel
                                </Button>
                                <Button variant="danger" onClick={() => setAlertOpen(false)}>
                                    Delete
                                </Button>
                            </div>
                        </DialogBody>
                    </DialogPanel>
                </Dialog>
            </Example>
        </ShowcasePage>
    );
}

export function PopoverShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Popover"
            description="Headless UI Popover, opened by its button."
            usage={`
import { Popover, PopoverButton, PopoverPanel } from "@voguh/unichat-ui/Popover";

<Popover>
    <PopoverButton as={Button} variant="secondary">Details</PopoverButton>
    <PopoverPanel anchor="bottom end">Published on 2026-05-20.</PopoverPanel>
</Popover>
`}
            api={[
                {
                    name: "Popover",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    structure: `
div[data-part~="Popover"]
  > [data-part~="PopoverButton"][data-open]   (element of "as"; as={Button} gives "Button PopoverButton")

div[data-part~="PopoverPanel"]   (portal)
`
                },
                {
                    name: "PopoverButton",
                    props: "props of `as` (ButtonHTMLAttributes<HTMLButtonElement> by default)",
                    ref: "HTMLElement",
                    nonStandard: [AS_PROP]
                },
                {
                    name: "PopoverPanel",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    nonStandard: anchorProps("bottom", false)
                }
            ]}
        >
            <Example title="On click">
                <Popover>
                    <PopoverButton>Details</PopoverButton>
                    <PopoverPanel>
                        <strong>Release 1.2.0</strong>
                        Published on 2026-05-20.
                    </PopoverPanel>
                </Popover>
            </Example>
            <Example title="Button as trigger">
                <Popover>
                    <PopoverButton as={Button} variant="secondary">
                        Other widgets
                    </PopoverButton>
                    <PopoverPanel anchor="bottom start">Panel aligned to the start of the trigger.</PopoverPanel>
                </Popover>
            </Example>
        </ShowcasePage>
    );
}

export function TooltipShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Tooltip"
            description="Wraps its trigger, positioned with Floating UI."
            usage={`
import { Tooltip } from "@voguh/unichat-ui/Tooltip";

<Tooltip placement="bottom" content="Reload widget view">
    <IconButton aria-label="Reload" onClick={reload}>
        <i className="fas fa-redo" />
    </IconButton>
</Tooltip>
`}
            api={[
                {
                    name: "Tooltip",
                    props: "none: no element of its own",
                    ref: "none: the child keeps its own ref",
                    structure: `
div[data-part="Tooltip"][data-side]   (portal)
  > div[data-slot="content"][role="tooltip"]
    > div[data-slot="arrow"]
      > div
`,
                    nonStandard: [
                        {
                            name: "children",
                            type: "VNode",
                            description:
                                "Single trigger element; receives aria-describedby and pointer, focus and key handlers."
                        },
                        { name: "content", type: "ComponentChildren", description: "Tooltip text, in a portal." },
                        {
                            name: "placement",
                            type: "Placement (Floating UI)",
                            defaultValue: '"top"',
                            description: "Preferred side; flips when there is no room."
                        },
                        {
                            name: "openDelay",
                            type: "number",
                            defaultValue: "400",
                            description: "Hover delay in ms; focus opens immediately."
                        }
                    ]
                }
            ]}
        >
            <Example title="Placements">
                {TOOLTIP_PLACEMENTS.map((placement) => (
                    <Tooltip key={placement} placement={placement} openDelay={200} content={`Tooltip on ${placement}`}>
                        <Button variant="secondary">{placement}</Button>
                    </Tooltip>
                ))}
            </Example>
            <Example title="On focus inside a wrapper">
                <Tooltip placement="bottom-start" content="Paste the channel URL.">
                    <div>
                        <TextInput label="Channel" placeholder="Focus to see the hint" />
                    </div>
                </Tooltip>
            </Example>
        </ShowcasePage>
    );
}

export function MenuShowcase(): PReact.ComponentChildren {
    const [selected, setSelected] = useState<string | null>(null);

    return (
        <ShowcasePage
            title="Menu"
            description="Headless UI Menu."
            usage={`
import { Menu, MenuButton, MenuItem, MenuItems, MenuSeparator } from "@voguh/unichat-ui/Menu";

<Menu>
    <MenuButton>Actions</MenuButton>
    <MenuItems anchor="bottom end">
        <MenuItem onClick={edit}>Edit</MenuItem>
        <MenuSeparator />
        <MenuItem onClick={remove}>Delete</MenuItem>
    </MenuItems>
</Menu>
`}
            api={[
                {
                    name: "Menu",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    structure: `
div[data-part~="Menu"]
  > [data-part~="MenuButton"][data-open]   (element of "as")

div[data-part~="MenuItems"]   (portal)
  > button[data-part~="MenuItem"][data-focus][data-disabled]
  > hr[data-part~="MenuSeparator"]
  > div[data-part~="MenuSection"]
    > header[data-part~="MenuHeading"]
    > button[data-part~="MenuItem"]
`
                },
                {
                    name: "MenuButton",
                    props: "props of `as` (ButtonHTMLAttributes<HTMLButtonElement> by default)",
                    ref: "HTMLElement",
                    nonStandard: [AS_PROP]
                },
                {
                    name: "MenuItems",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    nonStandard: anchorProps("bottom start", true)
                },
                {
                    name: "MenuItem",
                    props: "ButtonHTMLAttributes<HTMLButtonElement>",
                    ref: "HTMLElement",
                    nonStandard: [
                        {
                            name: "disabled",
                            type: "boolean",
                            defaultValue: "false",
                            description: "Skipped by keyboard navigation and not clickable."
                        }
                    ]
                },
                { name: "MenuSection", props: "HTMLAttributes<HTMLDivElement>", ref: "HTMLElement" },
                { name: "MenuHeading", props: "HTMLAttributes<HTMLElement>", ref: "HTMLElement" },
                { name: "MenuSeparator", props: "HTMLAttributes<HTMLHRElement>", ref: "HTMLElement" }
            ]}
        >
            <Example title="Actions" vertical>
                <div>
                    <Menu>
                        <MenuButton>
                            Actions <i className="fas fa-chevron-down" />
                        </MenuButton>
                        <MenuItems>
                            <MenuSection>
                                <MenuHeading>Release</MenuHeading>
                                <MenuItem onClick={() => setSelected("edit")}>
                                    <i className="fas fa-pen" /> Edit
                                </MenuItem>
                                <MenuItem onClick={() => setSelected("duplicate")}>
                                    <i className="fas fa-copy" /> Duplicate
                                </MenuItem>
                                <MenuItem disabled>
                                    <i className="fas fa-archive" /> Archive
                                </MenuItem>
                            </MenuSection>
                            <MenuSeparator />
                            <MenuItem onClick={() => setSelected("delete")}>
                                <i className="fas fa-trash" /> Delete
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
                <Code>selected: {JSON.stringify(selected)}</Code>
            </Example>
        </ShowcasePage>
    );
}
