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

import { Link, useLocation } from "wouter-preact";

import { ScrollableView } from "~/components/ui/ScrollableView";
import { SHOWCASE_GROUPS, SHOWCASES } from "~showcase/showcases";

import styles from "./styles.module.css";

export function Sidebar(): PReact.ComponentChildren {
    const [location] = useLocation();

    return (
        <nav className={styles.root}>
            <div className="brand">
                <img src="/images/128x128.png" alt="UniChat Logo" />
                <span>Showcase</span>
            </div>
            <ScrollableView rootProps={{ className: "groups" }} className="group-list">
                {SHOWCASE_GROUPS.map((group) => (
                    <div key={group} className="group">
                        <h2>{group}</h2>
                        {SHOWCASES.filter((showcase) => showcase.group === group).map((showcase) => (
                            <Link key={showcase.path} to={showcase.path} data-selected={location === showcase.path}>
                                {showcase.title}
                            </Link>
                        ))}
                    </div>
                ))}
            </ScrollableView>
        </nav>
    );
}
