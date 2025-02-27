import { ArgumentsCamelCase, Argv } from "yargs";
import { App, SUPPORTED_APPS } from "../renderers";
import { render } from "src";
import { reportFn } from "./helper";

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
    .option("throws", {
      type: "boolean",
      describe: "throws when an app is missing",
    })
    .option("disable-index", {
      type: "boolean",
      describe: "disable index pages",
    })
    .demandOption(["filepath"]);
};

export async function handler({
  filepath,
  app,
  throws,
  disableIndex,
  outputPath,
}: ArgumentsCamelCase<{
  filepath: string;
  app: string | string[];
  throws: boolean;
  disableIndex: boolean;
  outputPath?: string;
}>) {
  const apps = app ? ((Array.isArray(app) ? app : [app]) as App[]) : null;
  await render(filepath, apps, {
    throws,
    reportFn,
    disableIndex,
    outputPath,
  });
}
