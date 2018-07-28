import { getProject, projectRun, Workspace, workspacesRun } from "bolt";
import inquirer = require("inquirer");
import runScopeSelectPrompt, { Scope, ScopeType } from "../scopeSelect";

function getScriptsIntersection(workspaces: Workspace[]): string[] {
  const workspacesCopy = [...workspaces];
  const firstWorkspace = workspacesCopy.shift();
  let initial: string[] = Object.keys(firstWorkspace.config.scripts);
  return workspacesCopy.reduce((acc, workspace) => {
    return acc.filter(script =>
      workspace.config.scripts.hasOwnProperty(script)
    );
  }, initial);
}

async function getScriptsFromScope(scope: Scope): Promise<string[]> {
  if (scope.kind === ScopeType.PROJECT) {
    return Object.keys((await getProject()).config.scripts);
  } else if (scope.kind === ScopeType.SELECT || scope.kind === ScopeType.ALL) {
    return Promise.resolve(getScriptsIntersection(scope.workspaces));
  }
}

function getErrorMessageFromScope(scope: Scope): string {
  if (scope.kind === ScopeType.ALL || scope.kind === ScopeType.SELECT) {
    return `Workspaces ${scope.workspaces
      .map(w => w.name)
      .join(", ")} do not have any shared scripts`;
  } else {
    return `Project does not have any scripts`;
  }
}

export default async function runScriptRunPrompt(): Promise<void> {
  const scope = await runScopeSelectPrompt();
  const scripts = await getScriptsFromScope(scope);

  if (scripts.length === 0) {
    throw new Error(getErrorMessageFromScope(scope));
  }

  let choices = scripts.map(k => ({
    name: k,
    value: k
  }));

  const script = (await inquirer.prompt([
    {
      name: "script",
      type: "list",
      message: "Select script to run",
      choices
    }
  ])).script;

  if (scope.kind === ScopeType.PROJECT) {
    projectRun({
      script,
      scriptArgs: []
    });
  } else if (scope.kind === ScopeType.ALL || scope.kind === ScopeType.SELECT) {
    // the trailing comma in the glob is important for some reason
    let glob = `{${scope.workspaces.map(w => w.name).join(",")},}`;
    workspacesRun({
      script,
      scriptArgs: [],
      filterOpts: {
        only: glob
      }
    });
  }
}
