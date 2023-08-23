// Exercise 01: Develop a program that calculates and prints the sum of the first n numbers using for loop.

// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer, getInput } from "../../EOA-Functions/index";

const Exercise01 = () => {
  let number: number = +getInput("Enter an integer => ");
  let isInt = false;
  while (!isInt) {
    if (Number.isInteger(number)) {
      isInt = true;
    } else {
      number = getInput("Enter an integer => ");
    }
  }

  let sum: number = 0;

  for (
    let i = 0;
    number > 0 ? i <= number : i >= number;
    number > 0 ? i++ : i--
  ) {
    if (i % 2 == 0) sum += i;
  }

  Spacer();

  console.log(
    `Sum of Even Numbers between ${number < 0 ? number : 0} and ${
      number > 0 ? number : 0
    } =>`
  );
  console.log(sum);
};

// TODO: Uncomment statement below to run function from this file
// Exercise01();

export default Exercise01;
