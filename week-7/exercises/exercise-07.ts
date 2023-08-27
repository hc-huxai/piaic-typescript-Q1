// Exercise 07: Given an array of numbers [3, 6, 9, 12, 15, 18], use the map and filter methods together to create a new array containing the doubled values of odd numbers.

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer } from "../../EOA-Functions/index";

const Exercise07 = (array: number[] = [3, 6, 9, 12, 15, 18]) => {
  Spacer();
  console.log(`Initial Array => `, array);

  let doubledOddNums: number[] = array
    .filter((num) => num % 2)
    .map((num) => num * 2);

  Spacer(2);
  console.log(`New Array with Doubled Values of Odd Numbers =>`);
  console.log(doubledOddNums);
  Spacer();
};

// TODO: Uncomment statement below to run function from this file
// Exercise07();

export default Exercise07;
