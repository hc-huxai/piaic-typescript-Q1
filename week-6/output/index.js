var $8Eia2$process = require("process");
var $8Eia2$buffer = require("buffer");
var $8Eia2$fs = require("fs");

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

var parcelRequire = $parcel$global["parcelRequire94c2"];
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

  $parcel$global["parcelRequire94c2"] = parcelRequire;
}
parcelRequire.register("iadAQ", function(module, exports) {


var $d393b47c74009737$require$Buffer = $8Eia2$buffer.Buffer;
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
        var fd = $8Eia2$process.platform === "win32" ? $8Eia2$process.stdin.fd : $8Eia2$fs.openSync("/dev/tty", "rs");
        var wasRaw = $8Eia2$process.stdin.isRaw;
        if (!wasRaw) $8Eia2$process.stdin.setRawMode && $8Eia2$process.stdin.setRawMode(true);
        var buf = $d393b47c74009737$require$Buffer.alloc(3);
        var str = "", character, read;
        savedstr = "";
        if (ask) $8Eia2$process.stdout.write(ask);
        var cycle = 0;
        var prevComplete;
        while(true){
            read = $8Eia2$fs.readSync(fd, buf, 0, 3);
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
                        $8Eia2$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
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
                        $8Eia2$process.stdout.write("\x1b[2K\x1b[0G" + ask + str + "\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    case "\x1b[D":
                        if (masked) break;
                        var before = insert;
                        insert = --insert < 0 ? 0 : insert;
                        if (before - insert) $8Eia2$process.stdout.write("\x1b[1D");
                        break;
                    case "\x1b[C":
                        if (masked) break;
                        insert = ++insert > str.length ? str.length : insert;
                        $8Eia2$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    default:
                        if (buf.toString()) {
                            str = str + buf.toString();
                            str = str.replace(/\0/g, "");
                            insert = str.length;
                            promptPrint(masked, ask, echo, str, insert);
                            $8Eia2$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                            buf = $d393b47c74009737$require$Buffer.alloc(3);
                        }
                }
                continue; // any other 3 character sequence is ignored
            }
            // if it is not a control character seq, assume only one character is read
            character = buf[read - 1];
            // catch a ^C and return null
            if (character == 3) {
                $8Eia2$process.stdout.write("^C\n");
                $8Eia2$fs.closeSync(fd);
                if (sigint) $8Eia2$process.exit(130);
                $8Eia2$process.stdin.setRawMode && $8Eia2$process.stdin.setRawMode(wasRaw);
                return null;
            }
            // catch a ^D and exit
            if (character == 4) {
                if (str.length == 0 && eot) {
                    $8Eia2$process.stdout.write("exit\n");
                    $8Eia2$process.exit(0);
                }
            }
            // catch the terminating character
            if (character == $d393b47c74009737$var$term) {
                $8Eia2$fs.closeSync(fd);
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
                    $8Eia2$process.stdout.write("	");
                    continue;
                }
                var item = res[cycle++] || res[cycle = 0, cycle++];
                if (item) {
                    $8Eia2$process.stdout.write("\r\x1b[K" + ask + item);
                    str = item;
                    insert = item.length;
                }
            }
            if (character == 127 || $8Eia2$process.platform == "win32" && character == 8) {
                if (!insert) continue;
                str = str.slice(0, insert - 1) + str.slice(insert);
                insert--;
                $8Eia2$process.stdout.write("\x1b[2D");
            } else {
                if (character < 32 || character > 126) continue;
                str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);
                insert++;
            }
            promptPrint(masked, ask, echo, str, insert);
        }
        $8Eia2$process.stdout.write("\n");
        $8Eia2$process.stdin.setRawMode && $8Eia2$process.stdin.setRawMode(wasRaw);
        return str || value || "";
    }
    function promptPrint(masked, ask, echo, str, insert) {
        if (masked) $8Eia2$process.stdout.write("\x1b[2K\x1b[0G" + ask + Array(str.length + 1).join(echo));
        else {
            $8Eia2$process.stdout.write("\x1b[s");
            if (insert == str.length) $8Eia2$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else if (ask) $8Eia2$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else $8Eia2$process.stdout.write("\x1b[2K\x1b[0G" + str + "\x1b[" + (str.length - insert) + "D");
            // Reposition the cursor to the right of the insertion point
            var askLength = $5myiz(ask).length;
            $8Eia2$process.stdout.write(`\u001b[${askLength + 1 + (echo == "" ? 0 : insert)}G`);
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



// Exercise 01: Develop a program that calculates and prints the sum of the first n numbers using for loop.
// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
const $9843d36a0715bc80$var$Spacer = (numOfSpaces)=>{
    if (numOfSpaces == undefined) console.log();
    else for(let i = 1; i <= numOfSpaces; i++)console.log();
};
var $9843d36a0715bc80$export$2e2bcd8739ae039 = $9843d36a0715bc80$var$Spacer;



const $ab736cffb96f66c4$var$getInput = (parcelRequire("iadAQ"))({
    sigint: true
});
var $ab736cffb96f66c4$export$2e2bcd8739ae039 = $ab736cffb96f66c4$var$getInput;




const $7b868276b31d076a$var$Exercise01 = ()=>{
    let number = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter an integer => ");
    let isInt = false;
    while(!isInt)if (Number.isInteger(number)) isInt = true;
    else number = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter an integer => ");
    let sum = 0;
    for(let i = 0; number > 0 ? i <= number : i >= number; number > 0 ? i++ : i--)if (i % 2 == 0) sum += i;
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Sum of Even Numbers between ${number < 0 ? number : 0} and ${number > 0 ? number : 0} =>`);
    console.log(sum);
};
var // TODO: Uncomment statement below to run function from this file
// Exercise01();
$7b868276b31d076a$export$2e2bcd8739ae039 = $7b868276b31d076a$var$Exercise01;


// Exercise 02: Implement a program that uses for loop to iterate through an array of numbers and print only the even numbers.
// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $fcac3e22752bda40$var$Exercise02 = (array)=>{
    // Display options
    console.log(`Options => `);
    console.log(`1 - Take Input Here`);
    console.log(`2 - Use Pre-Defined Values`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    // any datatype is used because getInput returns a string that, in the next statement will convert to number using Number()
    let choice = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter a choice => ");
    let numArr = [];
    // It checks whether choice is empty or out of range
    while(choice == "" || choice < 1 || choice > 2)choice = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Please Enter Valid Choice => ");
    // Choice: Taker User Input
    if (choice == 1) {
        console.log(`Enter Integers separated by single space =>`);
        // Take user input as numbers separated by single space
        // splits it to form an array
        // pushing each item of that array to numArr array & converting item value to typeof Number
        (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)().split(" ").forEach((element)=>{
            if (!isNaN(Number(element))) numArr.push(Number(element));
        });
        // Uses while loop to detect empty input
        // it keeps prompting until non-empty input is found.
        while(numArr.length == 0){
            console.log(`Enter Integers separated by single space =>`);
            (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)().split(" ").forEach((element)=>{
                if (!isNaN(Number(element))) numArr.push(Number(element));
            });
        }
    } else // Choice: Maker User Input
    numArr = array;
    console.log(`Initial Array =>`);
    console.log(numArr);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Even Numbers:`);
    for(let i = 0; i < numArr.length; i++)if (numArr[i] % 2 == 0) console.log(numArr[i]);
};
var // TODO: Uncomment statement below to run function from this file
// Exercise02([22, 44, -55, -88, 11, 2, -5, -8, 200]);
$fcac3e22752bda40$export$2e2bcd8739ae039 = $fcac3e22752bda40$var$Exercise02;


// Exercise 03: Implement a program that uses a loop to iterate through an array of numbers and remove all the even numbers from them and just leave the odd ones.
// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query

const $cae23b269305c37b$var$Exercise03 = (array)=>{
    console.log(`Options:`);
    console.log(`1. Take Input Here`);
    console.log(`2. Use Pre-Defined Values`);
    let numArr = [];
    let choice = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Choose Options (1-2) => ");
    // checks whether choice is 1 or 2, if not. It re-execute the statements
    while([
        1,
        2
    ].indexOf(choice) == -1)choice = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Please Choose Options (1-2) => ");
    // Take Input Here
    if (choice == 1) {
        console.log(`Enter Integers separated by single space =>`);
        // Take user input as numbers separated by single space
        // splits it to form an array
        // pushing each item of that array to numArr array & converting item value to typeof Number
        (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)().split(" ").forEach((element)=>{
            if (!isNaN(Number(element))) numArr.push(Number(element));
        });
        // Uses while loop to detect empty input
        // it keeps prompting until non-empty input is found.
        while(numArr.length == 0){
            console.log(`Enter Integers separated by single space =>`);
            (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)().split(" ").forEach((element)=>{
                if (!isNaN(Number(element))) numArr.push(Number(element));
            });
        }
    } else // generate ten random integers in values array
    numArr = array;
    console.log(`Initial Array => `, numArr);
    for(let i = 0; i < numArr.length; i++)if (numArr[i] % 2 == 0) {
        numArr.splice(i, 1);
        i--;
    }
    console.log(`Array w/o Even Numbers => `, numArr);
};
var // TODO: Uncomment statement below to run function from this file
// Exercise03([22, 44, -55, -88, 11, 2, -5, -8, 200]);
$cae23b269305c37b$export$2e2bcd8739ae039 = $cae23b269305c37b$var$Exercise03;


// Write a program that defines a function to calculate the area of a circle. The function should take the radius as input and return the calculated area.
// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $d42a2f75cb765b90$var$Exercise04 = ()=>{
    console.log(`Enter Radius to calculate area of circle =>`);
    let radius = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)();
    while(!isNaN(radius) && radius < 0){
        console.log(`Enter Valid Value =>`);
        radius = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)();
    }
    let area = Number((Math.PI * radius * radius).toFixed(2));
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Area of Circle with radius ${radius} =>`, area);
};
var // TODO: Uncomment statement below to run function from this file
// Exercise04();
$d42a2f75cb765b90$export$2e2bcd8739ae039 = $d42a2f75cb765b90$var$Exercise04;


// Develop a program that reads a list of grades and uses the splice method to remove failing grades (below 50) from the array.
// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $7bcdb5fa0b6dd65c$var$Exercise05 = (array)=>{
    console.log(`Options:`);
    console.log(`1. Take Input Here`);
    console.log(`2. Use Pre-Defined Values`);
    let grades = [];
    let choice = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Choose Options (1-2) => ");
    // checks whether choice is 1 or 2, if not. It re-execute the statements
    while([
        1,
        2
    ].indexOf(choice) == -1)choice = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Please Choose Options (1-2) => ");
    // Take Input Here
    if (choice == 1) {
        console.log(`Enter Integers separated by single space =>`);
        // Take user input as numbers separated by single space
        // splits it to form an array
        // pushing each item of that array to numArr array & converting item value to typeof Number
        (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)().split(" ").forEach((element)=>{
            if (!isNaN(Number(element))) grades.push(Number(element));
        });
        // Uses while loop to detect empty input
        // it keeps prompting until non-empty input is found.
        while(grades.length == 0){
            console.log(`Enter Integers separated by single space =>`);
            (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)().split(" ").forEach((element)=>{
                if (!isNaN(Number(element))) grades.push(Number(element));
            });
        }
    } else // generate ten random integers in values array
    grades = array;
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`All Grades => `, grades);
    for(let i = 0; i < grades.length; i++)if (grades[i] < 50) {
        grades.splice(i, 1);
        i--;
    }
    console.log(`Passed Grades => `, grades);
};
var // TODO: Uncomment statement below to run function from this file
// Exercise05([24, 57, 62, 49, 91]);
$7bcdb5fa0b6dd65c$export$2e2bcd8739ae039 = $7bcdb5fa0b6dd65c$var$Exercise05;


// Develop a program that reads a list of grades and uses the splice method to remove failing grades (below 50) from the array.
// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $69a94b68416c696b$var$Exercise06 = (array)=>{
    console.log(`Options:`);
    console.log(`1. Take Input Here`);
    console.log(`2. Use Pre-Defined Values`);
    let values = [];
    let choice = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Choose Options (1-2) => ");
    // checks whether choice is 1 or 2, if not. It re-execute the statements
    while([
        1,
        2
    ].indexOf(choice) == -1)choice = +(0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Please Choose Options (1-2) => ");
    // Take Input Here
    if (choice == 1) {
        console.log(`Enter Values separated by single space =>`);
        // Take user input as numbers separated by single space
        // splits it to form an array
        // pushing each item of that array to numArr array & converting item value to typeof Number
        (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)().split(" ").forEach((element)=>{
            if (!isNaN(Number(element))) values.push(Number(element));
        });
        // Uses while loop to detect empty input
        // it keeps prompting until non-empty input is found.
        while(values.length == 0){
            console.log(`Enter Integers separated by single space =>`);
            (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)().split(" ").forEach((element)=>{
                if (!isNaN(Number(element))) values.push(Number(element));
            });
        }
    } else // generate ten random integers in values array
    values = array;
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    // console.log(`All Grades => `, values);
    // for (let i = 0; i < values.length; i++) {
    //   if (values[i] < 50) {
    //     values.splice(i, 1);
    //     i--;
    //   }
    // }
    // console.log(`Passed Grades => `, values);
    console.log(`All Values =>`, values);
    console.log(`Largest Number in list => ${Math.max(...values)}`);
};
var // TODO: Uncomment statement below to run function from this file
// Exercise06([24, 57, 62, 49, 91]);
$69a94b68416c696b$export$2e2bcd8739ae039 = $69a94b68416c696b$var$Exercise06;






let $6c5e4cdc0a7ecbe4$var$exercises = [
    {
        name: "Calculate the sum of first n numbers using for loop",
        exerciseFn: ()=>(0, $7b868276b31d076a$export$2e2bcd8739ae039)()
    },
    {
        name: "Iterate thru an array & only print even numbers",
        exerciseFn: ()=>(0, $fcac3e22752bda40$export$2e2bcd8739ae039)()
    },
    {
        name: "Iterate thru an array & remove even numbers from it",
        exerciseFn: ()=>(0, $cae23b269305c37b$export$2e2bcd8739ae039)([
                22,
                44,
                -55,
                -88,
                11,
                2,
                -5,
                -8,
                200
            ])
    },
    {
        name: "Calculate Area of Circle",
        exerciseFn: ()=>(0, $d42a2f75cb765b90$export$2e2bcd8739ae039)()
    },
    {
        name: "Iterate thru a list of grades & remove if below 50",
        exerciseFn: ()=>(0, $7bcdb5fa0b6dd65c$export$2e2bcd8739ae039)([
                24,
                57,
                62,
                49,
                91
            ])
    },
    {
        name: "Print the largest number in array",
        exerciseFn: ()=>(0, $69a94b68416c696b$export$2e2bcd8739ae039)([
                24,
                57,
                62,
                49,
                91
            ])
    }
];
console.log(`/************************/`);
console.log(`Choose Exercise #`);
console.log(`/************************/`);
$6c5e4cdc0a7ecbe4$var$exercises.forEach((element, index)=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`${index + 1} - ${element["name"]}`);
});
(0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
console.log(`e - Exit`);
(0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
let $6c5e4cdc0a7ecbe4$var$exercise_no = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter Exercise # to Run: ");
let $6c5e4cdc0a7ecbe4$var$runExerciseNo = $6c5e4cdc0a7ecbe4$var$exercise_no == "e" || $6c5e4cdc0a7ecbe4$var$exercise_no >= 1 && $6c5e4cdc0a7ecbe4$var$exercise_no <= $6c5e4cdc0a7ecbe4$var$exercises.length;
while($6c5e4cdc0a7ecbe4$var$runExerciseNo == false)$6c5e4cdc0a7ecbe4$var$exercise_no = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Please Enter Exercise # to Run: ");
let $6c5e4cdc0a7ecbe4$var$exitProgram = $6c5e4cdc0a7ecbe4$var$exercise_no == `e`;
while(!$6c5e4cdc0a7ecbe4$var$exitProgram){
    console.log(`==================`);
    console.log(`Exercise ${$6c5e4cdc0a7ecbe4$var$exercise_no}: ${$6c5e4cdc0a7ecbe4$var$exercises[$6c5e4cdc0a7ecbe4$var$exercise_no - 1].name}`);
    console.log(`==================`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    $6c5e4cdc0a7ecbe4$var$exercises[$6c5e4cdc0a7ecbe4$var$exercise_no - 1].exerciseFn();
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Press Enter to Continue...");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`/************************/`);
    console.log(`Choose Exercise #`);
    console.log(`/************************/`);
    $6c5e4cdc0a7ecbe4$var$exercises.forEach((element, index)=>{
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`${index + 1} - ${element["name"]}`);
    });
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`e - Exit`);
    $6c5e4cdc0a7ecbe4$var$exercise_no = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter Exercise # to Run: ");
    $6c5e4cdc0a7ecbe4$var$exitProgram = $6c5e4cdc0a7ecbe4$var$exercise_no == "e";
}
console.log(`Exit`);
$8Eia2$process.exit(0);


//# sourceMappingURL=index.js.map
