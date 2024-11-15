import { $ } from "execa";
import { isOsaScriptSupported } from "../../helper";
import { OfficeOpenXmlType } from "@ooxml-tools/file";
import {platform} from "node:process";

const CONVERT_APPLESCRIPT = `on run argv
	set input_file to (POSIX file (item 1 of argv))
	set output_file to (POSIX file (item 2 of argv))
	
	tell application "Pages"
	launch
		set theDoc to open input_file
		export theDoc as PDF to file output_file
		close theDoc
	end tell
end run`;

const EXISTS_APPLESCRIPT = `tell application "Finder" to get application file id "com.apple.iWork.Pages"`;

export async function render(
  _format: OfficeOpenXmlType,
  inputPath: string,
  outputPath: string,
) {
  await $`osascript -e ${CONVERT_APPLESCRIPT} ${inputPath} ${outputPath}`;
}

export async function isSupported(format: OfficeOpenXmlType) {
  if (platform === "darwin" && format === "docx") {
    if (await isOsaScriptSupported()) {
      try {
        await $`osascript -e ${EXISTS_APPLESCRIPT}`;
        return true;
      } catch (err) {
        return false;
      }
    }
  }
  return false;
}
