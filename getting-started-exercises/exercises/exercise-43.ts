/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/string";

const Exercise43 = () => {
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

  const make_great = (magicians: string[]) => {
    return magicians.map((magician) => "Great " + magician);
  };

  let newArr_magicians = make_great(magicians);

  SpaceAround(() => {
    console.log(`Old Array =>`);
    show_magicians(magicians);
  });

  SpaceAround(() => {
    console.log(`New Array =>`);
    show_magicians(newArr_magicians);
  });

  Spacer();
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise43();

export default Exercise43;
