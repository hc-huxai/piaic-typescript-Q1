/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround } from "../../EOA-Functions";

const Exercise25 = () => {
  let color: string[] = ["green", "yellow", "red"];

  let alien_color: string = color[Math.floor(Math.random() * 3)];

  if (alien_color == "green") {
    SpaceAround(() => console.log(`You just earned 5 points.`));
  } else {
  }
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise25();

export default Exercise25;
