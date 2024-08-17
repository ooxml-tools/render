import { App, renderers } from "./renderers";

export async function getSupportedApps(): Promise<App[]> {
  const output: App[] = [];
  for (const [app, obj] of Object.entries(renderers)) {
    if (await obj.isSupported()) {
      output.push(app as App);
    }
  }
  return output;
}
