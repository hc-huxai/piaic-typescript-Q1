/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";

const Exercise23 = () => {
  let tasks: Array<{ task: string; status: boolean }> = [
    { task: "Buy a laptop", status: false },
    { task: "Learn Weekly Assignments", status: true },
    { task: "Complete Advanced TypeScript Projects", status: false },
    { task: "Learn Flutter", status: false },
    { task: "Build an Expense Tracker", status: true },
    { task: "Create a UI Toolkit", status: false },
    { task: "Get 8 hours of sleep", status: false },
    { task: "Setup C++ on Laptop", status: true },
    { task: "Setup Flutter Development for Windows", status: true },
    { task: "Do Tasks Above", status: false },
  ];

  const conditions = (
    taskObj: { task: string; status: boolean },
    index: number
  ) => {
    console.log(
      `${index + 1}: ${taskObj.task} | Status: ${
        taskObj.status ? "Completed" : "Pending"
      }`
    );
  };
  Spacer();
  tasks.forEach((task, index) => SpaceAround(() => conditions(task, index), 0));
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise23();

export default Exercise23;
