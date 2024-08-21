# <img alt="@ooxml-tools/render" height="56" src="https://github.com/user-attachments/assets/6d466b8c-64e5-4c8d-a849-5428c67535b1" />
Render Office Open XML files (currently only `.docx`) in nodejs.

## Usage

```js
import render from "@ooxml-tools/render";

const input = await readFile("./test.docx");
const outputDir = "./output/";
await render(input, "msword", outputDir);
```


## License
MIT
