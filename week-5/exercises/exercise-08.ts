const Exercise08 = () => {
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

  console.log(`Initial Array =>`, numArray);

  let i = 0;
  while (i < numArray.length) {
    if (numArray[i] < 0) {
      numArray.splice(i, 1);
      i--;
    } else {
      i++;
    }
  }

  console.log(`Array after Removing Negatives =>`, numArray);
};

export default Exercise08;
