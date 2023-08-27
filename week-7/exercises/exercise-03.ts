// Exercise 03: Given an array of numbers [1, 2, 3, 4, 5], use the map method to create a new array where each value is multiplied by 2.

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer } from "../../EOA-Functions/index";

const Exercise03 = (array: number[] = [1, 2, 3, 4, 5]) => {
  Spacer();
  console.log(`Initial Array => `, array);

  let numArr: number[] = array.map((num) => num * 2);

  Spacer(2);
  console.log(`New Array with values multiplied by 2 =>`);
  console.log(numArr);
  Spacer();
};

// TODO: Uncomment statement below to run function from this file
// Exercise03();

export default Exercise03;
