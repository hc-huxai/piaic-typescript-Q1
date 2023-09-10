var $4ZM61$process = require("process");
var $4ZM61$buffer = require("buffer");
var $4ZM61$fs = require("fs");
var $4ZM61$nodetimerspromises = require("node:timers/promises");
var $4ZM61$nodeprocess = require("node:process");
var $4ZM61$nodereadline = require("node:readline");
var $4ZM61$nodetty = require("node:tty");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
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


var $d393b47c74009737$require$Buffer = $4ZM61$buffer.Buffer;
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
        var fd = $4ZM61$process.platform === "win32" ? $4ZM61$process.stdin.fd : $4ZM61$fs.openSync("/dev/tty", "rs");
        var wasRaw = $4ZM61$process.stdin.isRaw;
        if (!wasRaw) $4ZM61$process.stdin.setRawMode && $4ZM61$process.stdin.setRawMode(true);
        var buf = $d393b47c74009737$require$Buffer.alloc(3);
        var str = "", character, read;
        savedstr = "";
        if (ask) $4ZM61$process.stdout.write(ask);
        var cycle = 0;
        var prevComplete;
        while(true){
            read = $4ZM61$fs.readSync(fd, buf, 0, 3);
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
                        $4ZM61$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
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
                        $4ZM61$process.stdout.write("\x1b[2K\x1b[0G" + ask + str + "\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    case "\x1b[D":
                        if (masked) break;
                        var before = insert;
                        insert = --insert < 0 ? 0 : insert;
                        if (before - insert) $4ZM61$process.stdout.write("\x1b[1D");
                        break;
                    case "\x1b[C":
                        if (masked) break;
                        insert = ++insert > str.length ? str.length : insert;
                        $4ZM61$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    default:
                        if (buf.toString()) {
                            str = str + buf.toString();
                            str = str.replace(/\0/g, "");
                            insert = str.length;
                            promptPrint(masked, ask, echo, str, insert);
                            $4ZM61$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                            buf = $d393b47c74009737$require$Buffer.alloc(3);
                        }
                }
                continue; // any other 3 character sequence is ignored
            }
            // if it is not a control character seq, assume only one character is read
            character = buf[read - 1];
            // catch a ^C and return null
            if (character == 3) {
                $4ZM61$process.stdout.write("^C\n");
                $4ZM61$fs.closeSync(fd);
                if (sigint) $4ZM61$process.exit(130);
                $4ZM61$process.stdin.setRawMode && $4ZM61$process.stdin.setRawMode(wasRaw);
                return null;
            }
            // catch a ^D and exit
            if (character == 4) {
                if (str.length == 0 && eot) {
                    $4ZM61$process.stdout.write("exit\n");
                    $4ZM61$process.exit(0);
                }
            }
            // catch the terminating character
            if (character == $d393b47c74009737$var$term) {
                $4ZM61$fs.closeSync(fd);
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
                    $4ZM61$process.stdout.write("	");
                    continue;
                }
                var item = res[cycle++] || res[cycle = 0, cycle++];
                if (item) {
                    $4ZM61$process.stdout.write("\r\x1b[K" + ask + item);
                    str = item;
                    insert = item.length;
                }
            }
            if (character == 127 || $4ZM61$process.platform == "win32" && character == 8) {
                if (!insert) continue;
                str = str.slice(0, insert - 1) + str.slice(insert);
                insert--;
                $4ZM61$process.stdout.write("\x1b[2D");
            } else {
                if (character < 32 || character > 126) continue;
                str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);
                insert++;
            }
            promptPrint(masked, ask, echo, str, insert);
        }
        $4ZM61$process.stdout.write("\n");
        $4ZM61$process.stdin.setRawMode && $4ZM61$process.stdin.setRawMode(wasRaw);
        return str || value || "";
    }
    function promptPrint(masked, ask, echo, str, insert) {
        if (masked) $4ZM61$process.stdout.write("\x1b[2K\x1b[0G" + ask + Array(str.length + 1).join(echo));
        else {
            $4ZM61$process.stdout.write("\x1b[s");
            if (insert == str.length) $4ZM61$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else if (ask) $4ZM61$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else $4ZM61$process.stdout.write("\x1b[2K\x1b[0G" + str + "\x1b[" + (str.length - insert) + "D");
            // Reposition the cursor to the right of the insertion point
            var askLength = $5myiz(ask).length;
            $4ZM61$process.stdout.write(`\u001b[${askLength + 1 + (echo == "" ? 0 : insert)}G`);
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



/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $51bb340f01d0728b$var$Exercise01 = ()=>{
    console.log(`Node,js, TypeScript & VS Code installed...`);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise01();
$51bb340f01d0728b$export$2e2bcd8739ae039 = $51bb340f01d0728b$var$Exercise01;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $ec67c6e6838e20cc$var$Exercise02 = ()=>{
    let pname = "Hamza";
    console.log(`Hello ${pname}, would you like to learn some TypeScript today?`);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise02();
$ec67c6e6838e20cc$export$2e2bcd8739ae039 = $ec67c6e6838e20cc$var$Exercise02;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ /*
 * This Spacer() function is used to enter blank lines in the output.
 * It basically uses console.log(), but the advantage here is that
 * it also takes a parameter of type number.
 * The value determines the number of blank lines in output.
 */ const $9843d36a0715bc80$var$Spacer = (numOfSpaces)=>{
    for(let i = 1; i <= (numOfSpaces == undefined ? 1 : numOfSpaces); i++)console.log();
};
var $9843d36a0715bc80$export$2e2bcd8739ae039 = $9843d36a0715bc80$var$Spacer;



const $ab736cffb96f66c4$var$getInput = (parcelRequire("iadAQ"))({
    sigint: true
});
var $ab736cffb96f66c4$export$2e2bcd8739ae039 = $ab736cffb96f66c4$var$getInput;



const $d1580876ca345cc2$var$SpaceAround = (fn, spaceAbove, spaceBelow)=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(spaceAbove);
    fn();
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(spaceBelow);
};
var $d1580876ca345cc2$export$2e2bcd8739ae039 = $d1580876ca345cc2$var$SpaceAround;


var $20c3508873313be3$exports = {};
"use strict";
const $20c3508873313be3$var$ESC = "\x1b";
const $20c3508873313be3$var$CSI = `${$20c3508873313be3$var$ESC}[`;
const $20c3508873313be3$var$beep = "\x07";
const $20c3508873313be3$var$cursor = {
    to (x, y) {
        if (!y) return `${$20c3508873313be3$var$CSI}${x + 1}G`;
        return `${$20c3508873313be3$var$CSI}${y + 1};${x + 1}H`;
    },
    move (x, y) {
        let ret = "";
        if (x < 0) ret += `${$20c3508873313be3$var$CSI}${-x}D`;
        else if (x > 0) ret += `${$20c3508873313be3$var$CSI}${x}C`;
        if (y < 0) ret += `${$20c3508873313be3$var$CSI}${-y}A`;
        else if (y > 0) ret += `${$20c3508873313be3$var$CSI}${y}B`;
        return ret;
    },
    up: (count = 1)=>`${$20c3508873313be3$var$CSI}${count}A`,
    down: (count = 1)=>`${$20c3508873313be3$var$CSI}${count}B`,
    forward: (count = 1)=>`${$20c3508873313be3$var$CSI}${count}C`,
    backward: (count = 1)=>`${$20c3508873313be3$var$CSI}${count}D`,
    nextLine: (count = 1)=>`${$20c3508873313be3$var$CSI}E`.repeat(count),
    prevLine: (count = 1)=>`${$20c3508873313be3$var$CSI}F`.repeat(count),
    left: `${$20c3508873313be3$var$CSI}G`,
    hide: `${$20c3508873313be3$var$CSI}?25l`,
    show: `${$20c3508873313be3$var$CSI}?25h`,
    save: `${$20c3508873313be3$var$ESC}7`,
    restore: `${$20c3508873313be3$var$ESC}8`
};
const $20c3508873313be3$var$scroll = {
    up: (count = 1)=>`${$20c3508873313be3$var$CSI}S`.repeat(count),
    down: (count = 1)=>`${$20c3508873313be3$var$CSI}T`.repeat(count)
};
const $20c3508873313be3$var$erase = {
    screen: `${$20c3508873313be3$var$CSI}2J`,
    up: (count = 1)=>`${$20c3508873313be3$var$CSI}1J`.repeat(count),
    down: (count = 1)=>`${$20c3508873313be3$var$CSI}J`.repeat(count),
    line: `${$20c3508873313be3$var$CSI}2K`,
    lineEnd: `${$20c3508873313be3$var$CSI}K`,
    lineStart: `${$20c3508873313be3$var$CSI}1K`,
    lines (count) {
        let clear = "";
        for(let i = 0; i < count; i++)clear += this.line + (i < count - 1 ? $20c3508873313be3$var$cursor.up() : "");
        if (count) clear += $20c3508873313be3$var$cursor.left;
        return clear;
    }
};
$20c3508873313be3$exports = {
    cursor: $20c3508873313be3$var$cursor,
    scroll: $20c3508873313be3$var$scroll,
    erase: $20c3508873313be3$var$erase,
    beep: $20c3508873313be3$var$beep
};





var $29d7e986dc07f364$exports = {};
var $29d7e986dc07f364$var$x = String;
var $29d7e986dc07f364$var$create = function() {
    return {
        isColorSupported: false,
        reset: $29d7e986dc07f364$var$x,
        bold: $29d7e986dc07f364$var$x,
        dim: $29d7e986dc07f364$var$x,
        italic: $29d7e986dc07f364$var$x,
        underline: $29d7e986dc07f364$var$x,
        inverse: $29d7e986dc07f364$var$x,
        hidden: $29d7e986dc07f364$var$x,
        strikethrough: $29d7e986dc07f364$var$x,
        black: $29d7e986dc07f364$var$x,
        red: $29d7e986dc07f364$var$x,
        green: $29d7e986dc07f364$var$x,
        yellow: $29d7e986dc07f364$var$x,
        blue: $29d7e986dc07f364$var$x,
        magenta: $29d7e986dc07f364$var$x,
        cyan: $29d7e986dc07f364$var$x,
        white: $29d7e986dc07f364$var$x,
        gray: $29d7e986dc07f364$var$x,
        bgBlack: $29d7e986dc07f364$var$x,
        bgRed: $29d7e986dc07f364$var$x,
        bgGreen: $29d7e986dc07f364$var$x,
        bgYellow: $29d7e986dc07f364$var$x,
        bgBlue: $29d7e986dc07f364$var$x,
        bgMagenta: $29d7e986dc07f364$var$x,
        bgCyan: $29d7e986dc07f364$var$x,
        bgWhite: $29d7e986dc07f364$var$x
    };
};
$29d7e986dc07f364$exports = $29d7e986dc07f364$var$create();
$29d7e986dc07f364$exports.createColors = $29d7e986dc07f364$var$create;



function $5b576c8711ddc012$var$z({ onlyFirst: t1 = !1 } = {}) {
    const u = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(u, t1 ? void 0 : "g");
}
function $5b576c8711ddc012$var$$(t1) {
    if (typeof t1 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof t1}\``);
    return t1.replace($5b576c8711ddc012$var$z(), "");
}
var $5b576c8711ddc012$var$m = {}, $5b576c8711ddc012$var$G = {
    get exports () {
        return $5b576c8711ddc012$var$m;
    },
    set exports (t){
        $5b576c8711ddc012$var$m = t;
    }
};
(function(t1) {
    var u = {};
    t1.exports = u, u.eastAsianWidth = function(e) {
        var s = e.charCodeAt(0), C = e.length == 2 ? e.charCodeAt(1) : 0, D = s;
        return 55296 <= s && s <= 56319 && 56320 <= C && C <= 57343 && (s &= 1023, C &= 1023, D = s << 10 | C, D += 65536), D == 12288 || 65281 <= D && D <= 65376 || 65504 <= D && D <= 65510 ? "F" : D == 8361 || 65377 <= D && D <= 65470 || 65474 <= D && D <= 65479 || 65482 <= D && D <= 65487 || 65490 <= D && D <= 65495 || 65498 <= D && D <= 65500 || 65512 <= D && D <= 65518 ? "H" : 4352 <= D && D <= 4447 || 4515 <= D && D <= 4519 || 4602 <= D && D <= 4607 || 9001 <= D && D <= 9002 || 11904 <= D && D <= 11929 || 11931 <= D && D <= 12019 || 12032 <= D && D <= 12245 || 12272 <= D && D <= 12283 || 12289 <= D && D <= 12350 || 12353 <= D && D <= 12438 || 12441 <= D && D <= 12543 || 12549 <= D && D <= 12589 || 12593 <= D && D <= 12686 || 12688 <= D && D <= 12730 || 12736 <= D && D <= 12771 || 12784 <= D && D <= 12830 || 12832 <= D && D <= 12871 || 12880 <= D && D <= 13054 || 13056 <= D && D <= 19903 || 19968 <= D && D <= 42124 || 42128 <= D && D <= 42182 || 43360 <= D && D <= 43388 || 44032 <= D && D <= 55203 || 55216 <= D && D <= 55238 || 55243 <= D && D <= 55291 || 63744 <= D && D <= 64255 || 65040 <= D && D <= 65049 || 65072 <= D && D <= 65106 || 65108 <= D && D <= 65126 || 65128 <= D && D <= 65131 || 110592 <= D && D <= 110593 || 127488 <= D && D <= 127490 || 127504 <= D && D <= 127546 || 127552 <= D && D <= 127560 || 127568 <= D && D <= 127569 || 131072 <= D && D <= 194367 || 177984 <= D && D <= 196605 || 196608 <= D && D <= 262141 ? "W" : 32 <= D && D <= 126 || 162 <= D && D <= 163 || 165 <= D && D <= 166 || D == 172 || D == 175 || 10214 <= D && D <= 10221 || 10629 <= D && D <= 10630 ? "Na" : D == 161 || D == 164 || 167 <= D && D <= 168 || D == 170 || 173 <= D && D <= 174 || 176 <= D && D <= 180 || 182 <= D && D <= 186 || 188 <= D && D <= 191 || D == 198 || D == 208 || 215 <= D && D <= 216 || 222 <= D && D <= 225 || D == 230 || 232 <= D && D <= 234 || 236 <= D && D <= 237 || D == 240 || 242 <= D && D <= 243 || 247 <= D && D <= 250 || D == 252 || D == 254 || D == 257 || D == 273 || D == 275 || D == 283 || 294 <= D && D <= 295 || D == 299 || 305 <= D && D <= 307 || D == 312 || 319 <= D && D <= 322 || D == 324 || 328 <= D && D <= 331 || D == 333 || 338 <= D && D <= 339 || 358 <= D && D <= 359 || D == 363 || D == 462 || D == 464 || D == 466 || D == 468 || D == 470 || D == 472 || D == 474 || D == 476 || D == 593 || D == 609 || D == 708 || D == 711 || 713 <= D && D <= 715 || D == 717 || D == 720 || 728 <= D && D <= 731 || D == 733 || D == 735 || 768 <= D && D <= 879 || 913 <= D && D <= 929 || 931 <= D && D <= 937 || 945 <= D && D <= 961 || 963 <= D && D <= 969 || D == 1025 || 1040 <= D && D <= 1103 || D == 1105 || D == 8208 || 8211 <= D && D <= 8214 || 8216 <= D && D <= 8217 || 8220 <= D && D <= 8221 || 8224 <= D && D <= 8226 || 8228 <= D && D <= 8231 || D == 8240 || 8242 <= D && D <= 8243 || D == 8245 || D == 8251 || D == 8254 || D == 8308 || D == 8319 || 8321 <= D && D <= 8324 || D == 8364 || D == 8451 || D == 8453 || D == 8457 || D == 8467 || D == 8470 || 8481 <= D && D <= 8482 || D == 8486 || D == 8491 || 8531 <= D && D <= 8532 || 8539 <= D && D <= 8542 || 8544 <= D && D <= 8555 || 8560 <= D && D <= 8569 || D == 8585 || 8592 <= D && D <= 8601 || 8632 <= D && D <= 8633 || D == 8658 || D == 8660 || D == 8679 || D == 8704 || 8706 <= D && D <= 8707 || 8711 <= D && D <= 8712 || D == 8715 || D == 8719 || D == 8721 || D == 8725 || D == 8730 || 8733 <= D && D <= 8736 || D == 8739 || D == 8741 || 8743 <= D && D <= 8748 || D == 8750 || 8756 <= D && D <= 8759 || 8764 <= D && D <= 8765 || D == 8776 || D == 8780 || D == 8786 || 8800 <= D && D <= 8801 || 8804 <= D && D <= 8807 || 8810 <= D && D <= 8811 || 8814 <= D && D <= 8815 || 8834 <= D && D <= 8835 || 8838 <= D && D <= 8839 || D == 8853 || D == 8857 || D == 8869 || D == 8895 || D == 8978 || 9312 <= D && D <= 9449 || 9451 <= D && D <= 9547 || 9552 <= D && D <= 9587 || 9600 <= D && D <= 9615 || 9618 <= D && D <= 9621 || 9632 <= D && D <= 9633 || 9635 <= D && D <= 9641 || 9650 <= D && D <= 9651 || 9654 <= D && D <= 9655 || 9660 <= D && D <= 9661 || 9664 <= D && D <= 9665 || 9670 <= D && D <= 9672 || D == 9675 || 9678 <= D && D <= 9681 || 9698 <= D && D <= 9701 || D == 9711 || 9733 <= D && D <= 9734 || D == 9737 || 9742 <= D && D <= 9743 || 9748 <= D && D <= 9749 || D == 9756 || D == 9758 || D == 9792 || D == 9794 || 9824 <= D && D <= 9825 || 9827 <= D && D <= 9829 || 9831 <= D && D <= 9834 || 9836 <= D && D <= 9837 || D == 9839 || 9886 <= D && D <= 9887 || 9918 <= D && D <= 9919 || 9924 <= D && D <= 9933 || 9935 <= D && D <= 9953 || D == 9955 || 9960 <= D && D <= 9983 || D == 10045 || D == 10071 || 10102 <= D && D <= 10111 || 11093 <= D && D <= 11097 || 12872 <= D && D <= 12879 || 57344 <= D && D <= 63743 || 65024 <= D && D <= 65039 || D == 65533 || 127232 <= D && D <= 127242 || 127248 <= D && D <= 127277 || 127280 <= D && D <= 127337 || 127344 <= D && D <= 127386 || 917760 <= D && D <= 917999 || 983040 <= D && D <= 1048573 || 1048576 <= D && D <= 1114109 ? "A" : "N";
    }, u.characterLength = function(e) {
        var s = this.eastAsianWidth(e);
        return s == "F" || s == "W" || s == "A" ? 2 : 1;
    };
    function F(e) {
        return e.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]|[^\uD800-\uDFFF]/g) || [];
    }
    u.length = function(e) {
        for(var s = F(e), C = 0, D = 0; D < s.length; D++)C = C + this.characterLength(s[D]);
        return C;
    }, u.slice = function(e, s, C) {
        textLen = u.length(e), s = s || 0, C = C || 1, s < 0 && (s = textLen + s), C < 0 && (C = textLen + C);
        for(var D = "", i = 0, o = F(e), E = 0; E < o.length; E++){
            var a = o[E], n = u.length(a);
            if (i >= s - (n == 2 ? 1 : 0)) {
                if (i + n <= C) D += a;
                else break;
            }
            i += n;
        }
        return D;
    };
})($5b576c8711ddc012$var$G);
const $5b576c8711ddc012$var$K = $5b576c8711ddc012$var$m;
var $5b576c8711ddc012$var$Y = function() {
    return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
function $5b576c8711ddc012$var$c(t1, u = {}) {
    if (typeof t1 != "string" || t1.length === 0 || (u = {
        ambiguousIsNarrow: !0,
        ...u
    }, t1 = $5b576c8711ddc012$var$$(t1), t1.length === 0)) return 0;
    t1 = t1.replace($5b576c8711ddc012$var$Y(), "  ");
    const F = u.ambiguousIsNarrow ? 1 : 2;
    let e = 0;
    for (const s of t1){
        const C = s.codePointAt(0);
        if (C <= 31 || C >= 127 && C <= 159 || C >= 768 && C <= 879) continue;
        switch($5b576c8711ddc012$var$K.eastAsianWidth(s)){
            case "F":
            case "W":
                e += 2;
                break;
            case "A":
                e += F;
                break;
            default:
                e += 1;
        }
    }
    return e;
}
const $5b576c8711ddc012$var$v = 10, $5b576c8711ddc012$var$M = (t1 = 0)=>(u)=>`\x1B[${u + t1}m`, $5b576c8711ddc012$var$L = (t1 = 0)=>(u)=>`\x1B[${38 + t1};5;${u}m`, $5b576c8711ddc012$var$T = (t1 = 0)=>(u, F, e)=>`\x1B[${38 + t1};2;${u};${F};${e}m`, $5b576c8711ddc012$var$r = {
    modifier: {
        reset: [
            0,
            0
        ],
        bold: [
            1,
            22
        ],
        dim: [
            2,
            22
        ],
        italic: [
            3,
            23
        ],
        underline: [
            4,
            24
        ],
        overline: [
            53,
            55
        ],
        inverse: [
            7,
            27
        ],
        hidden: [
            8,
            28
        ],
        strikethrough: [
            9,
            29
        ]
    },
    color: {
        black: [
            30,
            39
        ],
        red: [
            31,
            39
        ],
        green: [
            32,
            39
        ],
        yellow: [
            33,
            39
        ],
        blue: [
            34,
            39
        ],
        magenta: [
            35,
            39
        ],
        cyan: [
            36,
            39
        ],
        white: [
            37,
            39
        ],
        blackBright: [
            90,
            39
        ],
        gray: [
            90,
            39
        ],
        grey: [
            90,
            39
        ],
        redBright: [
            91,
            39
        ],
        greenBright: [
            92,
            39
        ],
        yellowBright: [
            93,
            39
        ],
        blueBright: [
            94,
            39
        ],
        magentaBright: [
            95,
            39
        ],
        cyanBright: [
            96,
            39
        ],
        whiteBright: [
            97,
            39
        ]
    },
    bgColor: {
        bgBlack: [
            40,
            49
        ],
        bgRed: [
            41,
            49
        ],
        bgGreen: [
            42,
            49
        ],
        bgYellow: [
            43,
            49
        ],
        bgBlue: [
            44,
            49
        ],
        bgMagenta: [
            45,
            49
        ],
        bgCyan: [
            46,
            49
        ],
        bgWhite: [
            47,
            49
        ],
        bgBlackBright: [
            100,
            49
        ],
        bgGray: [
            100,
            49
        ],
        bgGrey: [
            100,
            49
        ],
        bgRedBright: [
            101,
            49
        ],
        bgGreenBright: [
            102,
            49
        ],
        bgYellowBright: [
            103,
            49
        ],
        bgBlueBright: [
            104,
            49
        ],
        bgMagentaBright: [
            105,
            49
        ],
        bgCyanBright: [
            106,
            49
        ],
        bgWhiteBright: [
            107,
            49
        ]
    }
};
Object.keys($5b576c8711ddc012$var$r.modifier);
const $5b576c8711ddc012$var$Z = Object.keys($5b576c8711ddc012$var$r.color), $5b576c8711ddc012$var$H = Object.keys($5b576c8711ddc012$var$r.bgColor);
[
    ...$5b576c8711ddc012$var$Z,
    ...$5b576c8711ddc012$var$H
];
function $5b576c8711ddc012$var$U() {
    const t1 = new Map;
    for (const [u, F] of Object.entries($5b576c8711ddc012$var$r)){
        for (const [e, s] of Object.entries(F))$5b576c8711ddc012$var$r[e] = {
            open: `\x1B[${s[0]}m`,
            close: `\x1B[${s[1]}m`
        }, F[e] = $5b576c8711ddc012$var$r[e], t1.set(s[0], s[1]);
        Object.defineProperty($5b576c8711ddc012$var$r, u, {
            value: F,
            enumerable: !1
        });
    }
    return Object.defineProperty($5b576c8711ddc012$var$r, "codes", {
        value: t1,
        enumerable: !1
    }), $5b576c8711ddc012$var$r.color.close = "\x1b[39m", $5b576c8711ddc012$var$r.bgColor.close = "\x1b[49m", $5b576c8711ddc012$var$r.color.ansi = $5b576c8711ddc012$var$M(), $5b576c8711ddc012$var$r.color.ansi256 = $5b576c8711ddc012$var$L(), $5b576c8711ddc012$var$r.color.ansi16m = $5b576c8711ddc012$var$T(), $5b576c8711ddc012$var$r.bgColor.ansi = $5b576c8711ddc012$var$M($5b576c8711ddc012$var$v), $5b576c8711ddc012$var$r.bgColor.ansi256 = $5b576c8711ddc012$var$L($5b576c8711ddc012$var$v), $5b576c8711ddc012$var$r.bgColor.ansi16m = $5b576c8711ddc012$var$T($5b576c8711ddc012$var$v), Object.defineProperties($5b576c8711ddc012$var$r, {
        rgbToAnsi256: {
            value: (u, F, e)=>u === F && F === e ? u < 8 ? 16 : u > 248 ? 231 : Math.round((u - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(u / 255 * 5) + 6 * Math.round(F / 255 * 5) + Math.round(e / 255 * 5),
            enumerable: !1
        },
        hexToRgb: {
            value: (u)=>{
                const F = /[a-f\d]{6}|[a-f\d]{3}/i.exec(u.toString(16));
                if (!F) return [
                    0,
                    0,
                    0
                ];
                let [e] = F;
                e.length === 3 && (e = [
                    ...e
                ].map((C)=>C + C).join(""));
                const s = Number.parseInt(e, 16);
                return [
                    s >> 16 & 255,
                    s >> 8 & 255,
                    s & 255
                ];
            },
            enumerable: !1
        },
        hexToAnsi256: {
            value: (u)=>$5b576c8711ddc012$var$r.rgbToAnsi256(...$5b576c8711ddc012$var$r.hexToRgb(u)),
            enumerable: !1
        },
        ansi256ToAnsi: {
            value: (u)=>{
                if (u < 8) return 30 + u;
                if (u < 16) return 90 + (u - 8);
                let F, e, s;
                if (u >= 232) F = ((u - 232) * 10 + 8) / 255, e = F, s = F;
                else {
                    u -= 16;
                    const i = u % 36;
                    F = Math.floor(u / 36) / 5, e = Math.floor(i / 6) / 5, s = i % 6 / 5;
                }
                const C = Math.max(F, e, s) * 2;
                if (C === 0) return 30;
                let D = 30 + (Math.round(s) << 2 | Math.round(e) << 1 | Math.round(F));
                return C === 2 && (D += 60), D;
            },
            enumerable: !1
        },
        rgbToAnsi: {
            value: (u, F, e)=>$5b576c8711ddc012$var$r.ansi256ToAnsi($5b576c8711ddc012$var$r.rgbToAnsi256(u, F, e)),
            enumerable: !1
        },
        hexToAnsi: {
            value: (u)=>$5b576c8711ddc012$var$r.ansi256ToAnsi($5b576c8711ddc012$var$r.hexToAnsi256(u)),
            enumerable: !1
        }
    }), $5b576c8711ddc012$var$r;
}
const $5b576c8711ddc012$var$q = $5b576c8711ddc012$var$U(), $5b576c8711ddc012$var$p = new Set([
    "\x1b",
    "\x9b"
]), $5b576c8711ddc012$var$J = 39, $5b576c8711ddc012$var$b = "\x07", $5b576c8711ddc012$var$W = "[", $5b576c8711ddc012$var$Q = "]", $5b576c8711ddc012$var$I = "m", $5b576c8711ddc012$var$w = `${$5b576c8711ddc012$var$Q}8;;`, $5b576c8711ddc012$var$N = (t1)=>`${$5b576c8711ddc012$var$p.values().next().value}${$5b576c8711ddc012$var$W}${t1}${$5b576c8711ddc012$var$I}`, $5b576c8711ddc012$var$j = (t1)=>`${$5b576c8711ddc012$var$p.values().next().value}${$5b576c8711ddc012$var$w}${t1}${$5b576c8711ddc012$var$b}`, $5b576c8711ddc012$var$X = (t1)=>t1.split(" ").map((u)=>$5b576c8711ddc012$var$c(u)), $5b576c8711ddc012$var$_ = (t1, u, F)=>{
    const e = [
        ...u
    ];
    let s = !1, C = !1, D = $5b576c8711ddc012$var$c($5b576c8711ddc012$var$$(t1[t1.length - 1]));
    for (const [i, o] of e.entries()){
        const E = $5b576c8711ddc012$var$c(o);
        if (D + E <= F ? t1[t1.length - 1] += o : (t1.push(o), D = 0), $5b576c8711ddc012$var$p.has(o) && (s = !0, C = e.slice(i + 1).join("").startsWith($5b576c8711ddc012$var$w)), s) {
            C ? o === $5b576c8711ddc012$var$b && (s = !1, C = !1) : o === $5b576c8711ddc012$var$I && (s = !1);
            continue;
        }
        D += E, D === F && i < e.length - 1 && (t1.push(""), D = 0);
    }
    !D && t1[t1.length - 1].length > 0 && t1.length > 1 && (t1[t1.length - 2] += t1.pop());
}, $5b576c8711ddc012$var$DD = (t1)=>{
    const u = t1.split(" ");
    let F = u.length;
    for(; F > 0 && !($5b576c8711ddc012$var$c(u[F - 1]) > 0);)F--;
    return F === u.length ? t1 : u.slice(0, F).join(" ") + u.slice(F).join("");
}, $5b576c8711ddc012$var$uD = (t1, u, F = {})=>{
    if (F.trim !== !1 && t1.trim() === "") return "";
    let e = "", s, C;
    const D = $5b576c8711ddc012$var$X(t1);
    let i = [
        ""
    ];
    for (const [E, a] of t1.split(" ").entries()){
        F.trim !== !1 && (i[i.length - 1] = i[i.length - 1].trimStart());
        let n = $5b576c8711ddc012$var$c(i[i.length - 1]);
        if (E !== 0 && (n >= u && (F.wordWrap === !1 || F.trim === !1) && (i.push(""), n = 0), (n > 0 || F.trim === !1) && (i[i.length - 1] += " ", n++)), F.hard && D[E] > u) {
            const B = u - n, A = 1 + Math.floor((D[E] - B - 1) / u);
            Math.floor((D[E] - 1) / u) < A && i.push(""), $5b576c8711ddc012$var$_(i, a, u);
            continue;
        }
        if (n + D[E] > u && n > 0 && D[E] > 0) {
            if (F.wordWrap === !1 && n < u) {
                $5b576c8711ddc012$var$_(i, a, u);
                continue;
            }
            i.push("");
        }
        if (n + D[E] > u && F.wordWrap === !1) {
            $5b576c8711ddc012$var$_(i, a, u);
            continue;
        }
        i[i.length - 1] += a;
    }
    F.trim !== !1 && (i = i.map((E)=>$5b576c8711ddc012$var$DD(E)));
    const o = [
        ...i.join(`
`)
    ];
    for (const [E, a] of o.entries()){
        if (e += a, $5b576c8711ddc012$var$p.has(a)) {
            const { groups: B } = new RegExp(`(?:\\${$5b576c8711ddc012$var$W}(?<code>\\d+)m|\\${$5b576c8711ddc012$var$w}(?<uri>.*)${$5b576c8711ddc012$var$b})`).exec(o.slice(E).join("")) || {
                groups: {}
            };
            if (B.code !== void 0) {
                const A = Number.parseFloat(B.code);
                s = A === $5b576c8711ddc012$var$J ? void 0 : A;
            } else B.uri !== void 0 && (C = B.uri.length === 0 ? void 0 : B.uri);
        }
        const n = $5b576c8711ddc012$var$q.codes.get(Number(s));
        o[E + 1] === `
` ? (C && (e += $5b576c8711ddc012$var$j("")), s && n && (e += $5b576c8711ddc012$var$N(n))) : a === `
` && (s && n && (e += $5b576c8711ddc012$var$N(s)), C && (e += $5b576c8711ddc012$var$j(C)));
    }
    return e;
};
function $5b576c8711ddc012$var$P(t1, u, F) {
    return String(t1).normalize().replace(/\r\n/g, `
`).split(`
`).map((e)=>$5b576c8711ddc012$var$uD(e, u, F)).join(`
`);
}
function $5b576c8711ddc012$var$FD(t1, u) {
    if (t1 === u) return;
    const F = t1.split(`
`), e = u.split(`
`), s = [];
    for(let C = 0; C < Math.max(F.length, e.length); C++)F[C] !== e[C] && s.push(C);
    return s;
}
const $5b576c8711ddc012$var$R = Symbol("clack:cancel");
function $5b576c8711ddc012$export$3b22524397b493c6(t1) {
    return t1 === $5b576c8711ddc012$var$R;
}
function $5b576c8711ddc012$var$g(t1, u) {
    t1.isTTY && t1.setRawMode(u);
}
const $5b576c8711ddc012$var$V = new Map([
    [
        "k",
        "up"
    ],
    [
        "j",
        "down"
    ],
    [
        "h",
        "left"
    ],
    [
        "l",
        "right"
    ]
]), $5b576c8711ddc012$var$tD = new Set([
    "up",
    "down",
    "left",
    "right",
    "space",
    "enter"
]);
class $5b576c8711ddc012$export$83716a4aa1642908 {
    constructor({ render: u, input: F = (0, $4ZM61$nodeprocess.stdin), output: e = (0, $4ZM61$nodeprocess.stdout), ...s }, C = !0){
        this._track = !1, this._cursor = 0, this.state = "initial", this.error = "", this.subscribers = new Map, this._prevFrame = "", this.opts = s, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = u.bind(this), this._track = C, this.input = F, this.output = e;
    }
    prompt() {
        const u = new (0, $4ZM61$nodetty.WriteStream)(0);
        return u._write = (F, e, s)=>{
            this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), s();
        }, this.input.pipe(u), this.rl = (0, ($parcel$interopDefault($4ZM61$nodereadline))).createInterface({
            input: this.input,
            output: u,
            tabSize: 2,
            prompt: "",
            escapeCodeTimeout: 50
        }), (0, ($parcel$interopDefault($4ZM61$nodereadline))).emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), $5b576c8711ddc012$var$g(this.input, !0), this.output.on("resize", this.render), this.render(), new Promise((F, e)=>{
            this.once("submit", ()=>{
                this.output.write((0, $20c3508873313be3$exports.cursor).show), this.output.off("resize", this.render), $5b576c8711ddc012$var$g(this.input, !1), F(this.value);
            }), this.once("cancel", ()=>{
                this.output.write((0, $20c3508873313be3$exports.cursor).show), this.output.off("resize", this.render), $5b576c8711ddc012$var$g(this.input, !1), F($5b576c8711ddc012$var$R);
            });
        });
    }
    on(u, F) {
        const e = this.subscribers.get(u) ?? [];
        e.push({
            cb: F
        }), this.subscribers.set(u, e);
    }
    once(u, F) {
        const e = this.subscribers.get(u) ?? [];
        e.push({
            cb: F,
            once: !0
        }), this.subscribers.set(u, e);
    }
    emit(u, ...F) {
        const e = this.subscribers.get(u) ?? [], s = [];
        for (const C of e)C.cb(...F), C.once && s.push(()=>e.splice(e.indexOf(C), 1));
        for (const C of s)C();
    }
    unsubscribe() {
        this.subscribers.clear();
    }
    onKeypress(u, F) {
        if (this.state === "error" && (this.state = "active"), F?.name && !this._track && $5b576c8711ddc012$var$V.has(F.name) && this.emit("cursor", $5b576c8711ddc012$var$V.get(F.name)), F?.name && $5b576c8711ddc012$var$tD.has(F.name) && this.emit("cursor", F.name), u && (u.toLowerCase() === "y" || u.toLowerCase() === "n") && this.emit("confirm", u.toLowerCase() === "y"), u && this.emit("key", u.toLowerCase()), F?.name === "return") {
            if (this.opts.validate) {
                const e = this.opts.validate(this.value);
                e && (this.error = e, this.state = "error", this.rl.write(this.value));
            }
            this.state !== "error" && (this.state = "submit");
        }
        u === "\x03" && (this.state = "cancel"), (this.state === "submit" || this.state === "cancel") && this.emit("finalize"), this.render(), (this.state === "submit" || this.state === "cancel") && this.close();
    }
    close() {
        this.input.unpipe(), this.input.removeListener("keypress", this.onKeypress), this.output.write(`
`), $5b576c8711ddc012$var$g(this.input, !1), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
    }
    restoreCursor() {
        const u = $5b576c8711ddc012$var$P(this._prevFrame, $4ZM61$process.stdout.columns, {
            hard: !0
        }).split(`
`).length - 1;
        this.output.write((0, $20c3508873313be3$exports.cursor).move(-999, u * -1));
    }
    render() {
        const u = $5b576c8711ddc012$var$P(this._render(this) ?? "", $4ZM61$process.stdout.columns, {
            hard: !0
        });
        if (u !== this._prevFrame) {
            if (this.state === "initial") this.output.write((0, $20c3508873313be3$exports.cursor).hide);
            else {
                const F = $5b576c8711ddc012$var$FD(this._prevFrame, u);
                if (this.restoreCursor(), F && F?.length === 1) {
                    const e = F[0];
                    this.output.write((0, $20c3508873313be3$exports.cursor).move(0, e)), this.output.write((0, $20c3508873313be3$exports.erase).lines(1));
                    const s = u.split(`
`);
                    this.output.write(s[e]), this._prevFrame = u, this.output.write((0, $20c3508873313be3$exports.cursor).move(0, s.length - e - 1));
                    return;
                } else if (F && F?.length > 1) {
                    const e = F[0];
                    this.output.write((0, $20c3508873313be3$exports.cursor).move(0, e)), this.output.write((0, $20c3508873313be3$exports.erase).down());
                    const C = u.split(`
`).slice(e);
                    this.output.write(C.join(`
`)), this._prevFrame = u;
                    return;
                }
                this.output.write((0, $20c3508873313be3$exports.erase).down());
            }
            this.output.write(u), this.state === "initial" && (this.state = "active"), this._prevFrame = u;
        }
    }
}
class $5b576c8711ddc012$export$c6657d69d1e9e62a extends $5b576c8711ddc012$export$83716a4aa1642908 {
    get cursor() {
        return this.value ? 0 : 1;
    }
    get _value() {
        return this.cursor === 0;
    }
    constructor(u){
        super(u, !1), this.value = !!u.initialValue, this.on("value", ()=>{
            this.value = this._value;
        }), this.on("confirm", (F)=>{
            this.output.write((0, $20c3508873313be3$exports.cursor).move(0, -1)), this.value = F, this.state = "submit", this.close();
        }), this.on("cursor", ()=>{
            this.value = !this.value;
        });
    }
}
class $5b576c8711ddc012$export$52efdcf404b90ff0 extends $5b576c8711ddc012$export$83716a4aa1642908 {
    constructor(u){
        super(u, !1), this.cursor = 0;
        const { options: F } = u;
        this.options = Object.entries(F).flatMap(([e, s])=>[
                {
                    value: e,
                    group: !0,
                    label: e
                },
                ...s.map((C)=>({
                        ...C,
                        group: e
                    }))
            ]), this.value = [
            ...u.initialValues ?? []
        ], this.cursor = Math.max(this.options.findIndex(({ value: e })=>e === u.cursorAt), 0), this.on("cursor", (e)=>{
            switch(e){
                case "left":
                case "up":
                    this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
                    break;
                case "down":
                case "right":
                    this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
                    break;
                case "space":
                    this.toggleValue();
                    break;
            }
        });
    }
    getGroupItems(u) {
        return this.options.filter((F)=>F.group === u);
    }
    isGroupSelected(u) {
        return this.getGroupItems(u).every((e)=>this.value.includes(e.value));
    }
    toggleValue() {
        const u = this.options[this.cursor];
        if (u.group === !0) {
            const F = u.value, e = this.getGroupItems(F);
            this.isGroupSelected(F) ? this.value = this.value.filter((s)=>e.findIndex((C)=>C.value === s) === -1) : this.value = [
                ...this.value,
                ...e.map((s)=>s.value)
            ], this.value = Array.from(new Set(this.value));
        } else {
            const F = this.value.includes(u.value);
            this.value = F ? this.value.filter((e)=>e !== u.value) : [
                ...this.value,
                u.value
            ];
        }
    }
}
class $5b576c8711ddc012$export$a59643384d647394 extends $5b576c8711ddc012$export$83716a4aa1642908 {
    constructor(u){
        super(u, !1), this.cursor = 0, this.options = u.options, this.value = [
            ...u.initialValues ?? []
        ], this.cursor = Math.max(this.options.findIndex(({ value: F })=>F === u.cursorAt), 0), this.on("key", (F)=>{
            F === "a" && this.toggleAll();
        }), this.on("cursor", (F)=>{
            switch(F){
                case "left":
                case "up":
                    this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
                    break;
                case "down":
                case "right":
                    this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
                    break;
                case "space":
                    this.toggleValue();
                    break;
            }
        });
    }
    get _value() {
        return this.options[this.cursor].value;
    }
    toggleAll() {
        const u = this.value.length === this.options.length;
        this.value = u ? [] : this.options.map((F)=>F.value);
    }
    toggleValue() {
        const u = this.value.includes(this._value);
        this.value = u ? this.value.filter((F)=>F !== this._value) : [
            ...this.value,
            this._value
        ];
    }
}
class $5b576c8711ddc012$export$7a2d0153ca6f8af4 extends $5b576c8711ddc012$export$83716a4aa1642908 {
    constructor({ mask: u, ...F }){
        super(F), this.valueWithCursor = "", this._mask = "•", this._mask = u ?? "•", this.on("finalize", ()=>{
            this.valueWithCursor = this.masked;
        }), this.on("value", ()=>{
            if (this.cursor >= this.value.length) this.valueWithCursor = `${this.masked}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).hidden("_"))}`;
            else {
                const e = this.masked.slice(0, this.cursor), s = this.masked.slice(this.cursor);
                this.valueWithCursor = `${e}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse(s[0])}${s.slice(1)}`;
            }
        });
    }
    get cursor() {
        return this._cursor;
    }
    get masked() {
        return this.value.replaceAll(/./g, this._mask);
    }
}
class $5b576c8711ddc012$export$f41bb830a1914a2 extends $5b576c8711ddc012$export$83716a4aa1642908 {
    constructor(u){
        super(u, !1), this.cursor = 0, this.options = u.options, this.cursor = this.options.findIndex(({ value: F })=>F === u.initialValue), this.cursor === -1 && (this.cursor = 0), this.changeValue(), this.on("cursor", (F)=>{
            switch(F){
                case "left":
                case "up":
                    this.cursor = this.cursor === 0 ? this.options.length - 1 : this.cursor - 1;
                    break;
                case "down":
                case "right":
                    this.cursor = this.cursor === this.options.length - 1 ? 0 : this.cursor + 1;
                    break;
            }
            this.changeValue();
        });
    }
    get _value() {
        return this.options[this.cursor];
    }
    changeValue() {
        this.value = this._value.value;
    }
}
class $5b576c8711ddc012$export$3e496bc2be8c252a extends $5b576c8711ddc012$export$83716a4aa1642908 {
    constructor(u){
        super(u, !1), this.cursor = 0, this.options = u.options;
        const F = this.options.map(({ value: [e] })=>e?.toLowerCase());
        this.cursor = Math.max(F.indexOf(u.initialValue), 0), this.on("key", (e)=>{
            if (!F.includes(e)) return;
            const s = this.options.find(({ value: [C] })=>C?.toLowerCase() === e);
            s && (this.value = s.value, this.state = "submit", this.emit("submit"));
        });
    }
}
class $5b576c8711ddc012$export$d68664da9992e91c extends $5b576c8711ddc012$export$83716a4aa1642908 {
    constructor(u){
        super(u), this.valueWithCursor = "", this.on("finalize", ()=>{
            this.value || (this.value = u.defaultValue), this.valueWithCursor = this.value;
        }), this.on("value", ()=>{
            if (this.cursor >= this.value.length) this.valueWithCursor = `${this.value}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).hidden("_"))}`;
            else {
                const F = this.value.slice(0, this.cursor), e = this.value.slice(this.cursor);
                this.valueWithCursor = `${F}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse(e[0])}${e.slice(1)}`;
            }
        });
    }
    get cursor() {
        return this._cursor;
    }
}
function $5b576c8711ddc012$export$837bd02682cd3db9({ input: t1 = (0, $4ZM61$nodeprocess.stdin), output: u = (0, $4ZM61$nodeprocess.stdout), overwrite: F = !0, hideCursor: e = !0 } = {}) {
    const s = $4ZM61$nodereadline.createInterface({
        input: t1,
        output: u,
        prompt: "",
        tabSize: 1
    });
    $4ZM61$nodereadline.emitKeypressEvents(t1, s), t1.isTTY && t1.setRawMode(!0);
    const C = (D, { name: i })=>{
        if (String(D) === "\x03" && $4ZM61$process.exit(0), !F) return;
        let E = i === "return" ? 0 : -1, a = i === "return" ? -1 : 0;
        $4ZM61$nodereadline.moveCursor(u, E, a, ()=>{
            $4ZM61$nodereadline.clearLine(u, 1, ()=>{
                t1.once("keypress", C);
            });
        });
    };
    return e && $4ZM61$process.stdout.write((0, $20c3508873313be3$exports.cursor).hide), t1.once("keypress", C), ()=>{
        t1.off("keypress", C), e && $4ZM61$process.stdout.write((0, $20c3508873313be3$exports.cursor).show), t1.isTTY && t1.setRawMode(!1), s.terminal = !1, s.close();
    };
}






function $12723a33d971f58c$var$q() {
    return (0, ($parcel$interopDefault($4ZM61$nodeprocess))).platform !== "win32" ? (0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.TERM !== "linux" : Boolean((0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.CI) || Boolean((0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.WT_SESSION) || Boolean((0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.TERMINUS_SUBLIME) || (0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.ConEmuTask === "{cmd::Cmder}" || (0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.TERM_PROGRAM === "Terminus-Sublime" || (0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.TERM_PROGRAM === "vscode" || (0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.TERM === "xterm-256color" || (0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.TERM === "alacritty" || (0, ($parcel$interopDefault($4ZM61$nodeprocess))).env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
const $12723a33d971f58c$var$_ = $12723a33d971f58c$var$q(), $12723a33d971f58c$var$o = (r, n)=>$12723a33d971f58c$var$_ ? r : n, $12723a33d971f58c$var$H = $12723a33d971f58c$var$o("◆", "*"), $12723a33d971f58c$var$I = $12723a33d971f58c$var$o("■", "x"), $12723a33d971f58c$var$x = $12723a33d971f58c$var$o("▲", "x"), $12723a33d971f58c$var$S = $12723a33d971f58c$var$o("◇", "o"), $12723a33d971f58c$var$K = $12723a33d971f58c$var$o("┌", "T"), $12723a33d971f58c$var$a = $12723a33d971f58c$var$o("│", "|"), $12723a33d971f58c$var$d = $12723a33d971f58c$var$o("└", "—"), $12723a33d971f58c$var$b = $12723a33d971f58c$var$o("●", ">"), $12723a33d971f58c$var$E = $12723a33d971f58c$var$o("○", " "), $12723a33d971f58c$var$C = $12723a33d971f58c$var$o("◻", "[•]"), $12723a33d971f58c$var$w = $12723a33d971f58c$var$o("◼", "[+]"), $12723a33d971f58c$var$M = $12723a33d971f58c$var$o("◻", "[ ]"), $12723a33d971f58c$var$U = $12723a33d971f58c$var$o("▪", "•"), $12723a33d971f58c$var$B = $12723a33d971f58c$var$o("─", "-"), $12723a33d971f58c$var$Z = $12723a33d971f58c$var$o("╮", "+"), $12723a33d971f58c$var$z = $12723a33d971f58c$var$o("├", "+"), $12723a33d971f58c$var$X = $12723a33d971f58c$var$o("╯", "+"), $12723a33d971f58c$var$J = $12723a33d971f58c$var$o("●", "•"), $12723a33d971f58c$var$Y = $12723a33d971f58c$var$o("◆", "*"), $12723a33d971f58c$var$Q = $12723a33d971f58c$var$o("▲", "!"), $12723a33d971f58c$var$ee = $12723a33d971f58c$var$o("■", "x"), $12723a33d971f58c$var$y = (r)=>{
    switch(r){
        case "initial":
        case "active":
            return (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$H);
        case "cancel":
            return (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).red($12723a33d971f58c$var$I);
        case "error":
            return (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$x);
        case "submit":
            return (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$S);
    }
}, $12723a33d971f58c$export$6f093cfa640b7166 = (r)=>new (0, $5b576c8711ddc012$export$d68664da9992e91c)({
        validate: r.validate,
        placeholder: r.placeholder,
        defaultValue: r.defaultValue,
        initialValue: r.initialValue,
        render () {
            const n = `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
${$12723a33d971f58c$var$y(this.state)}  ${r.message}
`, i = r.placeholder ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse(r.placeholder[0]) + (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(r.placeholder.slice(1)) : (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).hidden("_")), t = this.value ? this.valueWithCursor : i;
            switch(this.state){
                case "error":
                    return `${n.trim()}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$a)}  ${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow(this.error)}
`;
                case "submit":
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(this.value || r.placeholder)}`;
                case "cancel":
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(this.value ?? ""))}${this.value?.trim() ? `
` + (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a) : ""}`;
                default:
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  ${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$d)}
`;
            }
        }
    }).prompt(), $12723a33d971f58c$export$b9394e9ffbbc2ec7 = (r)=>new (0, $5b576c8711ddc012$export$7a2d0153ca6f8af4)({
        validate: r.validate,
        mask: r.mask ?? $12723a33d971f58c$var$U,
        render () {
            const n = `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
${$12723a33d971f58c$var$y(this.state)}  ${r.message}
`, i = this.valueWithCursor, t = this.masked;
            switch(this.state){
                case "error":
                    return `${n.trim()}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$a)}  ${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow(this.error)}
`;
                case "submit":
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(t)}`;
                case "cancel":
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(t ?? ""))}${t ? `
` + (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a) : ""}`;
                default:
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  ${i}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$d)}
`;
            }
        }
    }).prompt(), $12723a33d971f58c$export$715f9d76bb8c1fea = (r)=>{
    const n = r.active ?? "Yes", i = r.inactive ?? "No";
    return new (0, $5b576c8711ddc012$export$c6657d69d1e9e62a)({
        active: n,
        inactive: i,
        initialValue: r.initialValue ?? !0,
        render () {
            const t = `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
${$12723a33d971f58c$var$y(this.state)}  ${r.message}
`, s = this.value ? n : i;
            switch(this.state){
                case "submit":
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(s)}`;
                case "cancel":
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(s))}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}`;
                default:
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  ${this.value ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$b)} ${n}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim($12723a33d971f58c$var$E)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(n)}`} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim("/")} ${this.value ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim($12723a33d971f58c$var$E)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(i)}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$b)} ${i}`}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$d)}
`;
            }
        }
    }).prompt();
}, $12723a33d971f58c$export$2e6c959c16ff56b8 = (r)=>{
    const n = (t, s)=>{
        const c = t.label ?? String(t.value);
        return s === "active" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$b)} ${c} ${t.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(`(${t.hint})`) : ""}` : s === "selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(c)}` : s === "cancelled" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(c))}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim($12723a33d971f58c$var$E)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(c)}`;
    };
    let i = 0;
    return new (0, $5b576c8711ddc012$export$f41bb830a1914a2)({
        options: r.options,
        initialValue: r.initialValue,
        render () {
            const t = `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
${$12723a33d971f58c$var$y(this.state)}  ${r.message}
`;
            switch(this.state){
                case "submit":
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${n(this.options[this.cursor], "selected")}`;
                case "cancel":
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${n(this.options[this.cursor], "cancelled")}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}`;
                default:
                    {
                        const s = r.maxItems === void 0 ? 1 / 0 : Math.max(r.maxItems, 5);
                        this.cursor >= i + s - 3 ? i = Math.max(Math.min(this.cursor - s + 3, this.options.length - s), 0) : this.cursor < i + 2 && (i = Math.max(this.cursor - 2, 0));
                        const c = s < this.options.length && i > 0, l = s < this.options.length && i + s < this.options.length;
                        return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  ${this.options.slice(i, i + s).map((u, m, $)=>m === 0 && c ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim("...") : m === $.length - 1 && l ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim("...") : n(u, m + i === this.cursor ? "active" : "inactive")).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  `)}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$d)}
`;
                    }
            }
        }
    }).prompt();
}, $12723a33d971f58c$export$5d0cfdc259377591 = (r)=>{
    const n = (i, t = "inactive")=>{
        const s = i.label ?? String(i.value);
        return t === "selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(s)}` : t === "cancelled" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(s))}` : t === "active" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).bgCyan((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray(` ${i.value} `))} ${s} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(`(${i.hint})`) : ""}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse(` ${i.value} `)))} ${s} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(`(${i.hint})`) : ""}`;
    };
    return new (0, $5b576c8711ddc012$export$3e496bc2be8c252a)({
        options: r.options,
        initialValue: r.initialValue,
        render () {
            const i = `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
${$12723a33d971f58c$var$y(this.state)}  ${r.message}
`;
            switch(this.state){
                case "submit":
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${n(this.options.find((t)=>t.value === this.value), "selected")}`;
                case "cancel":
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${n(this.options[0], "cancelled")}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}`;
                default:
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  ${this.options.map((t, s)=>n(t, s === this.cursor ? "active" : "inactive")).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  `)}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$d)}
`;
            }
        }
    }).prompt();
}, $12723a33d971f58c$export$afd90303e38e32b1 = (r)=>{
    const n = (i, t)=>{
        const s = i.label ?? String(i.value);
        return t === "active" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$C)} ${s} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(`(${i.hint})`) : ""}` : t === "selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$w)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(s)}` : t === "cancelled" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(s))}` : t === "active-selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$w)} ${s} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(`(${i.hint})`) : ""}` : t === "submitted" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(s)}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim($12723a33d971f58c$var$M)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(s)}`;
    };
    return new (0, $5b576c8711ddc012$export$a59643384d647394)({
        options: r.options,
        initialValues: r.initialValues,
        required: r.required ?? !0,
        cursorAt: r.cursorAt,
        validate (i) {
            if (this.required && i.length === 0) return `Please select at least one option.
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).reset((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(`Press ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse(" space ")))} to select, ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse(" enter ")))} to submit`))}`;
        },
        render () {
            let i = `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
