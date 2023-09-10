/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";
import "../../EOA-Functions/Custom-Prototypes/array";

const Exercise34 = () => {
  let pizzas: string[] = ["Chicken Tikka", "Cheese", "BBQ Spice"];

  Spacer();

  for (let i = 0; i < pizzas.length; i++) {
    console.log(`I like ${pizzas[i]} Pizza.`);
    Spacer();
  }

  console.log(
    `I like pizza with cheese and chicken on a thin crust with spicy tomato sauce. I also enjoy pizza with only cheese on a thick crust with barbecue sauce. Sometimes I like to try different kinds of pizza, such as Hawaiian, Margherita, or Meat Lovers. I eat pizza whenever I feel hungry, happy, or bored. I really love pizza!`
  );

  Spacer();
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise34();

export default Exercise34;
