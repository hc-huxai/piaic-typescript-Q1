/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/string";

const Exercise44 = () => {
  const make_sandwich = (items: (string | number)[]) => {
    let sandwich = items.join("\n");

    SpaceAround(() => {
      console.log(`Summary of your order => `);
      console.log(sandwich);
    });
  };

  make_sandwich(["chicken", "cheese", "fries", "mayo"]);
  make_sandwich(["chicken", "cheese", "fries", "mayo", "ketchup"]);
  make_sandwich([
    "chicken",
    "cheese",
    "fries",
    "mayo",
    "ketchup",
    "an extra slice of cheese, maybe",
  ]);
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise44();

export default Exercise44;
