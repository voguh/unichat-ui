/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { QrCodeDownloadTrigger } from "./QrCodeDownloadTrigger";
import { QrCodeFrame } from "./QrCodeFrame";
import { QrCodeOverlay } from "./QrCodeOverlay";
import { QrCodeRoot } from "./QrCodeRoot";

export * from "./QrCodeDownloadTrigger";
export * from "./QrCodeFrame";
export * from "./QrCodeOverlay";
export * from "./QrCodeRoot";

export const QrCode = {
    Root: QrCodeRoot,
    Frame: QrCodeFrame,
    Overlay: QrCodeOverlay,
    DownloadTrigger: QrCodeDownloadTrigger
};
