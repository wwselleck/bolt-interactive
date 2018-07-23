import {
  getWorkspaces,
  projectUpgrade,
  Workspace,
  workspacesUpgrade
} from "bolt";
import inquirer = require("inquirer");
import { configDependencyType, toDependency } from "../../bolt";
import runScopeSelectPrompt, { ScopeType } from "../scopeSelect";

export default async function runUpgradePrompt() {
  const scope = await runScopeSelectPrompt({
    scopeTypes: [ScopeType.ALL, ScopeType.PROJECT]
  });
  const answers = await inquirer.prompt([
    {
      name: "packages",
      type: "input",
      message: "What package(s) to upgrade?",
      validate: input => {
        return input !== "" || "Please enter at least one package";
      }
    }
  ]);

  const packages: string[] = answers.packages.split(" ");
  if (scope.type === ScopeType.PROJECT) {
    await projectUpgrade({
      deps: packages.map(toDependency),
      flags: []
    });
  } else if (scope.type === ScopeType.ALL) {
    await workspacesUpgrade({
      deps: packages,
      filterOpts: [],
      flags: {}
    });
  }
}
