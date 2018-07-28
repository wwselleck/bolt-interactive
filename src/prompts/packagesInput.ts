import inquirer = require("inquirer");

export interface RunPackagesInputPromptOptions {
  message: string;
}

export default async function runPackagesInputPrompt({
  message
}: RunPackagesInputPromptOptions): Promise<string> {
  const answers = await inquirer.prompt([
    {
      name: "packages",
      type: "input",
      message,
      validate: (input: string) => {
        return input !== "" || "Please enter at least one package";
      }
    }
  ]);
  return answers.packages;
}