${$12723a33d971f58c$var$y(this.state)}  ${r.message}
`;
            switch(this.state){
                case "submit":
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${this.options.filter(({ value: t })=>this.value.includes(t)).map((t)=>n(t, "submitted")).join((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(", ")) || (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim("none")}`;
                case "cancel":
                    {
                        const t = this.options.filter(({ value: s })=>this.value.includes(s)).map((s)=>n(s, "cancelled")).join((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(", "));
                        return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${t.trim() ? `${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}` : ""}`;
                    }
                case "error":
                    {
                        const t = this.error.split(`
`).map((s, c)=>c === 0 ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow(s)}` : `   ${s}`).join(`
`);
                        return i + (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$a) + "  " + this.options.map((s, c)=>{
                            const l = this.value.includes(s.value), u = c === this.cursor;
                            return u && l ? n(s, "active-selected") : l ? n(s, "selected") : n(s, u ? "active" : "inactive");
                        }).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$a)}  `) + `
` + t + `
`;
                    }
                default:
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  ${this.options.map((t, s)=>{
                        const c = this.value.includes(t.value), l = s === this.cursor;
                        return l && c ? n(t, "active-selected") : c ? n(t, "selected") : n(t, l ? "active" : "inactive");
                    }).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  `)}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$d)}
`;
            }
        }
    }).prompt();
}, $12723a33d971f58c$export$69ced5e54e73dabf = (r)=>{
    const n = (i, t, s = [])=>{
        const c = i.label ?? String(i.value), l = typeof i.group == "string", u = l && (s[s.indexOf(i) + 1] ?? {
            group: !0
        }), m = l && u.group === !0, $ = l ? `${m ? $12723a33d971f58c$var$d : $12723a33d971f58c$var$a} ` : "";
        return t === "active" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim($)}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$C)} ${c} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(`(${i.hint})`) : ""}` : t === "group-active" ? `${$}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$C)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(c)}` : t === "group-active-selected" ? `${$}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$w)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(c)}` : t === "selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim($)}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$w)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(c)}` : t === "cancelled" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(c))}` : t === "active-selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim($)}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$w)} ${c} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(`(${i.hint})`) : ""}` : t === "submitted" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(c)}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim($)}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim($12723a33d971f58c$var$M)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(c)}`;
    };
    return new (0, $5b576c8711ddc012$export$52efdcf404b90ff0)({
        options: r.options,
        initialValues: r.initialValues,
        required: r.required ?? !0,
        cursorAt: r.cursorAt,
        validate (i) {
            if (this.required && i.length === 0) return `Please select at least one option.
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).reset((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(`Press ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse(" space ")))} to select, ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).inverse(" enter ")))} to submit`))}`;
        },
        render () {
            let i = `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
${$12723a33d971f58c$var$y(this.state)}  ${r.message}
`;
            switch(this.state){
                case "submit":
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${this.options.filter(({ value: t })=>this.value.includes(t)).map((t)=>n(t, "submitted")).join((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(", "))}`;
                case "cancel":
                    {
                        const t = this.options.filter(({ value: s })=>this.value.includes(s)).map((s)=>n(s, "cancelled")).join((0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(", "));
                        return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${t.trim() ? `${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}` : ""}`;
                    }
                case "error":
                    {
                        const t = this.error.split(`
`).map((s, c)=>c === 0 ? `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow(s)}` : `   ${s}`).join(`
`);
                        return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$a)}  ${this.options.map((s, c, l)=>{
                            const u = this.value.includes(s.value) || s.group === !0 && this.isGroupSelected(`${s.value}`), m = c === this.cursor;
                            return !m && typeof s.group == "string" && this.options[this.cursor].value === s.group ? n(s, u ? "group-active-selected" : "group-active", l) : m && u ? n(s, "active-selected", l) : u ? n(s, "selected", l) : n(s, m ? "active" : "inactive", l);
                        }).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$a)}  `)}
${t}
`;
                    }
                default:
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  ${this.options.map((t, s, c)=>{
                        const l = this.value.includes(t.value) || t.group === !0 && this.isGroupSelected(`${t.value}`), u = s === this.cursor;
                        return !u && typeof t.group == "string" && this.options[this.cursor].value === t.group ? n(t, l ? "group-active-selected" : "group-active", c) : u && l ? n(t, "active-selected", c) : l ? n(t, "selected", c) : n(t, u ? "active" : "inactive", c);
                    }).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$a)}  `)}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).cyan($12723a33d971f58c$var$d)}
`;
            }
        }
    }).prompt();
}, $12723a33d971f58c$var$R = (r)=>r.replace($12723a33d971f58c$var$me(), ""), $12723a33d971f58c$export$a92e4c44d367d0af = (r = "", n = "")=>{
    const i = `
${r}
`.split(`
`), t = $12723a33d971f58c$var$R(n).length, s = Math.max(i.reduce((l, u)=>(u = $12723a33d971f58c$var$R(u), u.length > l ? u.length : l), 0), t) + 2, c = i.map((l)=>`${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).dim(l)}${" ".repeat(s - $12723a33d971f58c$var$R(l).length)}${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}`).join(`
`);
    $4ZM61$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$S)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).reset(n)} ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$B.repeat(Math.max(s - t - 1, 1)) + $12723a33d971f58c$var$Z)}
