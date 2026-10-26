<!-- prettier-ignore-start -->
<div align="center">
  <img src="/images/128x128.png" alt="UniChat logo" width="96" height="96">
  <h1>UniChat Activity Feed</h1>
  <p>
    <a href="https://github.com/voguh/unichat/releases"><img src="https://img.shields.io/badge/version-1.5.0-red" alt="Version"></a>
    <a href="https://github.com/voguh/unichat/blob/HEAD/LICENSE"><img src="https://img.shields.io/badge/license-EPL--2.0-blue" alt="License"></a>
    <img src="https://img.shields.io/badge/platform-Windows%20%7C%20Linux%20%7C%20macOS-555" alt="Platforms">
  </p>
  <p><strong>Chat events as cards</strong> for OBS browser sources, with <em>per-platform</em> styling.</p>
</div>

---

# Heading level 1

Paragraph with **bold**, *italic*, ***bold italic***, ~~strikethrough~~, `inline code`, a color `#16a34a`, another
`rgb(220, 38, 38)` and a [relative link](./docs/README.md), an [absolute link](https://unichat.voguh.me) and an
autolink https://github.com/voguh/unichat. A line ending with a backslash\
forces a break, and so does a `<br>` tag<br>inline.

## Heading level 2

A long paragraph to check line length and wrapping. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.

A very long unbroken token: https://unichat.voguh.me/api/v1/widgets/unichat-community:unichat-widget-activity-feed/releases/1.5.0-rc.3/assets/activity-feed-1.5.0-rc.3.zip

### Heading level 3

#### Heading level 4

##### Heading level 5

###### Heading level 6

Text right after the smallest heading, followed by a second paragraph.

Second paragraph, to see the spacing between paragraphs.

## Lists

- Unordered item
- Item with **bold** and `code`
  - Nested item
  - Nested item with a [link](https://unichat.voguh.me)
    - Third level
    - Third level with a long text that wraps over more than one line to check the indentation of the continuation
- Back to the first level

1. Ordered item
2. Ordered item with a nested unordered list:
   - Nested bullet
   - Another nested bullet
3. Ordered item with a paragraph inside

   Loose list paragraph, separated by a blank line.

4. Ordered item with code inside:

   ```lua
   local counts = {}
   counts["voguh"] = (counts["voguh"] or 0) + 1
   ```

- [x] Task done
- [ ] Task pending
  - [x] Nested task done
  - [ ] Nested task pending

## Blockquotes

> Single paragraph quote with **bold** and `code`.

> First paragraph of a quote.
>
> Second paragraph, with a list:
>
> - one
> - two
>
> > Nested quote inside the quote.
>
> ```json
> { "id": "activity-feed", "version": "1.5.0" }
> ```

## Code

```ts
export interface UniChatEvent {
    type: "unichat:message" | "unichat:donate" | "unichat:cheer";
    data: Record<string, unknown>;
}

export function isMessage(event: UniChatEvent): boolean {
    return event.type === "unichat:message";
}
```

```sh
pnpm --dir=webapp install --frozen-lockfile && tauri build --bundles deb,rpm,appimage --target x86_64-unknown-linux-gnu --verbose
```

    Indented code block
    with two lines

```
<div class="card" data-platform="twitch">Plain fence with HTML inside</div>
```

## Tables

| Field | Type | Required | Description |
| :---- | :--: | -------: | ----------- |
| `title` | text | yes | Card title shown on top |
| `color` | color | no | Accent color, e.g. `#991b1b` |
| `duration` | number | no | Seconds the card stays on screen before fading out, counted from the moment it appears |
| `platforms` | list | no | **Twitch**, *YouTube* or both |

<table>
  <caption>HTML table with spans</caption>
  <thead>
    <tr>
      <th rowspan="2">Event</th>
      <th colspan="2">Platforms</th>
    </tr>
    <tr>
      <th>Twitch</th>
      <th>YouTube</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>unichat:message</code></td>
      <td>✔</td>
      <td>✔</td>
    </tr>
    <tr>
      <td><code>unichat:cheer</code></td>
      <td>Bits</td>
      <td>Jewels</td>
    </tr>
    <tr>
      <td><code>unichat:donate</code></td>
      <td colspan="2" align="center">Super Chat only</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3"><small>Cheer and donate are split since 1.5.0.</small></td>
    </tr>
  </tfoot>
</table>

## Details

<details>
  <summary>Click to expand the configuration</summary>

  Markdown inside a details block, with **bold** and `code`, as long as blank lines separate it from the tags.

  <ul>
    <li>HTML list item</li>
    <li>Another one with <a href="https://unichat.voguh.me">a link</a></li>
  </ul>

  <details>
    <summary>Nested details</summary>
    <p>Deeper content.</p>
  </details>
</details>

<details open>
  <summary><strong>Open by default</strong> with <code>code</code> in the summary</summary>
  <p>This one starts open.</p>
</details>

## Inline HTML

Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> to open the devtools. Water is H<sub>2</sub>O and
E = mc<sup>2</sup>. Some <mark>highlighted text</mark>, an <abbr title="Open Broadcaster Software">OBS</abbr>
abbreviation, <ins>inserted</ins> and <del>deleted</del> text, a <q>short quote</q> from <cite>UniChat docs</cite>,
sample output <samp>Widget loaded</samp>, a variable <var>duration</var> and <small>small print</small>.

<dl>
  <dt>Widget</dt>
  <dd>Folder with <code>widget.html</code>, <code>widget.css</code> and <code>widget.js</code>.</dd>
  <dt>Plugin</dt>
  <dd>Lua script loaded on startup.</dd>
</dl>

<figure>
  <img src="/images/128x128.png" alt="Figure image" width="64">
  <figcaption>Figure with a caption.</figcaption>
</figure>

<p align="right">Right aligned paragraph.</p>

<blockquote>
  <p>HTML blockquote with a <strong>strong</strong> element.</p>
</blockquote>

<pre><code>HTML pre/code block
    keeps its indentation</code></pre>

<hr>

## Images

![Image with title](/images/128x128.png "Image with title")

## Sanitized content

<script>alert("should not run")</script>
<iframe src="https://example.com"></iframe>
<form><input value="removed"><button>Form button text stays</button></form>
<img src="x" onerror="alert('removed')" alt="Broken image without handler">
<a href="javascript:alert('removed')">Link without href</a>
<p style="position:fixed;inset:0;background:red">Paragraph without its inline style</p>

Last paragraph after the sanitized block.
<!-- prettier-ignore-end -->
