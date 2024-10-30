import { $ } from "execa";
import { isOsaScriptSupported } from "../../helper";
import { Format } from "src/renderers";

export async function render(
  format: Format,
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

export async function isSupported(format: Format) {
  if (format === "xlsx") {
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
  return false;
}
