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

import { Code } from "@voguh/unichat-ui/Code";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@voguh/unichat-ui/Disclosure";
import { Pagination } from "@voguh/unichat-ui/Pagination";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@voguh/unichat-ui/Tabs";

import { Example } from "~showcase/components/Example";
import { type PropDoc, ShowcasePage } from "~showcase/components/ShowcasePage";

const RELEASES = ["1.2.0", "1.1.1", "1.0.0"];

const PANEL_PROPS: PropDoc[] = [
    {
        name: "unmount",
        type: "boolean",
        defaultValue: "true",
        description: "Removes the panel from the DOM while closed; false keeps it hidden."
    },
    { name: "static", type: "boolean", defaultValue: "false", description: "Always renders, ignoring the state." }
];

export function DisclosureShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Disclosure"
            description="Headless UI Disclosure with an optional exclusive group."
            usage={`
import { Disclosure, DisclosureButton, DisclosurePanel } from "@voguh/unichat-ui/Disclosure";

<Disclosure name="releases" defaultOpen>
    <DisclosureButton>v1.2.0</DisclosureButton>
    <DisclosurePanel>Release notes.</DisclosurePanel>
</Disclosure>
`}
            api={[
                {
                    name: "Disclosure",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    structure: `
div[data-part~="Disclosure"][data-open]
  > button[data-part~="DisclosureButton"][data-open]
    > span[data-slot="title"]   (children)
    > i[data-slot="indicator"]
  > div[data-part~="DisclosurePanel"]
`,
                    nonStandard: [
                        { name: "defaultOpen", type: "boolean", defaultValue: "false", description: "Starts open." },
                        {
                            name: "name",
                            type: "string",
                            description: "Exclusive group, like <details name>: opening one closes the others."
                        }
                    ]
                },
                {
                    name: "DisclosureButton",
                    props: "ButtonHTMLAttributes<HTMLButtonElement>",
                    ref: "HTMLButtonElement",
                    nonStandard: [
                        {
                            name: "children",
                            type: "ComponentChildren",
                            description: "Title; a chevron is appended."
                        }
                    ]
                },
                {
                    name: "DisclosurePanel",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    nonStandard: PANEL_PROPS
                }
            ]}
        >
            <Example title="Independent" vertical>
                {RELEASES.map((release, index) => (
                    <Disclosure key={release} defaultOpen={index === 0}>
                        <DisclosureButton>v{release}</DisclosureButton>
                        <DisclosurePanel>Release notes for {release}.</DisclosurePanel>
                    </Disclosure>
                ))}
            </Example>
            <Example title="Exclusive (shared name)" vertical>
                {RELEASES.map((release) => (
                    <Disclosure key={release} name="releases">
                        <DisclosureButton>v{release}</DisclosureButton>
                        <DisclosurePanel>Release notes for {release}.</DisclosurePanel>
                    </Disclosure>
                ))}
            </Example>
        </ShowcasePage>
    );
}

export function TabsShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Tabs"
            description="Headless UI tabs with arrow key navigation."
            usage={`
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@voguh/unichat-ui/Tabs";

<TabGroup defaultIndex={0} onChange={setTabIndex}>
    <TabList variant="segmented">
        <Tab>Readme</Tab>
        <Tab>Versions</Tab>
    </TabList>
    <TabPanels>
        <TabPanel>Readme content</TabPanel>
        <TabPanel>Versions content</TabPanel>
    </TabPanels>
</TabGroup>
`}
            api={[
                {
                    name: "TabGroup",
                    props: 'HTMLAttributes<HTMLDivElement> (without "onChange")',
                    ref: "HTMLElement",
                    structure: `
div[data-part~="TabGroup"]
  > div[data-part~="TabList"][data-variant]
    > button[data-part~="Tab"][data-selected][data-disabled]
  > div[data-part~="TabPanels"]
    > div[data-part~="TabPanel"]
`,
                    nonStandard: [
                        { name: "defaultIndex", type: "number", defaultValue: "0", description: "Initial tab." },
                        { name: "selectedIndex", type: "number", description: "Selected tab when controlled." },
                        {
                            name: "onChange",
                            type: "(index: number) => void",
                            description: "Called with the new tab index, not an event."
                        },
                        {
                            name: "vertical",
                            type: "boolean",
                            defaultValue: "false",
                            description: "Arrow up/down instead of left/right."
                        },
                        {
                            name: "manual",
                            type: "boolean",
                            defaultValue: "false",
                            description: "Arrow keys only move focus; Enter or Space selects."
                        }
                    ]
                },
                {
                    name: "TabList",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    nonStandard: [
                        {
                            name: "variant",
                            type: '"default" | "segmented"',
                            defaultValue: '"default"',
                            description: "Underlined tabs or a SegmentedControl look."
                        }
                    ]
                },
                { name: "Tab", props: "ButtonHTMLAttributes<HTMLButtonElement>", ref: "HTMLElement" },
                { name: "TabPanels", props: "HTMLAttributes<HTMLDivElement>", ref: "HTMLElement" },
                {
                    name: "TabPanel",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLElement",
                    nonStandard: PANEL_PROPS
                }
            ]}
        >
            <Example title="Default" vertical>
                <TabGroup>
                    <TabList>
                        <Tab>Users</Tab>
                        <Tab>Releases</Tab>
                        <Tab disabled>Settings</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>Users panel</TabPanel>
                        <TabPanel>Releases panel</TabPanel>
                        <TabPanel>Settings panel</TabPanel>
                    </TabPanels>
                </TabGroup>
            </Example>
            <Example title="Segmented" vertical>
                <TabGroup>
                    <TabList variant="segmented">
                        <Tab>Users</Tab>
                        <Tab>Releases</Tab>
                        <Tab disabled>Settings</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>Users panel</TabPanel>
                        <TabPanel>Releases panel</TabPanel>
                        <TabPanel>Settings panel</TabPanel>
                    </TabPanels>
                </TabGroup>
            </Example>
        </ShowcasePage>
    );
}

export function PaginationShowcase(): PReact.ComponentChildren {
    const [page, setPage] = useState(1);

    return (
        <ShowcasePage
            title="Pagination"
            description="Controlled page navigation in a <nav>."
            usage={`
import { Pagination } from "@voguh/unichat-ui/Pagination";

<Pagination count={totalItems} pageSize={20} page={page} onChange={setPage} />
`}
            api={[
                {
                    name: "Pagination",
                    props: 'HTMLAttributes<HTMLElement> (<nav>, without "onChange")',
                    ref: "HTMLElement",
                    structure: `
nav[data-part~="Pagination"]
  > button[data-slot="first"]
  > button[data-slot="previous"]
  > button   (one per page; current page has [aria-current="page"])
  > span   (ellipsis)
  > button[data-slot="next"]
  > button[data-slot="last"]
`,
                    nonStandard: [
                        { name: "count", type: "number", description: "Total number of items, not of pages." },
                        { name: "pageSize", type: "number", defaultValue: "10", description: "Items per page." },
                        { name: "page", type: "number", description: "Current page, starting at 1." },
                        {
                            name: "siblingCount",
                            type: "number",
                            defaultValue: "1",
                            description: "Pages shown on each side of the current one."
                        },
                        {
                            name: "onChange",
                            type: "(page: number) => void",
                            description: "Called with the new page, not an event."
                        }
                    ]
                }
            ]}
        >
            <Example title="Controlled" vertical>
                <Pagination count={250} pageSize={10} page={page} onChange={setPage} />
                <Code>page: {page}</Code>
            </Example>
        </ShowcasePage>
    );
}
