import { ArgumentsCamelCase, Argv } from "yargs";
import { App, SUPPORTED_APPS } from "./renderers";
import { render } from "src";

export const cmd = "$0 <filepath>";

export const desc = "render docx files";

export const builder = (yargs: Argv) => {
    console.log(">>>> 1")
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
        // .demandOption(["filepath", "app"])
};

export async function handler (
    {filepath, app}: ArgumentsCamelCase<{ filepath: string; app: string | string[] }>
) {
    console.log(">>>> 2")
    const apps = (Array.isArray(app) ? app : [app]) as App[];
    console.log({apps})

    await render(filepath, apps, (data) => {
        console.log(data);
    });
}