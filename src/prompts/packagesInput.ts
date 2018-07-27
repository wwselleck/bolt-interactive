import inquirer = require("inquirer");

export default async function runPackagesInputPrompt({ message }) : Promise<string> {
  const answers = await inquirer.prompt([
    {
      name: "packages",
      type: "input",
      message,
      validate: input => {
        return input !== "" || "Please enter at least one package";
      }
    }
  ]);
  return answers.packages;
}
