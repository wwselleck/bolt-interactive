import { getWorkspaces, projectAdd, Workspace, workspaceAdd } from "bolt";
import inquirer = require("inquirer");
import { configDependencyType, toDependency } from "../../bolt";
import runScopeSelectPrompt, { ScopeType } from "../scopeSelect";

const TypeChoices = Object.keys(configDependencyType).map(
  k => configDependencyType[k]
);

export default async function runAddPrompt() {
  const scope = await runScopeSelectPrompt();
  const answers = await inquirer.prompt([
    {
      name: "packages",
      type: "input",
      message: "What package(s) to install?",
      validate: input => {
        return input !== "" || "Please enter at least one package";
      }
    },
    {
      name: "type",
      type: "list",
      choices: TypeChoices
    }
  ]);

  const packages = answers.packages.split(" ");

  if (scope.type === ScopeType.PROJECT) {
    await projectAdd({
      deps: packages.map(toDependency),
      type: answers.type
    });
  } else if (scope.type === ScopeType.ALL) {
    // bolt ws add isn't implemented yet, do bolt w for each workspace
    const workspaces = await getWorkspaces();
    for (const w of workspaces) {
      await workspaceAdd({
        pkgName: w.name,
        deps: packages.map(toDependency),
        type: answers.type
      });
    }
  } else if (scope.type === ScopeType.SELECT) {
    for (const w of scope.workspaces) {
      await workspaceAdd({
        pkgName: w.name,
        deps: packages.map(toDependency),
        type: answers.type
      });
    }
  }
}
