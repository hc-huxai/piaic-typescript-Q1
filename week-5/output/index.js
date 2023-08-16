var $eyxLw$process = require("process");
var $eyxLw$buffer = require("buffer");
var $eyxLw$fs = require("fs");

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


var $d393b47c74009737$require$Buffer = $eyxLw$buffer.Buffer;
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
        var fd = $eyxLw$process.platform === "win32" ? $eyxLw$process.stdin.fd : $eyxLw$fs.openSync("/dev/tty", "rs");
        var wasRaw = $eyxLw$process.stdin.isRaw;
        if (!wasRaw) $eyxLw$process.stdin.setRawMode && $eyxLw$process.stdin.setRawMode(true);
        var buf = $d393b47c74009737$require$Buffer.alloc(3);
        var str = "", character, read;
        savedstr = "";
        if (ask) $eyxLw$process.stdout.write(ask);
        var cycle = 0;
        var prevComplete;
        while(true){
            read = $eyxLw$fs.readSync(fd, buf, 0, 3);
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
                        $eyxLw$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
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
                        $eyxLw$process.stdout.write("\x1b[2K\x1b[0G" + ask + str + "\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    case "\x1b[D":
                        if (masked) break;
                        var before = insert;
                        insert = --insert < 0 ? 0 : insert;
                        if (before - insert) $eyxLw$process.stdout.write("\x1b[1D");
                        break;
                    case "\x1b[C":
                        if (masked) break;
                        insert = ++insert > str.length ? str.length : insert;
                        $eyxLw$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    default:
                        if (buf.toString()) {
                            str = str + buf.toString();
                            str = str.replace(/\0/g, "");
                            insert = str.length;
                            promptPrint(masked, ask, echo, str, insert);
                            $eyxLw$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                            buf = $d393b47c74009737$require$Buffer.alloc(3);
                        }
                }
                continue; // any other 3 character sequence is ignored
            }
            // if it is not a control character seq, assume only one character is read
            character = buf[read - 1];
            // catch a ^C and return null
            if (character == 3) {
                $eyxLw$process.stdout.write("^C\n");
                $eyxLw$fs.closeSync(fd);
                if (sigint) $eyxLw$process.exit(130);
                $eyxLw$process.stdin.setRawMode && $eyxLw$process.stdin.setRawMode(wasRaw);
                return null;
            }
            // catch a ^D and exit
            if (character == 4) {
                if (str.length == 0 && eot) {
                    $eyxLw$process.stdout.write("exit\n");
                    $eyxLw$process.exit(0);
                }
            }
            // catch the terminating character
            if (character == $d393b47c74009737$var$term) {
                $eyxLw$fs.closeSync(fd);
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
                    $eyxLw$process.stdout.write("	");
                    continue;
                }
                var item = res[cycle++] || res[cycle = 0, cycle++];
                if (item) {
                    $eyxLw$process.stdout.write("\r\x1b[K" + ask + item);
                    str = item;
                    insert = item.length;
                }
            }
            if (character == 127 || $eyxLw$process.platform == "win32" && character == 8) {
                if (!insert) continue;
                str = str.slice(0, insert - 1) + str.slice(insert);
                insert--;
                $eyxLw$process.stdout.write("\x1b[2D");
            } else {
                if (character < 32 || character > 126) continue;
                str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);
                insert++;
            }
            promptPrint(masked, ask, echo, str, insert);
        }
        $eyxLw$process.stdout.write("\n");
        $eyxLw$process.stdin.setRawMode && $eyxLw$process.stdin.setRawMode(wasRaw);
        return str || value || "";
    }
    function promptPrint(masked, ask, echo, str, insert) {
        if (masked) $eyxLw$process.stdout.write("\x1b[2K\x1b[0G" + ask + Array(str.length + 1).join(echo));
        else {
            $eyxLw$process.stdout.write("\x1b[s");
            if (insert == str.length) $eyxLw$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else if (ask) $eyxLw$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else $eyxLw$process.stdout.write("\x1b[2K\x1b[0G" + str + "\x1b[" + (str.length - insert) + "D");
            // Reposition the cursor to the right of the insertion point
            var askLength = $5myiz(ask).length;
            $eyxLw$process.stdout.write(`\u001b[${askLength + 1 + (echo == "" ? 0 : insert)}G`);
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
Object.defineProperty(module.exports, "__esModule", {
    value: true
});
var $47cc429db2280c35$exports = {};
"use strict";
Object.defineProperty($47cc429db2280c35$exports, "__esModule", {
    value: true
});
$47cc429db2280c35$exports.Exercise10 = $47cc429db2280c35$exports.Exercise09 = $47cc429db2280c35$exports.Exercise08 = $47cc429db2280c35$exports.Exercise07 = $47cc429db2280c35$exports.Exercise06 = $47cc429db2280c35$exports.Exercise05 = $47cc429db2280c35$exports.Exercise04 = $47cc429db2280c35$exports.Exercise03 = $47cc429db2280c35$exports.Exercise02 = $47cc429db2280c35$exports.Exercise01 = void 0;
var $d6d1a4d626e2997f$exports = {};
"use strict";
Object.defineProperty($d6d1a4d626e2997f$exports, "__esModule", {
    value: true
});
var $d6d1a4d626e2997f$var$Exercise01 = function() {
    var tasks = [
        "Learn Python",
        "Learn TypeScript",
        "Learn Flutter",
        "Learn ML"
    ];
    tasks.forEach(function(task, index) {
        console.log("".concat(index + 1, ". ").concat(task));
    });
    var evenToDo = function(array) {
        array.splice(array.length / 2 - 1, 2);
    };
    var oddToDo = function(array) {
        array.splice(Math.floor(array.length / 2), 1);
    };
    tasks.length % 2 == 0 ? evenToDo(tasks) : oddToDo(tasks);
    console.log(tasks);
};
$d6d1a4d626e2997f$exports.default = $d6d1a4d626e2997f$var$Exercise01;


$47cc429db2280c35$exports.Exercise01 = $d6d1a4d626e2997f$exports.default;
var $6e967552c5f9eab9$exports = {};
"use strict";
Object.defineProperty($6e967552c5f9eab9$exports, "__esModule", {
    value: true
});

var $6e967552c5f9eab9$var$Exercise02 = function() {
    var getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    var tableNum = Number(getInput("Enter any number => "));
    for(var i = 1; i <= 10; i++)console.log("".concat(tableNum, " x ").concat(i, " = ").concat(tableNum * i));
};
$6e967552c5f9eab9$exports.default = $6e967552c5f9eab9$var$Exercise02;


$47cc429db2280c35$exports.Exercise02 = $6e967552c5f9eab9$exports.default;
var $4d44e1bd5364a5a5$exports = {};
"use strict";
Object.defineProperty($4d44e1bd5364a5a5$exports, "__esModule", {
    value: true
});
var $fba3d0951e2bbb83$exports = {};
"use strict";
Object.defineProperty($fba3d0951e2bbb83$exports, "__esModule", {
    value: true
});
$fba3d0951e2bbb83$exports.Spacer = void 0;
var $a77e193397c80957$exports = {};
"use strict";
Object.defineProperty($a77e193397c80957$exports, "__esModule", {
    value: true
});
var $a77e193397c80957$var$Spacer = function(numOfSpaces) {
    if (numOfSpaces == undefined) console.log();
    else for(var i = 1; i <= numOfSpaces; i++)console.log();
};
$a77e193397c80957$exports.default = $a77e193397c80957$var$Spacer;


$fba3d0951e2bbb83$exports.Spacer = $a77e193397c80957$exports.default;


var $4d44e1bd5364a5a5$var$Exercise03 = function(array, index, value) {
    console.log('Inserting value "'.concat(value, '" at index ').concat(index, " of array =>"));
    console.log(array);
    array.splice(index, 0, value);
    (0, $fba3d0951e2bbb83$exports.Spacer)();
    console.log("Modified Array => ", array);
};
$4d44e1bd5364a5a5$exports.default = $4d44e1bd5364a5a5$var$Exercise03;


$47cc429db2280c35$exports.Exercise03 = $4d44e1bd5364a5a5$exports.default;
var $2d1f38d194e6b56e$exports = {};
"use strict";
Object.defineProperty($2d1f38d194e6b56e$exports, "__esModule", {
    value: true
});

var $2d1f38d194e6b56e$var$getInput = (parcelRequire("iadAQ"))({
    sigint: true
});

var $2d1f38d194e6b56e$var$Exercise04 = function() {
    var cartItems = [
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
    var listCartItems = function(cart) {
        cart.forEach(function(element, index) {
            var tempArray = element.name.split(" ");
            var itemName = "";
            if (tempArray.length > 1) tempArray.forEach(function(name) {
                itemName += name[0].toUpperCase() + name.substr(1).toLowerCase() + " ";
            });
            else itemName = element.name[0].toUpperCase() + element.name.substr(1).toLowerCase();
            console.log("".concat(index + 1, ". ").concat(itemName.trim(), " | Quantity: ").concat(element.quantity));
        });
    };
    (0, $fba3d0951e2bbb83$exports.Spacer)(2);
    console.log("Cart =>");
    listCartItems(cartItems);
    (0, $fba3d0951e2bbb83$exports.Spacer)();
    var action = "";
    var getAction = function() {
        (0, $fba3d0951e2bbb83$exports.Spacer)(2);
        console.log("Actions:");
        console.log("l - List Items in Cart");
        console.log("a - Add Item to Cart");
        console.log("r - Remove Item From Cart");
        console.log("u - Update Name/Item in Cart");
        console.log("c - Clear All Items In Cart");
        console.log("e - exit");
        (0, $fba3d0951e2bbb83$exports.Spacer)();
        action = $2d1f38d194e6b56e$var$getInput("Enter Action Shortcut => ");
    };
    getAction();
    // Actions' Function
    // Add
    var addItem = function(array) {
        var item = $2d1f38d194e6b56e$var$getInput("Enter Item Name => ");
        var itemQuantity = $2d1f38d194e6b56e$var$getInput("Enter Item Quantity => ");
        var exit = "";
        if (item == null && itemQuantity == null) exit = $2d1f38d194e6b56e$var$getInput("Do you want to exit (Y/N)? ");
        if (!itemQuantity) {
            console.log("Item Quantity was not specified. So item is added with quantity '1'.");
            itemQuantity = 1;
        }
        if (exit == "Y") ;
        else {
            array.push({
                name: item,
                quantity: itemQuantity
            });
            (0, $fba3d0951e2bbb83$exports.Spacer)();
            console.log('Item "'.concat(item, '" with quantity ').concat(itemQuantity, " added."));
            (0, $fba3d0951e2bbb83$exports.Spacer)();
        }
    };
    // Remove
    var removeItemFromCart = function(array) {
        listCartItems(array);
        (0, $fba3d0951e2bbb83$exports.Spacer)();
        var itemToRemoveIndex = $2d1f38d194e6b56e$var$getInput("Which Item # Do You Want to Remove? (1-".concat(array.length, ") "));
        array.splice(itemToRemoveIndex - 1, 1);
        (0, $fba3d0951e2bbb83$exports.Spacer)();
        console.log("Removed");
    };
    // Update
    var updateCart = function(array) {
        listCartItems(array);
        (0, $fba3d0951e2bbb83$exports.Spacer)();
        var itemToUpdateIndex = $2d1f38d194e6b56e$var$getInput("Which Item # Do You Want to Update? (1-".concat(array.length, ") "));
        console.log("Leave empty if don't want to change.");
        var updatedItemName = $2d1f38d194e6b56e$var$getInput("Updated Item Name => ");
        var updatedItemQuantity = parseInt($2d1f38d194e6b56e$var$getInput("Updated Item Quantity => "));
        updatedItemQuantity = !updatedItemQuantity ? array[itemToUpdateIndex - 1].quantity : updatedItemQuantity;
        array.splice(itemToUpdateIndex - 1, 1, {
            name: updatedItemName,
            quantity: updatedItemQuantity
        });
        (0, $fba3d0951e2bbb83$exports.Spacer)();
        console.log("Updated");
    };
    // Clear
    var clearCart = function(array) {
        array = [];
        console.log("All items are removed from cart.");
    };
    var shouldExit = action == "e" ? false : true;
    while(shouldExit){
        switch(action){
            case "a":
                // add new item
                addItem(cartItems);
                (0, $fba3d0951e2bbb83$exports.Spacer)();
                getAction();
                break;
            case "l":
                // List all Items in Cart
                listCartItems(cartItems);
                (0, $fba3d0951e2bbb83$exports.Spacer)();
                getAction();
                break;
            case "r":
                // remove existing items from the cart
                removeItemFromCart(cartItems);
                (0, $fba3d0951e2bbb83$exports.Spacer)();
                getAction();
                break;
            case "u":
                // update quantities of an item already present on the cart
                updateCart(cartItems);
                (0, $fba3d0951e2bbb83$exports.Spacer)();
                getAction();
                break;
            case "c":
                // clear all items from the cart
                clearCart(cartItems);
                (0, $fba3d0951e2bbb83$exports.Spacer)();
                getAction();
                break;
            default:
                action = $2d1f38d194e6b56e$var$getInput("Invalid Shortcut, Please Try Again => ");
                break;
        }
        shouldExit = action == "e" ? false : true;
    }
    console.log("Exited");
};
$2d1f38d194e6b56e$exports.default = $2d1f38d194e6b56e$var$Exercise04;


$47cc429db2280c35$exports.Exercise04 = $2d1f38d194e6b56e$exports.default;
var $58202ce722846fd4$exports = {};
"use strict";
Object.defineProperty($58202ce722846fd4$exports, "__esModule", {
    value: true
});
// Print the first 25 integers using while loop.
var $58202ce722846fd4$var$Exercise05 = function() {
    var i = 1;
    while(i <= 25){
        console.log(i);
        i++;
    }
};
$58202ce722846fd4$exports.default = $58202ce722846fd4$var$Exercise05;


$47cc429db2280c35$exports.Exercise05 = $58202ce722846fd4$exports.default;
var $e7eda70688b5ac7c$exports = {};
"use strict";
Object.defineProperty($e7eda70688b5ac7c$exports, "__esModule", {
    value: true
});
// Print first 10 even numbers using while loop
var $e7eda70688b5ac7c$var$Exercise06 = function() {
    var i = 1;
    while(i <= 10){
        console.log(2 * i);
        i++;
    }
};
$e7eda70688b5ac7c$exports.default = $e7eda70688b5ac7c$var$Exercise06;


$47cc429db2280c35$exports.Exercise06 = $e7eda70688b5ac7c$exports.default;
var $4f244fe71d46539d$exports = {};
"use strict";
Object.defineProperty($4f244fe71d46539d$exports, "__esModule", {
    value: true
});


// Create a function to input a positive number and calculates its factorial.
var $4f244fe71d46539d$var$Exercise07 = function() {
    var getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    var number = getInput("Enter number for calculating factorial => ");
    var factorial = 1;
    while(number < 1){
        (0, $fba3d0951e2bbb83$exports.Spacer)();
        console.log("The number is negative.");
        number = getInput("Please Enter a Positive Number => ");
    }
    number = Number(number);
    console.log("Given Number: ".concat(number));
    while(number >= 1){
        factorial *= number;
        number--;
    }
    console.log("Factorial: ".concat(factorial));
};
$4f244fe71d46539d$exports.default = $4f244fe71d46539d$var$Exercise07;


$47cc429db2280c35$exports.Exercise07 = $4f244fe71d46539d$exports.default;
var $8c9c9e82cd651375$exports = {};
"use strict";
Object.defineProperty($8c9c9e82cd651375$exports, "__esModule", {
    value: true
});

var $8c9c9e82cd651375$var$Exercise08 = function() {
    var getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    // For taking input from user.
    console.log("Please Enter Numbers separated by a single space.");
    var numList = getInput("=> ");
    var numArray = numList.split(" "); // Array to store the number entered by User.
    for(var i_1 = 0; i_1 < numArray.length; i_1++)if (isNaN(numArray[i_1])) console.log("".concat(numArray[i_1], " is not a number"));
    else numArray[i_1] = Number(numArray[i_1]);
    console.log("Initial Array =>", numArray);
    var i = 0;
    while(i < numArray.length)if (numArray[i] < 0) {
        numArray.splice(i, 1);
        i--;
    } else i++;
    console.log("Array after Removing Negatives =>", numArray);
};
$8c9c9e82cd651375$exports.default = $8c9c9e82cd651375$var$Exercise08;


$47cc429db2280c35$exports.Exercise08 = $8c9c9e82cd651375$exports.default;
var $55c042a585464618$exports = {};
"use strict";
Object.defineProperty($55c042a585464618$exports, "__esModule", {
    value: true
});

// Calculate sum of numbers in array
var $55c042a585464618$var$Exercise09 = function() {
    var getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    // For taking input from user.
    console.log("Please Enter Numbers separated by a single space.");
    var numList = getInput("=> ");
    var numArray = numList.split(" "); // Array to store the number entered by User.
    for(var i = 0; i < numArray.length; i++)if (isNaN(numArray[i])) console.log("".concat(numArray[i], " is not a number"));
    else numArray[i] = Number(numArray[i]);
    console.log("Array of Numbers:-");
    console.log(numArray);
    var sum = 0;
    var index = 0;
    while(index < numArray.length){
        if (isNaN(numArray[index])) console.log("".concat(numArray[index], " is not a number"));
        else sum += numArray[index];
        index++;
    }
    console.log("Sum: ".concat(sum));
};
$55c042a585464618$exports.default = $55c042a585464618$var$Exercise09;


$47cc429db2280c35$exports.Exercise09 = $55c042a585464618$exports.default;
var $bf10c63d936cd915$exports = {};
"use strict";
Object.defineProperty($bf10c63d936cd915$exports, "__esModule", {
    value: true
});

var $bf10c63d936cd915$var$Exercise10 = function() {
    var getInput = (parcelRequire("iadAQ"))({
        sigint: true
    });
    // For taking input from user.
    console.log("Please Enter Numbers separated by a single space.");
    var numList = getInput("=> ");
    var celsius = numList.split(" "); // Array to store the number entered by User.
    var fahrenheit = [];
    for(var i = 0; i < celsius.length; i++)if (isNaN(Number(celsius[i]))) console.log("".concat(celsius[i], " is not a temperature"));
    else celsius[i] = Number(celsius[i]);
    for(var i = 0; i < celsius.length; i++)fahrenheit.push((1.8 * celsius[i] + 32).toFixed(2));
    for(var i = 0; i < fahrenheit.length; i++)fahrenheit[i] = Number(fahrenheit[i]);
    console.log("Temperatures in \xb0C => ", celsius);
    console.log("Temperatures in \xb0F => ", fahrenheit);
};
$bf10c63d936cd915$exports.default = $bf10c63d936cd915$var$Exercise10;


$47cc429db2280c35$exports.Exercise10 = $bf10c63d936cd915$exports.default;




var $9c47469fb9776743$var$getInput = (parcelRequire("iadAQ"))({
    sigint: true
});
var $9c47469fb9776743$var$exercises = [
    {
        name: "To-Do List | Array Splice Method",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise01)();
        }
    },
    {
        name: "Print Arithmetic Table using While Loop",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise02)();
        }
    },
    {
        name: "Add a value at specified index in the given array.",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise03)([
                "Hello",
                "Everyone",
                "Name",
                "is",
                "Hamza"
            ], 2, "My");
        }
    },
    {
        name: "Functioning Shopping Cart",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise04)();
        }
    },
    {
        name: "Print first 25 Integers using 'while loop'.",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise05)();
        }
    },
    {
        name: "Print first 10 even numbers using 'while loop'.",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise06)();
        }
    },
    {
        name: "Calculate Factorial",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise07)();
        }
    },
    {
        name: "Remove Number from Array if Negative",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise08)();
        }
    },
    {
        name: "Find Sum of Numbers Stored in Array",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise09)();
        }
    },
    {
        name: "Convert List of \xb0C Temperatures to \xb0F",
        exerciseFn: function() {
            return (0, $47cc429db2280c35$exports.Exercise10)();
        }
    }
];
console.log("/************************/");
console.log("Choose Exercise #");
console.log("/************************/");
$9c47469fb9776743$var$exercises.forEach(function(element, index) {
    (0, $fba3d0951e2bbb83$exports.Spacer)();
    console.log("".concat(index + 1, " - ").concat(element["name"]));
});
(0, $fba3d0951e2bbb83$exports.Spacer)();
console.log("e - Exit");
(0, $fba3d0951e2bbb83$exports.Spacer)();
var $9c47469fb9776743$var$exercise_no = $9c47469fb9776743$var$getInput("Enter Exercise # to Run: ");
var $9c47469fb9776743$var$runExerciseNo = $9c47469fb9776743$var$exercise_no == "e" || $9c47469fb9776743$var$exercise_no >= 1 && $9c47469fb9776743$var$exercise_no <= $9c47469fb9776743$var$exercises.length;
while($9c47469fb9776743$var$runExerciseNo == false)$9c47469fb9776743$var$exercise_no = $9c47469fb9776743$var$getInput("Please Enter Exercise # to Run: ");
var $9c47469fb9776743$var$exitProgram = $9c47469fb9776743$var$exercise_no == "e";
while(!$9c47469fb9776743$var$exitProgram){
    console.log("==================");
    console.log("Exercise ".concat($9c47469fb9776743$var$exercise_no, ": ").concat($9c47469fb9776743$var$exercises[$9c47469fb9776743$var$exercise_no - 1].name));
    console.log("==================");
    (0, $fba3d0951e2bbb83$exports.Spacer)();
    $9c47469fb9776743$var$exercises[$9c47469fb9776743$var$exercise_no - 1].exerciseFn();
    (0, $fba3d0951e2bbb83$exports.Spacer)(2);
    $9c47469fb9776743$var$getInput("Press Enter to Continue...");
    (0, $fba3d0951e2bbb83$exports.Spacer)();
    console.log("/************************/");
    console.log("Choose Exercise #");
    console.log("/************************/");
    $9c47469fb9776743$var$exercises.forEach(function(element, index) {
        (0, $fba3d0951e2bbb83$exports.Spacer)();
        console.log("".concat(index + 1, " - ").concat(element["name"]));
    });
    (0, $fba3d0951e2bbb83$exports.Spacer)();
    console.log("e - Exit");
    $9c47469fb9776743$var$exercise_no = $9c47469fb9776743$var$getInput("Enter Exercise # to Run: ");
    $9c47469fb9776743$var$exitProgram = $9c47469fb9776743$var$exercise_no == "e";
}
console.log("Exit");
$eyxLw$process.exit(0);