import { $ } from "execa";
import { join } from "path";

export async function convertPages(inputPath: string, outputDirPath: string) {
  const composeFilePath = join(import.meta.dirname, "./compose.yaml");
  await $`docker-compose -f ${composeFilePath} run --volume ${inputPath}:/tmp/input.pdf --volume ${outputDirPath}:/tmp/ouput convert -density 150 -units PixelsPerInch /tmp/input.pdf /tmp/ouput/page-%0d.png`;
}
