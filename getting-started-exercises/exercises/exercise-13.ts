/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { Spacer } from "../../EOA-Functions";

const Exercise13 = () => {
  let company: string[] = ["Toyota", "Honda", "BMW", "Audi", "Bugatti"];
  let vehicleTypes: string[] = ["Bike", "Car", "Jet", "Boat"];

  console.log(company, vehicleTypes);

  Spacer();

  console.log(
    `I would like to own a ${
      company[Math.floor(Math.random() * company.length)]
    } ${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]}`
  );

  Spacer();

  console.log(
    `I would like to own a ${
      company[Math.floor(Math.random() * company.length)]
    } ${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]}`
  );

  Spacer();

  console.log(
    `I would like to own a ${
      company[Math.floor(Math.random() * company.length)]
    } ${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]}`
  );

  Spacer();

  console.log(
    `I would like to own a ${
      company[Math.floor(Math.random() * company.length)]
    } ${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]}`
  );
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise13();

export default Exercise13;