${c}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$z + $12723a33d971f58c$var$B.repeat(s + 2) + $12723a33d971f58c$var$X)}
`);
}, $12723a33d971f58c$export$70b61ad426ddbe54 = (r = "")=>{
    $4ZM61$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).red(r)}

`);
}, $12723a33d971f58c$export$affaf52642033041 = (r = "")=>{
    $4ZM61$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$K)}  ${r}
`);
}, $12723a33d971f58c$export$ed2c61a743ec1950 = (r = "")=>{
    $4ZM61$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$d)}  ${r}

`);
}, $12723a33d971f58c$export$bef1f36f5486a6a3 = {
    message: (r = "", { symbol: n = (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a) } = {})=>{
        const i = [
            `${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}`
        ];
        if (r) {
            const [t, ...s] = r.split(`
`);
            i.push(`${n}  ${t}`, ...s.map((c)=>`${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}  ${c}`));
        }
        $4ZM61$process.stdout.write(`${i.join(`
`)}
`);
    },
    info: (r)=>{
        $12723a33d971f58c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).blue($12723a33d971f58c$var$J)
        });
    },
    success: (r)=>{
        $12723a33d971f58c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$Y)
        });
    },
    step: (r)=>{
        $12723a33d971f58c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$S)
        });
    },
    warn: (r)=>{
        $12723a33d971f58c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).yellow($12723a33d971f58c$var$Q)
        });
    },
    warning: (r)=>{
        $12723a33d971f58c$export$bef1f36f5486a6a3.warn(r);
    },
    error: (r)=>{
        $12723a33d971f58c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).red($12723a33d971f58c$var$ee)
        });
    }
}, $12723a33d971f58c$export$641374ffb95bc399 = ()=>{
    const r = $12723a33d971f58c$var$_ ? [
        "◒",
        "◐",
        "◓",
        "◑"
    ] : [
        "•",
        "o",
        "O",
        "0"
    ], n = $12723a33d971f58c$var$_ ? 80 : 120;
    let i, t, s = !1, c = "";
    const l = (v = "")=>{
        s = !0, i = (0, $5b576c8711ddc012$export$837bd02682cd3db9)(), c = v.replace(/\.+$/, ""), $4ZM61$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).gray($12723a33d971f58c$var$a)}
