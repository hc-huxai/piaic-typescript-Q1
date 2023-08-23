import {
  Exercise01,
  Exercise02,
  Exercise03,
  Exercise04,
  Exercise05,
  Exercise06,
} from "./exercises/index";
import { Spacer, getInput } from "../EOA-Functions";

let exercises: Array<{ name: string; exerciseFn: () => void }> = [
  {
    name: "Calculate the sum of first n numbers using for loop",
    exerciseFn: () => Exercise01(),
  },
  {
    name: "Iterate thru an array & only print even numbers",
    exerciseFn: () => Exercise02(),
  },
  {
    name: "Iterate thru an array & remove even numbers from it",
    exerciseFn: () => Exercise03([22, 44, -55, -88, 11, 2, -5, -8, 200]),
  },
  { name: "Calculate Area of Circle", exerciseFn: () => Exercise04() },
  {
    name: "Iterate thru a list of grades & remove if below 50",
    exerciseFn: () => Exercise05([24, 57, 62, 49, 91]),
  },
  {
    name: "Print the largest number in array",
    exerciseFn: () => Exercise06([24, 57, 62, 49, 91]),
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
