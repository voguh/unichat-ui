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
import { useEffect, useState } from "preact/hooks";

import { Button } from "~/components/ui/Button";
import { Clipboard } from "~/components/ui/Clipboard";
import { Progress } from "~/components/ui/Progress";
import { QrCode } from "~/components/ui/QrCode";
import { toaster } from "~/components/ui/Toast";
import { Example } from "~showcase/components/Example";
import { ShowcasePage } from "~showcase/components/ShowcasePage";

export function ProgressShowcase(): PReact.ComponentChildren {
    const [value, setValue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setValue((current) => (current >= 100 ? 0 : current + 5)), 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <ShowcasePage title="Progress" description="Linear progress bar.">
            <Example title="Determinate" vertical>
                <Progress value={value} label="Uploading" />
            </Example>
            <Example title="Indeterminate" vertical>
                <Progress value={null} />
            </Example>
        </ShowcasePage>
    );
}

export function ClipboardShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Clipboard" description="Read-only value with a copy button.">
            <Example title="Default" vertical>
                <Clipboard
                    label="Digest"
                    value="sha256:9195973c49624b0f1727263948e7d371860fad192a63d179d67015d025679ab4"
                />
            </Example>
        </ShowcasePage>
    );
}

export function QrCodeShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="QR Code" description="Generated with lean-qr.">
            <Example title="Default">
                <QrCode
                    value="https://unichat.voguh.me"
                    alt="QR code for unichat.voguh.me"
                    style={{ width: "10rem" }}
                />
            </Example>
        </ShowcasePage>
    );
}

export function ToastShowcase(): PReact.ComponentChildren {
    return (
        <ShowcasePage title="Toast" description="<Toaster /> is mounted once; toaster.create() anywhere.">
            <Example title="Types">
                <Button onClick={() => toaster.info({ title: "Info", description: "Something happened." })}>
                    Info
                </Button>
                <Button onClick={() => toaster.success({ title: "Saved", description: "Release updated." })}>
                    Success
                </Button>
                <Button onClick={() => toaster.warning({ title: "Warning", description: "Check your input." })}>
                    Warning
                </Button>
                <Button
                    variant="danger"
                    onClick={() => toaster.error({ title: "Error", description: "Could not save the release." })}
                >
                    Error
                </Button>
            </Example>
            <Example title="With action">
                <Button
                    variant="secondary"
                    onClick={() =>
                        toaster.create({
                            title: "Release deleted",
                            type: "info",
                            action: { label: "Undo", onClick: () => toaster.success({ title: "Restored" }) }
                        })
                    }
                >
                    Delete with undo
                </Button>
            </Example>
        </ShowcasePage>
    );
}
