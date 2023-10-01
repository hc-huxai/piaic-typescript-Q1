import inquirer from "inquirer";

const standard = async (values: { message: string; type?: string }) => {
  const answer = await inquirer.prompt([
    {
      name: "input",
      message: values.message,
      type: values.type ?? "input",
    },
  ]);

  return answer.input;
};

const Inquirer = {
  standard: standard,
};
