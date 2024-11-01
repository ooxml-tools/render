import { ArgumentsCamelCase, Argv } from "yargs";
import { renderers, SUPPORTED_APPS } from "../renderers";
import { extname } from "path";
import { FORMATS, OfficeOpenXmlType } from "@ooxml-tools/file";

export const cmd = "support <filepath>";

export const desc = "list supported apps for <filepath>";

export const builder = (yargs: Argv) => {
  yargs
    .positional("filepath", {
      describe: "filepath of OOXML file",
      type: "string",
    })
    .demandOption(["filepath"]);
};

export async function handler({
  filepath,
}: ArgumentsCamelCase<{ filepath: string }>) {
  // HACK
  const format = extname(filepath).slice(1) as OfficeOpenXmlType;

  if (!FORMATS.includes(format)) {
    throw new Error(`Invalid format ${format}`);
  }

  const supported = [];
  for (const appName of SUPPORTED_APPS) {
    if (await renderers[appName].isSupported(format)) {
      supported.push(appName);
    }
  }

  console.log(supported.join("\n"));
  process.exit(0);
}
