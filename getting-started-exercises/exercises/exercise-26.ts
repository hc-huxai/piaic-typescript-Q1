/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";

const Exercise26 = () => {
  let color: string[] = ["green", "yellow", "red"];

  let alien_color: string = color[Math.floor(Math.random() * 3)];

  if (alien_color == "green") {
    SpaceAround(() => {
      console.log(`You just earned 5 points for shooting the alien.`);
    });
  } else {
    SpaceAround(() => {
      console.log("10 Points!! You shot a rare alien.");
    });
  }
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise26();

export default Exercise26;
