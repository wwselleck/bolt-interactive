import {
  getProject,
  PackageJSON,
  projectRun,
  Workspace,
  workspacesRun
} from "bolt";
import inquirer = require("inquirer");
import runScopeSelectPrompt, { Scope, ScopeType } from "../scopeSelect";

function getScriptsIntersection(workspaces: Workspace[]): PackageJSON.Scripts {
  const workspacesCopy = [...workspaces];
  const firstWorkspace = workspacesCopy.shift();
  return Object.entries(firstWorkspace.config.scripts).reduce((acc, [k, v]) => {
    let isInAllWorkspaces = workspaces.every(w => {
      return w.config.scripts.hasOwnProperty(k);
    })
    if(isInAllWorkspaces) {
      acc[k] = v;
    }
    return acc;
  }, {} as PackageJSON.Scripts);
}

async function getScriptsFromScope(scope: Scope): Promise<PackageJSON.Scripts> {
  if(scope.kind === ScopeType.PROJECT) {
    return (await getProject()).config.scripts;
  } else if(scope.kind === ScopeType.SELECT || scope.kind === ScopeType.ALL) {
    return Promise.resolve(getScriptsIntersection(scope.workspaces));
  }
}

function getErrorMessageFromScope(scope: Scope): string {
  if(scope.kind === ScopeType.ALL || scope.kind === ScopeType.SELECT) {
    return `Workspaces ${scope.workspaces.map(w => w.name).join(', ')} do not have any shared scripts`;
  } else {
    return `Project does not have any scripts`;
  }
}

export default async function runScriptRunPrompt(): Promise<void> {
  const scope = await runScopeSelectPrompt();
  const scripts = await getScriptsFromScope(scope);

  if(Object.keys(scripts).length === 0) {
    throw new Error(getErrorMessageFromScope(scope))
  }

  let choices = Object.keys(scripts).map(k => ({
      name: k,
      value: k
  }));

  const script = (await inquirer.prompt([
    {
      name: 'script',
      type: 'list',
      message: 'Select script to run',
      choices
    }
  ])).script;

  if(scope.kind === ScopeType.PROJECT) {
    projectRun({
      script,
      scriptArgs: [],
    })
  } else if(scope.kind === ScopeType.ALL || scope.kind === ScopeType.SELECT) {
    // the trailing comma in the glob is important for some reason
    let glob = `{${scope.workspaces.map(w => w.name).join(",")},}`
    workspacesRun({
      script,
      scriptArgs: [],
      filterOpts: {
        only: glob
      }
    })
  }
}
