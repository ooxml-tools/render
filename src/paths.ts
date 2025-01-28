import { basename, resolve, join, relative } from "path";
import { App } from "./renderers";

export function getOutputPath(
  filePath: string,
  app: App,
  outPath = process.cwd(),
) {
  const filename = basename(filePath);
  const { platform } = process;
  if (!["darwin", "win32", "linux"].includes(platform)) {
    throw new Error(`Invalid platform '${platform}'`);
  }

  return resolve(
    join(
      outPath ?? process.cwd(),
      `/docx-files/`,
      filename,
      platform,
      app,
      `output.pdf`,
    ),
  );
}

export function getCrossAppPath(filePath: string) {
  const filename = basename(filePath);
  const { platform } = process;
  if (!["darwin", "win32", "linux"].includes(platform)) {
    throw new Error(`Invalid platform '${platform}'`);
  }

  return resolve(join(process.cwd(), `/docx-files/`, filename, platform));
}

export function getFilePath(filePath: string) {
  const filename = basename(filePath);
  const { platform } = process;
  if (!["darwin", "win32", "linux"].includes(platform)) {
    throw new Error(`Invalid platform '${platform}'`);
  }

  return resolve(join(process.cwd(), `/docx-files/`, filename, platform));
}

export function getBaseOutputPath() {
  return resolve(join(process.cwd(), `/docx-files/`));
}

export function cwdRelative(filepath: string) {
  return "./" + relative(process.cwd(), filepath);
}
