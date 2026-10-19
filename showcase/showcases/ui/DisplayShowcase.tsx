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

import { Alert, type AlertVariant } from "~/components/ui/Alert";
import { Avatar } from "~/components/ui/Avatar";
import { Badge, type BadgeVariant } from "~/components/ui/Badge";
import { Button } from "~/components/ui/Button";
import { Card, CardBody, CardFooter, CardHeader } from "~/components/ui/Card";
import { Code } from "~/components/ui/Code";
import { EmptyState } from "~/components/ui/EmptyState";
import { Identicon } from "~/components/ui/Identicon";
import { Separator } from "~/components/ui/Separator";
import { Skeleton } from "~/components/ui/Skeleton";
import { Spinner } from "~/components/ui/Spinner";
import { Table, TBody, Td, THead, Th, Tr } from "~/components/ui/Table";
import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

const BADGE_VARIANTS: BadgeVariant[] = ["neutral", "info", "success", "warning", "danger"];
const ALERT_VARIANTS: AlertVariant[] = ["info", "success", "warning", "danger"];
const USERS = [
    { nickname: "voguh", provider: "github", status: "ACTIVE" },
    { nickname: "someone", provider: "github", status: "QUARANTINE" }
];

export function BadgeShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Badge" description="Inline <span> label.">
            <Example title="Variants">
                {BADGE_VARIANTS.map((variant) => (
                    <Badge key={variant} variant={variant}>
                        {variant}
                    </Badge>
                ))}
            </Example>
            <Example title="With icon">
                <Badge variant="info">
                    <i className="fab fa-windows" />
                    Windows
                </Badge>
                <Badge variant="success">
                    <i className="fab fa-linux" />
                    Linux
                </Badge>
            </Example>
        </ShowcasePage>
    );
}

export function CardShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Card" description="Surface <div> with optional header, body and footer.">
            <Example title="Parts">
                <Card style={{ width: "20rem" }}>
                    <CardHeader>
                        <strong>plugin-goals</strong>
                        <Badge>v1.0.0</Badge>
                    </CardHeader>
                    <CardBody>Goal system for sponsorships and donations.</CardBody>
                    <CardFooter>
                        <Button size="sm">Install</Button>
                    </CardFooter>
                </Card>
                <Card style={{ width: "20rem", padding: "1rem" }}>Plain card content.</Card>
            </Example>
        </ShowcasePage>
    );
}

export function AvatarShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Avatar"
            description="<img> that falls back to an icon on error or missing src; Identicon draws a pattern from a value."
        >
            <Example title="States">
                <Avatar src="/images/unichat-logo-256x256.png" alt="UniChat" width={64} height={64} />
                <Avatar src="/broken.png" alt="Broken image" style={{ width: "4rem", height: "4rem" }} />
                <Avatar
                    alt="Custom fallback"
                    fallback={<i className="fas fa-plug fa-2x" />}
                    style={{ width: "4rem", height: "4rem" }}
                />
            </Example>
            <Example title="Identicon">
                <Identicon value="01a0fa1d-2385-7a73-88a5-890bbe0e3996" aria-label="User A" />
                <Identicon value="01a0fa1d-2385-7a73-88a5-890bbe0e3997" aria-label="User B" />
                <Identicon
                    value="01a0fa1d-2385-7a73-88a5-890bbe0e3998"
                    aria-label="User C"
                    style={{ width: "4rem", height: "4rem" }}
                />
            </Example>
        </ShowcasePage>
    );
}

export function FeedbackShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Feedback" description="Spinner, Skeleton, Alert and EmptyState.">
            <Example title="Spinner">
                <Spinner size="sm" aria-label="Loading" />
                <Spinner aria-label="Loading" />
                <Spinner size="lg" aria-label="Loading" />
            </Example>
            <Example title="Skeleton" vertical>
                <Skeleton style={{ height: "1.25rem", width: "50%" }} />
                <Skeleton style={{ height: "0.75rem" }} />
                <Skeleton style={{ height: "0.75rem", width: "66%" }} />
            </Example>
            <Example title="Alert" vertical>
                {ALERT_VARIANTS.map((variant) => (
                    <Alert key={variant} variant={variant} title={variant} icon={<i className="fas fa-info-circle" />}>
                        Something worth noticing happened.
                    </Alert>
                ))}
                <Alert
                    variant="danger"
                    icon={<i className="fas fa-exclamation-triangle" />}
                    action={
                        <Button size="sm" variant="secondary">
                            Try again
                        </Button>
                    }
                >
                    Could not load plugins.
                </Alert>
            </Example>
            <Example title="EmptyState" vertical>
                <EmptyState
                    icon={<i className="fas fa-box-open" />}
                    title="No releases"
                    description="Nothing was published yet."
                >
                    <Button size="sm">Create release</Button>
                </EmptyState>
            </Example>
        </ShowcasePage>
    );
}

export function TypographyShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Code & Separator" description="Inline <code> and <hr>.">
            <Example title="Code" vertical>
                <p>
                    Run <Code>encrypt-secret github &lt;secret&gt;</Code> to generate the client secret.
                </p>
                <p>
                    Digest <Code>sha256:9195973c49624b0f</Code>
                </p>
            </Example>
            <Example title="Separator" vertical>
                <p>Above</p>
                <Separator />
                <p>Below</p>
            </Example>
        </ShowcasePage>
    );
}

export function TableShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Table" description="Native table parts.">
            <Example title="Default" vertical>
                <Table aria-label="Users">
                    <THead>
                        <Tr>
                            <Th scope="col">Nickname</Th>
                            <Th scope="col">Provider</Th>
                            <Th scope="col">Status</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {USERS.map((user) => (
                            <Tr key={user.nickname}>
                                <Td>{user.nickname}</Td>
                                <Td>{user.provider}</Td>
                                <Td>
                                    <Badge variant={user.status === "ACTIVE" ? "success" : "warning"}>
                                        {user.status}
                                    </Badge>
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </Example>
        </ShowcasePage>
    );
}
