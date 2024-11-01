import * as excelRender from "./excel";
import * as googledocsRender from "./googledocs";
import * as keynoteRender from "./keynote";
import * as powerpointRender from "./powerpoint";
import * as libreofficeRender from "./libreoffice";
import * as mswordRender from "./msword";
import * as numbersRender from "./numbers";
import * as onedriveRender from "./onedrive";
import * as pagesRender from "./pages";
import { OfficeOpenXmlType } from "@ooxml-tools/file";

export const SUPPORTED_APPS = [
  "excel",
  "googledocs",
  "keynote",
  "powerpoint",
  "libreoffice",
  "msword",
  "numbers",
  "onedrive",
  "pages",
] as const;

export type App = (typeof SUPPORTED_APPS)[number];

export function isSupportedRenderer(input: string) {
  return !!SUPPORTED_APPS.find((app) => app === input);
}

export type Renderer = {
  render: (
    format: OfficeOpenXmlType,
    inputDocxPath: string,
    outputDirectory: string,
  ) => Promise<void>;
  isSupported: (format: OfficeOpenXmlType) => Promise<boolean>;
};

export const renderers: Record<App, Renderer> = {
  excel: excelRender,
  googledocs: googledocsRender,
  keynote: keynoteRender,
  powerpoint: powerpointRender,
  libreoffice: libreofficeRender,
  msword: mswordRender,
  numbers: numbersRender,
  onedrive: onedriveRender,
  pages: pagesRender,
};