`);
        let g = 0, p = 0;
        t = setInterval(()=>{
            const O = (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).magenta(r[g]), P = ".".repeat(Math.floor(p)).slice(0, 3);
            $4ZM61$process.stdout.write((0, $20c3508873313be3$exports.cursor).move(-999, 0)), $4ZM61$process.stdout.write((0, $20c3508873313be3$exports.erase).down(1)), $4ZM61$process.stdout.write(`${O}  ${c}${P}`), g = g + 1 < r.length ? g + 1 : 0, p = p < r.length ? p + .125 : 0;
        }, n);
    }, u = (v = "", g = 0)=>{
        c = v ?? c, s = !1, clearInterval(t);
        const p = g === 0 ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).green($12723a33d971f58c$var$S) : g === 1 ? (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).red($12723a33d971f58c$var$I) : (0, (/*@__PURE__*/$parcel$interopDefault($29d7e986dc07f364$exports))).red($12723a33d971f58c$var$x);
        $4ZM61$process.stdout.write((0, $20c3508873313be3$exports.cursor).move(-999, 0)), $4ZM61$process.stdout.write((0, $20c3508873313be3$exports.erase).down(1)), $4ZM61$process.stdout.write(`${p}  ${c}
`), i();
    }, m = (v = "")=>{
        c = v ?? c;
    }, $ = (v)=>{
        const g = v > 1 ? "Something went wrong" : "Canceled";
        s && u(g, v);
    };
    return $4ZM61$process.on("uncaughtExceptionMonitor", ()=>$(2)), $4ZM61$process.on("unhandledRejection", ()=>$(2)), $4ZM61$process.on("SIGINT", ()=>$(1)), $4ZM61$process.on("SIGTERM", ()=>$(1)), $4ZM61$process.on("exit", $), {
        start: l,
        stop: u,
        message: m
    };
};
function $12723a33d971f58c$var$me() {
    const r = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
    ].join("|");
    return new RegExp(r, "g");
}
const $12723a33d971f58c$export$e5e25fbcc1f7affe = async (r, n)=>{
    const i = {}, t = Object.keys(r);
    for (const s of t){
        const c = r[s], l = await c({
            results: i
        })?.catch((u)=>{
            throw u;
        });
        if (typeof n?.onCancel == "function" && (0, $5b576c8711ddc012$export$3b22524397b493c6)(l)) {
            i[s] = "canceled", n.onCancel({
                results: i
            });
            continue;
        }
        i[s] = l;
    }
    return i;
};



const $17a7f01c18596082$var$Spinner = async (timeout)=>{
    const s = (0, $12723a33d971f58c$export$641374ffb95bc399)();
    s.start();
    await (0, $4ZM61$nodetimerspromises.setTimeout)(timeout == undefined ? 2000 : timeout);
    s.stop();
};
var $17a7f01c18596082$export$2e2bcd8739ae039 = $17a7f01c18596082$var$Spinner;



const $576f2ff176893bbe$var$Start = (message)=>{
    $12723a33d971f58c$export$affaf52642033041(message);
};
var $576f2ff176893bbe$export$2e2bcd8739ae039 = $576f2ff176893bbe$var$Start;



const $611ab1e4eb1c86ae$var$End = (message)=>{
    $12723a33d971f58c$export$ed2c61a743ec1950(message);
};
var $611ab1e4eb1c86ae$export$2e2bcd8739ae039 = $611ab1e4eb1c86ae$var$End;






const $906ac65a4460acfa$var$Exercise03 = ()=>{
    let pname = "Muhammad hamza";
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    // Initial
    console.log(`Name Unformatted => ${pname}`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    // Lowercase
    console.log(`Name in Lowercase => ${pname.toLowerCase()}`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    // Uppercase
    console.log(`Name in Uppercase => ${pname.toUpperCase()}`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    // Capitalized
    console.log(`Name Capitalized => ${pname.trim().split(" ").map((name)=>name[0].toUpperCase() + name.substring(1).toLowerCase()).join(" ")}`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise03();
$906ac65a4460acfa$export$2e2bcd8739ae039 = $906ac65a4460acfa$var$Exercise03;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $308da6a1631a5c04$var$Exercise04 = ()=>{
    console.log(`Albert Einstein once said, "A person who never made a mistake never tried anything new."`);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise04();
$308da6a1631a5c04$export$2e2bcd8739ae039 = $308da6a1631a5c04$var$Exercise04;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $da564e3411834ac8$var$Exercise05 = ()=>{
    let famous_person = "Albert Einstein";
    let message = `${famous_person} once said, "A person who never made a mistake never tried anything new."`;
    console.log(message);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise05();
$da564e3411834ac8$export$2e2bcd8739ae039 = $da564e3411834ac8$var$Exercise05;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $584dffe02c9bb8dc$var$Exercise06 = ()=>{
    let person_name = "\n\n		Muhammad Hamza\n\n\n			";
    console.log(`Unformatted Name =>\n${person_name}`);
    console.log(`Formatted Name => ${person_name.trim()}`);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise06();
$584dffe02c9bb8dc$export$2e2bcd8739ae039 = $584dffe02c9bb8dc$var$Exercise06;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $76e4e9f027786c7c$var$Exercise07 = ()=>{
    console.log(`---------------------------`);
    console.log(`------------ ${8} ------------`);
    console.log(`---------------------------`);
    console.log();
    console.log(`---------------------------`);
    console.log(`------------ ${8} ------------`);
    console.log(`---------------------------`);
    console.log();
    console.log(`---------------------------`);
    console.log(`------------ ${8} ------------`);
    console.log(`---------------------------`);
    console.log();
    console.log(`---------------------------`);
    console.log(`------------ ${8} ------------`);
    console.log(`---------------------------`);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise07();
$76e4e9f027786c7c$export$2e2bcd8739ae039 = $76e4e9f027786c7c$var$Exercise07;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $e9fe48dc627594bf$var$Exercise08 = ()=>{
    console.log(`Number 8 in exercises.md file was used to explain Exercise #7`);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise08();
