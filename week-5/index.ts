import {
  Exercise01,
  Exercise02,
  Exercise03,
  Exercise04,
  Exercise05,
  Exercise06,
  Exercise07,
  Exercise08,
  Exercise09,
  Exercise10,
} from "./exercises/index";
import { Spacer } from "../EOA-Functions";

const getInput = require("prompt-sync")({ sigint: true });

let exercises: Array<{ name: string; exerciseFn: () => void }> = [
  { name: "To-Do List | Array Splice Method", exerciseFn: () => Exercise01() },
  {
    name: "Print Arithmetic Table using While Loop",
    exerciseFn: () => Exercise02(),
  },
  {
    name: "Add a value at specified index in the given array.",
    exerciseFn: () =>
      Exercise03(["Hello", "Everyone", "Name", "is", "Hamza"], 2, "My"),
  },
  { name: "Functioning Shopping Cart", exerciseFn: () => Exercise04() },
  {
    name: "Print first 25 Integers using 'while loop'.",
    exerciseFn: () => Exercise05(),
  },
  {
    name: "Print first 10 even numbers using 'while loop'.",
    exerciseFn: () => Exercise06(),
  },
  {
    name: "Calculate Factorial",
    exerciseFn: () => Exercise07(),
  },
  {
    name: "Remove Number from Array if Negative",
    exerciseFn: () => Exercise08(),
  },
  {
    name: "Find Sum of Numbers Stored in Array",
    exerciseFn: () => Exercise09(),
  },
  {
    name: "Convert List of °C Temperatures to °F",
    exerciseFn: () => Exercise10(),
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

// // 01. To-Do List | Array Splice Method
// console.log(`==================`);
// console.log(`Exercise 1: To-Do List | Array Splice Method`);
// console.log(`==================`);

// Spacer();

// Exercise01();

// Spacer(2);

// // 02. Print Arithmetic Table of a Number
// console.log(`==================`);
// console.log(`Exercise 2: Print Arithmetic Table using While Loop`);
// console.log(`==================`);

// Spacer();

// Exercise02();

// Spacer(2);

// // 03. Add a value at specified index
// console.log(`==================`);
// console.log(`Exercise 3: Add a value at specified index in the given array.`);
// console.log(`==================`);

// Spacer();

// Exercise03(["Hello", "Everyone", "Name", "is", "Hamza"], 2, "My");

// Spacer(2);

// console.log(`==================`);
// console.log(`Exercise 4: Functioning Shopping Cart`);
// console.log(`==================`);

// Spacer();

// Exercise04();

// Spacer(2);

// console.log(`==================`);
// console.log(`Exercise 5: Print first 25 Integers using 'while loop'.`);
// console.log(`==================`);

// Spacer();

// Exercise05();

// Spacer(2);

// console.log(`==================`);
// console.log(`Exercise 6: Print first 10 even numbers using 'while loop'.`);
// console.log(`==================`);

// Spacer();

// Exercise06();

// Spacer(2);

// console.log(`==================`);
// console.log(`Exercise 7: Calculate Factorial`);
// console.log(`==================`);

// Spacer();

// Exercise07();

// Spacer(2);

// console.log(`==================`);
// console.log(`Exercise 8: Remove Number from Array if Negative`);
// console.log(`==================`);

// Spacer();

// Exercise08();

// Spacer(2);

// console.log(`==================`);
// console.log(`Exercise 9: Calculate Sum of Array of Numbers`);
// console.log(`==================`);

// Spacer();

// Exercise09();

// Spacer(2);

// console.log(`==================`);
// console.log(`Exercise 10: Convert a list of °C Temperatures to °F`);
// console.log(`==================`);

// Spacer();

// Exercise10();
