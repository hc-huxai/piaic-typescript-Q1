/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/array";

const Exercise35 = () => {
  let animals: string[] = ["Dog", "Wolf", "Fox"];

  Spacer();

  for (let i = 0; i < animals.length; i++) {
    console.log(
      `${animals[i]}${
        animals[i].toLowerCase() == "dog" ? ": It would make a great pet" : ""
      }`
    );
    Spacer();
  }

  console.log(
    `Dogs, wolves, and foxes are all members of the canidae family,\nwhich means they are related to each other and share some features,\nsuch as having fur, four legs, a tail, and a keen sense of smell.`
  );

  Spacer();
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise35();

export default Exercise35;
