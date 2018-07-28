import { getWorkspaces, Workspace } from "bolt";
import inquirer = require("inquirer");
import runWorkspacesSelectPrompt from "./workspaceSelect";

export enum ScopeType {
  ALL = "ALL",
  SELECT = "SELECT",
  PROJECT = "PROJECT"
}

export interface ProjectScope {
  kind: ScopeType.PROJECT;
}

export interface AllWorkspacesScope {
  kind: ScopeType.ALL;
  workspaces: Workspace[];
}

export interface SelectWorkspacesScope {
  kind: ScopeType.SELECT;
  workspaces: Workspace[];
}

export type Scope = ProjectScope | AllWorkspacesScope | SelectWorkspacesScope;

const ScopeChoices: Array<{ name: string; value: ScopeType }> = [
  {
    name: "Project package",
    value: ScopeType.PROJECT
  },
  {
    name: "All workspaces",
    value: ScopeType.ALL
  },
  {
    name: "Select workspaces",
    value: ScopeType.SELECT
  }
];

export interface ScopeSelectPromptOptions {
  /* Scopes for the user to choose from */
  scopeTypes?: ScopeType[];
}

export default async function runScopeSelectPrompt(
  options: ScopeSelectPromptOptions = {}
): Promise<Scope> {
  const scopeTypes = options.scopeTypes || Object.keys(ScopeType);
  const choices = ScopeChoices.filter(({ value }) =>
    scopeTypes.includes(value)
  );

  const selectedScopeType: ScopeType = (await inquirer.prompt([
    {
      name: "scope",
      type: "list",
      message: "Select scope",
      choices
    }
  ])).scope;

  switch (selectedScopeType) {
    case ScopeType.SELECT: {
      const workspaces = await runWorkspacesSelectPrompt();
      return {
        kind: selectedScopeType,
        workspaces
      };
    }
    case ScopeType.ALL:
      return {
        kind: selectedScopeType,
        workspaces: await getWorkspaces()
      };
    case ScopeType.PROJECT:
      return { kind: selectedScopeType };
  }
}
