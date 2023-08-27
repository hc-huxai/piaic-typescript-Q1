// Exercise 08: Given an array of names ["Alice", "Bob", "Charlie", "David", "Emily"], use the forEach method to log each name with an exclamation mark at the end, e.g., "Alice!".

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer } from "../../EOA-Functions/index";

const Exercise08 = (
  array: string[] = ["Alice", "Bob", "Charlie", "David", "Emily"]
) => {
  Spacer();
  console.log(`Array =>`, array);
  Spacer();

  console.log(`Names with '!' =>`);
  array.forEach((name) => console.log(`${name}!`));
};

// TODO: Uncomment statement below to run function from this file
// Exercise08();

export default Exercise08;
