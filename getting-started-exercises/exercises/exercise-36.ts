/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/array";

const Exercise36 = () => {
  let animals: string[] = ["Dog", "Wolf", "Fox"];

  Spacer();

  const make_shirt = (size: string, txt_msg: string) => {
    console.log(
      `Shirt Details:\nSize : ${size} | Message on Front : ${txt_msg}`
    );
  };

  make_shirt("S", "HU x AI");

  Spacer();
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise36();

export default Exercise36;
