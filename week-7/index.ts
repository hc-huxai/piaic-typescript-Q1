import {
  Exercise01,
  Exercise02,
  Exercise03,
  Exercise04,
  Exercise05,
  Exercise06,
  Exercise07,
  Exercise08,
} from "./exercises/index";
import { Spacer, getInput } from "../EOA-Functions";

let exercises: Array<{ name: string; exerciseFn: () => void }> = [
  {
    name: "ToDo App with CRUD Operations using map",
    exerciseFn: () => Exercise01(),
  },
  {
    name: "Iterate thru an array & remove even numbers from it using filter method",
    exerciseFn: () => Exercise02([22, 44, -55, -88, 11, 2, -5, -8, 200]),
  },
  {
    name: "Create new array storing values of given array, multiplied by 2",
    exerciseFn: () => Exercise03(),
  },
  {
    name: "Create new array storing values of given array, but if string length > 5",
    exerciseFn: () => Exercise04(),
  },
  {
    name: "Create a new array storing squared values of given array, if value is even",
    exerciseFn: () => Exercise05(),
  },
  {
    name: "Convert temperatures in °C in an array to °F using map, and store values in new array.",
    exerciseFn: () => Exercise06(),
  },
  {
    name: "Create a new array containing (odd values * 2) of old array | use map and filter methods",
    exerciseFn: () => Exercise07(),
  },
  {
    name: "Use forEach to iterate thru an array, and print values followed by exclamation mark(!)",
    exerciseFn: () => Exercise08(),
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
