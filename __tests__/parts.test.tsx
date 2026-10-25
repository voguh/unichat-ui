/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import type * as React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Alert } from "~/Alert";
import { Avatar } from "~/Avatar";
import { Badge } from "~/Badge";
import { Button, ButtonLink, IconButton } from "~/Button";
import { Card, CardBody, CardFooter, CardHeader } from "~/Card";
import { Checkbox } from "~/Checkbox";
import { Clipboard } from "~/Clipboard";
import { Code } from "~/Code";
import { ColorPicker } from "~/ColorPicker";
import { Combobox } from "~/Combobox";
import { DatePicker } from "~/DatePicker";
import {
    Dialog,
    DialogBackdrop,
    DialogBody,
    DialogCloseButton,
    DialogHeader,
    DialogPanel,
    DialogTitle
} from "~/Dialog";
import { Disclosure, DisclosureButton, DisclosurePanel } from "~/Disclosure";
import { EmptyState } from "~/EmptyState";
import { FileUpload } from "~/FileUpload";
import { FormGroup } from "~/forms/FormGroup";
import { Identicon } from "~/Identicon";
import { Input } from "~/Input";
import { Loading } from "~/Loading";
import { Menu, MenuButton, MenuHeading, MenuItem, MenuItems, MenuSection, MenuSeparator } from "~/Menu";
import { NumberInput } from "~/NumberInput";
import { Pagination } from "~/Pagination";
import { PasswordInput } from "~/PasswordInput";
import { Popover, PopoverButton, PopoverPanel } from "~/Popover";
import { Progress } from "~/Progress";
import { RadioGroup } from "~/RadioGroup";
import { SegmentedControl } from "~/SegmentedControl";
import { Select } from "~/Select";
import { Separator } from "~/Separator";
import { Skeleton } from "~/Skeleton";
import { Spinner } from "~/Spinner";
import { Switch } from "~/Switch";
import { Table } from "~/Table";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "~/Tabs";
import { Textarea } from "~/Textarea";
import { Toaster, toaster } from "~/Toast";
import { Tooltip } from "~/Tooltip";

interface PartsCase {
    name: string;
    element: React.ReactElement;
    selectors: string[];
}

const ITEMS = [
    { value: "a", label: "A" },
    { value: "b", label: "B" }
];

