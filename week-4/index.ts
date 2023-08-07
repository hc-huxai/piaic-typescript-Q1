// Exercise 1
console.log(`==================`);
console.log(`Exercise 1: Calculate Area of Rectangle`);
console.log(`==================`);

console.log();

let width: number = 10;
let height: number = 5;

const calcArea = (width: number, height: number) => {
  console.log(`Width: ${width} , Height: ${height}`);
  console.log(`Area of Rectangle: ${width * height}`);
};

calcArea(width, height);

console.log();
console.log();

// Exercise 2
console.log(`==================`);
console.log(`Exercise 2: Calculate Volume of Cube`);
console.log(`==================`);

console.log();

let sideLength: number = 24;

const calcCubeVol = (length: number) => {
  console.log(`Length of Side of Cube: ${length}`);
  console.log(`Volume of Cube: ${length ** 3}`);
};

calcCubeVol(sideLength);

console.log();
console.log();

// Exercise 3
console.log(`==================`);
console.log(`Exercise 3: Check if Number is Positive/Negative/Zero`);
console.log(`==================`);

console.log();

let num: number = 284;

let numSignStatus: string = "";

const checkNumSign = (number: number) => {
  if (number == 0) {
    numSignStatus = "Zero";
  } else {
    if (number > 0) {
      numSignStatus = "Positive";
    } else {
      numSignStatus = "Negative";
    }
  }
  console.log(`Number Given: ${num}`);

  console.log(`The Number is ${numSignStatus}`);
};

checkNumSign(num);

console.log();
console.log();

// Exercise 4
console.log(`==================`);
console.log(`Exercise 4: Check if Number is Odd/Even`);
console.log(`==================`);

console.log();

let oddEvenStatus: string = "";

const ifOddEven = (number: number) => {
  if (number % 2 == 0) {
    oddEvenStatus = "Even";
  } else {
    oddEvenStatus = "Odd";
  }
  console.log(`Number: ${number}`);
  console.log(`The Number is ${oddEvenStatus}`);
};

ifOddEven(num);

console.log();
console.log();

// Exercise 5
console.log(`==================`);
console.log(`Exercise 5: Check if Person is Eligible to Vote`);
console.log(`==================`);

console.log();

let personAge: number = 21;

let eligibilityStatus: string = "";

const voteEligibility = (age: number) => {
  if (age >= 18) {
    eligibilityStatus = "Eligible";
  } else {
    eligibilityStatus = "Ineligible";
  }
  console.log(`Person's Age: ${age}`);
  console.log(`The Person is ${eligibilityStatus} to Vote`);
};

voteEligibility(18);

console.log();
console.log();

// Exercise 6
console.log(`==================`);
console.log(`Exercise 6: Evaluate Mathematical Expression`);
console.log(`==================`);

console.log();

console.log(
  `((10 + 5) * 3 - 2) / ((4 % 3) - 7) = ${((10 + 5) * 3 - 2) / ((4 % 3) - 7)}`
);

console.log();
console.log();

// Exercise 7
console.log(`==================`);
console.log(`Exercise 7: Convert Temperature`);
console.log(`==================`);

console.log();

let temp: number = 37;
let tempC: number;
let tempF: number;
let tempK: number;

// Use C for Celsius
// F for Fahrenheit
// K for Kelvin
let tempUnit: string = "C";

const convertTemp = (temp: number, tempUnit: string) => {
  switch (tempUnit) {
    case "C": {
      console.log(
        `${temp}°C => ${(temp * (9 / 5) + 32).toFixed(2)}°F | ${temp + 273.15}K
        `
      );
      break;
    }
    case "F": {
      console.log(
        `${temp}°F => ${((temp - 32) * (5 / 9)).toFixed(2)}°C | ${
          Number(((temp - 32) * (5 / 9)).toFixed(2)) + 273.15
        }K
      `
      );
      break;
    }
    case "K": {
      console.log(
        `${temp}K => ${temp - 273.15}°C | ${(temp - 273.15) * (9 / 5) + 32}°F
        `
      );
      break;
    }
    default: {
      console.log("Please Enter Correct Temperature Unit");
      break;
    }
  }
};

convertTemp(temp, tempUnit);

console.log();
console.log();

// Exercise 8
console.log(`==================`);
console.log(`Exercise 8: Calculate Percentage`);
console.log(`==================`);

console.log();

let reading: number = 280;
let total: number = 300;

const calcPercentage = (reading: number, total: number) => {
  if (reading > total) {
    return "Please Enter Correct Readings";
  }
  return `${reading}/${total} = ${((reading / total) * 100).toFixed(2)}%`;
};

console.log(calcPercentage(reading, total));

console.log();
console.log();

// Exercise 9
console.log(`==================`);
console.log(`Exercise 9: Convert Days to Weeks and Days`);
console.log(`==================`);

console.log();

let days = 8;

const convertDays = (days: number) => {
  if (days == 0 || days < 0) return "Number of Days invalid!";
  let weeks = Math.floor(days / 7),
    remainingDays = days % 7;
  const result = `${days} Days :${
    weeks != 0 ? ` ${weeks} ${weeks > 1 ? "Weeks" : "Week"}` : ""
  } ${
    remainingDays != 0
      ? `${remainingDays} ${remainingDays > 1 ? "Days" : "Day"}`
      : ""
  }`;
  return result;
};

console.log(convertDays(days));

console.log();
console.log();

// Exercise 10
console.log(`==================`);
console.log(`Exercise 10: Calculate Discount Based on Price`);
console.log(`==================`);

console.log();

let price = 200;
let discount: number;
let discPrice: number;

const calcDiscount = (price: number) => {
  if (price >= 100) {
    discount = 10;
    discPrice = price * (1 - discount / 100);
  } else if (price > 0 && price < 100) {
    discount = 5;
    discPrice = price * (1 - discount / 100);
  } else {
    console.error("Invalid Price");
  }
  return `$${price} - ${discount}% : $${discPrice}`;
};

console.log(`${calcDiscount(price)}`);

console.log();
console.log();

// Exercise 11
console.log(`==================`);
console.log(`Exercise 11: Determine Age Category`);
console.log(`==================`);

console.log();

let age = 19;
let ageCategory: string;

const getAgeCategory = (age: number) => {
  if (age > 0) {
    if (age < 12) {
      ageCategory = "a Child";
    } else if (age <= 19) {
      ageCategory = "a Teenager";
    } else {
      ageCategory = `an Adult`;
    }
    return `You are ${ageCategory}.`;
  } else {
    return "Please Input Correct Age.";
  }
};

console.log(`${getAgeCategory(age)}`);
