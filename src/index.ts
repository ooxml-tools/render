import { dirname, join } from "path";
import { cwdRelative, getCrossAppPath, getOutputPath } from "./paths";
import { App, renderers } from "./renderers";
import { mkdir, readdir, writeFile } from "fs/promises";
import { convertPages } from "./imagemagick";
import { getSupportedApps } from "./apps";

function sortPageFiles(a: string, b: string) {
  const aMatch = a.match(/page-(.*)\.png/);
  const bMatch = b.match(/page-(.*)\.png/);

  if (aMatch && bMatch && aMatch[1] && bMatch[1]) {
    const aNum = parseInt(aMatch[1]);
    const bNum = parseInt(bMatch[1]);
    return aNum - bNum;
  }
  return 0;
}

export async function generatePreview(dirpath: string) {
  const pageFiles = (await readdir(dirpath + "/images/"))
    .filter((n) => n.match(/page-.*\.png/))
    .sort(sortPageFiles);
  const imagesHtml = pageFiles
    .map((file) => {
      return `<img style="border: solid 1px #222222; max-width: 400px;" src="./images/${file}" />`;
    })
    .join("");
  const htmlFile = `<html><head></head><body style="padding: 12px; margin: 0;"><div style="display: flex; flex-direction: column; gap: 12px">${imagesHtml}</div></body></html>`;
  await writeFile(join(dirpath, "index.html"), htmlFile);
}

type ReporterArg =
  | { type: "rendering"; inputPath: string, outputPath: string; app: App }
  | { type: "flattening"; path: string; app: App }
  | { type: "generating"; path: string; app: App }
  | { type: "writing"; path: string; apps: App[] };
type ReporterFn = (data: ReporterArg) => void;

export async function render(
  docxpath: string,
  apps: App[],
  reportFn: ReporterFn,
) {
  const defaultApps = await getSupportedApps();

  const docxFilePath = join(process.cwd(), docxpath);

  for (const app of apps) {
    if (!defaultApps.includes(app)) {
      console.log({defaultApps, app, apps})
      throw new Error(`${app} not supported`);
    }
  }

  const outputFilePaths = [];
  for (const app of apps) {
    const pdfOutputPath = getOutputPath(docxFilePath, app);
    outputFilePaths.push(pdfOutputPath);
    await mkdir(dirname(pdfOutputPath), { recursive: true });

    reportFn({ type: `rendering`, app: app, inputPath: docxFilePath, outputPath: cwdRelative(pdfOutputPath) });
    await renderers[app].render(docxFilePath, pdfOutputPath);

    const pagesDirPath = join(dirname(pdfOutputPath), "images");
    await mkdir(pagesDirPath, { recursive: true });
    reportFn({
      type: "flattening",
      app: app,
      path: `${cwdRelative(pagesDirPath)}/*.png`,
    });
    await convertPages(pdfOutputPath, pagesDirPath);

    const indexDirPath = join(dirname(pdfOutputPath));
    reportFn({
      type: `generating`,
      app: app,
      path: `${cwdRelative(indexDirPath)}/index.html`,
    });
    await generatePreview(indexDirPath);
  }

  const basePath = getCrossAppPath(docxFilePath);

  const appDirs = (await readdir(basePath)).filter((appDir) => {
    return defaultApps.includes(appDir as App);
  });

  const sortByName = (fileNames: string[]) => {
    return [...fileNames].sort((a, b) => {
      const aMatch = a.match(/page-(\d+)/);
      const bMatch = b.match(/page-(\d+)/);
      if (aMatch && bMatch && aMatch[1] && bMatch[1]) {
        const aNum = parseInt(aMatch[1]);
        const bNum = parseInt(bMatch[1]);
        return aNum - bNum;
      }
      return 0;
    });
  };

  const sections = [];
  for await (const appDir of appDirs) {
    const imageFiles = await readdir(join(basePath, appDir, "images"));
    const imageElements = sortByName(imageFiles)
      .map((imageFile) => {
        const imagesPath = join(basePath, appDir, "images", imageFile);
        return `
                <img style="border: solid 1px #222222; max-width: 400px;" src="${imagesPath}" />
            `;
      })
      .join("");

    sections.push(`
            <div style="display: flex; flex-direction: column; gap: 12px;">
                <h2
                    style="
                        background: #222;
                        padding: 12px;
                        color: white;
                        margin: 0;
                        font-size: medium;
                        font-family: monospace;
                        font-weight: 400;
                    "
                >${appDir} (${imageFiles.length})</h2>
                ${imageElements}
            </div>
        `);
  }
  const html = `
        <body style="margin: 0;">
            <div
                style="
                    display: grid;
                    grid-template-columns: repeat(${appDirs.length}, 400px);
                    gap: 12px;
                    padding: 12px;
                "
            >
                ${sections.join("")}
            </div>
        </body>
    `;
  const outPath = join(basePath, "index.html");
  await writeFile(outPath, html);
  reportFn({
    type: `writing`,
    apps: appDirs as App[],
    path: cwdRelative(outPath),
  });
}
