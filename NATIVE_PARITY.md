# Native parity

Events each interactive component fires compared with its native counterpart. Display-only components (`Alert`,
`Avatar`, `Badge`, `Card`, `Clipboard`, `Code`, `EmptyState`, `Identicon`, `Loading`, `Markdown`, `Progress`,
`QrCode`, `ScrollableView`, `Separator`, `Skeleton`, `Spinner`, `Table`) are left out.

| Component               | Native counterpart                      | Events                       | Parity  | Differences                                                                                                                                                                 |
| ----------------------- | --------------------------------------- | ---------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Input`                 | `<input>`                               | Native                       | Full    | ---                                                                                                                                                                         |
| `NumberInput`           | `<input type="number">`                 | Native                       | Full    | Characters outside digits, `e`, `+`, `-` and `.` are dropped while typing and pasting in every browser, as Chromium does                                                    |
| `PasswordInput`         | `<input type="password">`               | Native                       | Full    | The visibility button switches `type` to `text`                                                                                                                             |
| `Textarea`              | `<textarea>`                            | Native                       | Full    | `autoResize` grows the height on `input`                                                                                                                                    |
| `Checkbox`              | `<input type="checkbox">`               | Native                       | Full    | `indeterminate` is a prop (native: property only)                                                                                                                           |
| `Switch`                | `<input type="checkbox" role="switch">` | Native                       | Full    | ---                                                                                                                                                                         |
| `Select`                | `<select>`                              | Native                       | Full    | Focus, keyboard and pointer handlers run on the trigger button (`currentTarget` is the button); no `multiple`; options come from `options`, not `<option>` children         |
| `Combobox`              | `<input list>`                          | Native                       | Full    | Options come from `options`, not a `<datalist>`; the suggestion list is filtered by value or label                                                                          |
| `DatePicker`            | `<input type="date">`                   | Native                       | Full    | The browser picker is replaced by the calendar panel (Alt+ArrowDown focuses it); `locale` only affects the panel                                                            |
| `ColorPicker`           | `<input type="color">`                  | Native                       | Partial | Any color string, including alpha (`#rrggbbaa`); native is `#rrggbb` only; the panel dispatches `input` and `change` on every change, native fires `change` once, on commit |
| `FileUpload`            | `<input type="file">`                   | Native                       | Full    | Removing a file dispatches `change` with the updated `files`                                                                                                                |
| `Button` / `IconButton` | `<button>`                              | Native                       | Full    | `type` defaults to `"button"` (native: `"submit"`)                                                                                                                          |
| `ButtonLink`            | `<a>`                                   | Native                       | Full    | ---                                                                                                                                                                         |
| `Disclosure`            | `<details>` + `<summary>`               | None                         | None    | No `toggle` event and no `open` prop; `name` keeps one item open per group, like `<details name>`                                                                           |
| `Dialog`                | `<dialog>`                              | `onClose()` without an event | Partial | `onClose` covers Escape, outside clicks and the close button; no `cancel` / `close` events                                                                                  |
| `Popover`               | `popover` attribute                     | None                         | None    | No `beforetoggle` / `toggle` events                                                                                                                                         |

Without a native counterpart: `Tabs` (`TabGroup` `onChange(index)`), `Menu`, `Pagination` (`onChange(page)`),
`Toaster`, `Tooltip`.

`RadioGroup` and `SegmentedControl` are a `<div role="radiogroup">` holding native `<input type="radio">`s; `name`,
`value`/`defaultValue`, `disabled` and `onChange` go to the radios, everything else to the `<div>`.
