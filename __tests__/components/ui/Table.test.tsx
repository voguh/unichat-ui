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

import { Table, TBody, Td, THead, Th, Tr } from "~/components/ui/Table";

describe("Table", () => {
    it("renders native table parts with props and refs", () => {
        const tableRef = createRef<HTMLTableElement>();
        const cellRef = createRef<HTMLTableCellElement>();
        render(
            <Table ref={tableRef} aria-label="Users">
                <THead>
                    <Tr>
                        <Th scope="col">Name</Th>
                    </Tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td ref={cellRef} colSpan={2}>
                            voguh
                        </Td>
                    </Tr>
                </TBody>
            </Table>
        );
        expect(screen.getByRole("table", { name: "Users" })).toBe(tableRef.current);
        expect(screen.getByRole("columnheader", { name: "Name" })).toHaveAttribute("scope", "col");
        expect(cellRef.current).toBe(screen.getByRole("cell", { name: "voguh" }));
        expect(cellRef.current).toHaveAttribute("colspan", "2");
    });
});
