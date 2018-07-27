import {
  getProject,
  getWorkspaces,
  PackageJSON,
  projectAdd,
  Workspace,
  workspaceAdd
} from "bolt";
import inquirer = require("inquirer");
import { configDependencyType, toDependency } from "../../bolt";
import runScopeSelectPrompt, { Scope, ScopeType } from "../scopeSelect";

async function getScriptsFromScope(scope: Scope): Promise<PackageJSON.Scripts> {
  if (scope.workspaces) {
    return (await getProject()).config.scripts;
  }
}

export default async function runScriptRunPrompt() {
  const scope = await runScopeSelectPrompt();
  console.log(await getScriptsFromScope(scope));
}
