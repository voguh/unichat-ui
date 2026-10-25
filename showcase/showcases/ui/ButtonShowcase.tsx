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

import { Button, ButtonLink, type ButtonSize, type ButtonVariant, IconButton } from "~/components/ui/Button";
import { Example } from "~showcase/components/Example";
import { type PropDoc, ShowcasePage } from "~showcase/components/ShowcasePage";

const VARIANTS: ButtonVariant[] = ["default", "primary", "secondary", "success", "danger", "warning", "info"];
const SIZES: ButtonSize[] = ["sm", "md", "lg"];

const VARIANT_PROP: PropDoc = {
    name: "variant",
    type: '"default" | "primary" | "secondary" | "success" | "danger" | "warning" | "info"',
    defaultValue: '"default"',
    description: "Color scheme."
};

const SIZE_PROP: PropDoc = {
    name: "size",
    type: '"sm" | "md" | "lg"',
    defaultValue: '"md"',
    description: "Height and padding."
};

export function ButtonShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="Button"
            description="Native <button>."
            usage={`
import { Button } from "@voguh/unichat-ui/components/ui/Button";

<Button variant="primary" loading={saving} onClick={save}>
    Save
</Button>
`}
            api={[
                {
                    name: "Button",
                    props: "ButtonHTMLAttributes<HTMLButtonElement>",
                    ref: "HTMLButtonElement",
                    structure: `
button[data-part~="Button"][data-variant][data-size][aria-busy]
  > i[data-slot="spinner"]   (only while loading)
`,
                    nonStandard: [
                        VARIANT_PROP,
                        SIZE_PROP,
                        {
                            name: "loading",
                            type: "boolean",
                            defaultValue: "false",
                            description: "Shows a spinner, disables the button and sets aria-busy."
                        },
                        {
                            name: "type",
                            type: '"button" | "submit" | "reset"',
                            defaultValue: '"button"',
                            description: 'Native default is "submit"; here it is "button".'
                        }
                    ]
                }
            ]}
        >
            <Example title="Variants">
                {VARIANTS.map((variant) => (
                    <Button key={variant} variant={variant}>
                        {variant}
                    </Button>
                ))}
            </Example>
            <Example title="Sizes">
                {SIZES.map((size) => (
                    <Button key={size} size={size}>
                        Size {size}
                    </Button>
                ))}
            </Example>
            <Example title="With icon">
                <Button>
                    <i className="fas fa-download" />
                    Download
                </Button>
                <Button variant="secondary">
                    Next
                    <i className="fas fa-arrow-right" />
                </Button>
            </Example>
            <Example title="States">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button variant="secondary" loading>
                    Saving
                </Button>
            </Example>
        </ShowcasePage>
    );
}

export function IconButtonShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="IconButton"
            description="Square Button for a single icon."
            usage={`
import { IconButton } from "@voguh/unichat-ui/components/ui/Button";

<IconButton aria-label="Delete" variant="danger" onClick={remove}>
    <i className="fas fa-trash" />
</IconButton>
`}
            api={[
                {
                    name: "IconButton",
                    props: "ButtonProps (ButtonHTMLAttributes<HTMLButtonElement>)",
                    ref: "HTMLButtonElement",
                    structure: `
button[data-part="Button IconButton"][data-variant][data-size]
`,
                    nonStandard: [
                        {
                            name: "aria-label",
                            type: "string",
                            description: "Required: the icon is the only content."
                        },
                        VARIANT_PROP,
                        SIZE_PROP
                    ]
                }
            ]}
        >
            <Example title="Sizes">
                {SIZES.map((size) => (
                    <IconButton key={size} size={size} variant="secondary" aria-label="Settings">
                        <i className="fas fa-cog" />
                    </IconButton>
                ))}
            </Example>
            <Example title="Variants">
                {VARIANTS.map((variant) => (
                    <IconButton key={variant} variant={variant} aria-label={variant}>
                        <i className="fas fa-star" />
                    </IconButton>
                ))}
            </Example>
        </ShowcasePage>
    );
}

export function ButtonLinkShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage
            title="ButtonLink"
            description="Native <a> styled as a Button."
            usage={`
import { ButtonLink } from "@voguh/unichat-ui/components/ui/Button";

<ButtonLink href="https://unichat.voguh.me" target="_blank" variant="primary">
    Open website
</ButtonLink>
`}
            api={[
                {
                    name: "ButtonLink",
                    props: "AnchorHTMLAttributes<HTMLAnchorElement>",
                    ref: "HTMLAnchorElement",
                    structure: `
a[data-part~="ButtonLink"][data-variant][data-size]
`,
                    nonStandard: [VARIANT_PROP, SIZE_PROP]
                }
            ]}
        >
            <Example title="Variants">
                {VARIANTS.map((variant) => (
                    <ButtonLink key={variant} href="#/button-link" variant={variant}>
                        Link {variant}
                    </ButtonLink>
                ))}
            </Example>
            <Example title="Sizes">
                {SIZES.map((size) => (
                    <ButtonLink key={size} href="#/button-link" size={size}>
                        Size {size}
                    </ButtonLink>
                ))}
            </Example>
        </ShowcasePage>
    );
}
