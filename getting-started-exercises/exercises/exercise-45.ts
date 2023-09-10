/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/string";

const Exercise45 = () => {
  type CarModel = {
    manufacturer: string;
    model: string;
    year: number;
    [key: string]: string | number | boolean;
  };

  const createCar = (
    manufacturer: string,
    model: string,
    year: number,
    args?: Record<string, any>
  ): CarModel => {
    let car: CarModel = {
      manufacturer,
      model,
      year,
    };

    if (args) {
      for (let key in args) {
        car[key] = args[key];
      }
    }

    return car;
  };

  console.log(
    createCar("Honda", "Civic", 2004, {
      color: "Navy",
      sunroof: true,
    })
  );
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise45();

export default Exercise45;
