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
import { useMemo, useRef, useState } from "preact/hooks";

import { TinyColor } from "@ctrl/tinycolor";

import { Popover, PopoverButton, PopoverPanel } from "~/components/ui/Popover";
import { clsx } from "~/utils/clsx";
import { mergeRefs } from "~/utils/mergeRefs";

import styles from "./styles.module.css";

const AREA_KEY_STEP = 0.01;

function clamp(value: number): number {
    return Math.min(Math.max(value, 0), 1);
}

function formatColor(color: TinyColor): string {
    if (color.getAlpha() < 1) {
        return color.toHex8String();
    }

    return color.toHexString();
}

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "defaultValue">;
export interface ColorPickerProps extends VanillaProps {
    value?: string;
    defaultValue?: string;
    invalid?: boolean;
    swatches?: string[];
    rootProps?: Omit<PReact.HTMLAttributes<HTMLDivElement>, "ref">;
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(function ColorPicker(
    { value, defaultValue, invalid = false, swatches, rootProps = {}, onInput, disabled, className, ...rest },
    ref
) {
    const isControlled = value != null;

    const [innerValue, setInnerValue] = useState(defaultValue ?? "");
    const inputRef = useRef<HTMLInputElement>(null);

    let currentValue = innerValue;
    if (isControlled) {
        currentValue = value;
    }

    const color = useMemo(() => new TinyColor(currentValue), [currentValue]);
    const hsv = color.toHsv();
    const hueColor = new TinyColor({ h: hsv.h, s: 1, v: 1 }).toHexString();
    const opaqueColor = new TinyColor({ ...hsv, a: 1 }).toHexString();
    const formattedColor = formatColor(color);

    function commit(next: TinyColor): void {
        const formatted = formatColor(next);
        if (!isControlled) {
            setInnerValue(formatted);
        }

        const input = inputRef.current!;
        input.value = formatted;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    function handleInput(event: PReact.TargetedInputEvent<HTMLInputElement>): void {
        if (!isControlled) {
            setInnerValue(event.currentTarget.value);
        }

        if (onInput != null) {
            onInput(event);
        }
    }

    function updateArea(event: PReact.TargetedPointerEvent<HTMLDivElement>): void {
        const rect = event.currentTarget.getBoundingClientRect();
        const s = clamp((event.clientX - rect.left) / rect.width);
        const v = clamp(1 - (event.clientY - rect.top) / rect.height);

        commit(new TinyColor({ ...hsv, s, v }));
    }

    function handleAreaPointerDown(event: PReact.TargetedPointerEvent<HTMLDivElement>): void {
        event.currentTarget.setPointerCapture(event.pointerId);
        updateArea(event);
    }

    function handleAreaPointerMove(event: PReact.TargetedPointerEvent<HTMLDivElement>): void {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
            updateArea(event);
        }
    }

    function handleAreaKeyDown(event: PReact.TargetedKeyboardEvent<HTMLDivElement>): void {
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

    return (
        <Popover {...rootProps} className={clsx(styles.root, className, rootProps.className)}>
            <div data-invalid={invalid || undefined} data-disabled={disabled || undefined} className={styles.control}>
                <PopoverButton disabled={disabled === true} aria-label="Open color picker" className={styles.trigger}>
                    <span className={styles.transparencyGrid} />
                    <span style={{ backgroundColor: color.toRgbString() }} className={styles.swatch} />
                </PopoverButton>
                <input
                    {...rest}
                    ref={mergeRefs(ref, inputRef)}
                    type="text"
                    value={currentValue}
                    disabled={disabled}
                    onInput={handleInput}
                    className={styles.input}
                />
            </div>
            <PopoverPanel anchor="bottom start" className={styles.content}>
                <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Saturation and brightness"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(hsv.s * 100)}
                    aria-valuetext={`${Math.round(hsv.s * 100)}% saturation, ${Math.round(hsv.v * 100)}% brightness`}
                    style={{ backgroundColor: hueColor }}
                    onPointerDown={handleAreaPointerDown}
                    onPointerMove={handleAreaPointerMove}
                    onKeyDown={handleAreaKeyDown}
                    className={styles.area}
                >
                    <span
                        style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }}
                        className={styles.areaThumb}
                    />
                </div>
                <input
                    type="range"
                    min={0}
                    max={360}
                    value={hsv.h}
                    aria-label="Hue"
                    onInput={(event) => commit(new TinyColor({ ...hsv, h: Number(event.currentTarget.value) }))}
                    className={styles.hue}
                />
                <div className={styles.alphaTrack}>
                    <span className={styles.transparencyGrid} />
                    <span
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
                        className={styles.alpha}
                    />
                </div>
                {swatches != null && swatches.length > 0 && (
                    <div className={styles.swatchGroup}>
                        {swatches.map((swatch) => (
                            <button
                                key={swatch}
                                type="button"
                                aria-label={swatch}
                                data-selected={formatColor(new TinyColor(swatch)) === formattedColor || undefined}
                                onClick={() => commit(new TinyColor(swatch))}
                                className={styles.swatchTrigger}
                            >
                                <span className={styles.transparencyGrid} />
                                <span style={{ backgroundColor: swatch }} className={styles.swatch} />
                            </button>
                        ))}
                    </div>
                )}
            </PopoverPanel>
        </Popover>
    );
});
