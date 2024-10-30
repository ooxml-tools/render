import { $ } from "execa";
import tempfile from "tempfile";
import { writeFile } from "fs/promises";

const COMPOSE_FILE = `services:
  convert:
    build:
      dockerfile_inline: |
        FROM ubuntu
        ENV DEBIAN_FRONTEND noninteractive

        RUN apt-get update && apt-get -y install imagemagick

        ENTRYPOINT ["convert"]
    volumes:
      - ${process.cwd()}/docx-files:/volumes/output
`;

export async function convertPages(inputPath: string, outputDirPath: string) {
  const composeFilePath = tempfile();
  await writeFile(composeFilePath, COMPOSE_FILE);
  await $`docker-compose -f ${composeFilePath} run --volume ${inputPath}:/tmp/input.pdf --volume ${outputDirPath}:/tmp/ouput convert -density 150 -units PixelsPerInch /tmp/input.pdf /tmp/ouput/page-%0d.png`;
}
