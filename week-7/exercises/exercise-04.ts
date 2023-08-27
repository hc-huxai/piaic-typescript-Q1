// Exercise 04: Given an array of strings ["apple", "banana", "cherry", "date", "grape"], use the filter method to create a new array containing only the fruits with more than 5 characters.

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer } from "../../EOA-Functions/index";

const Exercise04 = (
  array: string[] = ["apple", "banana", "cherry", "date", "grape"]
) => {
  Spacer();
  console.log(`Initial Array => `, array);

  let lengthFilter: string[] = array.filter((word) => word.length > 5);

  Spacer(2);
  console.log(`New Array with strings of length > 5 =>`);
  console.log(lengthFilter);
  Spacer();
};

// TODO: Uncomment statement below to run function from this file
// Exercise04();

export default Exercise04;
