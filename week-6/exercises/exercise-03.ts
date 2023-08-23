// Exercise 03: Implement a program that uses a loop to iterate through an array of numbers and remove all the even numbers from them and just leave the odd ones.

// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query
import { getInput } from "../../EOA-Functions/index";

const Exercise03 = (array?: number[]) => {
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

  for (let i = 0; i < numArr.length; i++) {
    if (numArr[i] % 2 == 0) {
      numArr.splice(i, 1);
      i--;
    }
  }

  console.log(`Array w/o Even Numbers => `, numArr);
};

// TODO: Uncomment statement below to run function from this file
// Exercise03([22, 44, -55, -88, 11, 2, -5, -8, 200]);

export default Exercise03;
