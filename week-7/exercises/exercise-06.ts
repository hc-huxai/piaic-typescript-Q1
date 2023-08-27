// Exercise 06: Given an array of temperature in Celsius, [0, 10, 20, 30, 40], use the map method to create a new array where each temperature is converted to Fahrenheit using the formula (Celsius * 9/5) + 32

// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
import { Spacer } from "../../EOA-Functions/index";

const Exercise06 = (array: number[] = [0, 10, 20, 30, 40]) => {
  Spacer();
  console.log(`Temperatures in °C => `, array);

  let TempF: number[] = array.map((temp) =>
    Number((temp * (9 / 5) + 32).toFixed(2))
  );

  Spacer(2);
  console.log(`Temperatures in °F =>`, TempF);
  Spacer();
};

// TODO: Uncomment statement below to run function from this file
// Exercise06();

export default Exercise06;
