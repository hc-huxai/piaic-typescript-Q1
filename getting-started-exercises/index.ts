import Exercise01 from "./exercises/exercise-01";
import Exercise02 from "./exercises/exercise-02";
import Exercise03 from "./exercises/exercise-03";
import Exercise04 from "./exercises/exercise-04";
import Exercise05 from "./exercises/exercise-05";
import Exercise06 from "./exercises/exercise-06";
import Exercise07 from "./exercises/exercise-07";
import Exercise08 from "./exercises/exercise-08";
import Exercise09 from "./exercises/exercise-09";
import Exercise10 from "./exercises/exercise-10";
import Exercise11 from "./exercises/exercise-11";
import Exercise12 from "./exercises/exercise-12";
import Exercise13 from "./exercises/exercise-13";
import Exercise14 from "./exercises/exercise-14";
import Exercise15 from "./exercises/exercise-15";
import Exercise16 from "./exercises/exercise-16";
import Exercise17 from "./exercises/exercise-17";
import Exercise18 from "./exercises/exercise-18";
import Exercise19 from "./exercises/exercise-19";
import Exercise20 from "./exercises/exercise-20";
import Exercise21 from "./exercises/exercise-21";
import Exercise22 from "./exercises/exercise-22";
import Exercise23 from "./exercises/exercise-23";
import Exercise24 from "./exercises/exercise-24";
import Exercise25 from "./exercises/exercise-25";
import Exercise26 from "./exercises/exercise-26";
import Exercise27 from "./exercises/exercise-27";
import Exercise28 from "./exercises/exercise-28";
import Exercise29 from "./exercises/exercise-29";
import Exercise30 from "./exercises/exercise-30";
import Exercise31 from "./exercises/exercise-31";
import Exercise32 from "./exercises/exercise-32";
import Exercise33 from "./exercises/exercise-33";
import Exercise34 from "./exercises/exercise-34";
import Exercise35 from "./exercises/exercise-35";
import Exercise36 from "./exercises/exercise-36";
import Exercise37 from "./exercises/exercise-37";
import Exercise38 from "./exercises/exercise-38";
import Exercise39 from "./exercises/exercise-39";
import Exercise40 from "./exercises/exercise-40";
import Exercise41 from "./exercises/exercise-41";
import Exercise42 from "./exercises/exercise-42";
import Exercise43 from "./exercises/exercise-43";
import Exercise44 from "./exercises/exercise-44";
import Exercise45 from "./exercises/exercise-45";

import { Spacer, getInput } from "../EOA-Functions";

