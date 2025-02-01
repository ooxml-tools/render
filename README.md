<h1>
    <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://ooxml-tools.github.io/design/images/render-dark.png">
        <source media="(prefers-color-scheme: light)" srcset="https://ooxml-tools.github.io/design/images/render-light.png">
        <img alt="@ooxml-tools/render" height="56" src="https://ooxml-tools.github.io/design/images/render-light.png">
    </picture>
</h1>

Render Office Open XML files in native applications (word, pages, etc...)

Support for rendering

- `.docx` — [WordprocessingML](http://officeopenxml.com/anatomyofOOXML.php)
- `.xlsx` — [SpreadsheetML](http://officeopenxml.com/anatomyofOOXML-xlsx.php)
- `.pptx` — [PresentationML](http://officeopenxml.com/anatomyofOOXML-pptx.php)

This tool can be used as a part of visual regression for various editors

## Support

- `.docx`
  - `msword` — ✅ macos / 🔜 win
  - `pages` — ✅ macos
  - `libreoffice` — ✅ macos / 🔜 linux / 🔜 win
  - `googledocs` — 🔜
  - `onedrive` — 🔜
- `.pptx`
  - `powerpoint` — 🔜 macos / 🔜 win
  - `keynote` — ✅ macos
  - `libreoffice` — ✅ macos / 🔜 linux / 🔜 win
  - `googledocs` — 🔜
  - `onedrive` — 🔜
- `.xlsx`
  - `excel` — 🔜 macos / 🔜 win
  - `numbers` — ✅ macos
  - `libreoffice` — ✅ macos / 🔜 linux / 🔜 win
  - `googledocs` — 🔜
  - `onedrive` — 🔜

## Requirements

You must have the apps you wish to use above installed on your machine.

We use imagemagick for converting PDFs created from the various editors. So you must either have the `imagemagick` CLI installed locally or `docker`/`docker-compose` installed on your machine.

## Usage

```js
import render from "@ooxml-tools/render";

const input = await readFile("./test.docx");
const outputDir = "./output/";
await render(input, ["msword"], { outputDir });
```

## CLI

```bash
npx @ooxml-tools/render --help
# ooxml-render <command> [args]
#
# Commands:
#   render <filepath>   render files
#   support <filepath>  list supported apps for <filepath>
#
# Options:
#   --version  Show version number                                       [boolean]
#   --help     Show help                                                 [boolean]
```

## License

MIT
