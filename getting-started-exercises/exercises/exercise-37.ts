/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/array";

const Exercise37 = () => {
  const make_shirt = (
    size: string = "Large",
    txt_msg: string = "I love TypeScript"
  ) => {
    SpaceAround(() => {
      console.log(
        `Shirt Details:\nSize : ${size} | Message on Front : ${txt_msg}`
      );
    });
  };

  make_shirt();
  make_shirt("Medium");
  make_shirt("Small", "HU x AI");
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise37();

export default Exercise37;
