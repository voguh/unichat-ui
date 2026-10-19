/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { ProgressLabel } from "./ProgressLabel";
import { ProgressRange } from "./ProgressRange";
import { ProgressRoot } from "./ProgressRoot";
import { ProgressTrack } from "./ProgressTrack";
import { ProgressValueText } from "./ProgressValueText";

export * from "./ProgressLabel";
export * from "./ProgressRange";
export * from "./ProgressRoot";
export * from "./ProgressTrack";
export * from "./ProgressValueText";

export const Progress = {
    Root: ProgressRoot,
    Label: ProgressLabel,
    ValueText: ProgressValueText,
    Track: ProgressTrack,
    Range: ProgressRange
};
