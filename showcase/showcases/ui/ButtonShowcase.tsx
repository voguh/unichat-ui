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
import { ShowcasePage } from "~showcase/components/ShowcasePage";

const VARIANTS: ButtonVariant[] = ["primary", "secondary", "ghost", "danger"];
const SIZES: ButtonSize[] = ["sm", "md", "lg"];

export function ButtonShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Button" description="Native <button>, <a> and icon-only variants.">
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
            <Example title="ButtonLink">
                {VARIANTS.map((variant) => (
                    <ButtonLink key={variant} href="#/button" variant={variant}>
                        Link {variant}
                    </ButtonLink>
                ))}
            </Example>
            <Example title="IconButton">
                {SIZES.map((size) => (
                    <IconButton key={size} size={size} variant="secondary" aria-label="Settings">
                        <i className="fas fa-cog" />
                    </IconButton>
                ))}
                <IconButton aria-label="Delete" variant="danger">
                    <i className="fas fa-trash" />
                </IconButton>
            </Example>
        </ShowcasePage>
    );
}
