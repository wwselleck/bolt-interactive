import { getWorkspaces, Workspace } from "bolt";
import fuzzy = require("fuzzy");
import inquirer = require("inquirer");
import inquirerCheckboxPlusPrompt = require("inquirer-checkbox-plus-prompt");

inquirer.registerPrompt("checkbox-plus", inquirerCheckboxPlusPrompt);

export default async function runWorkspacesSelectPrompt(): Promise<
  Workspace[]
> {
  const workspaces = await getWorkspaces();

  const choices = workspaces.map(w => ({
    name: w.name,
    value: w
  }));
  const answers = await inquirer.prompt([
    {
      type: "checkbox-plus",
      name: "workspaces",
      message: "Select workspaces",
      searchable: true,
      async source(_, input = "") {
        input = input || "";
        const results = fuzzy
          .filter(input, choices, {
            extract: (c: any) => c.name
          })
          .map(e => e.original);
        return results;
      },
      validate: (answer) => {
        return answer.length !== 0 || 'Please select at least one workspace';
      },
    }
  ]);
  return answers.workspaces;
}
