var $9kqO2$process = require("process");
var $9kqO2$buffer = require("buffer");
var $9kqO2$fs = require("fs");

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


var $d393b47c74009737$require$Buffer = $9kqO2$buffer.Buffer;
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
        var fd = $9kqO2$process.platform === "win32" ? $9kqO2$process.stdin.fd : $9kqO2$fs.openSync("/dev/tty", "rs");
        var wasRaw = $9kqO2$process.stdin.isRaw;
        if (!wasRaw) $9kqO2$process.stdin.setRawMode && $9kqO2$process.stdin.setRawMode(true);
        var buf = $d393b47c74009737$require$Buffer.alloc(3);
        var str = "", character, read;
        savedstr = "";
        if (ask) $9kqO2$process.stdout.write(ask);
        var cycle = 0;
        var prevComplete;
        while(true){
            read = $9kqO2$fs.readSync(fd, buf, 0, 3);
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
                        $9kqO2$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
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
                        $9kqO2$process.stdout.write("\x1b[2K\x1b[0G" + ask + str + "\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    case "\x1b[D":
                        if (masked) break;
                        var before = insert;
                        insert = --insert < 0 ? 0 : insert;
                        if (before - insert) $9kqO2$process.stdout.write("\x1b[1D");
                        break;
                    case "\x1b[C":
                        if (masked) break;
                        insert = ++insert > str.length ? str.length : insert;
                        $9kqO2$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    default:
                        if (buf.toString()) {
                            str = str + buf.toString();
                            str = str.replace(/\0/g, "");
                            insert = str.length;
                            promptPrint(masked, ask, echo, str, insert);
                            $9kqO2$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                            buf = $d393b47c74009737$require$Buffer.alloc(3);
                        }
                }
                continue; // any other 3 character sequence is ignored
            }
            // if it is not a control character seq, assume only one character is read
            character = buf[read - 1];
            // catch a ^C and return null
            if (character == 3) {
                $9kqO2$process.stdout.write("^C\n");
                $9kqO2$fs.closeSync(fd);
                if (sigint) $9kqO2$process.exit(130);
                $9kqO2$process.stdin.setRawMode && $9kqO2$process.stdin.setRawMode(wasRaw);
                return null;
            }
            // catch a ^D and exit
            if (character == 4) {
                if (str.length == 0 && eot) {
                    $9kqO2$process.stdout.write("exit\n");
                    $9kqO2$process.exit(0);
                }
            }
            // catch the terminating character
            if (character == $d393b47c74009737$var$term) {
                $9kqO2$fs.closeSync(fd);
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
                    $9kqO2$process.stdout.write("	");
                    continue;
                }
                var item = res[cycle++] || res[cycle = 0, cycle++];
                if (item) {
                    $9kqO2$process.stdout.write("\r\x1b[K" + ask + item);
                    str = item;
                    insert = item.length;
                }
            }
            if (character == 127 || $9kqO2$process.platform == "win32" && character == 8) {
                if (!insert) continue;
                str = str.slice(0, insert - 1) + str.slice(insert);
                insert--;
                $9kqO2$process.stdout.write("\x1b[2D");
            } else {
                if (character < 32 || character > 126) continue;
                str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);
                insert++;
            }
            promptPrint(masked, ask, echo, str, insert);
        }
        $9kqO2$process.stdout.write("\n");
        $9kqO2$process.stdin.setRawMode && $9kqO2$process.stdin.setRawMode(wasRaw);
        return str || value || "";
    }
    function promptPrint(masked, ask, echo, str, insert) {
        if (masked) $9kqO2$process.stdout.write("\x1b[2K\x1b[0G" + ask + Array(str.length + 1).join(echo));
        else {
            $9kqO2$process.stdout.write("\x1b[s");
            if (insert == str.length) $9kqO2$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else if (ask) $9kqO2$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else $9kqO2$process.stdout.write("\x1b[2K\x1b[0G" + str + "\x1b[" + (str.length - insert) + "D");
            // Reposition the cursor to the right of the insertion point
            var askLength = $5myiz(ask).length;
            $9kqO2$process.stdout.write(`\u001b[${askLength + 1 + (echo == "" ? 0 : insert)}G`);
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



const $d8f7f67e0e477d55$var$Exercise01 = ()=>{
    let tasks = [
        "Learn Python",
        "Learn TypeScript",
        "Learn Flutter",
        "Learn ML"
    ];
    tasks.forEach((task, index)=>{
        console.log(`${index + 1}. ${task}`);
    });
    const evenToDo = (array)=>{
        array.splice(array.length / 2 - 1, 2);
    };
    const oddToDo = (array)=>{
        array.splice(Math.floor(array.length / 2), 1);
    };
    tasks.length % 2 == 0 ? evenToDo(tasks) : oddToDo(tasks);
    console.log(tasks);
};
var $d8f7f67e0e477d55$export$2e2bcd8739ae039 = $d8f7f67e0e477d55$var$Exercise01;



const $bc7e16aef7d00425$var$Exercise02 = ()=>{
    let getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    let tableNum = Number(getInput("Enter any number => "));
    for(let i = 1; i <= 10; i++)console.log(`${tableNum} x ${i} = ${tableNum * i}`);
};
var $bc7e16aef7d00425$export$2e2bcd8739ae039 = $bc7e16aef7d00425$var$Exercise02;


const $9843d36a0715bc80$var$Spacer = (numOfSpaces)=>{
    if (numOfSpaces == undefined) console.log();
    else for(let i = 1; i <= numOfSpaces; i++)console.log();
};
var $9843d36a0715bc80$export$2e2bcd8739ae039 = $9843d36a0715bc80$var$Spacer;



const $ab736cffb96f66c4$var$getInput = (parcelRequire("iadAQ"))({
    sigint: true
});
var $ab736cffb96f66c4$export$2e2bcd8739ae039 = $ab736cffb96f66c4$var$getInput;




const $4850b84a2f132f23$var$Exercise03 = (array, index, value)=>{
    console.log(`Inserting value "${value}" at index ${index} of array =>`);
    console.log(array);
    array.splice(index, 0, value);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Modified Array => `, array);
};
var $4850b84a2f132f23$export$2e2bcd8739ae039 = $4850b84a2f132f23$var$Exercise03;




const $dccfa866acc20154$var$getInput = (parcelRequire("iadAQ"))({
    sigint: true
});
const $dccfa866acc20154$var$Exercise04 = ()=>{
    let cartItems = [
        {
            name: "blue shirts",
            quantity: 2
        },
        {
            name: "black pants",
            quantity: 2
        },
        {
            name: "blue trousers",
            quantity: 2
        }
    ];
    const listCartItems = (cart)=>{
        cart.forEach((element, index)=>{
            let tempArray = element.name.split(" ");
            let itemName = "";
            if (tempArray.length > 1) tempArray.forEach((name)=>{
                itemName += name[0].toUpperCase() + name.substr(1).toLowerCase() + " ";
            });
            else itemName = element.name[0].toUpperCase() + element.name.substr(1).toLowerCase();
            console.log(`${index + 1}. ${itemName.trim()} | Quantity: ${element.quantity}`);
        });
    };
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    console.log(`Cart =>`);
    listCartItems(cartItems);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    let action = "";
    const getAction = ()=>{
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
        console.log(`Actions:`);
        console.log(`l - List Items in Cart`);
        console.log(`a - Add Item to Cart`);
        console.log(`r - Remove Item From Cart`);
        console.log(`u - Update Name/Item in Cart`);
        console.log(`c - Clear All Items In Cart`);
        console.log(`e - exit`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        action = $dccfa866acc20154$var$getInput("Enter Action Shortcut => ");
    };
    getAction();
    // Actions' Function
    // Add
    const addItem = (array)=>{
        let item = $dccfa866acc20154$var$getInput("Enter Item Name => ");
        let itemQuantity = $dccfa866acc20154$var$getInput("Enter Item Quantity => ");
        let exit = "";
        if (item == null && itemQuantity == null) exit = $dccfa866acc20154$var$getInput("Do you want to exit (Y/N)? ");
        if (!itemQuantity) {
            console.log(`Item Quantity was not specified. So item is added with quantity '1'.`);
            itemQuantity = 1;
        }
        if (exit == "Y") ;
        else {
            array.push({
                name: item,
                quantity: itemQuantity
            });
            (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
            console.log(`Item "${item}" with quantity ${itemQuantity} added.`);
            (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        }
    };
    // Remove
    const removeItemFromCart = (array)=>{
        listCartItems(array);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        let itemToRemoveIndex = $dccfa866acc20154$var$getInput(`Which Item # Do You Want to Remove? (1-${array.length}) `);
        array.splice(itemToRemoveIndex - 1, 1);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log("Removed");
    };
    // Update
    const updateCart = (array)=>{
        listCartItems(array);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        let itemToUpdateIndex = $dccfa866acc20154$var$getInput(`Which Item # Do You Want to Update? (1-${array.length}) `);
        console.log(`Leave empty if don't want to change.`);
        let updatedItemName = $dccfa866acc20154$var$getInput("Updated Item Name => ");
        let updatedItemQuantity = parseInt($dccfa866acc20154$var$getInput("Updated Item Quantity => "));
        updatedItemQuantity = !updatedItemQuantity ? array[itemToUpdateIndex - 1].quantity : updatedItemQuantity;
        array.splice(itemToUpdateIndex - 1, 1, {
            name: updatedItemName,
            quantity: updatedItemQuantity
        });
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log("Updated");
    };
    // Clear
    const clearCart = ()=>{
        cartItems = [];
        console.log(`All items are removed from cart.`);
    };
    let shouldExit = action == "e" ? false : true;
    while(shouldExit){
        switch(action){
            case "a":
                // add new item
                addItem(cartItems);
                (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
                getAction();
                break;
            case "l":
                // List all Items in Cart
                listCartItems(cartItems);
                (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
                getAction();
                break;
            case "r":
                // remove existing items from the cart
                removeItemFromCart(cartItems);
                (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
                getAction();
                break;
            case "u":
                // update quantities of an item already present on the cart
                updateCart(cartItems);
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
                action = $dccfa866acc20154$var$getInput("Invalid Shortcut, Please Try Again => ");
                break;
        }
        shouldExit = action == "e" ? false : true;
    }
    console.log(`Exited`);
};
var $dccfa866acc20154$export$2e2bcd8739ae039 = $dccfa866acc20154$var$Exercise04;


// Print the first 25 integers using while loop.
const $30eb706e46580473$var$Exercise05 = ()=>{
    let i = 1;
    while(i <= 25){
        console.log(i);
        i++;
    }
};
var $30eb706e46580473$export$2e2bcd8739ae039 = $30eb706e46580473$var$Exercise05;


// Print first 10 even numbers using while loop
const $fc6fd38d520803fe$var$Exercise06 = ()=>{
    let i = 1;
    while(i <= 10){
        console.log(2 * i);
        i++;
    }
};
var $fc6fd38d520803fe$export$2e2bcd8739ae039 = $fc6fd38d520803fe$var$Exercise06;




// Create a function to input a positive number and calculates its factorial.
const $a7bfd731574e6e6e$var$Exercise07 = ()=>{
    let getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    let number = getInput("Enter number for calculating factorial => ");
    let factorial = 1;
    while(number < 1){
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`The number is negative.`);
        number = getInput("Please Enter a Positive Number => ");
    }
    number = Number(number);
    console.log(`Given Number: ${number}`);
    while(number >= 1){
        factorial *= number;
        number--;
    }
    console.log(`Factorial: ${factorial}`);
};
var $a7bfd731574e6e6e$export$2e2bcd8739ae039 = $a7bfd731574e6e6e$var$Exercise07;



const $37bd4aa8b3b4f712$var$Exercise08 = ()=>{
    let getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    // For taking input from user.
    console.log(`Please Enter Numbers separated by a single space.`);
    let numList = getInput("=> ");
    let numArray = numList.split(" "); // Array to store the number entered by User.
    for(let i = 0; i < numArray.length; i++)if (isNaN(numArray[i])) console.log(`${numArray[i]} is not a number`);
    else numArray[i] = Number(numArray[i]);
    console.log(`Initial Array =>`, numArray);
    let i = 0;
    while(i < numArray.length)if (numArray[i] < 0) {
        numArray.splice(i, 1);
        i--;
    } else i++;
    console.log(`Array after Removing Negatives =>`, numArray);
};
var $37bd4aa8b3b4f712$export$2e2bcd8739ae039 = $37bd4aa8b3b4f712$var$Exercise08;


// Calculate sum of numbers in array

const $7a627cda7e40c881$var$Exercise09 = ()=>{
    let getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    // For taking input from user.
    console.log(`Please Enter Numbers separated by a single space.`);
    let numList = getInput("=> ");
    let numArray = numList.split(" "); // Array to store the number entered by User.
    for(let i = 0; i < numArray.length; i++)if (isNaN(numArray[i])) console.log(`${numArray[i]} is not a number`);
    else numArray[i] = Number(numArray[i]);
    console.log(`Array of Numbers:-`);
    console.log(numArray);
    let sum = 0;
    let index = 0;
    while(index < numArray.length){
        if (isNaN(numArray[index])) console.log(`${numArray[index]} is not a number`);
        else sum += numArray[index];
        index++;
    }
    console.log(`Sum: ${sum}`);
};
var $7a627cda7e40c881$export$2e2bcd8739ae039 = $7a627cda7e40c881$var$Exercise09;



const $856e462e9bd8efdd$var$Exercise10 = ()=>{
    let getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    // For taking input from user.
    console.log(`Please Enter Numbers separated by a single space.`);
    let numList = getInput("=> ");
    let celsius = numList.split(" "); // Array to store the number entered by User.
    let fahrenheit = [];
    var i = 0;
    while(i < celsius.length)if (isNaN(Number(celsius[i]))) console.log(`${celsius[i]} is not a temperature`);
    else {
        celsius[i] = Number(celsius[i]);
        i++;
    }
    var i = 0;
    while(i < celsius.length){
        fahrenheit.push((1.8 * celsius[i] + 32).toFixed(2));
        i++;
    }
    var i = 0;
    while(i < fahrenheit.length){
        fahrenheit[i] = Number(fahrenheit[i]);
        i++;
    }
    console.log(`Temperatures in °C => `, celsius);
    console.log(`Temperatures in °F => `, fahrenheit);
};
var $856e462e9bd8efdd$export$2e2bcd8739ae039 = $856e462e9bd8efdd$var$Exercise10;







const $14101d2d51cac0cb$var$getInput = (parcelRequire("iadAQ"))({
    sigint: true
});
let $14101d2d51cac0cb$var$exercises = [
    {
        name: "To-Do List | Array Splice Method",
        exerciseFn: ()=>(0, $d8f7f67e0e477d55$export$2e2bcd8739ae039)()
    },
    {
        name: "Print Arithmetic Table using While Loop",
        exerciseFn: ()=>(0, $bc7e16aef7d00425$export$2e2bcd8739ae039)()
    },
    {
        name: "Add a value at specified index in the given array.",
        exerciseFn: ()=>(0, $4850b84a2f132f23$export$2e2bcd8739ae039)([
                "Hello",
                "Everyone",
                "Name",
                "is",
                "Hamza"
            ], 2, "My")
    },
    {
        name: "Functioning Shopping Cart",
        exerciseFn: ()=>(0, $dccfa866acc20154$export$2e2bcd8739ae039)()
    },
    {
        name: "Print first 25 Integers using 'while loop'.",
        exerciseFn: ()=>(0, $30eb706e46580473$export$2e2bcd8739ae039)()
    },
    {
        name: "Print first 10 even numbers using 'while loop'.",
        exerciseFn: ()=>(0, $fc6fd38d520803fe$export$2e2bcd8739ae039)()
    },
    {
        name: "Calculate Factorial",
        exerciseFn: ()=>(0, $a7bfd731574e6e6e$export$2e2bcd8739ae039)()
    },
    {
        name: "Remove Number from Array if Negative",
        exerciseFn: ()=>(0, $37bd4aa8b3b4f712$export$2e2bcd8739ae039)()
    },
    {
        name: "Find Sum of Numbers Stored in Array",
        exerciseFn: ()=>(0, $7a627cda7e40c881$export$2e2bcd8739ae039)()
    },
    {
        name: "Convert List of \xb0C Temperatures to \xb0F",
        exerciseFn: ()=>(0, $856e462e9bd8efdd$export$2e2bcd8739ae039)()
    }
];
console.log(`/************************/`);
console.log(`Choose Exercise #`);
console.log(`/************************/`);
$14101d2d51cac0cb$var$exercises.forEach((element, index)=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`${index + 1} - ${element["name"]}`);
});
(0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
console.log(`e - Exit`);
(0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
let $14101d2d51cac0cb$var$exercise_no = $14101d2d51cac0cb$var$getInput("Enter Exercise # to Run: ");
let $14101d2d51cac0cb$var$runExerciseNo = $14101d2d51cac0cb$var$exercise_no == "e" || $14101d2d51cac0cb$var$exercise_no >= 1 && $14101d2d51cac0cb$var$exercise_no <= $14101d2d51cac0cb$var$exercises.length;
while($14101d2d51cac0cb$var$runExerciseNo == false)$14101d2d51cac0cb$var$exercise_no = $14101d2d51cac0cb$var$getInput("Please Enter Exercise # to Run: ");
let $14101d2d51cac0cb$var$exitProgram = $14101d2d51cac0cb$var$exercise_no == `e`;
while(!$14101d2d51cac0cb$var$exitProgram){
    console.log(`==================`);
    console.log(`Exercise ${$14101d2d51cac0cb$var$exercise_no}: ${$14101d2d51cac0cb$var$exercises[$14101d2d51cac0cb$var$exercise_no - 1].name}`);
    console.log(`==================`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    $14101d2d51cac0cb$var$exercises[$14101d2d51cac0cb$var$exercise_no - 1].exerciseFn();
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    $14101d2d51cac0cb$var$getInput("Press Enter to Continue...");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`/************************/`);
    console.log(`Choose Exercise #`);
    console.log(`/************************/`);
    $14101d2d51cac0cb$var$exercises.forEach((element, index)=>{
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`${index + 1} - ${element["name"]}`);
    });
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`e - Exit`);
    $14101d2d51cac0cb$var$exercise_no = $14101d2d51cac0cb$var$getInput("Enter Exercise # to Run: ");
    $14101d2d51cac0cb$var$exitProgram = $14101d2d51cac0cb$var$exercise_no == "e";
}
console.log(`Exit`);
$9kqO2$process.exit(0);


//# sourceMappingURL=index.js.map
