/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/string";

const Exercise41 = () => {
  let magicians: string[] = ["Magician A", "Magician B", "Magician C"];

  Spacer();

  const show_magicians = (magicians: string[]) => {
    magicians.forEach((magician) =>
      SpaceAround(
        () => {
          console.log(magician);
        },
        0,
        1
      )
    );
  };

  show_magicians(magicians);
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise41();

export default Exercise41;
