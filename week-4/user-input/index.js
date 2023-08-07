"use strict";
const getInput = require("prompt-sync")();
// Exercise 1
console.log(`==================`);
console.log(`Exercise 1: Calculate Area of Rectangle`);
console.log(`==================`);
console.log();
let width = getInput("Enter the width of the rectangle => ");
let height = getInput("Enter the height of the rectangle => ");
const calcArea = (width, height) => {
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
let sideLength = getInput("Enter the length of side of Cube => ");
const calcCubeVol = (length) => {
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
let num = getInput("Enter a Number => ");
let numSignStatus = "";
const checkNumSign = (number) => {
    if (number == 0) {
        numSignStatus = "Zero";
    }
    else {
        if (number > 0) {
            numSignStatus = "Positive";
        }
        else {
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
let num1 = getInput("Enter any Number => ");
let oddEvenStatus = "";
const ifOddEven = (number) => {
    if (number % 2 == 0) {
        oddEvenStatus = "Even";
    }
    else {
        oddEvenStatus = "Odd";
    }
    console.log(`Number: ${number}`);
    console.log(`The Number is ${oddEvenStatus}`);
};
ifOddEven(num1);
console.log();
console.log();
// Exercise 5
console.log(`==================`);
console.log(`Exercise 5: Check if Person is Eligible to Vote`);
console.log(`==================`);
console.log();
let personAge = getInput("Enter Age => ");
let eligibilityStatus = "";
const voteEligibility = (age) => {
    if (age >= 18) {
        eligibilityStatus = "Eligible";
    }
    else {
        eligibilityStatus = "Ineligible";
    }
    console.log(`Person's Age: ${age}`);
    console.log(`The Person is ${eligibilityStatus} to Vote`);
};
voteEligibility(personAge);
console.log();
console.log();
// Exercise 6
console.log(`==================`);
console.log(`Exercise 6: Evaluate Mathematical Expression`);
console.log(`==================`);
console.log();
console.log(`((10 + 5) * 3 - 2) / ((4 % 3) - 7) = ${((10 + 5) * 3 - 2) / ((4 % 3) - 7)}`);
console.log();
console.log();
// Exercise 7
console.log(`==================`);
console.log(`Exercise 7: Convert Temperature`);
console.log(`==================`);
console.log();
let temp = getInput("Enter Temperature (Without Unit) =>");
let tempC;
let tempF;
let tempK;
// Use C for Celsius
// F for Fahrenheit
// K for Kelvin
let tempUnit = getInput("Enter Unit of Temperature (C, F, K) =>");
const convertTemp = (temp, tempUnit) => {
    let condition = false;
    while (!condition) {
        switch (tempUnit) {
            case "C": {
                console.log(`${temp}°C => ${(temp * (9 / 5) + 32).toFixed(2)}°F | ${temp + 273.15}K
        `);
                condition = true;
                break;
            }
            case "F": {
                console.log(`${temp}°F => ${((temp - 32) * (5 / 9)).toFixed(2)}°C | ${Number(((temp - 32) * (5 / 9)).toFixed(2)) + 273.15}K
      `);
                condition = true;
                break;
            }
            case "K": {
                console.log(`${temp}K => ${temp - 273.15}°C | ${(temp - 273.15) * (9 / 5) + 32}°F
        `);
                condition = true;
                break;
            }
            default: {
                tempUnit = getInput("Enter Unit of Temperature (C, F, K) =>");
                break;
            }
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
let reading = getInput("Enter your Reading => ");
let total = getInput("Enter your Total => ");
const calcPercentage = (reading, total) => {
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
let days = getInput("Enter No. of Days => ");
const convertDays = (days) => {
    if (days == 0 || days < 0)
        return "Number of Days invalid!";
    let weeks = Math.floor(days / 7), remainingDays = days % 7;
    const result = `${days} Days :${weeks != 0 ? ` ${weeks} ${weeks > 1 ? "Weeks" : "Week"}` : ""} ${remainingDays != 0
        ? `${remainingDays} ${remainingDays > 1 ? "Days" : "Day"}`
        : ""}`;
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
let price = getInput("Enter your Price => ");
let discount;
let discPrice;
const calcDiscount = (price) => {
    if (price >= 100) {
        discount = 10;
        discPrice = price * (1 - discount / 100);
    }
    else if (price > 0 && price < 100) {
        discount = 5;
        discPrice = price * (1 - discount / 100);
    }
    else {
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
let age = getInput("Enter Age => ");
let ageCategory;
const getAgeCategory = (age) => {
    if (age > 0) {
        if (age < 12) {
            ageCategory = "a Child";
        }
        else if (age <= 19) {
            ageCategory = "a Teenager";
        }
        else {
            ageCategory = `an Adult`;
        }
        return `You are ${ageCategory}.`;
    }
    else {
        return "Please Input Correct Age.";
    }
};
console.log(`${getAgeCategory(age)}`);
console.log();
console.log();
// Exercise 12
console.log(`==================`);
console.log(`Exercise 12: Check Temperature & Suggest Clothes`);
console.log(`==================`);
console.log();
let temperature = getInput("Enter Temperature => ");
const suggestClothes = (temperature) => {
    if (temperature > 20) {
        console.log("The weather is hot.");
        console.log("It is advisable to wear t-shirts and shorts.");
    }
    else {
        console.log("The weather is cold");
        console.log("It is advisable to wear a sweater, jeans or pants.");
    }
};
suggestClothes(temperature);
console.log();
console.log();
// Exercise 13
console.log(`==================`);
console.log(`Exercise 13: Check if Number is divisible by 3 or 5 or both or not divisible`);
console.log(`==================`);
console.log();
let numToDivide = getInput("Enter Any Number => ");
const checkDivisibility = (number) => {
    if (number != 0) {
        let divisibleBy3 = number % 3 == 0;
        let divisibleBy5 = number % 5 == 0;
        if (divisibleBy3 && divisibleBy5) {
            return "Number is divisible by 3 and 5";
        }
        else if (divisibleBy3) {
            return "Number is only divisible by 3";
        }
        else if (divisibleBy5) {
            return "Number is only divisible by 5";
        }
        else {
            return `${number} is neither divisible by 3 nor 5`;
        }
    }
};
console.log(checkDivisibility(numToDivide));
console.log();
console.log();
// Exercise 14
console.log(`==================`);
console.log(`Exercise 14: Check if its a Leap Year or not`);
console.log(`==================`);
console.log();
let year = getInput("Enter Year => ");
const checkLeapYear = (year) => {
    if (year % 4 == 0 && !(year % 100 == 0)) {
        console.log(`${year} is leap year.`);
    }
    else {
        console.log(`${year} is not leap year.`);
    }
};
checkLeapYear(year);
console.log();
console.log();
// Exercise 15
console.log(`==================`);
console.log(`Exercise 15: Determine the Day of the Week`);
console.log(`==================`);
console.log();
let numberOfDay = getInput("Enter Number of Day => ");
const printDayName = (numberOfDay) => {
    if (numberOfDay >= 1 && numberOfDay <= 7) {
        if (numberOfDay == 1) {
            console.log(`Number of Day: ${numberOfDay} | Day: Monday`);
        }
        else if (numberOfDay == 2) {
            console.log(`Number of Day: ${numberOfDay} | Day: Tuesday`);
        }
        else if (numberOfDay == 3) {
            console.log(`Number of Day: ${numberOfDay} | Day: Wednesday`);
        }
        else if (numberOfDay == 4) {
            console.log(`Number of Day: ${numberOfDay} | Day: Thursday`);
        }
        else if (numberOfDay == 5) {
            console.log(`Number of Day: ${numberOfDay} | Day: Friday`);
        }
        else if (numberOfDay == 6) {
            console.log(`Number of Day: ${numberOfDay} | Day: Saturday`);
        }
        else {
            console.log(`Number of Day: ${numberOfDay} | Day: Sunday`);
        }
    }
    else {
        console.log("Please Enter Valid Day Number");
    }
};
printDayName(numberOfDay);
console.log();
console.log();
// Exercise 16
console.log(`==================`);
console.log(`Exercise 16: Calculate Tax based on Consumed Electricity`);
console.log(`==================`);
console.log();
let unitsConsumed = getInput("Enter Consumed Electricity Units => ");
let taxRate;
let unitRate = 28;
const calcAmountWithTax = (units) => {
    let amount = unitRate * units;
    if (units > 100) {
        taxRate = 10;
    }
    else if (units > 200) {
        taxRate = 15;
    }
    else if (units > 300) {
        taxRate = 20;
    }
    else if (units > 400) {
        taxRate = 22.4;
    }
    else if (units > 500) {
        taxRate = 25;
    }
    return `Electricity Cost: ${amount} + ${taxRate}% Tax = ${amount + amount * (taxRate / 100)}`;
};
console.log(calcAmountWithTax(unitsConsumed));
