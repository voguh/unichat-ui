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

import { Alert, type AlertVariant } from "@voguh/unichat-ui/Alert";
import { Avatar } from "@voguh/unichat-ui/Avatar";
import { Badge, type BadgeVariant } from "@voguh/unichat-ui/Badge";
import { Button } from "@voguh/unichat-ui/Button";
import { Card, CardBody, CardFooter, CardHeader } from "@voguh/unichat-ui/Card";
import { Code } from "@voguh/unichat-ui/Code";
import { EmptyState } from "@voguh/unichat-ui/EmptyState";
import { Identicon } from "@voguh/unichat-ui/Identicon";
import { Loading } from "@voguh/unichat-ui/Loading";
import { Markdown } from "@voguh/unichat-ui/Markdown";
import { Separator } from "@voguh/unichat-ui/Separator";
import { Skeleton } from "@voguh/unichat-ui/Skeleton";
import { Spinner } from "@voguh/unichat-ui/Spinner";
import { Table } from "@voguh/unichat-ui/Table";

import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

import MARKDOWN_SAMPLE from "./markdownSample.md?raw";

const BADGE_VARIANTS: BadgeVariant[] = ["primary", "secondary", "success", "danger", "warning", "info"];
const ALERT_VARIANTS: AlertVariant[] = ["info", "success", "warning", "danger"];
const STATUS_BADGE_VARIANTS: Record<string, BadgeVariant> = { ACTIVE: "success", QUARANTINE: "warning" };
const USERS = [
    { nickname: "voguh", provider: "github", status: "ACTIVE" },
    { nickname: "someone", provider: "github", status: "QUARANTINE" }
];
const MARKDOWN_CONTENT = `
## Activity feed

Shows chat events as cards. Colors follow \`#991b1b\`.

- Sponsors and donations
- [Changelog](CHANGELOG.md)

> Cards stay on screen for the configured duration.

\`\`\`sh
pnpm install
pnpm build
\`\`\`

---

| Field | Type |
| ----- | ---- |
| title | text |
| color | color |
`;

export function BadgeShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Badge"
            description="Inline <span> label."
            usage={`
import { Badge } from "@voguh/unichat-ui/Badge";

<Badge variant="success">Installed</Badge>
`}
            api={[
                {
                    name: "Badge",
                    props: "HTMLAttributes<HTMLSpanElement>",
                    ref: "HTMLSpanElement",
                    structure: `span[data-part~="Badge"][data-variant]`,
                    nonStandard: [
                        {
                            name: "variant",
                            type: '"primary" | "secondary" | "success" | "danger" | "warning" | "info"',
                            defaultValue: '"secondary"',
                            description: "Color scheme."
                        }
                    ]
                }
            ]}
        >
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
        <ShowcasePage
            title="Card"
            description="Surface <div> with optional header, body and footer."
            usage={`
import { Card, CardBody, CardFooter, CardHeader } from "@voguh/unichat-ui/Card";

<Card>
    <CardHeader>plugin-goals</CardHeader>
    <CardBody>Goal system for sponsorships and donations.</CardBody>
    <CardFooter>
        <Button size="sm">Install</Button>
    </CardFooter>
</Card>
`}
            api={[
                {
                    name: "Card",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLDivElement",
                    structure: `
div[data-part~="Card"]
  > div[data-part~="CardHeader"]
  > div[data-part~="CardBody"]
  > div[data-part~="CardFooter"]
`
                },
                { name: "CardHeader", props: "HTMLAttributes<HTMLDivElement>", ref: "HTMLDivElement" },
                { name: "CardBody", props: "HTMLAttributes<HTMLDivElement>", ref: "HTMLDivElement" },
                { name: "CardFooter", props: "HTMLAttributes<HTMLDivElement>", ref: "HTMLDivElement" }
            ]}
        >
            <Example title="Parts">
                <Card style={{ width: "320px" }}>
                    <CardHeader>
                        <strong>plugin-goals</strong>
                        <Badge>v1.0.0</Badge>
                    </CardHeader>
                    <CardBody>Goal system for sponsorships and donations.</CardBody>
                    <CardFooter>
                        <Button size="sm">Install</Button>
                    </CardFooter>
                </Card>
                <Card style={{ width: "320px", padding: "16px" }}>Plain card content.</Card>
            </Example>
        </ShowcasePage>
    );
}

