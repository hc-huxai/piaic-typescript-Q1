/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/array";

const Exercise33 = () => {
  let nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const ordinalNumberPostfix = (num: number) => {
    if (num.toString()[num.toString().length - 1] == "1") {
      return "st";
    } else if (num.toString()[num.toString().length - 1] == "2") {
      return "nd";
    } else if (num.toString()[num.toString().length - 1] == "3") {
      return "rd";
    } else return "th";
  };

  nums.forEach((num) => {
    SpaceAround(() => {
      console.log(num + ordinalNumberPostfix(num));
    });
  });
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise33();

export default Exercise33;
