/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/array";

const Exercise32 = () => {
  let current_users = ["admin", "hamza", "yousuf", "Osman", "Abu Bakr"];

  current_users = current_users.toLowerCase();

  let new_users = ["HC", "Ibrahim", "Hamza", "YOUSUF", "Essa"];

  const checkUserAvailability = (name: string) => {
    if (!current_users.includes(name.toLowerCase()))
      console.log(`The username (${name}) is available.`);
    else
      console.log(
        `The username (${name}) is already in use. Please choose another username.`
      );
  };

  new_users.forEach((user) => SpaceAround(() => checkUserAvailability(user)));
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise32();

export default Exercise32;
