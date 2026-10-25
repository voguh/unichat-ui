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

import { FormFieldsShowcase, FormGroupShowcase } from "./forms/FormsShowcase";
import { ThemeShowcase } from "./theme/ThemeShowcase";
import { ButtonLinkShowcase, ButtonShowcase, IconButtonShowcase } from "./ui/ButtonShowcase";
import {
    CheckboxShowcase,
    ComboboxShowcase,
    RadioShowcase,
    SegmentedControlShowcase,
    SelectShowcase,
    SwitchShowcase
} from "./ui/ChoiceShowcase";
import { DisclosureShowcase, PaginationShowcase, TabsShowcase } from "./ui/DisclosureShowcase";
import {
    AlertShowcase,
    AvatarShowcase,
    BadgeShowcase,
    CardShowcase,
    CodeShowcase,
    EmptyStateShowcase,
    IdenticonShowcase,
    LoadingShowcase,
    MarkdownShowcase,
    SeparatorShowcase,
    SkeletonShowcase,
    SpinnerShowcase,
    TableShowcase
} from "./ui/DisplayShowcase";
import {
    ColorPickerShowcase,
    DatePickerShowcase,
    FileUploadShowcase,
    NumberInputShowcase,
    PasswordInputShowcase
} from "./ui/FieldShowcase";
import { InputShowcase, TextareaShowcase } from "./ui/InputShowcase";
import { DialogShowcase, MenuShowcase, PopoverShowcase, TooltipShowcase } from "./ui/OverlayShowcase";
import {
    ClipboardShowcase,
    ProgressShowcase,
    QrCodeShowcase,
    ScrollableViewShowcase,
    ToastShowcase
} from "./ui/UtilityShowcase";

export const SHOWCASE_GROUPS = ["Theme", "Basics", "Data display", "Feedback", "Overlays", "Inputs", "Forms"] as const;

export interface Showcase {
    path: string;
    title: string;
    group: (typeof SHOWCASE_GROUPS)[number];
    component: () => PReact.ComponentChildren;
}

export const SHOWCASES: Showcase[] = [
    { path: "/theme", title: "Tokens", group: "Theme", component: ThemeShowcase },
    { path: "/button", title: "Button", group: "Basics", component: ButtonShowcase },
    { path: "/icon-button", title: "IconButton", group: "Basics", component: IconButtonShowcase },
    { path: "/button-link", title: "ButtonLink", group: "Basics", component: ButtonLinkShowcase },
    { path: "/badge", title: "Badge", group: "Basics", component: BadgeShowcase },
    { path: "/card", title: "Card", group: "Basics", component: CardShowcase },
    { path: "/avatar", title: "Avatar", group: "Basics", component: AvatarShowcase },
    { path: "/identicon", title: "Identicon", group: "Basics", component: IdenticonShowcase },
    { path: "/code", title: "Code", group: "Basics", component: CodeShowcase },
    { path: "/separator", title: "Separator", group: "Basics", component: SeparatorShowcase },
    { path: "/table", title: "Table", group: "Data display", component: TableShowcase },
    { path: "/disclosure", title: "Disclosure", group: "Data display", component: DisclosureShowcase },
    { path: "/tabs", title: "Tabs", group: "Data display", component: TabsShowcase },
    { path: "/pagination", title: "Pagination", group: "Data display", component: PaginationShowcase },
    { path: "/qr-code", title: "QR Code", group: "Data display", component: QrCodeShowcase },
    { path: "/scrollable-view", title: "ScrollableView", group: "Data display", component: ScrollableViewShowcase },
    { path: "/markdown", title: "Markdown", group: "Data display", component: MarkdownShowcase },
    { path: "/spinner", title: "Spinner", group: "Feedback", component: SpinnerShowcase },
    { path: "/skeleton", title: "Skeleton", group: "Feedback", component: SkeletonShowcase },
    { path: "/alert", title: "Alert", group: "Feedback", component: AlertShowcase },
    { path: "/empty-state", title: "EmptyState", group: "Feedback", component: EmptyStateShowcase },
    { path: "/progress", title: "Progress", group: "Feedback", component: ProgressShowcase },
    { path: "/toast", title: "Toast", group: "Feedback", component: ToastShowcase },
    { path: "/loading", title: "Loading", group: "Feedback", component: LoadingShowcase },
    { path: "/dialog", title: "Dialog", group: "Overlays", component: DialogShowcase },
    { path: "/popover", title: "Popover", group: "Overlays", component: PopoverShowcase },
    { path: "/tooltip", title: "Tooltip", group: "Overlays", component: TooltipShowcase },
    { path: "/menu", title: "Menu", group: "Overlays", component: MenuShowcase },
    { path: "/input", title: "Input", group: "Inputs", component: InputShowcase },
    { path: "/textarea", title: "Textarea", group: "Inputs", component: TextareaShowcase },
    { path: "/number-input", title: "NumberInput", group: "Inputs", component: NumberInputShowcase },
    { path: "/password-input", title: "PasswordInput", group: "Inputs", component: PasswordInputShowcase },
    { path: "/checkbox", title: "Checkbox", group: "Inputs", component: CheckboxShowcase },
    { path: "/switch", title: "Switch", group: "Inputs", component: SwitchShowcase },
    { path: "/radio-group", title: "RadioGroup", group: "Inputs", component: RadioShowcase },
    {
        path: "/segmented-control",
        title: "SegmentedControl",
        group: "Inputs",
        component: SegmentedControlShowcase
    },
    { path: "/select", title: "Select", group: "Inputs", component: SelectShowcase },
    { path: "/combobox", title: "Combobox", group: "Inputs", component: ComboboxShowcase },
    { path: "/date-picker", title: "DatePicker", group: "Inputs", component: DatePickerShowcase },
    { path: "/color-picker", title: "ColorPicker", group: "Inputs", component: ColorPickerShowcase },
    { path: "/file-upload", title: "FileUpload", group: "Inputs", component: FileUploadShowcase },
    { path: "/clipboard", title: "Clipboard", group: "Inputs", component: ClipboardShowcase },
    { path: "/form-group", title: "FormGroup", group: "Forms", component: FormGroupShowcase },
    { path: "/form-fields", title: "Form fields", group: "Forms", component: FormFieldsShowcase }
];
