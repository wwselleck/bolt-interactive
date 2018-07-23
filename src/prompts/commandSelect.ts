import { Workspace } from "bolt";
import inquirer = require("inquirer");
import runAddPrompt from "./commands/add";
import runRemovePrompt from "./commands/remove";
import runUpgradePrompt from "./commands/upgrade";
import Prompt from "./Prompt";

const CommandChoices = [
  {
    name: "Add dependencies",
    value: runAddPrompt
  },
  {
    name: "Remove dependencies",
    value: runRemovePrompt
  },
  {
    name: "Upgrade dependencies",
    value: runUpgradePrompt
  }
];

export default async function runCommandSelectPrompt() {
  const answers = await inquirer.prompt([
    {
      name: "command",
      type: "list",
      message: "Select command to run",
      choices: CommandChoices
    }
  ]);

  const command: Prompt = answers.command;
  command();
}
