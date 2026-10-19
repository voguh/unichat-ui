/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { createContext } from "preact";
import { useContext } from "preact/hooks";

import type { PropTypes } from "@zag-js/preact";
import type * as qrCode from "@zag-js/qr-code";

export const QrCodeContext = createContext<qrCode.Api<PropTypes> | null>(null);

export function useQrCode(): qrCode.Api<PropTypes> {
    const api = useContext(QrCodeContext);
    if (api == null) {
        throw new Error("QrCode parts must be rendered inside <QrCode.Root>");
    }

    return api;
}
