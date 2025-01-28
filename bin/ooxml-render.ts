#!/usr/bin/env ./node_modules/.bin/tsx
import yargs from "yargs/yargs";
import * as render from "../src/commands/render";
import * as supported from "../src/commands/support";
import { version } from "../package.json";

const scriptName = "ooxml-render";

yargs(process.argv.slice(2))
  .usage(`${scriptName} <command> [args]`)
  // HACK to remove script-name from commands
  .scriptName("")
  .command(render.cmd, render.desc, render.builder, render.handler)
  .command(supported.cmd, supported.desc, supported.builder, supported.handler)
  .version(version)
  .help()
  .demand(1).argv;
