"use strict";
let person = "HuXai";
// Escape Sequence is used here to make output more readable. \n adds a new line in console.
console.log("\n");
console.log(`Initially: ${person}`);
// toUpperCase() is the native function of JavaScript (also usable in Typescript) to convert contents of string to uppercase
console.log(`Uppercase: ${person.toUpperCase()}`);
// toLowerCase() is the native function of JavaScript (also usable in Typescript) to convert contents of string to lowercase
console.log(`Lowercase: ${person.toLowerCase()}`);
// There is no function to convert string into capitalized format.
// So to do that, we take the first letter of the string using person[0].
//The [0] stands for first letter in the string.
// Then concatenate it with person.substring(1).toLowerCase
// substring() function is used to get part of string using starting and ending point
// In the below statement, 1 is the starting point, as 0 is the first letter of string.
// We didn't specify any ending point as we need the rest of string.
// Then toLowerCase() function is used to convert it into lowercase
console.log(`Capitalized: ${person[0].toUpperCase() + person.substring(1).toLowerCase()}`);
// If the name includes more than one word, then strip() function would be used to separate the names in an array.
// Then either by using a for loop or manually, the above method would be applied on all words.
console.log("\n");
