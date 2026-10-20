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
import { useId, useRef } from "preact/hooks";

import * as colorPicker from "@zag-js/color-picker";
import { mergeProps, normalizeProps, useMachine } from "@zag-js/preact";

import { Portal } from "~/components/ui/Portal";
import { clsx } from "~/utils/clsx";

import styles from "./styles.module.css";

type VanillaProps = Omit<PReact.InputHTMLAttributes<HTMLInputElement>, keyof colorPicker.Props | "type">;
export interface ColorPickerProps extends VanillaProps, Partial<Omit<colorPicker.Props, "id">> {
    id?: string;
    swatches?: string[];
    rootProps?: PReact.HTMLAttributes<HTMLDivElement>;
}

export const ColorPicker = forwardRef<HTMLInputElement, ColorPickerProps>(function ColorPicker(
    { id, swatches, rootProps, className, ...props },
    ref
) {
    const [machineProps, rest] = colorPicker.splitProps(props);
    const rootClassName = rootProps != null ? rootProps.className : undefined;

    const controlRef = useRef<HTMLDivElement>(null);

    const machineId = useId();
    const service = useMachine(colorPicker.machine, {
        openAutoFocus: false,
        ...machineProps,
        id: machineId,
        ids: { ...machineProps.ids, hiddenInput: id },
        positioning: { placement: "bottom", getAnchorElement: () => controlRef.current, ...machineProps.positioning }
    });
    const api = colorPicker.connect(service, normalizeProps);

    return (
        <div
            {...mergeProps(api.getRootProps(), rootProps ?? {})}
            className={clsx(styles.root, className, rootClassName)}
        >
            <div {...api.getControlProps()} ref={controlRef} className={styles.control}>
                <button {...api.getTriggerProps()} className={styles.trigger}>
                    <div {...api.getTransparencyGridProps({ size: "8px" })} className={styles.transparencyGrid} />
                    <div {...api.getSwatchProps({ value: api.value })} className={styles.swatch} />
                </button>
                <input
                    {...mergeProps(api.getChannelInputProps({ channel: "hex" }), { onClick: () => api.setOpen(true) })}
                    className={styles.channelInput}
                />
            </div>
            <Portal>
                <div {...api.getPositionerProps()}>
                    <div {...api.getContentProps()} className={styles.content}>
                        <div {...api.getAreaProps()} className={styles.area}>
                            <div {...api.getAreaBackgroundProps()} className={styles.areaBackground} />
                            <div {...api.getAreaThumbProps()} className={styles.thumb} />
                        </div>
                        <div {...api.getChannelSliderProps({ channel: "hue" })} className={styles.channelSlider}>
                            <div {...api.getChannelSliderTrackProps({ channel: "hue" })} className={styles.track} />
                            <div {...api.getChannelSliderThumbProps({ channel: "hue" })} className={styles.thumb} />
                        </div>
                        <div {...api.getChannelSliderProps({ channel: "alpha" })} className={styles.channelSlider}>
                            <div
                                {...api.getTransparencyGridProps({ size: "8px" })}
                                className={styles.transparencyGrid}
                            />
                            <div {...api.getChannelSliderTrackProps({ channel: "alpha" })} className={styles.track} />
                            <div {...api.getChannelSliderThumbProps({ channel: "alpha" })} className={styles.thumb} />
                        </div>
                        {swatches != null && swatches.length > 0 && (
                            <div {...api.getSwatchGroupProps()} className={styles.swatchGroup}>
                                {swatches.map((swatch) => (
                                    <button
                                        key={swatch}
                                        {...api.getSwatchTriggerProps({ value: swatch })}
                                        className={styles.swatchTrigger}
                                    >
                                        <div {...api.getSwatchProps({ value: swatch })} className={styles.swatch} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Portal>
            <input {...mergeProps(api.getHiddenInputProps(), rest)} ref={ref} />
        </div>
    );
});
