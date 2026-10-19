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
import { ButtonShowcase } from "./ui/ButtonShowcase";
import { CheckboxShowcase, ComboboxShowcase, RadioShowcase, SelectShowcase } from "./ui/ChoiceShowcase";
import { AccordionShowcase, PaginationShowcase, TabsShowcase } from "./ui/DisclosureShowcase";
import {
    AvatarShowcase,
    BadgeShowcase,
    CardShowcase,
    FeedbackShowcase,
    TableShowcase,
    TypographyShowcase
} from "./ui/DisplayShowcase";
import {
    ColorPickerShowcase,
    DatePickerShowcase,
    FileUploadShowcase,
    NumberInputShowcase,
    TagsInputShowcase
} from "./ui/FieldShowcase";
import { InputShowcase, TextareaShowcase } from "./ui/InputShowcase";
import { DialogShowcase, DropdownShowcase, PopoverShowcase, TooltipShowcase } from "./ui/OverlayShowcase";
import { ClipboardShowcase, ProgressShowcase, QrCodeShowcase, ToastShowcase } from "./ui/UtilityShowcase";

export const SHOWCASE_GROUPS = ["Basics", "Data display", "Feedback", "Overlays", "Inputs", "Forms"] as const;

export interface Showcase {
    path: string;
    title: string;
    group: (typeof SHOWCASE_GROUPS)[number];
    component: () => PReact.ComponentChildren;
}

export const SHOWCASES: Showcase[] = [
    { path: "/button", title: "Button", group: "Basics", component: ButtonShowcase },
    { path: "/badge", title: "Badge", group: "Basics", component: BadgeShowcase },
    { path: "/card", title: "Card", group: "Basics", component: CardShowcase },
    { path: "/avatar", title: "Avatar", group: "Basics", component: AvatarShowcase },
    { path: "/typography", title: "Code & Separator", group: "Basics", component: TypographyShowcase },
    { path: "/table", title: "Table", group: "Data display", component: TableShowcase },
    { path: "/accordion", title: "Accordion", group: "Data display", component: AccordionShowcase },
    { path: "/tabs", title: "Tabs", group: "Data display", component: TabsShowcase },
    { path: "/pagination", title: "Pagination", group: "Data display", component: PaginationShowcase },
    { path: "/qr-code", title: "QR Code", group: "Data display", component: QrCodeShowcase },
    { path: "/feedback", title: "Spinner, Skeleton, Alert", group: "Feedback", component: FeedbackShowcase },
    { path: "/progress", title: "Progress", group: "Feedback", component: ProgressShowcase },
    { path: "/toast", title: "Toast", group: "Feedback", component: ToastShowcase },
    { path: "/dialog", title: "Dialog", group: "Overlays", component: DialogShowcase },
    { path: "/popover", title: "Popover", group: "Overlays", component: PopoverShowcase },
    { path: "/tooltip", title: "Tooltip", group: "Overlays", component: TooltipShowcase },
    { path: "/dropdown", title: "Dropdown", group: "Overlays", component: DropdownShowcase },
    { path: "/input", title: "Input", group: "Inputs", component: InputShowcase },
    { path: "/textarea", title: "Textarea", group: "Inputs", component: TextareaShowcase },
    { path: "/number-input", title: "NumberInput & Password", group: "Inputs", component: NumberInputShowcase },
    { path: "/tags-input", title: "TagsInput", group: "Inputs", component: TagsInputShowcase },
    { path: "/checkbox", title: "Checkbox & Switch", group: "Inputs", component: CheckboxShowcase },
    { path: "/radio", title: "Radio & Segmented", group: "Inputs", component: RadioShowcase },
    { path: "/select", title: "Select", group: "Inputs", component: SelectShowcase },
    { path: "/combobox", title: "Combobox", group: "Inputs", component: ComboboxShowcase },
    { path: "/date-picker", title: "DatePicker", group: "Inputs", component: DatePickerShowcase },
    { path: "/color-picker", title: "ColorPicker", group: "Inputs", component: ColorPickerShowcase },
    { path: "/file-upload", title: "FileUpload", group: "Inputs", component: FileUploadShowcase },
    { path: "/clipboard", title: "Clipboard", group: "Inputs", component: ClipboardShowcase },
    { path: "/form-group", title: "FormGroup", group: "Forms", component: FormGroupShowcase },
    { path: "/form-fields", title: "Form fields", group: "Forms", component: FormFieldsShowcase }
];
