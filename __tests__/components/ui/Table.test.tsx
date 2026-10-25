/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import { createRef } from "preact";

import { render, screen } from "@testing-library/preact";

import { Table } from "~/components/ui/Table";

describe("Table", () => {
    it("renders native table children with props and the ref on the table", () => {
        const tableRef = createRef<HTMLTableElement>();
        render(
            <Table ref={tableRef} aria-label="Users">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={2}>voguh</td>
                    </tr>
                </tbody>
            </Table>
        );
        const table = screen.getByRole("table", { name: "Users" });
        expect(table).toBe(tableRef.current);
        expect(table).toHaveAttribute("data-part", "Table");
        expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute("scope", "col");
        expect(screen.getByRole("cell", { name: "voguh" })).toHaveAttribute("colspan", "2");
    });
});
