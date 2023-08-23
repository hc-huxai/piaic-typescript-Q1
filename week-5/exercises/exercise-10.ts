const Exercise10 = () => {
  let getInput = require("prompt-sync")({ sigint: true });
  // For taking input from user.
  console.log(`Please Enter Numbers separated by a single space.`);
  let numList = getInput("=> ");
  let celsius = numList.split(" "); // Array to store the number entered by User.

  let fahrenheit = [];

  var i = 0;
  while (i < celsius.length) {
    if (isNaN(Number(celsius[i]))) {
      console.log(`${celsius[i]} is not a temperature`);
    } else {
      celsius[i] = Number(celsius[i]);
      i++;
    }
  }

  var i = 0;
  while (i < celsius.length) {
    fahrenheit.push(((9 / 5) * celsius[i] + 32).toFixed(2));
    i++;
  }

  var i = 0;
  while (i < fahrenheit.length) {
    fahrenheit[i] = Number(fahrenheit[i]);
    i++;
  }

  console.log(`Temperatures in °C => `, celsius);
  console.log(`Temperatures in °F => `, fahrenheit);
};

export default Exercise10;
