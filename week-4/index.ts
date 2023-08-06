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

let oddEvenStatus:string = ""

const ifOddEven = (number:number) => {
   if (number % 2 == 0) {
      oddEvenStatus = "Even"
   } else {
      oddEvenStatus ="Odd"
   }
   console.log(`Number: ${number}`);
   console.log(`The Number is ${oddEvenStatus}`);
   
   
}

ifOddEven(num)


console.log();
console.log();

// Exercise 5
console.log(`==================`);
console.log(`Exercise 5: Check if Person is Eligible to Vote`);
console.log(`==================`);

console.log();

let personAge:number = 21;

let eligibilityStatus:string = ""

const voteEligibility = (age:number) => {
if (age >= 18) {
   eligibilityStatus = "Eligible"
} else {
   eligibilityStatus = "Ineligible"
}
console.log(`Person's Age: ${age}`);
console.log(`The Person is ${eligibilityStatus} to Vote`);

}

voteEligibility(18)



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
