// Develop a program that reads a list of grades and uses the splice method to remove failing grades (below 50) from the array.

// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer, getInput } from "../../EOA-Functions/index";

const Exercise05 = (array?: number[]) => {
  console.log(`Options:`);
  console.log(`1. Take Input Here`);
  console.log(`2. Use Pre-Defined Values`);

  let grades: number[] = [];

  let choice: number = +getInput("Choose Options (1-2) => ");

  // checks whether choice is 1 or 2, if not. It re-execute the statements
  while ([1, 2].indexOf(choice) == -1) {
    choice = +getInput("Please Choose Options (1-2) => ");
  }

  // Take Input Here
  if (choice == 1) {
    console.log(`Enter Integers separated by single space =>`);

    // Take user input as numbers separated by single space
    // splits it to form an array
    // pushing each item of that array to numArr array & converting item value to typeof Number
    getInput()
      .split(" ")
      .forEach((element: string) => {
        if (!isNaN(Number(element))) {
          grades.push(Number(element));
        }
      });

    // Uses while loop to detect empty input
    // it keeps prompting until non-empty input is found.
    while (grades.length == 0) {
      console.log(`Enter Integers separated by single space =>`);
      getInput()
        .split(" ")
        .forEach((element: string) => {
          if (!isNaN(Number(element))) {
            grades.push(Number(element));
          }
        });
    }
  } else {
    // generate ten random integers in values array
    grades = array!;
  }

  Spacer();

  console.log(`All Grades => `, grades);

  for (let i = 0; i < grades.length; i++) {
    if (grades[i] < 50) {
      grades.splice(i, 1);
      i--;
    }
  }

  console.log(`Passed Grades => `, grades);
};

// TODO: Uncomment statement below to run function from this file
// Exercise05([24, 57, 62, 49, 91]);

export default Exercise05;
