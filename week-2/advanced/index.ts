/*
Name: Muhammad Hamza
Initials: HC.
GitHub Link: https://github.com/hc-huxai

Date Created: 30/07/2023
Last Updated: 30/07/2023
*/

console.log("Hey Abu Hurairah, I have started learning TYPESCRIPT");

let myName: string = "Hamza";

console.log(`My name is ${myName}\n`);

let numbers: number[] = [];

// This for loop uses Math.random() function to generate random value between 0 and 1. Multiplying the value by 100 and flooring will give us a random value between 0 and 100

for (let i = 0; i < 10; i++) {
  numbers[i] = Math.floor(Math.random() * 100);
}

// Output the generated values
console.log(`Numbers (Random Values from 0 to 100):`);

console.log(numbers);

// For Spacing
console.log();

// Sum function
let sum: number = 0;
numbers.forEach((number) => (sum += number));
console.log(`Sum of All Generated Values: ${sum}`);

// Subtract function
let diff: number = 0;
numbers.forEach((number) => (diff -= number));
console.log(`Subtraction of All Generated Values from 0: ${diff}`);

// Multiply function
let product: number = 1;
numbers.forEach((number) => (product *= number));
console.log(`Multiplication of All Generated Values: ${product}`);

// Divide Function
let canDivide: boolean = false;
let toDivide: number = 0;
let divideBy: number = 0;
while (!canDivide) {
  toDivide = numbers[Math.floor(Math.random() * numbers.length)];
  divideBy = numbers[Math.floor(Math.random() * numbers.length)];

  toDivide >= divideBy ? (canDivide = true) : (canDivide = false);
}

// toFixed function controls how many digits to be displayed after decimal, case here is two
// quotient variable uses type of string because toFixed function returns a number converted to string
let quotient: string = (toDivide / divideBy).toFixed(2);

console.log(`Division of ${toDivide} by ${divideBy}: ${quotient}`);

// Mix Arithmetic Operations

// function to get random array index
const randomArrValue = () => {
  return numbers[Math.floor(Math.random() * numbers.length)];
};

let mixOps: number =
  randomArrValue() * randomArrValue() * randomArrValue() +
  randomArrValue() / randomArrValue() -
  randomArrValue();

console.log(`Mix Arithmetic Operations: ${mixOps}`);
