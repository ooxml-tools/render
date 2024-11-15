import { $ } from "execa";
import { FORMATS, OfficeOpenXmlType } from "@ooxml-tools/file";
import { mkdir, rename, rmdir } from "fs/promises";
import { openApp } from "open";
import { basename, dirname, extname, join } from "path";
import { platform } from "node:process";

async function convert(inputPath: string, exportDirPath: string) {
  if (platform === "win32") {
    await openApp("C:Program Files (x86)LibreOffice 5programsoffice.exe", {
      arguments: [
        `-headless`,
        `-convert-to`,
        `pdf:writer_pdf_Export`,
        inputPath,
        `-outdir`,
        exportDirPath,
      ],
      wait: true,
    });
  } else if (platform === "darwin") {
    await openApp("/Applications/LibreOffice.app/Contents/MacOS/soffice", {
      arguments: [
        `-headless`,
        `--convert-to`,
        `pdf:writer_pdf_Export`,
        inputPath,
        `--outdir`,
        exportDirPath,
      ],
      wait: true,
    });
  } else if (platform === "linux") {
    await openApp("soffice", {
      arguments: [
        `-headless`,
        `--convert-to`,
        `pdf:writer_pdf_Export`,
        inputPath,
        `--outdir`,
        exportDirPath,
      ],
      wait: true,
    });
  } else {
    throw new Error(`Not supported ${platform}`);
  }
}

export async function render(
  _format: OfficeOpenXmlType,
  inputPath: string,
  outputPath: string,
) {
  const dirpath = dirname(outputPath);
  const tmpExportDirPath = join(dirpath, "tmp");
  const tmpExportFilePath = join(
    tmpExportDirPath,
    basename(inputPath, extname(inputPath)) + ".pdf",
  );

  await mkdir(tmpExportDirPath, { recursive: true });
  await convert(inputPath, tmpExportDirPath);
  await rename(tmpExportFilePath, outputPath);
  await rmdir(tmpExportDirPath);
}

export async function isSupported(format: OfficeOpenXmlType) {
  console.log("FORMATS.includes(format)=", FORMATS.includes(format));
  if (!FORMATS.includes(format)) {
    return false;
  }

  console.log("platform=", platform);
  if (platform === "win32") {
    const rslt =
      await $`where C:\\Program Files (x86)\\LibreOffice 5\\program\\soffice.exe`;
    return rslt.exitCode === 0;
  } else if (platform === "darwin") {
    const rslt =
      await $`command -v /Applications/LibreOffice.app/Contents/MacOS/soffice`;
    return rslt.exitCode === 0;
  } else if (platform === "linux") {
    const rslt = await $`which libreoffice`;
    return rslt.exitCode === 0;
  } else {
    return false;
  }
}
