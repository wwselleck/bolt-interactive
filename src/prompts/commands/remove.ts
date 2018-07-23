import {
  projectRemove,
  Workspace,
  workspaceRemove,
  workspacesRemove
} from "bolt";
import inquirer = require("inquirer");
import { configDependencyType, toDependency } from "../../bolt";
import runScopeSelectPrompt, { ScopeType } from "../scopeSelect";

export default async function runRemovePrompt() {
  const scope = await runScopeSelectPrompt();
  const answers = await inquirer.prompt([
    {
      name: "packages",
      type: "input",
      message: "What package(s) to remove?"
    }
  ]);
  const packages = answers.packages.split(" ");

  if (scope.type === ScopeType.PROJECT) {
    await projectRemove({
      deps: packages
    });
  } else if (scope.type === ScopeType.ALL) {
    await workspacesRemove({
      deps: packages,
      filterOpts: {}
    });
  } else if (scope.type === ScopeType.SELECT) {
    for (const w of scope.workspaces) {
      await workspaceRemove({
        pkgName: w.name,
        deps: packages
      });
    }
  }
}
