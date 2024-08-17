# @ooxml-tools/render
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