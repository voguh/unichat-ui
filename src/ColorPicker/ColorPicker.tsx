/*!******************************************************************************
 * Copyright (c) 2026 Voguh
 *
 * This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License 2.0
 * which is available at https://www.eclipse.org/legal/epl-2.0/
 *
 * SPDX-License-Identifier: EPL-2.0
 ******************************************************************************/

/** biome-ignore-all lint/a11y/noStaticElementInteractions: the field forwards pointer, focus and Escape handling to the native input it wraps */
/** biome-ignore-all lint/a11y/useKeyWithClickEvents: keyboard users open the panel by focusing the input; the click is a pointer shortcut */

import type * as React from "react";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

import { TinyColor } from "@ctrl/tinycolor";
import { flip, offset, shift } from "@floating-ui/dom";

import { useComputePosition } from "~/hooks/useComputePosition";
import popoverPanelStyles from "~/Popover/PopoverPanel/styles.module.css";
import { clickOutside } from "~/utils/clickOutside";
import { clsx } from "~/utils/clsx";
import { dataFlag, dataPart, omitDataPart } from "~/utils/dataAttributes";
import { mergeRefs } from "~/utils/mergeRefs";
import { setNativeValue } from "~/utils/setNativeValue";

import styles from "./styles.module.css";

const AREA_KEY_STEP = 0.01;
const HIDDEN_STYLE: React.CSSProperties = { visibility: "hidden", opacity: "0" };

function clamp(value: number): number {
    return Math.min(Math.max(value, 0), 1);
}

function formatColor(color: TinyColor): string {
    if (color.getAlpha() < 1) {
        return color.toHex8String();
    }

    return color.toHexString();
}

type VanillaProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue">;
export interface ColorPickerProps extends VanillaProps {
    value?: string;
    defaultValue?: string;
    invalid?: boolean;
    swatches?: string[];
    rootProps?: Omit<React.HTMLAttributes<HTMLDivElement>, "ref">;
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(function ColorPicker(
    { value, defaultValue, invalid = false, swatches, rootProps = {}, onInput, disabled, className, ...rest },
    ref
) {
    const isControlled = value != null;

    const [innerValue, setInnerValue] = useState(defaultValue ?? "");
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [controlRef, panelRef, toggleVisualization] = useComputePosition<HTMLDivElement, HTMLDivElement>({
        strategy: "fixed",
        placement: "bottom-start",
        middleware: [offset(4), flip(), shift({ padding: 8 })]
    });

    let currentValue = innerValue;
    if (isControlled) {
        currentValue = value;
    }

    const color = useMemo(() => new TinyColor(currentValue), [currentValue]);
    const hsv = color.toHsv();
    const hueColor = new TinyColor({ h: hsv.h, s: 1, v: 1 }).toHexString();
    const opaqueColor = new TinyColor({ ...hsv, a: 1 }).toHexString();
    const formattedColor = formatColor(color);
    const previewStyle = { backgroundColor: color.toRgbString() };

    function openPanel(): void {
        if (!disabled) {
            setOpen(true);
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
        if (open && event.key === "Escape") {
            setOpen(false);
            inputRef.current!.focus();
        }
    }

    function handleBlur(event: React.FocusEvent<HTMLDivElement>): void {
        const next = event.relatedTarget;
        if (!(next instanceof Node) || !rootRef.current!.contains(next)) {
            setOpen(false);
        }
    }

    function commit(next: TinyColor): void {
        const formatted = formatColor(next);
        if (!isControlled) {
            setInnerValue(formatted);
        }

        const input = inputRef.current!;
        setNativeValue(input, formatted);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function handleInput(event: React.FormEvent<HTMLInputElement>): void {
        if (!isControlled) {
            setInnerValue(event.currentTarget.value);
        }

        if (onInput != null) {
            onInput(event);
        }
    }

    function updateArea(event: React.PointerEvent<HTMLDivElement>): void {
        const rect = event.currentTarget.getBoundingClientRect();
        const s = clamp((event.clientX - rect.left) / rect.width);
        const v = clamp(1 - (event.clientY - rect.top) / rect.height);

        commit(new TinyColor({ ...hsv, s, v }));
    }

    function handleAreaPointerDown(event: React.PointerEvent<HTMLDivElement>): void {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateArea(event);
    }

    function handleAreaPointerMove(event: React.PointerEvent<HTMLDivElement>): void {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            updateArea(event);
        }
    }

    function handleAreaKeyDown(event: React.KeyboardEvent<HTMLDivElement>): void {
        let { s, v } = hsv;
        switch (event.key) {
            case "ArrowLeft":
                s = clamp(s - AREA_KEY_STEP);
                break;
            case "ArrowRight":
                s = clamp(s + AREA_KEY_STEP);
                break;
            case "ArrowUp":
                v = clamp(v + AREA_KEY_STEP);
                break;
            case "ArrowDown":
                v = clamp(v - AREA_KEY_STEP);
                break;
            default:
                return;
        }

        event.preventDefault();
        commit(new TinyColor({ ...hsv, s, v }));
    }

    // biome-ignore lint/correctness/useExhaustiveDependencies: toggleVisualization is recreated every render
    useEffect(() => {
        toggleVisualization(open);
    }, [open]);

    useEffect(() => {
        if (!open) {
            return;
        }

        return clickOutside(() => setOpen(false), rootRef);
    }, [open]);

    return (
        <div
            {...rootProps}
            ref={rootRef}
            data-part={dataPart("ColorPicker", rest)}
            data-open={dataFlag(open)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={clsx(styles.root, className, rootProps.className)}
        >
            <div
                ref={controlRef}
                data-slot="control"
                data-invalid={dataFlag(invalid)}
                data-disabled={dataFlag(disabled)}
                onClick={openPanel}
                onFocus={openPanel}
            >
                <span data-slot="preview" aria-hidden="true">
                    <span data-slot="grid" className={styles.transparencyGrid} />
                    <span data-slot="color" style={previewStyle} className={styles.swatch} />
                </span>
                <input
                    {...omitDataPart(rest)}
                    ref={mergeRefs(ref, inputRef)}
                    type="text"
                    value={currentValue}
                    disabled={disabled}
                    onInput={handleInput}
                />
            </div>
            <div
                ref={panelRef}
                data-part="PopoverPanel ColorPickerPopover"
                style={HIDDEN_STYLE}
                className={clsx(popoverPanelStyles.root, styles.panel)}
            >
                <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Saturation and brightness"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(hsv.s * 100)}
                    aria-valuetext={`${Math.round(hsv.s * 100)}% saturation, ${Math.round(hsv.v * 100)}% brightness`}
                    data-slot="area"
                    style={{ backgroundColor: hueColor }}
                    onPointerDown={handleAreaPointerDown}
                    onPointerMove={handleAreaPointerMove}
                    onKeyDown={handleAreaKeyDown}
                >
                    <span data-slot="thumb" style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }} />
                </div>
                <input
                    type="range"
                    min={0}
                    max={360}
                    value={hsv.h}
                    aria-label="Hue"
                    data-slot="hue"
                    onInput={(event) => commit(new TinyColor({ ...hsv, h: Number(event.currentTarget.value) }))}
                    className={styles.range}
                />
                <div data-slot="alpha">
                    <span data-slot="grid" className={styles.transparencyGrid} />
                    <span
                        data-slot="gradient"
                        style={{ backgroundImage: `linear-gradient(to right, transparent, ${opaqueColor})` }}
                        className={styles.swatch}
                    />
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={hsv.a}
                        aria-label="Alpha"
                        onInput={(event) => commit(new TinyColor({ ...hsv, a: Number(event.currentTarget.value) }))}
                        className={styles.range}
                    />
                </div>
                {swatches != null && swatches.length > 0 && (
                    <div data-slot="swatches">
                        {swatches.map((swatch) => (
                            <button
                                key={swatch}
                                type="button"
                                aria-label={swatch}
                                data-selected={dataFlag(formatColor(new TinyColor(swatch)) === formattedColor)}
                                onClick={() => commit(new TinyColor(swatch))}
                            >
                                <span data-slot="grid" className={styles.transparencyGrid} />
                                <span data-slot="color" style={{ backgroundColor: swatch }} className={styles.swatch} />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
});
