import { getWorkspaces, projectAdd, workspaceAdd } from "bolt";
import inquirer = require("inquirer");
import { configDependencyType, toDependency } from "../../bolt";
import runPackagesInputPrompt from "../packagesInput";
import runScopeSelectPrompt, { ScopeType } from "../scopeSelect";

const TypeChoices = Object.values(configDependencyType);

export default async function runAddPrompt() {
  const scope = await runScopeSelectPrompt();
  const packagesInput = await runPackagesInputPrompt({
    message: "What package(s) to install?"
  });
  const depType = (await inquirer.prompt([
    {
      name: "depType",
      type: "list",
      choices: TypeChoices
    }
  ])).depType;

  const packages = packagesInput.split(" ");

  if (scope.kind === ScopeType.PROJECT) {
    await projectAdd({
      deps: packages.map(toDependency),
      type: depType
    });
  } else if (scope.kind === ScopeType.ALL) {
    // bolt ws add isn't implemented yet, do bolt w for each workspace
    const workspaces = await getWorkspaces();
    for (const w of workspaces) {
      await workspaceAdd({
        pkgName: w.name,
        deps: packages.map(toDependency),
        type: depType
      });
    }
  } else if (scope.kind === ScopeType.SELECT) {
    for (const w of scope.workspaces) {
      await workspaceAdd({
        pkgName: w.name,
        deps: packages.map(toDependency),
        type: depType
      });
    }
  }
}
