import util from "util";
import { exec as cpExec } from "child_process";
import { $ } from "execa";

export const exec = util.promisify(cpExec);

export async function isOsaScriptSupported() {
  try {
    await $`command -v osascript`;
    return true;
  } catch (err) {
    return false;
  }
}
