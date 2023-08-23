// Write a program that defines a function to calculate the area of a circle. The function should take the radius as input and return the calculated area.

// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer, getInput } from "../../EOA-Functions/index";

const Exercise04 = () => {
  console.log(`Enter Radius to calculate area of circle =>`);
  let radius: number = +getInput();

  while (!isNaN(radius) && radius < 0) {
    console.log(`Enter Valid Value =>`);
    radius = +getInput();
  }

  let area: number = Number((Math.PI * radius * radius).toFixed(2));

  Spacer();

  console.log(`Area of Circle with radius ${radius} =>`, area);
};

// TODO: Uncomment statement below to run function from this file
// Exercise04();

export default Exercise04;
