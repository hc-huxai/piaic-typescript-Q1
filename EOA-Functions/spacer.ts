/*
 * This Spacer() function is used to enter blank lines in the output.
 * It basically uses console.log(), but the advantage here is that
 * it also takes a parameter of type number.
 * The value determines the number of blank lines in output.
 */

const Spacer = (numOfSpaces?: number) => {
  for (let i = 1; i <= (numOfSpaces == undefined ? 1 : numOfSpaces); i++) {
    console.log();
  }
};

export default Spacer;
