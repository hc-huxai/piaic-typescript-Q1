// Calculate sum of numbers in array
const Exercise09 = () => {
  let getInput = require("prompt-sync")({ sigint: true });
  // For taking input from user.
  console.log(`Please Enter Numbers separated by a single space.`);
  let numList = getInput("=> ");
  let numArray = numList.split(" "); // Array to store the number entered by User.

  for (let i = 0; i < numArray.length; i++) {
    if (isNaN(numArray[i])) {
      console.log(`${numArray[i]} is not a number`);
    } else numArray[i] = Number(numArray[i]);
  }
  console.log(`Array of Numbers:-`);
  console.log(numArray);

  let sum: number = 0;
  let index: number = 0;
  while (index < numArray.length) {
    if (isNaN(numArray[index])) {
      console.log(`${numArray[index]} is not a number`);
    } else sum += numArray[index];
    index++;
  }

  console.log(`Sum: ${sum}`);
};

export default Exercise09;