export function AvatarShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Avatar"
            description="Native <img> that falls back to an icon on error or missing src."
            usage={`
import { Avatar } from "@voguh/unichat-ui/Avatar";

<Avatar src={author.avatarUrl} alt={author.name} width={64} height={64} />
`}
            api={[
                {
                    name: "Avatar",
                    props: "ImgHTMLAttributes<HTMLImageElement>",
                    ref: "HTMLImageElement",
                    structure: `
img[data-part~="Avatar"]
span[data-part~="Avatar"][data-fallback]   (instead of the img on error or empty src)
`,
                    nonStandard: [
                        {
                            name: "fallback",
                            type: "ComponentChildren",
                            defaultValue: '<i className="fas fa-image" />',
                            description:
                                "Rendered in a <span> instead of the <img> when src is empty or fails to load; the ref is not attached then."
                        }
                    ]
                }
            ]}
        >
            <Example title="States">
                <Avatar src="/images/128x128.png" alt="UniChat" width={64} height={64} />
                <Avatar src="/broken.png" alt="Broken image" style={{ width: "64px", height: "64px" }} />
                <Avatar
                    alt="Custom fallback"
                    fallback={<i className="fas fa-plug fa-2x" />}
                    style={{ width: "64px", height: "64px" }}
                />
            </Example>
        </ShowcasePage>
    );
}

export function IdenticonShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Identicon"
            description="Native <svg> with a pattern derived from a value."
            usage={`
import { Identicon } from "@voguh/unichat-ui/Identicon";

<Identicon value={user.id} aria-label={user.name} />
`}
            api={[
                {
                    name: "Identicon",
                    props: "SVGAttributes<SVGSVGElement>",
                    ref: "SVGSVGElement",
                    structure: `
svg[data-part~="Identicon"]
  > rect   (background)
  > g   (cells)
`,
                    nonStandard: [
                        {
                            name: "value",
                            type: "string",
                            description: "Seed of the pattern and color; the same value always draws the same icon."
                        }
                    ]
                }
            ]}
        >
            <Example title="Values">
                <Identicon value="01a0fa1d-2385-7a73-88a5-890bbe0e3996" aria-label="User A" />
                <Identicon value="01a0fa1d-2385-7a73-88a5-890bbe0e3997" aria-label="User B" />
                <Identicon
                    value="01a0fa1d-2385-7a73-88a5-890bbe0e3998"
                    aria-label="User C"
                    style={{ width: "64px", height: "64px" }}
                />
            </Example>
        </ShowcasePage>
    );
}

export function SpinnerShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Spinner"
            description="Loading indicator on a <span role='status'>."
            usage={`
import { Spinner } from "@voguh/unichat-ui/Spinner";

<Spinner size="sm" aria-label="Loading releases" />
`}
            api={[
                {
                    name: "Spinner",
                    props: "HTMLAttributes<HTMLSpanElement>",
                    ref: "HTMLSpanElement",
                    structure: `
span[data-part~="Spinner"][data-size]
  > i
`,
                    nonStandard: [
                        {
                            name: "size",
                            type: '"sm" | "md" | "lg"',
                            defaultValue: '"md"',
                            description: "Diameter."
                        }
                    ]
                }
            ]}
        >
            <Example title="Sizes">
                <Spinner size="sm" aria-label="Loading" />
                <Spinner aria-label="Loading" />
                <Spinner size="lg" aria-label="Loading" />
            </Example>
        </ShowcasePage>
    );
}

export function SkeletonShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Skeleton"
            description="Content placeholder <div>, hidden from assistive technology."
            usage={`
import { Skeleton } from "@voguh/unichat-ui/Skeleton";

<Skeleton className={styles.titlePlaceholder} />
`}
            api={[
                {
                    name: "Skeleton",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLDivElement",
                    structure: `div[data-part~="Skeleton"]`
                }
            ]}
        >
            <Example title="Default" vertical>
                <Skeleton style={{ height: "20px", width: "50%" }} />
                <Skeleton style={{ height: "12px" }} />
                <Skeleton style={{ height: "12px", width: "66%" }} />
            </Example>
        </ShowcasePage>
    );
}