$e9fe48dc627594bf$export$2e2bcd8739ae039 = $e9fe48dc627594bf$var$Exercise08;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $0652010c3198a526$var$Exercise09 = ()=>{
    let favNum = 24;
    let message = `My Favorite Number is ${favNum}`;
    console.log(message);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise09();
$0652010c3198a526$export$2e2bcd8739ae039 = $0652010c3198a526$var$Exercise09;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $53f4b99d8c868d3a$var$Exercise10 = ()=>{
    console.log(`Each program contains at least three comments.`);
    console.log(`#1: Exercise Question\n#2: Some Useful Warnings\n#3: A comment telling viewer to uncomment the statement to run program.`);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise10();
$53f4b99d8c868d3a$export$2e2bcd8739ae039 = $53f4b99d8c868d3a$var$Exercise10;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $1c1c9d04524e51d3$var$Exercise11 = ()=>{
    let names = [
        "Abu Hurairah",
        "Hamza",
        "Osman"
    ];
    console.log(names[0]);
    console.log(names[1]);
    console.log(names[2]);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise11();
$1c1c9d04524e51d3$export$2e2bcd8739ae039 = $1c1c9d04524e51d3$var$Exercise11;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $518c9d8f62feb5e9$var$Exercise12 = ()=>{
    let names = [
        "Abu Hurairah",
        "Hamza",
        "Osman"
    ];
    console.log(`Hi, ${names[0]}`);
    console.log(`Hi, ${names[1]}`);
    console.log(`Hi, ${names[2]}`);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise12();
$518c9d8f62feb5e9$export$2e2bcd8739ae039 = $518c9d8f62feb5e9$var$Exercise12;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $df8bc72e0543dbca$var$Exercise13 = ()=>{
    let company = [
        "Toyota",
        "Honda",
        "BMW",
        "Audi",
        "Bugatti"
    ];
    let vehicleTypes = [
        "Bike",
        "Car",
        "Jet",
        "Boat"
    ];
    console.log(company, vehicleTypes);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`I would like to own a ${company[Math.floor(Math.random() * company.length)]} ${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]}`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`I would like to own a ${company[Math.floor(Math.random() * company.length)]} ${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]}`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`I would like to own a ${company[Math.floor(Math.random() * company.length)]} ${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]}`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`I would like to own a ${company[Math.floor(Math.random() * company.length)]} ${vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]}`);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise13();
$df8bc72e0543dbca$export$2e2bcd8739ae039 = $df8bc72e0543dbca$var$Exercise13;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $2f66305c960c7efd$var$Exercise14 = ()=>{
    let guests = [
        "Abu Hurairah",
        "Hamza",
        "Osman"
    ];
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    const invitationMsg = (guestName)=>{
        console.log(`Hi ${guestName}, You are invited to Dinner at Hotel Avenue, this Sunday.`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    };
    guests.forEach((guest)=>invitationMsg(guest));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise14();
$2f66305c960c7efd$export$2e2bcd8739ae039 = $2f66305c960c7efd$var$Exercise14;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $41e75369ca5cc1ce$var$Exercise15 = ()=>{
    let guests = [
        "Abu Hurairah",
        "Hamza",
        "Osman"
    ];
    let guestCantCome = guests[Math.floor(Math.random() * guests.length)];
    let toInvite = "Ibrahim";
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`In Exercise 14, we invited ${guests.length} guests to dinner.`);
    console.log(`Unfortunately, for some reason, ${guestCantCome} can't make to dinner.`);
    guests.splice(guests.indexOf(guestCantCome), 1, toInvite);
    console.log(`So we are inviting ${toInvite}..`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log("Resending Invitations...");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    const invitationMsg = (guestName)=>{
        console.log(`Hi ${guestName}, You are invited to Dinner at Hotel Avenue, this Sunday.`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    };
    guests.forEach((guest)=>invitationMsg(guest));
    console.log("Invitations Sent.");
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise15();
$41e75369ca5cc1ce$export$2e2bcd8739ae039 = $41e75369ca5cc1ce$var$Exercise15;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $950a8955fa03351f$var$Exercise16 = ()=>{
    let guests = [
        "Abu Hurairah",
        "Hamza",
        "Osman"
    ];
    // * From Exercise 15
    let guestCantCome = guests[Math.floor(Math.random() * guests.length)];
    let toInvite = "Ibrahim";
    guests.splice(guests.indexOf(guestCantCome), 1, toInvite);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`In Exercise 15, we received an apology message from ${guestCantCome} since he was unable to attend dinner, so we invited ${toInvite} instead.`);
    console.log(`Recently, the hotel called to let us know that they had discovered a larger table that could accommodate ${guests.length + 3} people.`);
    let newGuests = [
        "Yousuf",
        "Subhan",
        "Sameer"
    ];
    console.log(`Inviting New Guests ${newGuests.join(", ")}`);
    guests.push(newGuests[0]);
    guests.splice(Math.floor(guests.length - 0.5), 0, newGuests[1]);
    guests.unshift(newGuests[2]);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log("Resending Invitations...");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    const invitationMsg = (guestName)=>{
        console.log(`Hi ${guestName}, You are invited to Dinner at Hotel Avenue, this Sunday.`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    };
    guests.forEach((guest)=>invitationMsg(guest));
    console.log("Invitations Sent.");
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise16();
$950a8955fa03351f$export$2e2bcd8739ae039 = $950a8955fa03351f$var$Exercise16;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $e935190853f7ac17$var$Exercise17 = ()=>{
    const invitationMsg = (guestName)=>{
        console.log(`Hi ${guestName}, You are invited to Dinner at Hotel Avenue, this Sunday.`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    };
    const apologyMsg = (guestName)=>{
        console.log(`Hi ${guestName}, Due to a lack of space, we had to cancel the invitation, and I apologize for any inconvenience this may cause you.`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    };
    let guests = [
        "Abu Hurairah",
        "Hamza",
        "Osman"
    ];
    // * From Exercise 16
    let guestCantCome = guests[Math.floor(Math.random() * guests.length)];
    let toInvite = "Ibrahim";
    guests.splice(guests.indexOf(guestCantCome), 1, toInvite);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`In Exercise 15, the hotel called to let us know that they had discovered a larger table that could accommodate ${guests.length + 3} people.`);
    let newGuests = [
        "Yousuf",
        "Subhan",
        "Sameer"
    ];
    // merging guests and newGuests
    guests.push(...newGuests);
    console.log(`The hotel called us again to inform us that due to a lack of room, we could only bring two guests.`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Taking guests off the list and sending them an apology message.`);
    let removedGuests = [];
    for(let i = 1; i <= 4; i++)removedGuests.push(guests.splice(Math.floor(Math.random() * guests.length), 1)[0]);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Sending an Apology Message to ${removedGuests.join(", ")}`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    removedGuests.forEach((removed)=>apologyMsg(removed));
    console.log("Resending Invitations to those, still invited...");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    guests.forEach((guest)=>invitationMsg(guest));
    console.log("Invitations Sent.");
    while(guests.length)guests.pop();
    console.log(`List of Guests => `, guests);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise17();
$e935190853f7ac17$export$2e2bcd8739ae039 = $e935190853f7ac17$var$Exercise17;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $e0cdb8b04662679c$var$Exercise18 = ()=>{
    let places = [
        "Singapore",
        "China",
        "Japan",
        "Turkey",
        "Vietnam",
        "MSG Sphere in Las Vegas"
    ];
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`Initial Array => `, places));
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`Array in Alphabetical Order (Unmodified) => `, places.sort()));
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`Array in Original Order => `, places));
    // Reversing Order of Array
    places = places.reverse();
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`Array in Reversed Order (Modified) => `, places));
    // Re-Reversing Order to regain the Original Order
    places = places.reverse();
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`Array in Original Order (Modified) => `, places));
    // Alphabetically Sorting an Array
    places = places.sort();
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`Array in Alphabetical Order (Modified) => `, places.sort()));
    // Reversing an Alphabetically Ordered Array
    places = places.sort();
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`Array in Reversed Alphabetical Order (Modified) => `, places.sort()));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise18();
$e0cdb8b04662679c$export$2e2bcd8739ae039 = $e0cdb8b04662679c$var$Exercise18;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $acc7dd04a5329f9b$var$Exercise19 = ()=>{
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`We are inviting 2 people to dinner at Hotel Avenue.`));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise19();
$acc7dd04a5329f9b$export$2e2bcd8739ae039 = $acc7dd04a5329f9b$var$Exercise19;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $b0279fd2d548ca5d$var$Exercise20 = ()=>{
    let mountains = [
        "Mount Everest",
        "K-2",
        "Olympus Mons",
        "Kilimanjaro",
        "Mount Fuji"
    ];
    let rivers = [
        "River Nile",
        "River Mississippi",
        "River Indus",
        "River Euphrates",
        "The Amazon River"
    ];
    let countries = [
        "Pakistan",
        "Turkiye",
        "China",
        "Saudi Arabia",
        "Japan"
    ];
    let cities = [
        "Karachi",
        "Islamabad",
        "Las Vegas",
        "Istanbul",
        "Ankara"
    ];
    let languages = [
        "Urdu",
        "English",
        "Turkish",
        "Arabic",
        "Persian"
    ];
    let lists = [
        mountains,
        rivers,
        countries,
        cities,
        languages
    ];
    // Printing Lists
    lists.forEach((list)=>console.log(list));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise20();
$b0279fd2d548ca5d$export$2e2bcd8739ae039 = $b0279fd2d548ca5d$var$Exercise20;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $73b3ad6d1f8e6f29$var$Exercise21 = ()=>{
    let mountains = [
        "Mount Everest",
        "K-2",
        "Olympus Mons",
        "Kilimanjaro",
        "Mount Fuji"
    ];
    let rivers = [
        "River Nile",
        "River Mississippi",
        "River Indus",
        "River Euphrates",
        "The Amazon River"
    ];
    let countries = [
        "Pakistan",
        "Turkiye",
        "China",
        "Saudi Arabia",
        "Japan"
    ];
    let cities = [
        "Karachi",
        "Islamabad",
        "Las Vegas",
        "Istanbul",
        "Ankara"
    ];
    let languages = [
        "Urdu",
        "English",
        "Turkish",
        "Arabic",
        "Persian"
    ];
    let lists = {
        mountains: mountains,
        river: rivers,
        countries: countries,
        cities: cities,
        languages: languages
    };
    // Printing Lists
    Object.entries(lists).forEach(([key, value])=>{
        (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`${key}:`, value), 1, 0);
    });
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise21();
$73b3ad6d1f8e6f29$export$2e2bcd8739ae039 = $73b3ad6d1f8e6f29$var$Exercise21;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ const $4b26356e535225e9$var$Exercise22 = ()=>{
    let array = [
        1,
        2,
        3,
        4,
        5,
        6
    ];
    // Error
    // console.log(array[6]);
    // Correct
    console.log(array[5]);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise22();
$4b26356e535225e9$export$2e2bcd8739ae039 = $4b26356e535225e9$var$Exercise22;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $4ea1bf9c9de6566a$var$Exercise23 = ()=>{
    let tasks = [
        {
            task: "Buy a laptop",
            status: false
        },
        {
            task: "Learn Weekly Assignments",
            status: true
        },
        {
            task: "Complete Advanced TypeScript Projects",
            status: false
        },
        {
            task: "Learn Flutter",
            status: false
        },
        {
            task: "Build an Expense Tracker",
            status: true
        },
        {
            task: "Create a UI Toolkit",
            status: false
        },
        {
            task: "Get 8 hours of sleep",
            status: false
        },
        {
            task: "Setup C++ on Laptop",
            status: true
        },
        {
            task: "Setup Flutter Development for Windows",
            status: true
        },
        {
            task: "Do Tasks Above",
            status: false
        }
    ];
    const conditions = (taskObj, index)=>{
        console.log(`${index + 1}: ${taskObj.task} | Status: ${taskObj.status ? "Completed" : "Pending"}`);
    };
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    tasks.forEach((task, index)=>(0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>conditions(task, index), 0));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise23();
$4ea1bf9c9de6566a$export$2e2bcd8739ae039 = $4ea1bf9c9de6566a$var$Exercise23;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $05a2089e66967f29$var$Exercise24 = ()=>{
    // * Arrow Functions created for Easy Navigation
    const strTests = ()=>{
        console.log(`==== Start: Equality & Inequality with Strings ====`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        // ? Reason for creating variables
        // ? TypeScript was giving error due to unintentional comparison
        var compareStrA = "hello";
        var compareStrB = "heLLo";
        console.log(`${compareStrA} == ${compareStrB} : ${compareStrA == compareStrB}`);
        console.log(`${compareStrA} != ${compareStrB} : ${compareStrA != compareStrB}`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`===== End: Equality & Inequality with Strings =====`);
    };
    const strLowerTests = ()=>{
        console.log(`==== Start: Equality & Inequality with Strings (Lowercase) ====`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        // ? Reason for creating variables
        // ? TypeScript was giving error due to unintentional comparison
        var compareStrA = "hello";
        var compareStrB = "heLLo";
        console.log(`${compareStrA}.toLowerCase() == ${compareStrB}.toLowerCase() : ${compareStrA.toLowerCase() == compareStrB.toLowerCase()}`);
        console.log(`${compareStrA}.toLowerCase() != ${compareStrB}.toLowerCase() : ${compareStrA.toLowerCase() != compareStrB.toLowerCase()}`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`===== End: Equality & Inequality with Strings (Lowercase) =====`);
    };
    const numericalTests = ()=>{
        console.log("==== Start: Numerical Tests ====");
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        let A = 10, B = 5;
        console.log(`Suppose A = ${A} and B = ${B}, so`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`${A} == ${B} => ${A == B} | '==' only compares values`);
        console.log(`${A} === ${B} => ${A === B} | '===' compares value and datatype`);
        // TypeScript doesn't allow unnecessary comparison so hardcoded the value
        console.log(`For Example, 10 == '10' => true | Compared value only`);
        console.log(`10 === '10' => false | Compared value and datatype`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`${A} > ${B} => ${A > B}`);
        console.log(`${A} < ${B} => ${A < B}`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`Here, the value A and B are equal to 10.\ni.e. A = 10, B = 10`);
        A = 10, B = 10;
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`A >= B => ${A >= B}`);
        console.log(`The value of A is not greater than B but both are equal.`);
        console.log(`This sign returns true if left-side value is greater or equal to right-side value`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`A <= B => ${A <= B}`);
        console.log(`The value of A is not less than B but both are equal.`);
        console.log(`This sign returns true if left-side value is less or equal to right-side value`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log("===== End: Numerical Tests =====");
    };
    const logicalTests = ()=>{
        console.log("==== Start: Logical Tests ====");
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        let A = 10, B = "10";
        console.log(`Suppose A = ${A} and B = ${B} but here type of variable B is string, so`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        // TypeScript doesn't allow unnecessary comparison so hardcoded the value
        console.log(`${A} == ${B} && typeof ${A} == typeof ${B} => ${false}`);
        console.log(`Explanation: The expression above first compares the value of A & B which evaluates to true.`);
        console.log(`Then, on the left side of &&, it compares the datatypes of A & B 
      which evaluate as false because they're different types in this case.`);
        console.log("So overall result will be false");
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        // TypeScript doesn't allow unnecessary comparison so hardcoded the value
        console.log(`${A} == ${B} || typeof ${A} == typeof ${B} => ${false}`);
        console.log(`Explanation: The expression above first compares the value of A and B which evaluates to true.`);
        console.log(`Then, on the left side of ||, it compares the datatypes of A and B 
      which evaluate as false because they're different types in this case.`);
        console.log("So overall result will be true");
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log("===== End: Logical Tests =====");
    };
    const ArrTest = ()=>{
        console.log("==== Start: Array Tests ====");
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        let array = [
            1,
            2,
            3,
            4,
            5,
            "a",
            "b",
            "c",
            "d",
            "e"
        ];
        console.log(`Array named 'array' =>`, array);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`array.includes(1) => ${array.includes(1)}`);
        console.log(`Explanation: The prototype function Array.includes returns true if an item is present in the array, where Array is your array name.`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`array.includes('f') => ${array.includes("f")}`);
        console.log(`Explanation: The prototype function Array.includes returns false if an item does not exist on the array, where Array is your array name.`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log("===== End: Array Tests =====");
    };
    strTests();
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`----------------------------`));
    strLowerTests();
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`----------------------------`));
    numericalTests();
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`----------------------------`));
    logicalTests();
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`----------------------------`));
    ArrTest();
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`----------------------------`));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise24();
$05a2089e66967f29$export$2e2bcd8739ae039 = $05a2089e66967f29$var$Exercise24;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $a3c51aa0d648a51b$var$Exercise25 = ()=>{
    let color = [
        "green",
        "yellow",
        "red"
    ];
    let alien_color = color[Math.floor(Math.random() * 3)];
    if (alien_color == "green") (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`You just earned 5 points.`));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise25();
