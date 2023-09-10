/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/string";

const Exercise39 = () => {
  const city_country = (city: string, country: string = "Pakistan") => {
    SpaceAround(() => {
      console.log(`"${city.toCapitalize()}, ${country.toCapitalize()}"`);
    });
  };

  city_country("karachi");
  city_country("faisalabad");
  city_country("istanbul", "Turkiye");
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise39();

export default Exercise39;
