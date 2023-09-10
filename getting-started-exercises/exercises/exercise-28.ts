/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { Spacer } from "../../EOA-Functions";

const Exercise28 = () => {
  let person_age: number = Math.floor(Math.random() * 80) + 1;

  let person_category: string;

  if (person_age < 2) person_category = "baby";
  else if (person_age >= 2 && person_age < 4) person_category = "toddler";
  else if (person_age >= 4 && person_age < 13) person_category = "kid";
  else if (person_age >= 13 && person_age < 20) person_category = "teenager";
  else if (person_age >= 20 && person_age < 65) person_category = "adult";
  else person_category = "elder";

  Spacer();

  console.log(`Person's Age =>`, person_age);
  console.log(
    `The person is ${
      ["a", "e", "i", "o", "u"].indexOf(person_category[0]) != -1 ? "an" : "a"
    } ${person_category}`
  );

  Spacer();
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise28();

export default Exercise28;
