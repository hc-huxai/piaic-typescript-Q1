var $jz9V9$process = require("process");
var $jz9V9$buffer = require("buffer");
var $jz9V9$fs = require("fs");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire78f6"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire78f6"] = parcelRequire;
}
parcelRequire.register("iadAQ", function(module, exports) {


var $d393b47c74009737$require$Buffer = $jz9V9$buffer.Buffer;
"use strict";


var $5myiz = parcelRequire("5myiz");
var $d393b47c74009737$var$term = 13; // carriage return
/**
 * create -- sync function for reading user input from stdin
 * @param   {Object} config {
 *   sigint: {Boolean} exit on ^C
 *   autocomplete: {StringArray} function({String})
 *   history: {String} a history control object (see `prompt-sync-history`)
 * }
 * @returns {Function} prompt function
 */ // for ANSI escape codes reference see https://en.wikipedia.org/wiki/ANSI_escape_code
function $d393b47c74009737$var$create(config) {
    config = config || {};
    var sigint = config.sigint;
    var eot = config.eot;
    var autocomplete = config.autocomplete = config.autocomplete || function() {
        return [];
    };
    var history = config.history;
    prompt.history = history || {
        save: function() {}
    };
    prompt.hide = function(ask) {
        return prompt(ask, {
            echo: ""
        });
    };
    return prompt;
    /**
   * prompt -- sync function for reading user input from stdin
   *  @param {String} ask opening question/statement to prompt for
   *  @param {String} value initial value for the prompt
   *  @param   {Object} opts {
   *   echo: set to a character to be echoed, default is '*'. Use '' for no echo
   *   value: {String} initial value for the prompt
   *   ask: {String} opening question/statement to prompt for, does not override ask param
   *   autocomplete: {StringArray} function({String})
   * }
   *
   * @returns {string} Returns the string input or (if sigint === false)
   *                   null if user terminates with a ^C
   */ function prompt(ask, value, opts) {
        var insert = 0, savedinsert = 0, res, i, savedstr;
        opts = opts || {};
        if (Object(ask) === ask) {
            opts = ask;
            ask = opts.ask;
        } else if (Object(value) === value) {
            opts = value;
            value = opts.value;
        }
        ask = ask || "";
        var echo = opts.echo;
        var masked = "echo" in opts;
        autocomplete = opts.autocomplete || autocomplete;
        var fd = $jz9V9$process.platform === "win32" ? $jz9V9$process.stdin.fd : $jz9V9$fs.openSync("/dev/tty", "rs");
        var wasRaw = $jz9V9$process.stdin.isRaw;
        if (!wasRaw) $jz9V9$process.stdin.setRawMode && $jz9V9$process.stdin.setRawMode(true);
        var buf = $d393b47c74009737$require$Buffer.alloc(3);
        var str = "", character, read;
        savedstr = "";
        if (ask) $jz9V9$process.stdout.write(ask);
        var cycle = 0;
        var prevComplete;
        while(true){
            read = $jz9V9$fs.readSync(fd, buf, 0, 3);
            if (read > 1) {
                switch(buf.toString()){
                    case "\x1b[A":
                        if (masked) break;
                        if (!history) break;
                        if (history.atStart()) break;
                        if (history.atEnd()) {
                            savedstr = str;
                            savedinsert = insert;
                        }
                        str = history.prev();
                        insert = str.length;
                        $jz9V9$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
                        break;
                    case "\x1b[B":
                        if (masked) break;
                        if (!history) break;
                        if (history.pastEnd()) break;
                        if (history.atPenultimate()) {
                            str = savedstr;
                            insert = savedinsert;
                            history.next();
                        } else {
                            str = history.next();
                            insert = str.length;
                        }
                        $jz9V9$process.stdout.write("\x1b[2K\x1b[0G" + ask + str + "\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    case "\x1b[D":
                        if (masked) break;
                        var before = insert;
                        insert = --insert < 0 ? 0 : insert;
                        if (before - insert) $jz9V9$process.stdout.write("\x1b[1D");
                        break;
                    case "\x1b[C":
                        if (masked) break;
                        insert = ++insert > str.length ? str.length : insert;
                        $jz9V9$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    default:
                        if (buf.toString()) {
                            str = str + buf.toString();
                            str = str.replace(/\0/g, "");
                            insert = str.length;
                            promptPrint(masked, ask, echo, str, insert);
                            $jz9V9$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                            buf = $d393b47c74009737$require$Buffer.alloc(3);
                        }
                }
                continue; // any other 3 character sequence is ignored
            }
            // if it is not a control character seq, assume only one character is read
            character = buf[read - 1];
            // catch a ^C and return null
            if (character == 3) {
                $jz9V9$process.stdout.write("^C\n");
                $jz9V9$fs.closeSync(fd);
                if (sigint) $jz9V9$process.exit(130);
                $jz9V9$process.stdin.setRawMode && $jz9V9$process.stdin.setRawMode(wasRaw);
                return null;
            }
            // catch a ^D and exit
            if (character == 4) {
                if (str.length == 0 && eot) {
                    $jz9V9$process.stdout.write("exit\n");
                    $jz9V9$process.exit(0);
                }
            }
            // catch the terminating character
            if (character == $d393b47c74009737$var$term) {
                $jz9V9$fs.closeSync(fd);
                if (!history) break;
                if (!masked && str.length) history.push(str);
                history.reset();
                break;
            }
            // catch a TAB and implement autocomplete
            if (character == 9) {
                res = autocomplete(str);
                if (str == res[0]) res = autocomplete("");
                else prevComplete = res.length;
                if (res.length == 0) {
                    $jz9V9$process.stdout.write("	");
                    continue;
                }
                var item = res[cycle++] || res[cycle = 0, cycle++];
                if (item) {
                    $jz9V9$process.stdout.write("\r\x1b[K" + ask + item);
                    str = item;
                    insert = item.length;
                }
            }
            if (character == 127 || $jz9V9$process.platform == "win32" && character == 8) {
                if (!insert) continue;
                str = str.slice(0, insert - 1) + str.slice(insert);
                insert--;
                $jz9V9$process.stdout.write("\x1b[2D");
            } else {
                if (character < 32 || character > 126) continue;
                str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);
                insert++;
            }
            promptPrint(masked, ask, echo, str, insert);
        }
        $jz9V9$process.stdout.write("\n");
        $jz9V9$process.stdin.setRawMode && $jz9V9$process.stdin.setRawMode(wasRaw);
        return str || value || "";
    }
    function promptPrint(masked, ask, echo, str, insert) {
        if (masked) $jz9V9$process.stdout.write("\x1b[2K\x1b[0G" + ask + Array(str.length + 1).join(echo));
        else {
            $jz9V9$process.stdout.write("\x1b[s");
            if (insert == str.length) $jz9V9$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else if (ask) $jz9V9$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else $jz9V9$process.stdout.write("\x1b[2K\x1b[0G" + str + "\x1b[" + (str.length - insert) + "D");
            // Reposition the cursor to the right of the insertion point
            var askLength = $5myiz(ask).length;
            $jz9V9$process.stdout.write(`\u001b[${askLength + 1 + (echo == "" ? 0 : insert)}G`);
        }
    }
}
module.exports = $d393b47c74009737$var$create;

});
parcelRequire.register("5myiz", function(module, exports) {
"use strict";

var $7C7Is = parcelRequire("7C7Is");
const $3e799cca03f4e503$var$stripAnsi = (string)=>typeof string === "string" ? string.replace($7C7Is(), "") : string;
module.exports = $3e799cca03f4e503$var$stripAnsi;
module.exports.default = $3e799cca03f4e503$var$stripAnsi;

});
parcelRequire.register("7C7Is", function(module, exports) {
"use strict";
module.exports = (options)=>{
    options = Object.assign({
        onlyFirst: false
    }, options);
    const pattern = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(pattern, options.onlyFirst ? undefined : "g");
};

});



"use strict";

const $383e46f26d360885$var$getInput = (parcelRequire("iadAQ"))();
// Exercise 1
console.log(`==================`);
console.log(`Exercise 1: Calculate Area of Rectangle`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$width = $383e46f26d360885$var$getInput("Enter the width of the rectangle => ");
let $383e46f26d360885$var$height = $383e46f26d360885$var$getInput("Enter the height of the rectangle => ");
const $383e46f26d360885$var$calcArea = (width, height)=>{
    console.log(`Width: ${width} , Height: ${height}`);
    console.log(`Area of Rectangle: ${width * height}`);
};
$383e46f26d360885$var$calcArea($383e46f26d360885$var$width, $383e46f26d360885$var$height);
console.log();
console.log();
// Exercise 2
console.log(`==================`);
console.log(`Exercise 2: Calculate Volume of Cube`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$sideLength = $383e46f26d360885$var$getInput("Enter the length of side of Cube => ");
const $383e46f26d360885$var$calcCubeVol = (length)=>{
    console.log(`Length of Side of Cube: ${length}`);
    console.log(`Volume of Cube: ${length ** 3}`);
};
$383e46f26d360885$var$calcCubeVol($383e46f26d360885$var$sideLength);
console.log();
console.log();
// Exercise 3
console.log(`==================`);
console.log(`Exercise 3: Check if Number is Positive/Negative/Zero`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$num = $383e46f26d360885$var$getInput("Enter a Number => ");
let $383e46f26d360885$var$numSignStatus = "";
const $383e46f26d360885$var$checkNumSign = (number)=>{
    if (number == 0) $383e46f26d360885$var$numSignStatus = "Zero";
    else if (number > 0) $383e46f26d360885$var$numSignStatus = "Positive";
    else $383e46f26d360885$var$numSignStatus = "Negative";
    console.log(`Number Given: ${$383e46f26d360885$var$num}`);
    console.log(`The Number is ${$383e46f26d360885$var$numSignStatus}`);
};
$383e46f26d360885$var$checkNumSign($383e46f26d360885$var$num);
console.log();
console.log();
// Exercise 4
console.log(`==================`);
console.log(`Exercise 4: Check if Number is Odd/Even`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$num1 = $383e46f26d360885$var$getInput("Enter any Number => ");
let $383e46f26d360885$var$oddEvenStatus = "";
const $383e46f26d360885$var$ifOddEven = (number)=>{
    if (number % 2 == 0) $383e46f26d360885$var$oddEvenStatus = "Even";
    else $383e46f26d360885$var$oddEvenStatus = "Odd";
    console.log(`Number: ${number}`);
    console.log(`The Number is ${$383e46f26d360885$var$oddEvenStatus}`);
};
$383e46f26d360885$var$ifOddEven($383e46f26d360885$var$num1);
console.log();
console.log();
// Exercise 5
console.log(`==================`);
console.log(`Exercise 5: Check if Person is Eligible to Vote`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$personAge = $383e46f26d360885$var$getInput("Enter Age => ");
let $383e46f26d360885$var$eligibilityStatus = "";
const $383e46f26d360885$var$voteEligibility = (age)=>{
    if (age >= 18) $383e46f26d360885$var$eligibilityStatus = "Eligible";
    else $383e46f26d360885$var$eligibilityStatus = "Ineligible";
    console.log(`Person's Age: ${age}`);
    console.log(`The Person is ${$383e46f26d360885$var$eligibilityStatus} to Vote`);
};
$383e46f26d360885$var$voteEligibility($383e46f26d360885$var$personAge);
console.log();
console.log();
// Exercise 6
console.log(`==================`);
console.log(`Exercise 6: Evaluate Mathematical Expression`);
console.log(`==================`);
console.log();
console.log(`((10 + 5) * 3 - 2) / ((4 % 3) - 7) = ${-7.166666666666667}`);
console.log();
console.log();
// Exercise 7
console.log(`==================`);
console.log(`Exercise 7: Convert Temperature`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$temp = $383e46f26d360885$var$getInput("Enter Temperature (Without Unit) =>");
let $383e46f26d360885$var$tempC;
let $383e46f26d360885$var$tempF;
let $383e46f26d360885$var$tempK;
// Use C for Celsius
// F for Fahrenheit
// K for Kelvin
let $383e46f26d360885$var$tempUnit = $383e46f26d360885$var$getInput("Enter Unit of Temperature (C, F, K) =>");
const $383e46f26d360885$var$convertTemp = (temp, tempUnit)=>{
    let condition = false;
    while(!condition)switch(tempUnit){
        case "C":
            console.log(`${temp}°C => ${(temp * 1.8 + 32).toFixed(2)}°F | ${temp + 273.15}K
        `);
            condition = true;
            break;
        case "F":
            console.log(`${temp}°F => ${((temp - 32) * (5 / 9)).toFixed(2)}°C | ${Number(((temp - 32) * (5 / 9)).toFixed(2)) + 273.15}K
      `);
            condition = true;
            break;
        case "K":
            console.log(`${temp}K => ${temp - 273.15}°C | ${(temp - 273.15) * 1.8 + 32}°F
        `);
            condition = true;
            break;
        default:
            tempUnit = $383e46f26d360885$var$getInput("Enter Unit of Temperature (C, F, K) =>");
            break;
    }
};
$383e46f26d360885$var$convertTemp($383e46f26d360885$var$temp, $383e46f26d360885$var$tempUnit);
console.log();
console.log();
// Exercise 8
console.log(`==================`);
console.log(`Exercise 8: Calculate Percentage`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$reading = $383e46f26d360885$var$getInput("Enter your Reading => ");
let $383e46f26d360885$var$total = $383e46f26d360885$var$getInput("Enter your Total => ");
const $383e46f26d360885$var$calcPercentage = (reading, total)=>{
    if (reading > total) return "Please Enter Correct Readings";
    return `${reading}/${total} = ${(reading / total * 100).toFixed(2)}%`;
};
console.log($383e46f26d360885$var$calcPercentage($383e46f26d360885$var$reading, $383e46f26d360885$var$total));
console.log();
console.log();
// Exercise 9
console.log(`==================`);
console.log(`Exercise 9: Convert Days to Weeks and Days`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$days = $383e46f26d360885$var$getInput("Enter No. of Days => ");
const $383e46f26d360885$var$convertDays = (days)=>{
    if (days == 0 || days < 0) return "Number of Days invalid!";
    let weeks = Math.floor(days / 7), remainingDays = days % 7;
    const result = `${days} Days :${weeks != 0 ? ` ${weeks} ${weeks > 1 ? "Weeks" : "Week"}` : ""} ${remainingDays != 0 ? `${remainingDays} ${remainingDays > 1 ? "Days" : "Day"}` : ""}`;
    return result;
};
console.log($383e46f26d360885$var$convertDays($383e46f26d360885$var$days));
console.log();
console.log();
// Exercise 10
console.log(`==================`);
console.log(`Exercise 10: Calculate Discount Based on Price`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$price = $383e46f26d360885$var$getInput("Enter your Price => ");
let $383e46f26d360885$var$discount;
let $383e46f26d360885$var$discPrice;
const $383e46f26d360885$var$calcDiscount = (price)=>{
    if (price >= 100) {
        $383e46f26d360885$var$discount = 10;
        $383e46f26d360885$var$discPrice = price * (1 - $383e46f26d360885$var$discount / 100);
    } else if (price > 0 && price < 100) {
        $383e46f26d360885$var$discount = 5;
        $383e46f26d360885$var$discPrice = price * (1 - $383e46f26d360885$var$discount / 100);
    } else console.error("Invalid Price");
    return `$${price} - ${$383e46f26d360885$var$discount}% : $${$383e46f26d360885$var$discPrice}`;
};
console.log(`${$383e46f26d360885$var$calcDiscount($383e46f26d360885$var$price)}`);
console.log();
console.log();
// Exercise 11
console.log(`==================`);
console.log(`Exercise 11: Determine Age Category`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$age = $383e46f26d360885$var$getInput("Enter Age => ");
let $383e46f26d360885$var$ageCategory;
const $383e46f26d360885$var$getAgeCategory = (age)=>{
    if (age > 0) {
        if (age < 12) $383e46f26d360885$var$ageCategory = "a Child";
        else if (age <= 19) $383e46f26d360885$var$ageCategory = "a Teenager";
        else $383e46f26d360885$var$ageCategory = `an Adult`;
        return `You are ${$383e46f26d360885$var$ageCategory}.`;
    } else return "Please Input Correct Age.";
};
console.log(`${$383e46f26d360885$var$getAgeCategory($383e46f26d360885$var$age)}`);
console.log();
console.log();
// Exercise 12
console.log(`==================`);
console.log(`Exercise 12: Check Temperature & Suggest Clothes`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$temperature = $383e46f26d360885$var$getInput("Enter Temperature => ");
const $383e46f26d360885$var$suggestClothes = (temperature)=>{
    if (temperature > 20) {
        console.log("The weather is hot.");
        console.log("It is advisable to wear t-shirts and shorts.");
    } else {
        console.log("The weather is cold");
        console.log("It is advisable to wear a sweater, jeans or pants.");
    }
};
$383e46f26d360885$var$suggestClothes($383e46f26d360885$var$temperature);
console.log();
console.log();
// Exercise 13
console.log(`==================`);
console.log(`Exercise 13: Check if Number is divisible by 3 or 5 or both or not divisible`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$numToDivide = $383e46f26d360885$var$getInput("Enter Any Number => ");
const $383e46f26d360885$var$checkDivisibility = (number)=>{
    if (number != 0) {
        let divisibleBy3 = number % 3 == 0;
        let divisibleBy5 = number % 5 == 0;
        if (divisibleBy3 && divisibleBy5) return "Number is divisible by 3 and 5";
        else if (divisibleBy3) return "Number is only divisible by 3";
        else if (divisibleBy5) return "Number is only divisible by 5";
        else return `${number} is neither divisible by 3 nor 5`;
    }
};
console.log($383e46f26d360885$var$checkDivisibility($383e46f26d360885$var$numToDivide));
console.log();
console.log();
// Exercise 14
console.log(`==================`);
console.log(`Exercise 14: Check if its a Leap Year or not`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$year = $383e46f26d360885$var$getInput("Enter Year => ");
const $383e46f26d360885$var$checkLeapYear = (year)=>{
    if (year % 4 == 0 && !(year % 100 == 0)) console.log(`${year} is leap year.`);
    else console.log(`${year} is not leap year.`);
};
$383e46f26d360885$var$checkLeapYear($383e46f26d360885$var$year);
console.log();
console.log();
// Exercise 15
console.log(`==================`);
console.log(`Exercise 15: Determine the Day of the Week`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$numberOfDay = $383e46f26d360885$var$getInput("Enter Number of Day => ");
const $383e46f26d360885$var$printDayName = (numberOfDay)=>{
    if (numberOfDay >= 1 && numberOfDay <= 7) {
        if (numberOfDay == 1) console.log(`Number of Day: ${numberOfDay} | Day: Monday`);
        else if (numberOfDay == 2) console.log(`Number of Day: ${numberOfDay} | Day: Tuesday`);
        else if (numberOfDay == 3) console.log(`Number of Day: ${numberOfDay} | Day: Wednesday`);
        else if (numberOfDay == 4) console.log(`Number of Day: ${numberOfDay} | Day: Thursday`);
        else if (numberOfDay == 5) console.log(`Number of Day: ${numberOfDay} | Day: Friday`);
        else if (numberOfDay == 6) console.log(`Number of Day: ${numberOfDay} | Day: Saturday`);
        else console.log(`Number of Day: ${numberOfDay} | Day: Sunday`);
    } else console.log("Please Enter Valid Day Number");
};
$383e46f26d360885$var$printDayName($383e46f26d360885$var$numberOfDay);
console.log();
console.log();
// Exercise 16
console.log(`==================`);
console.log(`Exercise 16: Calculate Tax based on Consumed Electricity`);
console.log(`==================`);
console.log();
let $383e46f26d360885$var$unitsConsumed = $383e46f26d360885$var$getInput("Enter Consumed Electricity Units => ");
let $383e46f26d360885$var$taxRate;
let $383e46f26d360885$var$unitRate = 28;
const $383e46f26d360885$var$calcAmountWithTax = (units)=>{
    let amount = $383e46f26d360885$var$unitRate * units;
    if (units > 100) $383e46f26d360885$var$taxRate = 10;
    else if (units > 200) $383e46f26d360885$var$taxRate = 15;
    else if (units > 300) $383e46f26d360885$var$taxRate = 20;
    else if (units > 400) $383e46f26d360885$var$taxRate = 22.4;
    else if (units > 500) $383e46f26d360885$var$taxRate = 25;
    return `Electricity Cost: ${amount} + ${$383e46f26d360885$var$taxRate}% Tax = ${amount + amount * ($383e46f26d360885$var$taxRate / 100)}`;
};
console.log($383e46f26d360885$var$calcAmountWithTax($383e46f26d360885$var$unitsConsumed));


//# sourceMappingURL=index.js.map
