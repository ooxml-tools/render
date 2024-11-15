import { $ } from "execa";
import { isOsaScriptSupported } from "../../helper";
import { OfficeOpenXmlType } from "@ooxml-tools/file";
import { platform } from 'node:process';

export async function render(
  format: OfficeOpenXmlType,
  inputPath: string,
  outputPath: string,
) {
  const appleScript = `
on run argv
	set input_file to (POSIX file (item 1 of argv))
	set output_file to (POSIX file (item 2 of argv))
	
	tell application "Microsoft Excel"
        open input_file
		
		set activeDoc to active document
		save as activeDoc file name output_file file format format PDF
	end tell
end run
  `;
  await $`osascript -e ${appleScript} ${inputPath} ${outputPath}`;
}

export async function isSupported(format: OfficeOpenXmlType) {
  if (format === "xlsx") {
    if (platform === "darwin") {
      if (await isOsaScriptSupported()) {
        const appleScript = `tell application "Finder" to get application file id "com.microsoft.Excel"`;
        try {
          await $`osascript -e ${appleScript}`;
          return true;
        } catch (err) {
          return false;
        }
      }
    }
    if (platform === "win32") {
      // TODO:
    }
  }
  return false;
}