const CASES: PartsCase[] = [
    {
        name: "Alert",
        element: (
            <Alert title="Title" action={<span>Retry</span>}>
                Body
            </Alert>
        ),
        selectors: [
            '[data-part="Alert"]',
            '[data-part="Alert"] > [data-slot="icon"]',
            '[data-part="Alert"] > [data-slot="content"] > [data-slot="title"]',
            '[data-part="Alert"] > [data-slot="action"]'
        ]
    },
    { name: "Avatar", element: <Avatar alt="User" />, selectors: ['[data-part="Avatar"][data-fallback]'] },
    { name: "Badge", element: <Badge>New</Badge>, selectors: ['[data-part="Badge"][data-variant]'] },
    {
        name: "Button",
        element: <Button loading>Save</Button>,
        selectors: ['button[data-part="Button"] > i[data-slot="spinner"]']
    },
    {
        name: "IconButton",
        element: (
            <IconButton aria-label="Delete" data-part="DeleteButton">
                <i />
            </IconButton>
        ),
        selectors: ['button[data-part="Button IconButton DeleteButton"]']
    },
    { name: "ButtonLink", element: <ButtonLink href="#">Open</ButtonLink>, selectors: ['a[data-part="ButtonLink"]'] },
    {
        name: "Card",
        element: (
            <Card>
                <CardHeader />
                <CardBody />
                <CardFooter />
            </Card>
        ),
        selectors: [
            '[data-part="Card"] > [data-part="CardHeader"]',
            '[data-part="Card"] > [data-part="CardBody"]',
            '[data-part="Card"] > [data-part="CardFooter"]'
        ]
    },
    {
        name: "Checkbox",
        element: <Checkbox>Accept</Checkbox>,
        selectors: [
            'label[data-part="Checkbox"] > input',
            '[data-part="Checkbox"] > [data-slot="control"] > [data-slot="check"]',
            '[data-part="Checkbox"] > [data-slot="control"] > [data-slot="indeterminate"]',
            '[data-part="Checkbox"] > [data-slot="label"]'
        ]
    },
    {
        name: "Clipboard",
        element: <Clipboard label="URL" value="https://unichat.voguh.me" />,
        selectors: ['[data-part="Clipboard"] > label', '[data-part="Clipboard"] > [data-slot="control"] > button']
    },
    { name: "Code", element: <Code>x</Code>, selectors: ['code[data-part="Code"]'] },
    {
        name: "ColorPicker",
        element: <ColorPicker swatches={["#2563eb"]} />,
        selectors: [
            '[data-part="ColorPicker"] > [data-slot="control"] > [data-slot="preview"] > [data-slot="color"]',
            '[data-part="ColorPicker"] > [data-slot="control"] > input',
            '[data-part="PopoverPanel ColorPickerPopover"] > [data-slot="area"] > [data-slot="thumb"]',
            '[data-part="PopoverPanel ColorPickerPopover"] > [data-slot="hue"]',
            '[data-part="PopoverPanel ColorPickerPopover"] > [data-slot="alpha"] > [data-slot="gradient"]',
            '[data-part="PopoverPanel ColorPickerPopover"] > [data-slot="swatches"] > button > [data-slot="color"]'
        ]
    },
    {
        name: "Combobox",
        element: <Combobox options={ITEMS} />,
        selectors: [
            '[data-part="Combobox"] > [data-slot="control"] > input',
            '[data-part="Combobox"] > [data-slot="control"] > [data-slot="trigger"]'
        ]
    },
    {
        name: "DatePicker",
        element: <DatePicker />,
        selectors: [
            '[data-part="DatePicker"] > [data-slot="control"] > input',
            '[data-part="DatePicker"] > [data-slot="control"] > [data-slot="trigger"]',
            '[data-part="DatePicker"] > [data-part~="DatePickerCalendar"] > [data-slot="header"] > [data-slot="title"]',
            '[data-part="DatePicker"] > [data-part~="DatePickerCalendar"] > [data-slot="grid"] [data-slot="day"]'
        ]
    },
    {
        name: "Disclosure",
        element: (
            <Disclosure defaultOpen>
                <DisclosureButton>Title</DisclosureButton>
                <DisclosurePanel>Body</DisclosurePanel>
            </Disclosure>
        ),
        selectors: [
            '[data-part="Disclosure"] > [data-part="DisclosureButton"] > [data-slot="title"]',
            '[data-part="Disclosure"] > [data-part="DisclosureButton"] > [data-slot="indicator"]',
            '[data-part="Disclosure"] > [data-part="DisclosurePanel"]'
        ]
    },
    {
        name: "EmptyState",
        element: <EmptyState icon={<i />} title="Empty" description="Nothing here" />,
        selectors: [
            '[data-part="EmptyState"] > [data-slot="icon"]',
            '[data-part="EmptyState"] > h3[data-slot="title"]',
            '[data-part="EmptyState"] > [data-slot="description"]'
        ]
    },
    {
        name: "FileUpload",
        element: <FileUpload>Drop</FileUpload>,
        selectors: [
            '[data-part="FileUpload"] > [data-slot="dropzone"] > input',
            '[data-part="FileUpload"] > [data-slot="dropzone"] > [data-slot="icon"]'
        ]
    },
    {
        name: "FormGroup",
        element: (
            <FormGroup id="field" label="Label" description="Hint">
                <input id="field" />
            </FormGroup>
        ),
        selectors: [
            '[data-part="FormGroup"] > [data-slot="label"]',
            '[data-part="FormGroup"] > [data-slot="description"]'
        ]
    },
    { name: "Identicon", element: <Identicon value="seed" />, selectors: ['svg[data-part="Identicon"] > rect'] },
    {
        name: "Input",
        element: <Input startSlot="$" endSlot="USD" />,
        selectors: [
            '[data-part="Input"] > [data-slot="start"]',
            '[data-part="Input"] > input',
            '[data-part="Input"] > [data-slot="end"]'
        ]
    },
    { name: "NumberInput", element: <NumberInput />, selectors: ['[data-part="Input NumberInput"] > input'] },
    {
        name: "Loading",
        element: <Loading label="Loading" />,
        selectors: ['[data-part="Loading"] > i', '[data-part="Loading"] > span']
    },
    {
        name: "Pagination",
        element: <Pagination count={100} page={1} onChange={() => {}} />,
        selectors: [
            '[data-part="Pagination"] > [data-slot="first"]',
            '[data-part="Pagination"] > [data-slot="previous"]',
            '[data-part="Pagination"] > button[aria-current="page"]',
            '[data-part="Pagination"] > [data-slot="next"]',
            '[data-part="Pagination"] > [data-slot="last"]'
        ]
    },
    {
        name: "PasswordInput",
        element: <PasswordInput />,
        selectors: [
            '[data-part="PasswordInput"] > input[data-part="Input"]',
            '[data-part="PasswordInput"] > [data-slot="trigger"]'
        ]
    },
    {
        name: "Progress",
        element: <Progress value={null} label="Upload" />,
        selectors: [
            '[data-part="Progress"] > [data-slot="header"] > [data-slot="label"]',
            '[data-part="Progress"] > [data-slot="track"] > [data-slot="range"][data-indeterminate]'
        ]
    },
    {
        name: "RadioGroup",
        element: <RadioGroup items={ITEMS} />,
        selectors: [
            '[data-part="RadioGroup"] > label > input',
            '[data-part="RadioGroup"] > label > [data-slot="control"]',
            '[data-part="RadioGroup"] > label > [data-slot="label"]'
        ]
    },
    {
        name: "SegmentedControl",
        element: <SegmentedControl items={ITEMS} />,
        selectors: ['[data-part="SegmentedControl"] > label > input']
    },
    {
        name: "Select",
        element: <Select options={ITEMS} />,
        selectors: [
            '[data-part="Select"] > button > [data-slot="value"]',
            '[data-part="Select"] > button > [data-slot="indicator"]',
            '[data-part="Select"] > select'
        ]
    },
    { name: "Separator", element: <Separator />, selectors: ['hr[data-part="Separator"]'] },
    { name: "Skeleton", element: <Skeleton />, selectors: ['[data-part="Skeleton"]'] },
    { name: "Spinner", element: <Spinner aria-label="Loading" />, selectors: ['[data-part="Spinner"] > i'] },
    {
        name: "Switch",
        element: <Switch>On</Switch>,
        selectors: [
            'label[data-part="Switch"] > input',
            '[data-part="Switch"] > [data-slot="control"] > [data-slot="thumb"]',
            '[data-part="Switch"] > [data-slot="label"]'
        ]
    },
    {
        name: "Table",
        element: (
            <Table>
                <tbody>
                    <tr>
                        <td>x</td>
                    </tr>
                </tbody>
            </Table>
        ),
        selectors: ['table[data-part="Table"] > tbody > tr > td']
    },
    {
        name: "Tabs",
        element: (
            <TabGroup>
                <TabList variant="segmented">
                    <Tab>One</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>Panel</TabPanel>
                </TabPanels>
            </TabGroup>
        ),
        selectors: [
            '[data-part="TabGroup"] > [data-part="TabList"][data-variant="segmented"] > [data-part="Tab"]',
            '[data-part="TabGroup"] > [data-part="TabPanels"] > [data-part="TabPanel"]'
        ]
    },
    {
        name: "Textarea",
        element: <Textarea autoResize />,
        selectors: ['textarea[data-part="Textarea"][data-auto-resize]']
    }
];

