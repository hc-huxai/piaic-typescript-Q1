/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */

import { SpaceAround, Spacer } from "../../EOA-Functions";

const Exercise24 = () => {
  // * Arrow Functions created for Easy Navigation

  const strTests = () => {
    console.log(`==== Start: Equality & Inequality with Strings ====`);

    Spacer();

    // ? Reason for creating variables
    // ? TypeScript was giving error due to unintentional comparison
    var compareStrA = "hello";
    var compareStrB = "heLLo";
    console.log(
      `${compareStrA} == ${compareStrB} : ${compareStrA == compareStrB}`
    );
    console.log(
      `${compareStrA} != ${compareStrB} : ${compareStrA != compareStrB}`
    );

    Spacer();

    console.log(`===== End: Equality & Inequality with Strings =====`);
  };

  const strLowerTests = () => {
    console.log(
      `==== Start: Equality & Inequality with Strings (Lowercase) ====`
    );

    Spacer();

    // ? Reason for creating variables
    // ? TypeScript was giving error due to unintentional comparison
    var compareStrA = "hello";
    var compareStrB = "heLLo";
    console.log(
      `${compareStrA}.toLowerCase() == ${compareStrB}.toLowerCase() : ${
        compareStrA.toLowerCase() == compareStrB.toLowerCase()
      }`
    );
    console.log(
      `${compareStrA}.toLowerCase() != ${compareStrB}.toLowerCase() : ${
        compareStrA.toLowerCase() != compareStrB.toLowerCase()
      }`
    );

    Spacer();

    console.log(
      `===== End: Equality & Inequality with Strings (Lowercase) =====`
    );
  };

  const numericalTests = () => {
    console.log("==== Start: Numerical Tests ====");

    Spacer();

    let A = 10,
      B = 5;

    console.log(`Suppose A = ${A} and B = ${B}, so`);

    Spacer();

    console.log(`${A} == ${B} => ${A == B} | '==' only compares values`);
    console.log(
      `${A} === ${B} => ${A === B} | '===' compares value and datatype`
    );

    // TypeScript doesn't allow unnecessary comparison so hardcoded the value
    console.log(`For Example, 10 == '10' => true | Compared value only`);
    console.log(`10 === '10' => false | Compared value and datatype`);

    Spacer();

    console.log(`${A} > ${B} => ${A > B}`);
    console.log(`${A} < ${B} => ${A < B}`);

    Spacer();

    console.log(
      `Here, the value A and B are equal to 10.\ni.e. A = 10, B = 10`
    );

    (A = 10), (B = 10);

    Spacer();

    console.log(`A >= B => ${A >= B}`);
    console.log(`The value of A is not greater than B but both are equal.`);
    console.log(
      `This sign returns true if left-side value is greater or equal to right-side value`
    );

    Spacer();

    console.log(`A <= B => ${A <= B}`);
    console.log(`The value of A is not less than B but both are equal.`);
    console.log(
      `This sign returns true if left-side value is less or equal to right-side value`
    );

    Spacer();

    console.log("===== End: Numerical Tests =====");
  };

  const logicalTests = () => {
    console.log("==== Start: Logical Tests ====");

    Spacer();

    let A = 10,
      B = "10";

    console.log(
      `Suppose A = ${A} and B = ${B} but here type of variable B is string, so`
    );

    Spacer();

    // TypeScript doesn't allow unnecessary comparison so hardcoded the value
    console.log(`${A} == ${B} && typeof ${A} == typeof ${B} => ${false}`);
    console.log(
      `Explanation: The expression above first compares the value of A & B which evaluates to true.`
    );
    console.log(
      `Then, on the left side of &&, it compares the datatypes of A & B 
      which evaluate as false because they're different types in this case.`
    );
    console.log("So overall result will be false");

    Spacer();

    // TypeScript doesn't allow unnecessary comparison so hardcoded the value
    console.log(`${A} == ${B} || typeof ${A} == typeof ${B} => ${false}`);
    console.log(
      `Explanation: The expression above first compares the value of A and B which evaluates to true.`
    );
    console.log(
      `Then, on the left side of ||, it compares the datatypes of A and B 
      which evaluate as false because they're different types in this case.`
    );
    console.log("So overall result will be true");

    Spacer();

    console.log("===== End: Logical Tests =====");
  };

  const ArrTest = () => {
    console.log("==== Start: Array Tests ====");

    Spacer();

    let array: (string | number)[] = [1, 2, 3, 4, 5, "a", "b", "c", "d", "e"];

    console.log(`Array named 'array' =>`, array);

    Spacer();

    console.log(`array.includes(1) => ${array.includes(1)}`);
    console.log(
      `Explanation: The prototype function Array.includes returns true if an item is present in the array, where Array is your array name.`
    );

    Spacer();

    console.log(`array.includes('f') => ${array.includes("f")}`);
    console.log(
      `Explanation: The prototype function Array.includes returns false if an item does not exist on the array, where Array is your array name.`
    );

    Spacer();

    console.log("===== End: Array Tests =====");
  };

  strTests();
  SpaceAround(() => console.log(`----------------------------`));
  strLowerTests();
  SpaceAround(() => console.log(`----------------------------`));
  numericalTests();
  SpaceAround(() => console.log(`----------------------------`));
  logicalTests();
  SpaceAround(() => console.log(`----------------------------`));
  ArrTest();
  SpaceAround(() => console.log(`----------------------------`));
};

// TODO: Uncomment the statement below to execute the exercise function
// Exercise24();

export default Exercise24;