$a3c51aa0d648a51b$export$2e2bcd8739ae039 = $a3c51aa0d648a51b$var$Exercise25;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $48ab8290f979465f$var$Exercise26 = ()=>{
    let color = [
        "green",
        "yellow",
        "red"
    ];
    let alien_color = color[Math.floor(Math.random() * 3)];
    if (alien_color == "green") (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
        console.log(`You just earned 5 points for shooting the alien.`);
    });
    else (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
        console.log("10 Points!! You shot a rare alien.");
    });
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise26();
$48ab8290f979465f$export$2e2bcd8739ae039 = $48ab8290f979465f$var$Exercise26;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $a79e36abe44bffe7$var$Exercise27 = ()=>{
    let color = [
        "green",
        "yellow",
        "red"
    ];
    let alien_color = color[Math.floor(Math.random() * 3)];
    if (alien_color == "green") (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
        console.log(`You just earned 5 points for shooting the alien.`);
    });
    else if (alien_color == "yellow") (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
        console.log("10 Points!! You shot a rare alien.");
    });
    else (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
        console.log("15 Points!!! You shot a super alien.");
    });
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise27();
$a79e36abe44bffe7$export$2e2bcd8739ae039 = $a79e36abe44bffe7$var$Exercise27;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $af29a69c4c22be6d$var$Exercise28 = ()=>{
    let person_age = Math.floor(Math.random() * 80) + 1;
    let person_category;
    if (person_age < 2) person_category = "baby";
    else if (person_age >= 2 && person_age < 4) person_category = "toddler";
    else if (person_age >= 4 && person_age < 13) person_category = "kid";
    else if (person_age >= 13 && person_age < 20) person_category = "teenager";
    else if (person_age >= 20 && person_age < 65) person_category = "adult";
    else person_category = "elder";
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`Person's Age =>`, person_age);
    console.log(`The person is ${[
        "a",
        "e",
        "i",
        "o",
        "u"
    ].indexOf(person_category[0]) != -1 ? "an" : "a"} ${person_category}`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise28();
$af29a69c4c22be6d$export$2e2bcd8739ae039 = $af29a69c4c22be6d$var$Exercise28;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $3180bb167d26fc25$var$Exercise29 = ()=>{
    let fruits = [
        "Mango",
        "Banana",
        "Orange"
    ];
    // Converts every fruit name to lowercase to improve test results
    fruits = fruits.join(" ").toLowerCase().split(" ");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    if (fruits.includes("Apple".toLowerCase())) {
        console.log("Apple");
        console.log("That's great.");
        console.log(`As the saying goes, "An apple a day keeps a doctor away".`);
    } else if (fruits.includes("Oranges".toLowerCase())) {
        console.log("Orange");
        console.log(`Careful! Some can get you a sour throat`);
    } else if (fruits.includes("Grapefruit".toLowerCase())) {
        console.log(`Grapefruit`);
        console.log(`It may help prevent diabetes.\nAnd a research shows people who eats grapefruits loses an average of 2.5 pounds over the time of 12 weeks.\nIf it's false, don't turn against me. This is what I read on Internet.`);
    } else if (fruits.includes("PineApple".toLowerCase())) {
        console.log(`Pineapple`);
        console.log(`It contains antioxidant named Manganese, which helps support metabolism and also helps regulates blood sugar.`);
    } else console.log("Each fruit, on the other hand, has its unique set of advantages.");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise29();
$3180bb167d26fc25$export$2e2bcd8739ae039 = $3180bb167d26fc25$var$Exercise29;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
String.prototype.toCapitalize = function() {
    let textArr = this.valueOf().split(" ");
    let capitalizedText = "";
    for(let i = 0; i < textArr.length; i++)capitalizedText += `${textArr[i].charAt(0).toUpperCase()}${textArr[i].slice(1)} `;
    return capitalizedText.trim();
};


const $b6ec63722a74bc12$var$Exercise30 = ()=>{
    let users = [
        "admin",
        "hamza",
        "yousuf",
        "Osman",
        "Abu Bakr"
    ];
    const greeting = (name)=>{
        if (name == "admin") console.log(`Hello ${name.toCapitalize()}, would you like to see a status report?`);
        else console.log(`Hello ${name.toCapitalize()}, thank you for logging in again.`);
    };
    users.forEach((user)=>(0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>greeting(user)));
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise30();
$b6ec63722a74bc12$export$2e2bcd8739ae039 = $b6ec63722a74bc12$var$Exercise30;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $bdc70e14bba8d875$var$Exercise31 = ()=>{
    let users = [
        true,
        false
    ][Math.floor(Math.random() * 2)] ? [
        "admin",
        "hamza",
        "yousuf",
        "Osman",
        "Abu Bakr"
    ] : [];
    const greeting = (name)=>{
        if (name == "admin") console.log(`Hello ${name.toCapitalize()}, would you like to see a status report?`);
        else console.log(`Hello ${name.toCapitalize()}, thank you for logging in again.`);
    };
    if (users.length) users.forEach((user)=>(0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>greeting(user)));
    else (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>console.log(`We need to find some users!`));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise31();
$bdc70e14bba8d875$export$2e2bcd8739ae039 = $bdc70e14bba8d875$var$Exercise31;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
Array.prototype.toLowerCase = function() {
    return this.filter((value)=>typeof value == "string" ? value.toLowerCase() : value);
};


const $b7d86cbf33cab894$var$Exercise32 = ()=>{
    let current_users = [
        "admin",
        "hamza",
        "yousuf",
        "Osman",
        "Abu Bakr"
    ];
    current_users = current_users.toLowerCase();
    let new_users = [
        "HC",
        "Ibrahim",
        "Hamza",
        "YOUSUF",
        "Essa"
    ];
    const checkUserAvailability = (name)=>{
        if (!current_users.includes(name.toLowerCase())) console.log(`The username (${name}) is available.`);
        else console.log(`The username (${name}) is already in use. Please choose another username.`);
    };
    new_users.forEach((user)=>(0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>checkUserAvailability(user)));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise32();
$b7d86cbf33cab894$export$2e2bcd8739ae039 = $b7d86cbf33cab894$var$Exercise32;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $149288477f2a872c$var$Exercise33 = ()=>{
    let nums = [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ];
    const ordinalNumberPostfix = (num)=>{
        if (num.toString()[num.toString().length - 1] == "1") return "st";
        else if (num.toString()[num.toString().length - 1] == "2") return "nd";
        else if (num.toString()[num.toString().length - 1] == "3") return "rd";
        else return "th";
    };
    nums.forEach((num)=>{
        (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
            console.log(num + ordinalNumberPostfix(num));
        });
    });
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise33();
$149288477f2a872c$export$2e2bcd8739ae039 = $149288477f2a872c$var$Exercise33;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $699c12b1472fb4b2$var$Exercise34 = ()=>{
    let pizzas = [
        "Chicken Tikka",
        "Cheese",
        "BBQ Spice"
    ];
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    for(let i = 0; i < pizzas.length; i++){
        console.log(`I like ${pizzas[i]} Pizza.`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    }
    console.log(`I like pizza with cheese and chicken on a thin crust with spicy tomato sauce. I also enjoy pizza with only cheese on a thick crust with barbecue sauce. Sometimes I like to try different kinds of pizza, such as Hawaiian, Margherita, or Meat Lovers. I eat pizza whenever I feel hungry, happy, or bored. I really love pizza!`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise34();
$699c12b1472fb4b2$export$2e2bcd8739ae039 = $699c12b1472fb4b2$var$Exercise34;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $7ffc0c53cea7d457$var$Exercise35 = ()=>{
    let animals = [
        "Dog",
        "Wolf",
        "Fox"
    ];
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    for(let i = 0; i < animals.length; i++){
        console.log(`${animals[i]}${animals[i].toLowerCase() == "dog" ? ": It would make a great pet" : ""}`);
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    }
    console.log(`Dogs, wolves, and foxes are all members of the canidae family,\nwhich means they are related to each other and share some features,\nsuch as having fur, four legs, a tail, and a keen sense of smell.`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise35();
$7ffc0c53cea7d457$export$2e2bcd8739ae039 = $7ffc0c53cea7d457$var$Exercise35;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $118aeb5493762b78$var$Exercise36 = ()=>{
    let animals = [
        "Dog",
        "Wolf",
        "Fox"
    ];
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    const make_shirt = (size, txt_msg)=>{
        console.log(`Shirt Details:\nSize : ${size} | Message on Front : ${txt_msg}`);
    };
    make_shirt("S", "HU x AI");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise36();
$118aeb5493762b78$export$2e2bcd8739ae039 = $118aeb5493762b78$var$Exercise36;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $2e0f642a9e97d662$var$Exercise37 = ()=>{
    const make_shirt = (size = "Large", txt_msg = "I love TypeScript")=>{
        (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
            console.log(`Shirt Details:\nSize : ${size} | Message on Front : ${txt_msg}`);
        });
    };
    make_shirt();
    make_shirt("Medium");
    make_shirt("Small", "HU x AI");
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise37();
$2e0f642a9e97d662$export$2e2bcd8739ae039 = $2e0f642a9e97d662$var$Exercise37;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $b34ad6777f1f68c0$var$Exercise38 = ()=>{
    const describe_city = (city, country = "Pakistan")=>{
        (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
            console.log(`${city.toCapitalize()} is in ${country.toCapitalize()}`);
        });
    };
    describe_city("karachi");
    describe_city("faisalabad");
    describe_city("istanbul", "Turkiye");
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise38();
$b34ad6777f1f68c0$export$2e2bcd8739ae039 = $b34ad6777f1f68c0$var$Exercise38;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $45fafdae62d54370$var$Exercise39 = ()=>{
    const city_country = (city, country = "Pakistan")=>{
        (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
            console.log(`"${city.toCapitalize()}, ${country.toCapitalize()}"`);
        });
    };
    city_country("karachi");
    city_country("faisalabad");
    city_country("istanbul", "Turkiye");
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise39();
$45fafdae62d54370$export$2e2bcd8739ae039 = $45fafdae62d54370$var$Exercise39;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $ec5f18d2dffb1391$var$Exercise40 = ()=>{
    const make_album = (artist_name, album_title, no_of_tracks)=>{
        let music_album;
        no_of_tracks == undefined ? music_album = {
            artist_name: artist_name,
            album_title: album_title
        } : music_album = {
            artist_name: artist_name,
            album_title: album_title,
            no_of_tracks: no_of_tracks
        };
        (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
            console.log(music_album);
        });
    };
    // Cant figure out artist name and album names to print
    make_album("Artist 01", "XYZ");
    make_album("Artist 02", "ABC");
    make_album("Artist 03", "DEF", 10);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise40();
$ec5f18d2dffb1391$export$2e2bcd8739ae039 = $ec5f18d2dffb1391$var$Exercise40;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $4d198e79071bcbf5$var$Exercise41 = ()=>{
    let magicians = [
        "Magician A",
        "Magician B",
        "Magician C"
    ];
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    const show_magicians = (magicians)=>{
        magicians.forEach((magician)=>(0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
                console.log(magician);
            }, 0, 1));
    };
    show_magicians(magicians);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise41();
$4d198e79071bcbf5$export$2e2bcd8739ae039 = $4d198e79071bcbf5$var$Exercise41;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $7c145474b3e688ec$var$Exercise42 = ()=>{
    let magicians = [
        "Magician A",
        "Magician B",
        "Magician C"
    ];
    // const make_great = (magicians: string[]) => {
    //   magicians.forEach((magician) => (magician = "Great" + magician));
    // };
    // make_great(magicians);
    // console.log(magicians);
    const make_great = (magicians)=>{
        return magicians.map((magician)=>"Great " + magician);
    };
    magicians = make_great(magicians);
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
        console.log(magicians);
    });
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise42();
$7c145474b3e688ec$export$2e2bcd8739ae039 = $7c145474b3e688ec$var$Exercise42;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $5ad8139b20fb2fb7$var$Exercise43 = ()=>{
    let magicians = [
        "Magician A",
        "Magician B",
        "Magician C"
    ];
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    const show_magicians = (magicians)=>{
        magicians.forEach((magician)=>(0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
                console.log(magician);
            }, 0, 1));
    };
    const make_great = (magicians)=>{
        return magicians.map((magician)=>"Great " + magician);
    };
    let newArr_magicians = make_great(magicians);
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
        console.log(`Old Array =>`);
        show_magicians(magicians);
    });
    (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
        console.log(`New Array =>`);
        show_magicians(newArr_magicians);
    });
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise43();
$5ad8139b20fb2fb7$export$2e2bcd8739ae039 = $5ad8139b20fb2fb7$var$Exercise43;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 

const $0ca98e02ebcdbb03$var$Exercise44 = ()=>{
    const make_sandwich = (items)=>{
        let sandwich = items.join("\n");
        (0, $d1580876ca345cc2$export$2e2bcd8739ae039)(()=>{
            console.log(`Summary of your order => `);
            console.log(sandwich);
        });
    };
    make_sandwich([
        "chicken",
        "cheese",
        "fries",
        "mayo"
    ]);
    make_sandwich([
        "chicken",
        "cheese",
        "fries",
        "mayo",
        "ketchup"
    ]);
    make_sandwich([
        "chicken",
        "cheese",
        "fries",
        "mayo",
        "ketchup",
        "an extra slice of cheese, maybe"
    ]);
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise44();
$0ca98e02ebcdbb03$export$2e2bcd8739ae039 = $0ca98e02ebcdbb03$var$Exercise44;


/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ 
const $cc643792aa4fb762$var$Exercise45 = ()=>{
    const createCar = (manufacturer, model, year, args)=>{
        let car = {
            manufacturer: manufacturer,
            model: model,
            year: year
        };
        if (args) for(let key in args)car[key] = args[key];
        return car;
    };
    console.log(createCar("Honda", "Civic", 2004, {
        color: "Navy",
        sunroof: true
    }));
};
var // TODO: Uncomment the statement below to execute the exercise function
// Exercise45();
$cc643792aa4fb762$export$2e2bcd8739ae039 = $cc643792aa4fb762$var$Exercise45;




let $4d8498ac616d24b7$var$exercises = [
    {
        name: "System Setup",
        exerciseFn: ()=>(0, $51bb340f01d0728b$export$2e2bcd8739ae039)()
    },
    {
        name: "Personal Message",
        exerciseFn: ()=>(0, $ec67c6e6838e20cc$export$2e2bcd8739ae039)()
    },
    {
        name: "Name Cases",
        exerciseFn: ()=>(0, $906ac65a4460acfa$export$2e2bcd8739ae039)()
    },
    {
        name: "Famous Quote",
        exerciseFn: ()=>(0, $308da6a1631a5c04$export$2e2bcd8739ae039)()
    },
    {
        name: "Famous Quote 2",
        exerciseFn: ()=>(0, $da564e3411834ac8$export$2e2bcd8739ae039)()
    },
    {
        name: "Stripping Names",
        exerciseFn: ()=>(0, $584dffe02c9bb8dc$export$2e2bcd8739ae039)()
    },
    {
        name: "Number Eight",
        exerciseFn: ()=>(0, $76e4e9f027786c7c$export$2e2bcd8739ae039)()
    },
    {
        name: "----",
        exerciseFn: ()=>(0, $e9fe48dc627594bf$export$2e2bcd8739ae039)()
    },
    {
        name: "Favorite Number",
        exerciseFn: ()=>(0, $0652010c3198a526$export$2e2bcd8739ae039)()
    },
    {
        name: "Adding Comments",
        exerciseFn: ()=>(0, $53f4b99d8c868d3a$export$2e2bcd8739ae039)()
    },
    {
        name: "Names",
        exerciseFn: ()=>(0, $1c1c9d04524e51d3$export$2e2bcd8739ae039)()
    },
    {
        name: "Greetings",
        exerciseFn: ()=>(0, $518c9d8f62feb5e9$export$2e2bcd8739ae039)()
    },
    {
        name: "Your Own Array",
        exerciseFn: ()=>(0, $df8bc72e0543dbca$export$2e2bcd8739ae039)()
    },
    {
        name: "Guest List",
        exerciseFn: ()=>(0, $2f66305c960c7efd$export$2e2bcd8739ae039)()
    },
    {
        name: "Changing Guest List",
        exerciseFn: ()=>(0, $41e75369ca5cc1ce$export$2e2bcd8739ae039)()
    },
    {
        name: "More Guests",
        exerciseFn: ()=>(0, $950a8955fa03351f$export$2e2bcd8739ae039)()
    },
    {
        name: "Shrinking Guest List",
        exerciseFn: ()=>(0, $e935190853f7ac17$export$2e2bcd8739ae039)()
    },
    {
        name: "Seeing the World",
        exerciseFn: ()=>(0, $e0cdb8b04662679c$export$2e2bcd8739ae039)()
    },
    {
        name: "Dinner Guests",
        exerciseFn: ()=>(0, $acc7dd04a5329f9b$export$2e2bcd8739ae039)()
    },
    {
        name: "Arrays",
        exerciseFn: ()=>(0, $b0279fd2d548ca5d$export$2e2bcd8739ae039)()
    },
    {
        name: "Object",
        exerciseFn: ()=>(0, $73b3ad6d1f8e6f29$export$2e2bcd8739ae039)()
    },
    {
        name: "Intentional Error",
        exerciseFn: ()=>(0, $4b26356e535225e9$export$2e2bcd8739ae039)()
    },
    {
        name: "Conditional Tests",
        exerciseFn: ()=>(0, $4ea1bf9c9de6566a$export$2e2bcd8739ae039)()
    },
    {
        name: "More Conditional Tests",
        exerciseFn: ()=>(0, $05a2089e66967f29$export$2e2bcd8739ae039)()
    },
    {
        name: "Alien Color #1",
        exerciseFn: ()=>(0, $a3c51aa0d648a51b$export$2e2bcd8739ae039)()
    },
    {
        name: "Alien Color #2",
        exerciseFn: ()=>(0, $48ab8290f979465f$export$2e2bcd8739ae039)()
    },
    {
        name: "Alien Color #3",
        exerciseFn: ()=>(0, $a79e36abe44bffe7$export$2e2bcd8739ae039)()
    },
    {
        name: "Stages of Life",
        exerciseFn: ()=>(0, $af29a69c4c22be6d$export$2e2bcd8739ae039)()
    },
    {
        name: "Favorite Fruit",
        exerciseFn: ()=>(0, $3180bb167d26fc25$export$2e2bcd8739ae039)()
    },
    {
        name: "Hello Admin",
        exerciseFn: ()=>(0, $b6ec63722a74bc12$export$2e2bcd8739ae039)()
    },
    {
        name: "No Users",
        exerciseFn: ()=>(0, $bdc70e14bba8d875$export$2e2bcd8739ae039)()
    },
    {
        name: "Checking Usernames",
        exerciseFn: ()=>(0, $b7d86cbf33cab894$export$2e2bcd8739ae039)()
    },
    {
        name: "Ordinal Numbers",
        exerciseFn: ()=>(0, $149288477f2a872c$export$2e2bcd8739ae039)()
    },
    {
        name: "Pizzas",
        exerciseFn: ()=>(0, $699c12b1472fb4b2$export$2e2bcd8739ae039)()
    },
    {
        name: "Animals",
        exerciseFn: ()=>(0, $7ffc0c53cea7d457$export$2e2bcd8739ae039)()
    },
    {
        name: "T-Shirt",
        exerciseFn: ()=>(0, $118aeb5493762b78$export$2e2bcd8739ae039)()
    },
    {
        name: "Large Shirts",
        exerciseFn: ()=>(0, $2e0f642a9e97d662$export$2e2bcd8739ae039)()
    },
    {
        name: "Cities",
        exerciseFn: ()=>(0, $b34ad6777f1f68c0$export$2e2bcd8739ae039)()
    },
    {
        name: "City Names",
        exerciseFn: ()=>(0, $45fafdae62d54370$export$2e2bcd8739ae039)()
    },
    {
        name: "Albums",
        exerciseFn: ()=>(0, $ec5f18d2dffb1391$export$2e2bcd8739ae039)()
    },
    {
        name: "Magicians",
        exerciseFn: ()=>(0, $4d198e79071bcbf5$export$2e2bcd8739ae039)()
    },
    {
        name: "Great Magicians",
        exerciseFn: ()=>(0, $7c145474b3e688ec$export$2e2bcd8739ae039)()
    },
    {
        name: "Unchanged Magicians",
        exerciseFn: ()=>(0, $5ad8139b20fb2fb7$export$2e2bcd8739ae039)()
    },
    {
        name: "Sandwiches",
        exerciseFn: ()=>(0, $0ca98e02ebcdbb03$export$2e2bcd8739ae039)()
    },
    {
        name: "Cars",
        exerciseFn: ()=>(0, $cc643792aa4fb762$export$2e2bcd8739ae039)()
    }
];
console.log(`/************************/`);
console.log(`Choose Exercise #`);
console.log(`/************************/`);
$4d8498ac616d24b7$var$exercises.forEach((element, index)=>{
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`${index + 1} - ${element["name"]}`);
});
(0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
console.log(`e - Exit`);
(0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
let $4d8498ac616d24b7$var$exercise_no = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter Exercise # to Run: ");
let $4d8498ac616d24b7$var$runExerciseNo = $4d8498ac616d24b7$var$exercise_no == "e" || $4d8498ac616d24b7$var$exercise_no >= 1 && $4d8498ac616d24b7$var$exercise_no <= $4d8498ac616d24b7$var$exercises.length;
while($4d8498ac616d24b7$var$runExerciseNo == false)$4d8498ac616d24b7$var$exercise_no = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Please Enter Exercise # to Run: ");
let $4d8498ac616d24b7$var$exitProgram = $4d8498ac616d24b7$var$exercise_no == `e`;
while(!$4d8498ac616d24b7$var$exitProgram){
    console.log(`==================`);
    console.log(`Exercise ${$4d8498ac616d24b7$var$exercise_no}: ${$4d8498ac616d24b7$var$exercises[$4d8498ac616d24b7$var$exercise_no - 1].name}`);
    console.log(`==================`);
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    $4d8498ac616d24b7$var$exercises[$4d8498ac616d24b7$var$exercise_no - 1].exerciseFn();
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)(2);
    (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Press Enter to Continue...");
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`/************************/`);
    console.log(`Choose Exercise #`);
    console.log(`/************************/`);
    $4d8498ac616d24b7$var$exercises.forEach((element, index)=>{
        (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
        console.log(`${index + 1} - ${element["name"]}`);
    });
    (0, $9843d36a0715bc80$export$2e2bcd8739ae039)();
    console.log(`e - Exit`);
    $4d8498ac616d24b7$var$exercise_no = (0, $ab736cffb96f66c4$export$2e2bcd8739ae039)("Enter Exercise # to Run: ");
    $4d8498ac616d24b7$var$exitProgram = $4d8498ac616d24b7$var$exercise_no == "e";
}
console.log(`Exit`);
$4ZM61$process.exit(0);


//# sourceMappingURL=index.js.map
