/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/string";

const Exercise42 = () => {
  let magicians: string[] = ["Magician A", "Magician B", "Magician C"];

  // const make_great = (magicians: string[]) => {
  //   magicians.forEach((magician) => (magician = "Great" + magician));
  // };

  // make_great(magicians);

  // console.log(magicians);

  const make_great = (magicians: string[]) => {
    return magicians.map((magician) => "Great " + magician);
  };

  magicians = make_great(magicians);

  SpaceAround(() => {
    console.log(magicians);
  });
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise42();

export default Exercise42;
