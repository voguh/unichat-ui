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
import { forwardRef } from "preact/compat";
import { useId, useState } from "preact/hooks";

import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

export interface TabsItem {
    value: string;
    label: PReact.ComponentChildren;
    content: PReact.ComponentChildren;
    disabled?: boolean;
}

type VanillaProps = Omit<PReact.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue">;
export interface TabsProps extends VanillaProps {
    items: TabsItem[];
    defaultValue?: string;
    onChange?: (value: string) => void;
    contentProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
    { items, defaultValue, onChange, contentProps, className, ...rest },
    ref
) {
    const id = useId();
    const [selected, setSelected] = useState(defaultValue ?? items[0].value);
    const contentClassName = contentProps != null ? contentProps.className : undefined;

    function select(value: string): void {
        setSelected(value);

        if (onChange != null) {
            onChange(value);
        }
    }

    function handleKeyDown(event: PReact.TargetedKeyboardEvent<HTMLDivElement>): void {
        const tabs = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[role='tab']:not(:disabled)"));
        const index = tabs.indexOf(event.target as HTMLButtonElement);
        const targets: Record<string, HTMLButtonElement | undefined> = {
            ArrowRight: tabs[(index + 1) % tabs.length],
            ArrowLeft: tabs[(index - 1 + tabs.length) % tabs.length],
            Home: tabs[0],
            End: tabs[tabs.length - 1]
        };

        const target = targets[event.key];
        if (target != null) {
            event.preventDefault();
            target.focus();
            target.click();
        }
    }

    return (
        <div {...rest} ref={ref} className={clsx(styles.root, className)}>
            <div role="tablist" onKeyDown={handleKeyDown} className={styles.list}>
                {items.map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        role="tab"
                        id={`${id}-tab-${item.value}`}
                        aria-selected={item.value === selected}
                        aria-controls={`${id}-panel-${item.value}`}
                        tabIndex={item.value === selected ? 0 : -1}
                        disabled={item.disabled}
                        onClick={() => select(item.value)}
                        className={styles.tab}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            {items.map((item) => (
                <div
                    {...contentProps}
                    key={item.value}
                    role="tabpanel"
                    id={`${id}-panel-${item.value}`}
                    aria-labelledby={`${id}-tab-${item.value}`}
                    hidden={item.value !== selected}
                    className={clsx(styles.content, contentClassName)}
                >
                    {item.content}
                </div>
            ))}
        </div>
    );
});
