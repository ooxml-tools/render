import { getFormatFromFilename } from "./helper";
import { App, renderers } from "./renderers";

export async function getSupportedApps(filepath: string): Promise<App[]> {
  const output: App[] = [];
  for (const [app, obj] of Object.entries(renderers)) {
    if (await obj.isSupported(getFormatFromFilename(filepath))) {
      output.push(app as App);
    }
  }
  return output;
}
