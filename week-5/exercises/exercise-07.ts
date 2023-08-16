import { Spacer } from "../../EOA-Functions";

// Create a function to input a positive number and calculates its factorial.
const Exercise07 = () => {
  let getInput = require("prompt-sync")({ sigint: true });
  let number = getInput("Enter number for calculating factorial => ");
  let factorial: number = 1;
  while (number < 1) {
    Spacer();
    console.log(`The number is negative.`);
    number = getInput("Please Enter a Positive Number => ");
  }
  number = Number(number);
  console.log(`Given Number: ${number}`);

  while (number >= 1) {
    factorial *= number;
    number--;
  }
  console.log(`Factorial: ${factorial}`);
};

export default Exercise07;