describe("data-part / data-slot", () => {
    for (const testCase of CASES) {
        it(`exposes the ${testCase.name} structure`, () => {
            render(testCase.element);
            for (const selector of testCase.selectors) {
                expect(document.querySelector(selector)).not.toBeNull();
            }
        });
    }

    it("exposes the Dialog structure", async () => {
        render(
            <Dialog open onClose={() => {}}>
                <DialogBackdrop />
                <DialogPanel>
                    <DialogHeader>
                        <DialogTitle>Title</DialogTitle>
                        <DialogCloseButton />
                    </DialogHeader>
                    <DialogBody>Body</DialogBody>
                </DialogPanel>
            </Dialog>
        );
        const header = '[data-part="DialogPanel"] > [data-part="DialogHeader"]';
        expect(await screen.findByRole("dialog")).toHaveAttribute("data-part", "Dialog");
        expect(document.querySelector('[data-part="Dialog"] [data-part="DialogBackdrop"]')).not.toBeNull();
        expect(document.querySelector(`${header} > [data-part="DialogTitle"]`)).not.toBeNull();
        expect(document.querySelector(`${header} > [data-part="DialogCloseButton"] > i`)).not.toBeNull();
        expect(document.querySelector('[data-part="DialogPanel"] > [data-part="DialogBody"]')).not.toBeNull();
    });

    it("exposes the Tooltip structure", () => {
        render(
            <Tooltip content="Hint">
                <button type="button">Trigger</button>
            </Tooltip>
        );
        expect(
            document.querySelector('[data-part="Tooltip"] > [data-slot="content"] > [data-slot="arrow"] > div')
        ).not.toBeNull();
    });

    it("exposes the Toaster structure", async () => {
        render(<Toaster />);
        toaster.create({ type: "success", title: "Saved", action: { label: "Undo", onClick: () => {} } });
        await screen.findByText("Saved");
        const item = '[data-part="Toaster"] > [data-part="ToastItem"][data-variant="success"]';
        expect(document.querySelector(`${item} > [data-slot="icon"]`)).not.toBeNull();
        expect(document.querySelector(`${item} > [data-slot="body"] > strong`)).not.toBeNull();
        expect(document.querySelector(`${item} > [data-slot="action"]`)).not.toBeNull();
        expect(document.querySelector(`${item} > [data-slot="close"] > svg > [data-slot="progress"]`)).not.toBeNull();
        toaster.remove();
    });

    it("exposes the Menu structure", async () => {
        render(
            <Menu>
                <MenuButton>Actions</MenuButton>
                <MenuItems>
                    <MenuSection>
                        <MenuHeading>Release</MenuHeading>
                        <MenuItem>Edit</MenuItem>
                    </MenuSection>
                    <MenuSeparator />
                </MenuItems>
            </Menu>
        );
        await userEvent.click(screen.getByRole("button", { name: "Actions" }));
        await screen.findByRole("menu");
        expect(document.querySelector('[data-part="Menu"] > [data-part="MenuButton"]')).not.toBeNull();
        expect(document.querySelector('[data-part="MenuItems"] > [data-part="MenuSection"]')).not.toBeNull();
        expect(document.querySelector('[data-part="MenuSection"] > [data-part="MenuHeading"]')).not.toBeNull();
        expect(document.querySelector('[data-part="MenuSection"] > [data-part="MenuItem"]')).not.toBeNull();
        expect(document.querySelector('[data-part="MenuItems"] > [data-part="MenuSeparator"]')).not.toBeNull();
    });

    it("exposes the Popover structure", async () => {
        render(
            <Popover>
                <PopoverButton as={Button}>Details</PopoverButton>
                <PopoverPanel>Panel</PopoverPanel>
            </Popover>
        );
        await userEvent.click(screen.getByRole("button", { name: "Details" }));
        await screen.findByText("Panel");
        expect(document.querySelector('[data-part="Popover"] > [data-part="Button PopoverButton"]')).not.toBeNull();
        expect(document.querySelector('[data-part="PopoverPanel"]')).not.toBeNull();
    });

    it("exposes the Select and Combobox options", async () => {
        render(
            <>
                <Select options={[{ label: "Group", options: ITEMS }]} aria-label="Select" />
                <Combobox options={ITEMS} aria-label="Combobox" />
            </>
        );
        await userEvent.click(screen.getByRole("button", { name: "Select" }));
        await screen.findByRole("listbox");
        const group = '[data-part="SelectOptions"] > [data-slot="group"]';
        expect(document.querySelector(`${group} > [data-slot="group-label"]`)).not.toBeNull();
        expect(document.querySelector(`${group} > [data-slot="option"] > [data-slot="indicator"]`)).not.toBeNull();
        await userEvent.keyboard("{Escape}");

        await userEvent.click(screen.getByRole("combobox", { name: "Combobox" }));
        await userEvent.keyboard("{ArrowDown}");
        await screen.findByRole("listbox");
        expect(document.querySelector('[data-part="ComboboxOptions"] > [data-slot="option"]')).not.toBeNull();
    });
});
