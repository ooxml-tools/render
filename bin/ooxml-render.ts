import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import { render } from "../src/index";
import { isSupportedRenderer, SUPPORTED_APPS } from "src/renderers";


const yargsInstance = yargs(hideBin(process.argv))
  .command("$0 <filepath>", "render docx files")
  .positional("filepath", {
    describe: "filepath of OOXML file",
    type: "string",
  })
  .option("app", {
    alias: "a",
    describe: "office version used for validation",
    choices: SUPPORTED_APPS,
  })
  .demandOption(["filepath", "app"])

const argv = yargsInstance.wrap(Math.min(100, yargsInstance.terminalWidth()))
  .parseSync();

const apps = Array.isArray(argv.app) ? argv.app : [argv.app];

await render(argv.filepath, apps, (data) => {
  console.log(data);
})

process.exit(0);
