// Exercise 02: Write a program that uses filter to remove all negative numbers from an array of numbers.

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query
import { getInput } from "../../EOA-Functions/index";

const Exercise02 = (array?: number[]) => {
  console.log(`Options:`);
  console.log(`1. Take Input Here`);
  console.log(`2. Use Pre-Defined Values`);

  let numArr: number[] = [];

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
          numArr.push(Number(element));
        }
      });

    // Uses while loop to detect empty input
    // it keeps prompting until non-empty input is found.
    while (numArr.length == 0) {
      console.log(`Enter Integers separated by single space =>`);
      getInput()
        .split(" ")
        .forEach((element: string) => {
          if (!isNaN(Number(element))) {
            numArr.push(Number(element));
          }
        });
    }
  } else {
    // generate ten random integers in values array
    numArr = array!;
  }

  console.log(`Initial Array => `, numArr);

  numArr = numArr.filter((num) => {
    return num > 1;
  });

  console.log(`Array w/o Negative Numbers => `, numArr);
};

// TODO: Uncomment statement below to run function from this file
// Exercise02([22, 44, -55, -88, 11, 2, -5, -8, 200]);

export default Exercise02;
