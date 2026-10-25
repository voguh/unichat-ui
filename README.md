# UniChat UI Library

A UI library for UniChat and its ecosystem.

---

### Installation

The package is published to zBell. Add the scope to `.npmrc`:

```ini
@voguh:registry=https://zbell.voguh.me
```

```sh
pnpm add @voguh/unichat-ui
```

Each component is its own entry point:

```tsx
import { Button } from "@voguh/unichat-ui/Button";
import { TextInput } from "@voguh/unichat-ui/forms/TextInput";
import { clsx } from "@voguh/unichat-ui/utils/clsx";
```

`forms/*` are the same controls wrapped in a `FormGroup` (label, description, status message).

### Usage with React

The library is written against React 18 and declares `react` and `react-dom` (`>=18 <20`) as peer dependencies. A React
project needs no extra setup:

```sh
pnpm add @voguh/unichat-ui react react-dom
```

### Preact setup

The library imports `react` and `react-dom`, as does Headless UI underneath it. A Preact project resolves both to
`preact/compat` in three places.

**Dependencies** - keeps real React out of the lockfile:

```json
{
    "dependencies": {
        "preact": "10.29.8"
    },
    "devDependencies": {
        "react": "npm:@preact/compat@18.3.2",
        "react-dom": "npm:@preact/compat@18.3.2"
    }
}
```

Plus the package manager override, so transitive peers resolve to compat too:

```yaml
# pnpm-workspace.yaml
overrides:
  react: npm:@preact/compat@18.3.2
  react-dom: npm:@preact/compat@18.3.2
```

```json
// package.json - npm uses "overrides", Yarn uses "resolutions"
{
    "overrides": {
        "react": "npm:@preact/compat@18.3.2",
        "react-dom": "npm:@preact/compat@18.3.2"
    }
}
```

**Bundler aliases:**

```js
// rspack / webpack
resolve: {
    alias: {
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
        "react/jsx-runtime": "preact/jsx-runtime"
    }
}
```

```js
// vite - @preact/preset-vite already sets these aliases
import preact from "@preact/preset-vite";

export default { plugins: [preact()] };
```

**TypeScript paths:**

```json
{
    "compilerOptions": {
        "jsx": "react-jsx",
        "jsxImportSource": "preact",
        "paths": {
            "react": ["./node_modules/preact/compat/"],
            "react/jsx-runtime": ["./node_modules/preact/jsx-runtime"],
            "react-dom": ["./node_modules/preact/compat/"],
            "react-dom/*": ["./node_modules/preact/compat/*"]
        }
    }
}
```

### Styles

Each component imports its own compiled CSS and the `--ucui-*` tokens; the bundler only needs to handle CSS imports
(`sideEffects` keeps them). Neither Tailwind nor CSS Modules are required.

The library styles live in `@layer unichat-ui`. Declare the layer order once, before any other CSS, so the app's
layers and unlayered CSS win over the library:

```css
@layer theme, base, unichat-ui, components, utilities;
```

**With Tailwind** - Tailwind's preflight is enough:

```css
@layer theme, base, unichat-ui, components, utilities;

@import "tailwindcss";
```

**Without Tailwind** - import the library preflight once, in the entry point:

```tsx
import "@voguh/unichat-ui/preflight.css";
```

**Icons** use Font Awesome 5 Free (solid) classes; the app ships Font Awesome itself.

### Customization

Tokens are CSS custom properties; override them in unlayered CSS:

```css
:root {
    --ucui-color-primary: #dc2626;
    --ucui-font-size-base: 0.875rem;
}
```

Every component exposes its structure as attributes: `data-part` (component name, accumulated generic → specific)
and `data-slot` (inner role). Select parts with `~=`:

```css
[data-part~="Alert"] > span[data-slot="icon"] {
    color: #facc15;
}
```

---

### License

This project is free and open-source under the [Eclipse Public License, Version 2.0](./LICENSE).
