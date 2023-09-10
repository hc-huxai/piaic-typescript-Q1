/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { Spacer } from "../../EOA-Functions";

const Exercise29 = () => {
  let fruits = ["Mango", "Banana", "Orange"];

  // Converts every fruit name to lowercase to improve test results
  fruits = fruits.join(" ").toLowerCase().split(" ");

  Spacer();

  if (fruits.includes("Apple".toLowerCase())) {
    console.log("Apple");
    console.log("That's great.");
    console.log(`As the saying goes, "An apple a day keeps a doctor away".`);
  } else if (fruits.includes("Oranges".toLowerCase())) {
    console.log("Orange");
    console.log(`Careful! Some can get you a sour throat`);
  } else if (fruits.includes("Grapefruit".toLowerCase())) {
    console.log(`Grapefruit`);
    console.log(
      `It may help prevent diabetes.\nAnd a research shows people who eats grapefruits loses an average of 2.5 pounds over the time of 12 weeks.\nIf it's false, don't turn against me. This is what I read on Internet.`
    );
  } else if (fruits.includes("PineApple".toLowerCase())) {
    console.log(`Pineapple`);
    console.log(
      `It contains antioxidant named Manganese, which helps support metabolism and also helps regulates blood sugar.`
    );
  } else {
    console.log(
      "Each fruit, on the other hand, has its unique set of advantages."
    );
  }

  Spacer();
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise29();

export default Exercise29;
