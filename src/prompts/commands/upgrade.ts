import {
  getWorkspaces,
  projectUpgrade,
  Workspace,
  workspacesUpgrade
} from "bolt";
import inquirer = require("inquirer");
import { configDependencyType, toDependency } from "../../bolt";
import runPackagesInputPrompt from '../packagesInput';
import runScopeSelectPrompt, { ScopeType } from "../scopeSelect";

export default async function runUpgradePrompt() {
  const scope = await runScopeSelectPrompt({
    scopeTypes: [ScopeType.ALL, ScopeType.PROJECT]
  });
  const packagesInput = await runPackagesInputPrompt({
    message: 'What package(s) to upgrade?'
  });

  const packages: string[] = packagesInput.split(" ");
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
