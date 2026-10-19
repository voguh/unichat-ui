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

import { Accordion } from "~/components/ui/Accordion";
import { Code } from "~/components/ui/Code";
import { Pagination } from "~/components/ui/Pagination";
import { Tabs } from "~/components/ui/Tabs";
import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

const RELEASES = ["1.2.0", "1.1.1", "1.0.0"];

export function AccordionShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Accordion" description="@zag-js/accordion, compound API.">
            <Example title="Single, collapsible" vertical>
                <Accordion.Root collapsible defaultValue={["1.2.0"]}>
                    {RELEASES.map((release) => (
                        <Accordion.Item key={release} value={release}>
                            <Accordion.ItemTrigger>
                                <span style={{ flex: 1 }}>v{release}</span>
                                <Accordion.ItemIndicator>
                                    <i className="fas fa-chevron-down" />
                                </Accordion.ItemIndicator>
                            </Accordion.ItemTrigger>
                            <Accordion.ItemContent>Release notes for {release}.</Accordion.ItemContent>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </Example>
            <Example title="Multiple, with disabled item" vertical>
                <Accordion.Root multiple>
                    {RELEASES.map((release, index) => (
                        <Accordion.Item key={release} value={release} disabled={index === 2}>
                            <Accordion.ItemTrigger>v{release}</Accordion.ItemTrigger>
                            <Accordion.ItemContent>Release notes for {release}.</Accordion.ItemContent>
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </Example>
        </ShowcasePage>
    );
}

export function TabsShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Tabs" description="@zag-js/tabs, compound API.">
            <Example title="Horizontal" vertical>
                <Tabs.Root defaultValue="users">
                    <Tabs.List>
                        <Tabs.Trigger value="users">Users</Tabs.Trigger>
                        <Tabs.Trigger value="releases">Releases</Tabs.Trigger>
                        <Tabs.Trigger value="settings" disabled>
                            Settings
                        </Tabs.Trigger>
                        <Tabs.Indicator />
                    </Tabs.List>
                    <Tabs.Content value="users">Users panel</Tabs.Content>
                    <Tabs.Content value="releases">Releases panel</Tabs.Content>
                    <Tabs.Content value="settings">Settings panel</Tabs.Content>
                </Tabs.Root>
            </Example>
            <Example title="Vertical" vertical>
                <Tabs.Root defaultValue="general" orientation="vertical">
                    <Tabs.List>
                        <Tabs.Trigger value="general">General</Tabs.Trigger>
                        <Tabs.Trigger value="security">Security</Tabs.Trigger>
                    </Tabs.List>
                    <Tabs.Content value="general">General settings</Tabs.Content>
                    <Tabs.Content value="security">Security settings</Tabs.Content>
                </Tabs.Root>
            </Example>
        </ShowcasePage>
    );
}

export function PaginationShowcase(): PReact.ComponentChildren {
    const [page, setPage] = useState(1);

    return (
        <ShowcasePage title="Pagination" description="@zag-js/pagination, compound API.">
            <Example title="Controlled" vertical>
                <Pagination.Root
                    count={250}
                    pageSize={10}
                    page={page}
                    onPageChange={(details) => setPage(details.page)}
                >
                    <Pagination.FirstTrigger>
                        <i className="fas fa-angle-double-left" />
                    </Pagination.FirstTrigger>
                    <Pagination.PrevTrigger>
                        <i className="fas fa-chevron-left" />
                    </Pagination.PrevTrigger>
                    <Pagination.Items />
                    <Pagination.NextTrigger>
                        <i className="fas fa-chevron-right" />
                    </Pagination.NextTrigger>
                    <Pagination.LastTrigger>
                        <i className="fas fa-angle-double-right" />
                    </Pagination.LastTrigger>
                </Pagination.Root>
                <Code>page: {page}</Code>
            </Example>
        </ShowcasePage>
    );
}
