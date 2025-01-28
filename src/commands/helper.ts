import chalk from "chalk";
import { ReporterArg } from "src";
import { cwdRelative } from "src/paths";

export function reportFn(data: ReporterArg) {
  if (data.type === "rendering") {
    console.log(
      `🖼️  ${chalk.magenta(data.app)}/render: ${cwdRelative(data.inputPath)} → ${cwdRelative(data.outputPath)}`,
    );
  } else if (data.type === "flattening") {
    console.log(
      `🫓 ${chalk.magenta(data.app)}/flattening: ${cwdRelative(data.path)}`,
    );
  } else if (data.type === "generating") {
    console.log(
      `🔨 ${chalk.magenta(data.app)}/generating: ${cwdRelative(data.path)}`,
    );
  } else if (data.type === "writing") {
    console.log(`📥 writing: ${data.path}`);
  } else {
    console.log(JSON.stringify(data));
  }
}
