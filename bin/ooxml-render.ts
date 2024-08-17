import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
import * as command from "../src/command"


yargs(hideBin(process.argv))
  .command(command.cmd, command.desc, command.builder, command.handler)
  .argv
