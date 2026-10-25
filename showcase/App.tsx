/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

import "./styles/showcase.css";
import type PReact from "preact";

import { Route, Router, Switch } from "wouter-preact";
import { useHashLocation } from "wouter-preact/use-hash-location";

import { ScrollableView } from "~/components/ui/ScrollableView";
import { Toaster } from "~/components/ui/Toast";

import { Sidebar } from "./components/Sidebar";
import { SHOWCASES } from "./showcases";
import styles from "./styles/styles.module.css";

export function App(): PReact.ComponentChildren {
    return (
        <Router hook={useHashLocation}>
            <div className={styles.root}>
                <Sidebar />
                <main>
                    <ScrollableView rootProps={{ className: styles.scroll }} className={styles.content}>
                        <Switch>
                            {SHOWCASES.map((showcase) => (
                                <Route key={showcase.path} path={showcase.path} component={showcase.component} />
                            ))}
                            <Route component={SHOWCASES[0].component} />
                        </Switch>
                    </ScrollableView>
                </main>
            </div>
            <Toaster />
        </Router>
    );
}
