/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/string";

const Exercise38 = () => {
  const describe_city = (city: string, country: string = "Pakistan") => {
    SpaceAround(() => {
      console.log(`${city.toCapitalize()} is in ${country.toCapitalize()}`);
    });
  };

  describe_city("karachi");
  describe_city("faisalabad");
  describe_city("istanbul", "Turkiye");
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise38();

export default Exercise38;
