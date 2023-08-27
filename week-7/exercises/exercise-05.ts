// Exercise 05: Given an array of numbers [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], use the map and filter methods together to create a new array containing squares of even numbers.

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer } from "../../EOA-Functions/index";

const Exercise05 = (array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) => {
  Spacer();
  console.log(`Initial Array => `, array);

  let SqrdEvenNums: number[] = array
    .filter((num) => !(num % 2))
    .map((num) => num ** 2);

  Spacer(2);
  console.log(`New Array with squared value of even numbers =>`);
  console.log(SqrdEvenNums);
  Spacer();
};

// TODO: Uncomment statement below to run function from this file
// Exercise05();

export default Exercise05;
