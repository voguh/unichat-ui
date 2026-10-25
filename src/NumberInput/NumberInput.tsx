/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { forwardRef } from "preact/compat";

import { Input, type InputProps } from "~/Input";
import { dataPart } from "~/utils/dataAttributes";

export interface NumberInputProps extends Omit<InputProps, "type"> {}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(function NumberInput(props, ref) {
    return <Input {...props} ref={ref} type="number" data-part={dataPart("NumberInput", props)} />;
});
