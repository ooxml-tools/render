import * as mswordRender from "./msword";
import * as pagesRender from "./pages";
import * as libreofficeRender from "./libreoffice";
// import * as googleDocsRender from "./google-drive";
// import * as oneDriveRender from "./onedrive";

export const SUPPORTED_APPS = [
  "libreoffice",
  "msword",
  "pages",
  // "google-drive",
  // "onedrive",
] as const

export type App = typeof SUPPORTED_APPS[number]

export function isSupportedRenderer (input: string) {
  return !!SUPPORTED_APPS.find(app => app === input);
}

export type Renderer = {
  render: (inputDocxPath: string, outputDirectory: string) => Promise<void>;
  isSupported: () => Promise<boolean>;
};

export const renderers: Record<App, Renderer> = {
  "msword": mswordRender,
  "pages": pagesRender,
  "libreoffice": libreofficeRender,
  // "google-drive": googleDocsRender,
  // "onedrive": oneDriveRender,
};
