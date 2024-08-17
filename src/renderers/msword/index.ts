import { join } from "path";
import { $ } from "execa";
import { isOsaScriptSupported } from "../../helper";

export async function render(inputPath: string, outputPath: string) {
  const appleScript = `
on run argv
	set input_file to (POSIX file (item 1 of argv))
	set output_file to (POSIX file (item 2 of argv))
	
	tell application "Microsoft Word"
        open input_file
		
		set activeDoc to active document
		save as activeDoc file name output_file file format format PDF
	end tell
end run
  `
  await $`osascript -e ${appleScript} ${inputPath} ${outputPath}`;
}

export async function isSupported() {
  if (await isOsaScriptSupported()) {
    const appleScript = `tell application "Finder" to get application file id "com.microsoft.Word"`
    try {
      await $`osascript -e ${appleScript}`;
      return true;
    } catch (err) {
      return false;
    }
  }
  return false;
}
