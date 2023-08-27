var $lFQFG$process = require("process");
var $lFQFG$buffer = require("buffer");
var $lFQFG$fs = require("fs");

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


var $d393b47c74009737$require$Buffer = $lFQFG$buffer.Buffer;
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
        var fd = $lFQFG$process.platform === "win32" ? $lFQFG$process.stdin.fd : $lFQFG$fs.openSync("/dev/tty", "rs");
        var wasRaw = $lFQFG$process.stdin.isRaw;
        if (!wasRaw) $lFQFG$process.stdin.setRawMode && $lFQFG$process.stdin.setRawMode(true);
        var buf = $d393b47c74009737$require$Buffer.alloc(3);
        var str = "", character, read;
        savedstr = "";
        if (ask) $lFQFG$process.stdout.write(ask);
        var cycle = 0;
        var prevComplete;
        while(true){
            read = $lFQFG$fs.readSync(fd, buf, 0, 3);
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
                        $lFQFG$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
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
                        $lFQFG$process.stdout.write("\x1b[2K\x1b[0G" + ask + str + "\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    case "\x1b[D":
                        if (masked) break;
                        var before = insert;
                        insert = --insert < 0 ? 0 : insert;
                        if (before - insert) $lFQFG$process.stdout.write("\x1b[1D");
                        break;
                    case "\x1b[C":
                        if (masked) break;
                        insert = ++insert > str.length ? str.length : insert;
                        $lFQFG$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    default:
                        if (buf.toString()) {
                            str = str + buf.toString();
                            str = str.replace(/\0/g, "");
                            insert = str.length;
                            promptPrint(masked, ask, echo, str, insert);
                            $lFQFG$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                            buf = $d393b47c74009737$require$Buffer.alloc(3);
                        }
                }
                continue; // any other 3 character sequence is ignored
            }
            // if it is not a control character seq, assume only one character is read
            character = buf[read - 1];
            // catch a ^C and return null
            if (character == 3) {
                $lFQFG$process.stdout.write("^C\n");
                $lFQFG$fs.closeSync(fd);
                if (sigint) $lFQFG$process.exit(130);
                $lFQFG$process.stdin.setRawMode && $lFQFG$process.stdin.setRawMode(wasRaw);
                return null;
            }
            // catch a ^D and exit
            if (character == 4) {
                if (str.length == 0 && eot) {
                    $lFQFG$process.stdout.write("exit\n");
                    $lFQFG$process.exit(0);
                }
            }
            // catch the terminating character
            if (character == $d393b47c74009737$var$term) {
                $lFQFG$fs.closeSync(fd);
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
                    $lFQFG$process.stdout.write("	");
                    continue;
                }
                var item = res[cycle++] || res[cycle = 0, cycle++];
                if (item) {
                    $lFQFG$process.stdout.write("\r\x1b[K" + ask + item);
                    str = item;
                    insert = item.length;
                }
            }
            if (character == 127 || $lFQFG$process.platform == "win32" && character == 8) {
                if (!insert) continue;
                str = str.slice(0, insert - 1) + str.slice(insert);
                insert--;
                $lFQFG$process.stdout.write("\x1b[2D");
            } else {
                if (character < 32 || character > 126) continue;
                str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);
                insert++;
            }
            promptPrint(masked, ask, echo, str, insert);
        }
        $lFQFG$process.stdout.write("\n");
        $lFQFG$process.stdin.setRawMode && $lFQFG$process.stdin.setRawMode(wasRaw);
        return str || value || "";
    }
    function promptPrint(masked, ask, echo, str, insert) {
        if (masked) $lFQFG$process.stdout.write("\x1b[2K\x1b[0G" + ask + Array(str.length + 1).join(echo));
        else {
            $lFQFG$process.stdout.write("\x1b[s");
            if (insert == str.length) $lFQFG$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else if (ask) $lFQFG$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else $lFQFG$process.stdout.write("\x1b[2K\x1b[0G" + str + "\x1b[" + (str.length - insert) + "D");
            // Reposition the cursor to the right of the insertion point
            var askLength = $5myiz(ask).length;
            $lFQFG$process.stdout.write(`\u001b[${askLength + 1 + (echo == "" ? 0 : insert)}G`);
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



// Exercise 01: Create a ToDo App and perform CRUD operations using map.
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




const $20837ac221d32eaa$var$Exercise01 = ()=>{
    let todoTasks = [
        {
            id: 0,
            title: "Buy a new gaming laptop",
            isComplete: false
        },
        {
            id: 1,
            title: "Complete Assignment",
            isComplete: true
        },
        {
            id: 2,
            title: "Develop an app using Flutter",
            isComplete: false
        },
        {
            id: 3,
            title: "Learn React & Next with TypeScript",
            isComplete: false
        }
    ];
    const listTasks = (tasks)=>{
        tasks.forEach((task, index)=>{
            console.log(`${index + 1}. ${task.title} | Status: ${task.isComplete ? "Completed" : "Pending"}`);
        });
    };
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    console.log(`Tasks =>`);
    listTasks(todoTasks);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    let action = "";
    const getAction = ()=>{
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
        console.log(`Actions:`);
        console.log(`l - List Tasks`);
        console.log(`a - Add New Task`);
        console.log(`r - Remove Task`);
        console.log(`u - Update Task Name/Status`);
        console.log(`c - Clear All Tasks from List`);
        console.log(`e - exit`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        action = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter Action Shortcut => ");
    };
    getAction();
    // Actions' Function
    // Add
    const addTask = (array)=>{
        let title = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter Task Title => ");
        let exit = "";
        if (title == "") {
            console.log(`Task Title not Found`);
            console.log(`Exiting function...`);
        } else {
            todoTasks.push({
                id: array[array.length - 1].id + 1,
                title: title,
                isComplete: false
            });
            (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
            console.log(`Item "${title}" with Status 'Pending' added to the List.`);
            (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        }
    };
    // Remove
    const removeTaskFromList = (array)=>{
        listTasks(array);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        let taskID = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)(`Which Item # Do You Want to Remove? (1-${array.length}) => `);
        console.log(taskID);
        if (isNaN(taskID)) {
            console.log(`No Item Selected for Removal,`);
            console.log(`Exiting function...`);
            return;
        }
        todoTasks = array.filter((task)=>{
            if (task.id != taskID - 1) return task;
        });
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log("Removed");
    };
    // Update
    const updateTask = (array)=>{
        listTasks(array);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        let taskID = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)(`Which Item # Do You Want to Update? (1-${array.length}) `);
        if (taskID == null) {
            console.log(`No Item Selected,`);
            console.log(`Exiting function...`);
            return;
        }
        taskID = Number(taskID);
        taskID--;
        console.log(`Leave empty if don't want to change.`);
        let updatedTaskTitle = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Updated Task Title => ");
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        // It is declared with datatype 'any' to reuse it for boolean result
        let updatedStatus = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Updated Task Status\nc - Complete | p - Pending\n=> ");
        if (updatedStatus == "c") updatedStatus;
        else if (updatedStatus == "p") updatedStatus = false;
        else {
            console.log(`Invalid status shortcut given..`);
            console.log(`Status Value remained unchanged`);
            updatedStatus = todoTasks[taskID].isComplete;
        }
        todoTasks = todoTasks.map((task)=>{
            if (task.id == taskID) return {
                id: task.id,
                title: updatedTaskTitle == "" ? task.title : updatedTaskTitle,
                isComplete: updatedStatus
            };
            else return task;
        });
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log("Updated");
    };
    // Clear
    const clearCart = ()=>{
        todoTasks = [];
        console.log(`All items are removed from cart.`);
    };
    let shouldExit = action == "e" ? false : true;
    while(shouldExit){
        switch(action){
            case "a":
                // add new item
                addTask(todoTasks);
                (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
                getAction();
                break;
            case "l":
                // List all Items in Cart
                listTasks(todoTasks);
                (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
                getAction();
                break;
            case "r":
                // remove existing items from the cart
                removeTaskFromList(todoTasks);
                (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
                getAction();
                break;
            case "u":
                // update quantities of an item already present on the cart
                updateTask(todoTasks);
                (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
                getAction();
                break;
            case "c":
                // clear all items from the cart
                clearCart();
                (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
                getAction();
                break;
            default:
                action = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Invalid Shortcut, Please Try Again => ");
                break;
        }
        shouldExit = action == "e" ? false : true;
    }
    console.log(`Exited`);
};
var // TODO: Uncomment statement below to run function from this file
// Exercise01();
$20837ac221d32eaa$export$2e2bcd8739ae039 = $20837ac221d32eaa$var$Exercise01;


// Exercise 02: Write a program that uses filter to remove all negative numbers from an array of numbers.
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.
// ============ getInput ============
// Take Input from Console
// getInput() also takes string for prompt message, but every keypress it re-prints the message in console,
// so it's better to use console.log() to show prompt query

const $04eb8e00be122a8f$var$Exercise02 = (array)=>{
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
    numArr = numArr.filter((num)=>{
        return num > 1;
    });
    console.log(`Array w/o Negative Numbers => `, numArr);
};
var // TODO: Uncomment statement below to run function from this file
// Exercise02([22, 44, -55, -88, 11, 2, -5, -8, 200]);
$04eb8e00be122a8f$export$2e2bcd8739ae039 = $04eb8e00be122a8f$var$Exercise02;


// Exercise 03: Given an array of numbers [1, 2, 3, 4, 5], use the map method to create a new array where each value is multiplied by 2.
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $6bae08a3f4274af2$var$Exercise03 = (array = [
    1,
    2,
    3,
    4,
    5
])=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Initial Array => `, array);
    let numArr = array.map((num)=>num * 2);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    console.log(`New Array with values multiplied by 2 =>`);
    console.log(numArr);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment statement below to run function from this file
// Exercise03();
$6bae08a3f4274af2$export$2e2bcd8739ae039 = $6bae08a3f4274af2$var$Exercise03;


// Exercise 04: Given an array of strings ["apple", "banana", "cherry", "date", "grape"], use the filter method to create a new array containing only the fruits with more than 5 characters.
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $4deb2a5a343b38c2$var$Exercise04 = (array = [
    "apple",
    "banana",
    "cherry",
    "date",
    "grape"
])=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Initial Array => `, array);
    let lengthFilter = array.filter((word)=>word.length > 5);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    console.log(`New Array with strings of length > 5 =>`);
    console.log(lengthFilter);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment statement below to run function from this file
// Exercise04();
$4deb2a5a343b38c2$export$2e2bcd8739ae039 = $4deb2a5a343b38c2$var$Exercise04;


// Exercise 05: Given an array of numbers [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], use the map and filter methods together to create a new array containing squares of even numbers.
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $e064f4a278b0c5b8$var$Exercise05 = (array = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10
])=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Initial Array => `, array);
    let SqrdEvenNums = array.filter((num)=>!(num % 2)).map((num)=>num ** 2);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    console.log(`New Array with squared value of even numbers =>`);
    console.log(SqrdEvenNums);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment statement below to run function from this file
// Exercise05();
$e064f4a278b0c5b8$export$2e2bcd8739ae039 = $e064f4a278b0c5b8$var$Exercise05;


// Exercise 06: Given an array of temperature in Celsius, [0, 10, 20, 30, 40], use the map method to create a new array where each temperature is converted to Fahrenheit using the formula (Celsius * 9/5) + 32
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $e1fb952d58b95912$var$Exercise06 = (array = [
    0,
    10,
    20,
    30,
    40
])=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Temperatures in °C => `, array);
    let TempF = array.map((temp)=>Number((temp * 1.8 + 32).toFixed(2)));
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    console.log(`Temperatures in °F =>`, TempF);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment statement below to run function from this file
// Exercise06();
$e1fb952d58b95912$export$2e2bcd8739ae039 = $e1fb952d58b95912$var$Exercise06;


// Exercise 07: Given an array of numbers [3, 6, 9, 12, 15, 18], use the map and filter methods together to create a new array containing the doubled values of odd numbers.
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $f01e146984866572$var$Exercise07 = (array = [
    3,
    6,
    9,
    12,
    15,
    18
])=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Initial Array => `, array);
    let doubledOddNums = array.filter((num)=>num % 2).map((num)=>num * 2);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    console.log(`New Array with Doubled Values of Odd Numbers =>`);
    console.log(doubledOddNums);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment statement below to run function from this file
// Exercise07();
$f01e146984866572$export$2e2bcd8739ae039 = $f01e146984866572$var$Exercise07;


// Exercise 08: Given an array of names ["Alice", "Bob", "Charlie", "David", "Emily"], use the forEach method to log each name with an exclamation mark at the end, e.g., "Alice!".
// ============ Spacer ============
// A custom function that takes an optional parameter as number to print empty console.log(),
// if parameter is not specified it takes it as 1.

const $dc3d8ede01cab547$var$Exercise08 = (array = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emily"
])=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Array =>`, array);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Names with '!' =>`);
    array.forEach((name)=>console.log(`${name}!`));
};
var // TODO: Uncomment statement below to run function from this file
// Exercise08();
$dc3d8ede01cab547$export$2e2bcd8739ae039 = $dc3d8ede01cab547$var$Exercise08;






let $34b028bc1218ab07$var$exercises = [
    {
        name: "ToDo App with CRUD Operations using map",
        exerciseFn: ()=>(0, $20837ac221d32eaa$export$2e2bcd8739ae039)()
    },
    {
        name: "Iterate thru an array & remove even numbers from it using filter method",
        exerciseFn: ()=>(0, $04eb8e00be122a8f$export$2e2bcd8739ae039)([
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
        name: "Create new array storing values of given array, multiplied by 2",
        exerciseFn: ()=>(0, $6bae08a3f4274af2$export$2e2bcd8739ae039)()
    },
    {
        name: "Create new array storing values of given array, but if string length > 5",
        exerciseFn: ()=>(0, $4deb2a5a343b38c2$export$2e2bcd8739ae039)()
    },
    {
        name: "Create a new array storing squared values of given array, if value is even",
        exerciseFn: ()=>(0, $e064f4a278b0c5b8$export$2e2bcd8739ae039)()
    },
    {
        name: "Convert temperatures in \xb0C in an array to \xb0F using map, and store values in new array.",
        exerciseFn: ()=>(0, $e1fb952d58b95912$export$2e2bcd8739ae039)()
    },
    {
        name: "Create a new array containing (odd values * 2) of old array | use map and filter methods",
        exerciseFn: ()=>(0, $f01e146984866572$export$2e2bcd8739ae039)()
    },
    {
        name: "Use forEach to iterate thru an array, and print values followed by exclamation mark(!)",
        exerciseFn: ()=>(0, $dc3d8ede01cab547$export$2e2bcd8739ae039)()
    }
];
console.log(`/************************/`);
console.log(`Choose Exercise #`);
console.log(`/************************/`);
$34b028bc1218ab07$var$exercises.forEach((element, index)=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`${index + 1} - ${element["name"]}`);
});
(0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
console.log(`e - Exit`);
(0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
let $34b028bc1218ab07$var$exercise_no = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter Exercise # to Run: ");
let $34b028bc1218ab07$var$runExerciseNo = $34b028bc1218ab07$var$exercise_no == "e" || $34b028bc1218ab07$var$exercise_no >= 1 && $34b028bc1218ab07$var$exercise_no <= $34b028bc1218ab07$var$exercises.length;
while($34b028bc1218ab07$var$runExerciseNo == false)$34b028bc1218ab07$var$exercise_no = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Please Enter Exercise # to Run: ");
let $34b028bc1218ab07$var$exitProgram = $34b028bc1218ab07$var$exercise_no == `e`;
while(!$34b028bc1218ab07$var$exitProgram){
    console.log(`==================`);
    console.log(`Exercise ${$34b028bc1218ab07$var$exercise_no}: ${$34b028bc1218ab07$var$exercises[$34b028bc1218ab07$var$exercise_no - 1].name}`);
    console.log(`==================`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    $34b028bc1218ab07$var$exercises[$34b028bc1218ab07$var$exercise_no - 1].exerciseFn();
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Press Enter to Continue...");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`/************************/`);
    console.log(`Choose Exercise #`);
    console.log(`/************************/`);
    $34b028bc1218ab07$var$exercises.forEach((element, index)=>{
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`${index + 1} - ${element["name"]}`);
    });
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`e - Exit`);
    $34b028bc1218ab07$var$exercise_no = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter Exercise # to Run: ");
    $34b028bc1218ab07$var$exitProgram = $34b028bc1218ab07$var$exercise_no == "e";
}
console.log(`Exit`);
$lFQFG$process.exit(0);


//# sourceMappingURL=index.js.map
