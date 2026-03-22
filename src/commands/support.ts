import { ArgumentsCamelCase, Argv } from "yargs";
import { renderers, SUPPORTED_APPS } from "../renderers";
import { extname } from "path";
import { FORMATS, OfficeOpenXmlType } from "@ooxml-tools/file";

export const cmd = "support <ooxmlpath>";

export const desc = "list supported apps for <ooxmlpath>";

export const builder = (yargs: Argv) => {
  yargs
    .positional("ooxmlpath", {
      describe: "filepath of OOXML file",
      type: "string",
    })
    .demandOption(["ooxmlpath"]);
};

export async function handler({
  ooxmlpath,
}: ArgumentsCamelCase<{ ooxmlpath: string }>) {
  const format = extname(ooxmlpath).slice(1) as OfficeOpenXmlType;

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
