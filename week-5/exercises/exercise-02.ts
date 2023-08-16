const Exercise02 = () => {
  let getInput = require("prompt-sync")({ sigint: true });
  let tableNum: number = Number(getInput("Enter any number => "));
  for (let i = 1; i <= 10; i++) {
    console.log(`${tableNum} x ${i} = ${tableNum * i}`);
  }
};

export default Exercise02;
