import { join } from "path";
import { $ } from "execa";
import { isOsaScriptSupported } from "../../helper";

export async function render(inputPath: string, outputPath: string) {
  const appleScriptPath = join(import.meta.dirname, "./convert.applescript");
  await $`osascript ${appleScriptPath} ${inputPath} ${outputPath}`;
}

export async function isSupported() {
  if (await isOsaScriptSupported()) {
    const appleScriptPath = join(import.meta.dirname, "./exists.applescript");
    try {
      await $`osascript ${appleScriptPath}`;
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
}
