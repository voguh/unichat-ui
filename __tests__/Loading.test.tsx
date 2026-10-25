/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { render } from "@testing-library/react";

import { Loading } from "~/Loading";

describe("Loading", () => {
    it("exposes the data-part structure", () => {
        render(<Loading label="Loading" />);
        expect(document.querySelector('[data-part="Loading"] > i')).not.toBeNull();
        expect(document.querySelector('[data-part="Loading"] > span')).not.toBeNull();
    });
});
