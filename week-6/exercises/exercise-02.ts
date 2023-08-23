// Exercise 02: Implement a program that uses for loop to iterate through an array of numbers and print only the even numbers.

// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer, getInput } from "../../EOA-Functions/index";

const Exercise02 = (array?: number[]) => {
  // Display options
  console.log(`Options => `);
  console.log(`1 - Take Input Here`);
  console.log(`2 - Use Pre-Defined Values`);

  Spacer();

  // any datatype is used because getInput returns a string that, in the next statement will convert to number using Number()
  let choice: any = +getInput("Enter a choice => ");
  let numArr: number[] = [];

  // It checks whether choice is empty or out of range
  while (choice == "" || choice < 1 || choice > 2) {
    choice = +getInput("Please Enter Valid Choice => ");
  }

  // Choice: Taker User Input
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
    // Choice: Maker User Input

    numArr = array!;
  }

  console.log(`Initial Array =>`);
  console.log(numArr);

  Spacer();
  console.log(`Even Numbers:`);

  for (let i = 0; i < numArr.length; i++) {
    if (numArr[i] % 2 == 0) {
      console.log(numArr[i]);
    }
  }
};

// TODO: Uncomment statement below to run function from this file
// Exercise02([22, 44, -55, -88, 11, 2, -5, -8, 200]);

export default Exercise02;