export function AlertShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Alert"
            description="Inline status message on a <div>."
            usage={`
import { Alert } from "@voguh/unichat-ui/Alert";

<Alert variant="danger" title="Install failed" action={<Button size="sm">Retry</Button>}>
    Could not download the release.
</Alert>
`}
            api={[
                {
                    name: "Alert",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLDivElement",
                    structure: `
div[data-part~="Alert"][data-variant]
  > span[data-slot="icon"]
  > div[data-slot="content"]
    > strong[data-slot="title"]
  > div[data-slot="action"]
`,
                    nonStandard: [
                        {
                            name: "variant",
                            type: '"info" | "success" | "warning" | "danger"',
                            defaultValue: '"info"',
                            description: 'Color; "warning" and "danger" use role="alert", others role="status".'
                        },
                        {
                            name: "title",
                            type: "ComponentChildren",
                            description: "Bold first line. Replaces the native title tooltip attribute."
                        },
                        {
                            name: "icon",
                            type: "ComponentChildren",
                            defaultValue: "variant icon",
                            description: "Overrides the default Font Awesome icon of the variant."
                        },
                        {
                            name: "action",
                            type: "ComponentChildren",
                            description: "Rendered at the end of the alert, usually a small Button."
                        }
                    ]
                }
            ]}
        >
            <Example title="Variants" vertical>
                {ALERT_VARIANTS.map((variant) => (
                    <Alert key={variant} variant={variant} title={variant}>
                        Something worth noticing happened.
                    </Alert>
                ))}
            </Example>
            <Example title="Custom icon and action" vertical>
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
        </ShowcasePage>
    );
}

export function EmptyStateShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="EmptyState"
            description="Placeholder <div> for empty content."
            usage={`
import { EmptyState } from "@voguh/unichat-ui/EmptyState";

<EmptyState icon={<i className="fas fa-box-open" />} title="No releases" description="Nothing was published yet.">
    <Button size="sm">Create release</Button>
</EmptyState>
`}
            api={[
                {
                    name: "EmptyState",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLDivElement",
                    structure: `
div[data-part~="EmptyState"]
  > span[data-slot="icon"]
  > h1|h2|h3[data-slot="title"]
  > p[data-slot="description"]
`,
                    nonStandard: [
                        { name: "icon", type: "ComponentChildren", description: "Large icon above the title." },
                        {
                            name: "title",
                            type: "ComponentChildren",
                            description: "Heading text. Replaces the native title tooltip attribute."
                        },
                        {
                            name: "titleAs",
                            type: '"h1" | "h2" | "h3"',
                            defaultValue: '"h3"',
                            description: "Heading level of the title."
                        },
                        { name: "description", type: "ComponentChildren", description: "Muted text below the title." }
                    ]
                }
            ]}
        >
            <Example title="Default" vertical>
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

export function CodeShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Code"
            description="Native inline <code>."
            usage={`
import { Code } from "@voguh/unichat-ui/Code";

<p>Run <Code>pnpm build</Code> before publishing.</p>
`}
            api={[
                {
                    name: "Code",
                    props: "HTMLAttributes<HTMLElement>",
                    ref: "HTMLElement",
                    structure: `code[data-part~="Code"]`
                }
            ]}
        >
            <Example title="Inline" vertical>
                <p>
                    Run <Code>encrypt-secret github &lt;secret&gt;</Code> to generate the client secret.
                </p>
                <p>
                    Digest <Code>sha256:9195973c49624b0f</Code>
                </p>
            </Example>
        </ShowcasePage>
    );
}

export function SeparatorShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Separator"
            description="Native <hr>."
            usage={`
import { Separator } from "@voguh/unichat-ui/Separator";

<Separator />
`}
            api={[
                {
                    name: "Separator",
                    props: "HTMLAttributes<HTMLHRElement>",
                    ref: "HTMLHRElement",
                    structure: `hr[data-part~="Separator"]`
                }
            ]}
        >
            <Example title="Default" vertical>
                <p>Above</p>
                <Separator />
                <p>Below</p>
            </Example>
        </ShowcasePage>
    );
}

