import { FORMATS, OfficeOpenXmlType } from "@ooxml-tools/file";
import { mkdir, rename, rmdir } from "fs/promises";
import { openApp } from "open";
import { basename, dirname, extname, join } from "path";

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
  await openApp("/Applications/LibreOffice.app/Contents/MacOS/soffice", {
    arguments: [
      `--convert-to`,
      `pdf:writer_pdf_Export`,
      inputPath,
      `--outdir`,
      tmpExportDirPath,
    ],
    wait: true,
  });
  await rename(tmpExportFilePath, outputPath);
  await rmdir(tmpExportDirPath);
}

export async function isSupported(format: OfficeOpenXmlType) {
  return FORMATS.includes(format);
}