let exercises: Array<{ name: string; exerciseFn: () => void }> = [
  {
    name: "System Setup",
    exerciseFn: () => Exercise01(),
  },
  {
    name: "Personal Message",
    exerciseFn: () => Exercise02(),
  },
  {
    name: "Name Cases",
    exerciseFn: () => Exercise03(),
  },
  {
    name: "Famous Quote",
    exerciseFn: () => Exercise04(),
  },
  {
    name: "Famous Quote 2",
    exerciseFn: () => Exercise05(),
  },
  {
    name: "Stripping Names",
    exerciseFn: () => Exercise06(),
  },
  {
    name: "Number Eight",
    exerciseFn: () => Exercise07(),
  },
  {
    name: "----",
    exerciseFn: () => Exercise08(),
  },
  {
    name: "Favorite Number",
    exerciseFn: () => Exercise09(),
  },
  {
    name: "Adding Comments",
    exerciseFn: () => Exercise10(),
  },
  {
    name: "Names",
    exerciseFn: () => Exercise11(),
  },
  {
    name: "Greetings",
    exerciseFn: () => Exercise12(),
  },
  {
    name: "Your Own Array",
    exerciseFn: () => Exercise13(),
  },
  {
    name: "Guest List",
    exerciseFn: () => Exercise14(),
  },
  {
    name: "Changing Guest List",
    exerciseFn: () => Exercise15(),
  },
  {
    name: "More Guests",
    exerciseFn: () => Exercise16(),
  },
  {
    name: "Shrinking Guest List",
    exerciseFn: () => Exercise17(),
  },
  {
    name: "Seeing the World",
    exerciseFn: () => Exercise18(),
  },
  {
    name: "Dinner Guests",
    exerciseFn: () => Exercise19(),
  },
  {
    name: "Arrays",
    exerciseFn: () => Exercise20(),
  },
  {
    name: "Object",
    exerciseFn: () => Exercise21(),
  },
  {
    name: "Intentional Error",
    exerciseFn: () => Exercise22(),
  },
  {
    name: "Conditional Tests",
    exerciseFn: () => Exercise23(),
  },
  {
    name: "More Conditional Tests",
    exerciseFn: () => Exercise24(),
  },
  {
    name: "Alien Color #1",
    exerciseFn: () => Exercise25(),
  },
  {
    name: "Alien Color #2",
    exerciseFn: () => Exercise26(),
  },
  {
    name: "Alien Color #3",
    exerciseFn: () => Exercise27(),
  },
  {
    name: "Stages of Life",
    exerciseFn: () => Exercise28(),
  },
  {
    name: "Favorite Fruit",
    exerciseFn: () => Exercise29(),
  },
  {
    name: "Hello Admin",
    exerciseFn: () => Exercise30(),
  },
  {
    name: "No Users",
    exerciseFn: () => Exercise31(),
  },
  {
    name: "Checking Usernames",
    exerciseFn: () => Exercise32(),
  },
  {
    name: "Ordinal Numbers",
    exerciseFn: () => Exercise33(),
  },
  {
    name: "Pizzas",
    exerciseFn: () => Exercise34(),
  },
  {
    name: "Animals",
    exerciseFn: () => Exercise35(),
  },
  {
    name: "T-Shirt",
    exerciseFn: () => Exercise36(),
  },
  {
    name: "Large Shirts",
    exerciseFn: () => Exercise37(),
  },
  {
    name: "Cities",
    exerciseFn: () => Exercise38(),
  },
  {
    name: "City Names",
    exerciseFn: () => Exercise39(),
  },
  {
    name: "Albums",
    exerciseFn: () => Exercise40(),
  },
  {
    name: "Magicians",
    exerciseFn: () => Exercise41(),
  },
  {
    name: "Great Magicians",
    exerciseFn: () => Exercise42(),
  },
  {
    name: "Unchanged Magicians",
    exerciseFn: () => Exercise43(),
  },
  {
    name: "Sandwiches",
    exerciseFn: () => Exercise44(),
  },
  {
    name: "Cars",
    exerciseFn: () => Exercise45(),
  },
];

console.log(`/************************/`);
console.log(`Choose Exercise #`);
console.log(`/************************/`);

exercises.forEach((element, index) => {
  Spacer();
  console.log(`${index + 1} - ${element["name"]}`);
});

Spacer();
console.log(`e - Exit`);

Spacer();
let exercise_no = getInput("Enter Exercise # to Run: ");

let runExerciseNo =
  exercise_no == "e" || (exercise_no >= 1 && exercise_no <= exercises.length);

while (runExerciseNo == false) {
  exercise_no = getInput("Please Enter Exercise # to Run: ");
}

let exitProgram = exercise_no == `e`;

while (!exitProgram) {
  console.log(`==================`);
  console.log(`Exercise ${exercise_no}: ${exercises[exercise_no - 1].name}`);
  console.log(`==================`);

  Spacer();
  exercises[exercise_no - 1].exerciseFn();

  Spacer(2);

  getInput("Press Enter to Continue...");

  Spacer();

  console.log(`/************************/`);
  console.log(`Choose Exercise #`);
  console.log(`/************************/`);

  exercises.forEach((element, index) => {
    Spacer();
    console.log(`${index + 1} - ${element["name"]}`);
  });

  Spacer();
  console.log(`e - Exit`);
  exercise_no = getInput("Enter Exercise # to Run: ");
  exitProgram = exercise_no == "e";
}

console.log(`Exit`);
process.exit(0);
