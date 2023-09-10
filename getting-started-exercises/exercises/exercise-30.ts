/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/string";

const Exercise30 = () => {
  let users: string[] = ["admin", "hamza", "yousuf", "Osman", "Abu Bakr"];

  const greeting = (name: string) => {
    if (name == "admin")
      console.log(
        `Hello ${name.toCapitalize()}, would you like to see a status report?`
      );
    else
      console.log(
        `Hello ${name.toCapitalize()}, thank you for logging in again.`
      );
  };

  users.forEach((user) => SpaceAround(() => greeting(user)));

  Spacer();

  Spacer();
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise30();

export default Exercise30;
