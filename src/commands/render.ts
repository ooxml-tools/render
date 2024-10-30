import { ArgumentsCamelCase, Argv } from "yargs";
import { App, SUPPORTED_APPS } from "../renderers";
import { render } from "src";

export const cmd = "render <filepath>";

export const desc = "render files";

export const builder = (yargs: Argv) => {
  yargs
    .positional("filepath", {
      describe: "filepath of OOXML file",
      type: "string",
    })
    .option("app", {
      alias: "a",
      describe: "office version used for validation",
      choices: SUPPORTED_APPS,
    })
    .demandOption(["filepath", "app"]);
};

export async function handler({
  filepath,
  app,
}: ArgumentsCamelCase<{ filepath: string; app: string | string[] }>) {
  const apps = (Array.isArray(app) ? app : [app]) as App[];
  await render(filepath, console.log, apps);
}