export function TableShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Table"
            description="Native <table>; thead, tbody, tr, th and td are plain elements styled from the table."
            usage={`
import { Table } from "@voguh/unichat-ui/Table";

<Table aria-label="Users">
    <thead>
        <tr>
            <th scope="col">Nickname</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>voguh</td>
        </tr>
    </tbody>
</Table>
`}
            api={[
                {
                    name: "Table",
                    props: "TableHTMLAttributes<HTMLTableElement>",
                    ref: "HTMLTableElement",
                    structure: `
table[data-part~="Table"]
  > thead > tr > th
  > tbody > tr > td
`
                }
            ]}
        >
            <Example title="Default" vertical>
                <Table aria-label="Users">
                    <thead>
                        <tr>
                            <th scope="col">Nickname</th>
                            <th scope="col">Provider</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {USERS.map((user) => (
                            <tr key={user.nickname}>
                                <td>{user.nickname}</td>
                                <td>{user.provider}</td>
                                <td>
                                    <Badge variant={STATUS_BADGE_VARIANTS[user.status]}>{user.status}</Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Example>
        </ShowcasePage>
    );
}

export function LoadingShowcase(): PReact.ComponentChildren {
    const [show, setShow] = useState(false);

    function showForAWhile(): void {
        setShow(true);
        setTimeout(() => setShow(false), 2000);
    }

    return (
        <ShowcasePage
            title="Loading"
            description="Full-screen overlay <div role='status'> with a spinner."
            usage={`
import { Loading } from "@voguh/unichat-ui/Loading";

<Loading show={uploading} label="Uploading" />
`}
            api={[
                {
                    name: "Loading",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLDivElement",
                    structure: `
div[data-part~="Loading"]
  > i
  > span   (visually hidden label)
`,
                    nonStandard: [
                        {
                            name: "show",
                            type: "boolean",
                            defaultValue: "true",
                            description: "Renders nothing when false."
                        },
                        {
                            name: "label",
                            type: "string",
                            description: "Required: text read by screen readers, visually hidden."
                        }
                    ]
                }
            ]}
        >
            <Example title="Overlay">
                <Button onClick={showForAWhile}>Show for 2 seconds</Button>
                <Loading show={show} label="Loading" />
            </Example>
        </ShowcasePage>
    );
}

export function MarkdownShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Markdown"
            description="Sanitized Markdown rendered into a <div>."
            usage={`
import { Markdown } from "@voguh/unichat-ui/Markdown";

<Markdown content={readme} relativeLinksBaseUrl={\`\${repositoryUrl}/blob/HEAD\`} headingOffset={1} />
`}
            api={[
                {
                    name: "Markdown",
                    props: "HTMLAttributes<HTMLDivElement>",
                    ref: "HTMLDivElement",
                    structure: `
div[data-part~="Markdown"]
  > (generated HTML: h1–h6, p, a, ul, ol, blockquote, pre, code[data-part~="Code"], hr[data-part~="Separator"], table[data-part~="Table"]…)
`,
                    nonStandard: [
                        {
                            name: "content",
                            type: "string | null",
                            description:
                                "Markdown source; renders nothing when null. Replaces children and dangerouslySetInnerHTML."
                        },
                        {
                            name: "relativeLinksBaseUrl",
                            type: "string",
                            description: "Prefix for relative links and images."
                        },
                        {
                            name: "headingOffset",
                            type: "number",
                            defaultValue: "0",
                            description: "Levels added to every heading, capped at h6."
                        }
                    ]
                }
            ]}
        >
            <Example title="Default" vertical>
                <Markdown
                    content={MARKDOWN_CONTENT}
                    relativeLinksBaseUrl="https://github.com/voguh/unichat/blob/HEAD"
                />
            </Example>
            <Example title="Complete" vertical>
                <Markdown content={MARKDOWN_SAMPLE} relativeLinksBaseUrl="https://github.com/voguh/unichat/blob/HEAD" />
            </Example>
        </ShowcasePage>
    );
}
