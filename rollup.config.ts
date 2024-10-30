import typescript from "@rollup/plugin-typescript";
import { typescriptPaths } from "rollup-plugin-typescript-paths";
import dts from "rollup-plugin-dts";
import { join } from "path";

const outputDir = join(import.meta.dirname, "/dist/npm/");

export default [
  {
    input: {
      index: "src/index.ts",
      "bin/ooxml-render": "bin/ooxml-render.ts",
      command: "src/command.ts",
    },
    output: {
      dir: outputDir,
      format: "es",
    },
    external: ["yargs/yargs", "yargs/helpers", "fs/promises"],
    plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  },
  {
    input: "src/index.ts",
    output: [{ file: `${outputDir}/types.d.ts`, format: "es" }],
    plugins: [typescriptPaths({ preserveExtensions: true }), dts()],
  },
  {
    input: "src/command.ts",
    output: [{ file: `${outputDir}/command.d.ts`, format: "es" }],
    plugins: [typescriptPaths({ preserveExtensions: true }), dts()],
  },
];
