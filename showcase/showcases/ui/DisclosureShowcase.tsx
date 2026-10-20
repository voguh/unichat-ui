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
        <ShowcasePage title="Accordion" description="Native <details> and <summary>.">
            <Example title="Independent" vertical>
                <Accordion.Root>
                    {RELEASES.map((release, index) => (
                        <Accordion.Item key={release} title={`v${release}`} open={index === 0}>
                            Release notes for {release}.
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </Example>
            <Example title="Exclusive (shared name)" vertical>
                <Accordion.Root>
                    {RELEASES.map((release) => (
                        <Accordion.Item key={release} title={`v${release}`} name="releases">
                            Release notes for {release}.
                        </Accordion.Item>
                    ))}
                </Accordion.Root>
            </Example>
        </ShowcasePage>
    );
}

export function TabsShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Tabs" description="Data-driven tabs with arrow key navigation.">
            <Example title="Default" vertical>
                <Tabs
                    items={[
                        { value: "users", label: "Users", content: "Users panel" },
                        { value: "releases", label: "Releases", content: "Releases panel" },
                        { value: "settings", label: "Settings", content: "Settings panel", disabled: true }
                    ]}
                />
            </Example>
        </ShowcasePage>
    );
}

export function PaginationShowcase(): PReact.ComponentChildren {
    const [page, setPage] = useState(1);

    return (
        <ShowcasePage title="Pagination" description="Controlled page navigation.">
            <Example title="Controlled" vertical>
                <Pagination count={250} pageSize={10} page={page} onChange={setPage} />
                <Code>page: {page}</Code>
            </Example>
        </ShowcasePage>
    );
}
