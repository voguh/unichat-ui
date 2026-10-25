/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { createRef } from "react";

import { render, screen } from "@testing-library/react";

import { RadioGroup } from "~/forms/RadioGroup";

describe("forms/RadioGroup", () => {
    it("labels the radiogroup and forwards ref to the root", () => {
        const ref = createRef<HTMLDivElement>();
        render(
            <RadioGroup
                ref={ref}
                label="Channel"
                items={[
                    { value: "stable", label: "Stable" },
                    { value: "beta", label: "Beta" }
                ]}
            />
        );
        expect(screen.getByRole("radiogroup", { name: "Channel" })).toBe(ref.current);
    });
});
