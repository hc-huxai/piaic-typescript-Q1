/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { Spacer } from "../../EOA-Functions";

const Exercise03 = () => {
  let pname: string = "Muhammad hamza";

  Spacer();

  // Initial
  console.log(`Name Unformatted => ${pname}`);
  Spacer();

  // Lowercase
  console.log(`Name in Lowercase => ${pname.toLowerCase()}`);
  Spacer();

  // Uppercase
  console.log(`Name in Uppercase => ${pname.toUpperCase()}`);
  Spacer();

  // Capitalized
  console.log(
    `Name Capitalized => ${pname
      .trim()
      .split(" ")
      .map((name) => name[0].toUpperCase() + name.substring(1).toLowerCase())
      .join(" ")}`
  );

  Spacer();
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise03();

export default Exercise03;
