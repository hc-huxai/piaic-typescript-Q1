var $2WcTR$process = require("process");
var $2WcTR$buffer = require("buffer");
var $2WcTR$fs = require("fs");
var $2WcTR$nodetimerspromises = require("node:timers/promises");
var $2WcTR$nodeprocess = require("node:process");
var $2WcTR$nodereadline = require("node:readline");
var $2WcTR$nodetty = require("node:tty");

function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
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
parcelRequire.register("70vyc", function(module, exports) {


var $51a101c4cf49dfb6$require$Buffer = $2WcTR$buffer.Buffer;
"use strict";


var $1YCa9 = parcelRequire("1YCa9");
var $51a101c4cf49dfb6$var$term = 13; // carriage return
/**
 * create -- sync function for reading user input from stdin
 * @param   {Object} config {
 *   sigint: {Boolean} exit on ^C
 *   autocomplete: {StringArray} function({String})
 *   history: {String} a history control object (see `prompt-sync-history`)
 * }
 * @returns {Function} prompt function
 */ // for ANSI escape codes reference see https://en.wikipedia.org/wiki/ANSI_escape_code
function $51a101c4cf49dfb6$var$create(config) {
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
        var fd = $2WcTR$process.platform === "win32" ? $2WcTR$process.stdin.fd : $2WcTR$fs.openSync("/dev/tty", "rs");
        var wasRaw = $2WcTR$process.stdin.isRaw;
        if (!wasRaw) $2WcTR$process.stdin.setRawMode && $2WcTR$process.stdin.setRawMode(true);
        var buf = $51a101c4cf49dfb6$require$Buffer.alloc(3);
        var str = "", character, read;
        savedstr = "";
        if (ask) $2WcTR$process.stdout.write(ask);
        var cycle = 0;
        var prevComplete;
        while(true){
            read = $2WcTR$fs.readSync(fd, buf, 0, 3);
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
                        $2WcTR$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
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
                        $2WcTR$process.stdout.write("\x1b[2K\x1b[0G" + ask + str + "\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    case "\x1b[D":
                        if (masked) break;
                        var before = insert;
                        insert = --insert < 0 ? 0 : insert;
                        if (before - insert) $2WcTR$process.stdout.write("\x1b[1D");
                        break;
                    case "\x1b[C":
                        if (masked) break;
                        insert = ++insert > str.length ? str.length : insert;
                        $2WcTR$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                        break;
                    default:
                        if (buf.toString()) {
                            str = str + buf.toString();
                            str = str.replace(/\0/g, "");
                            insert = str.length;
                            promptPrint(masked, ask, echo, str, insert);
                            $2WcTR$process.stdout.write("\x1b[" + (insert + ask.length + 1) + "G");
                            buf = $51a101c4cf49dfb6$require$Buffer.alloc(3);
                        }
                }
                continue; // any other 3 character sequence is ignored
            }
            // if it is not a control character seq, assume only one character is read
            character = buf[read - 1];
            // catch a ^C and return null
            if (character == 3) {
                $2WcTR$process.stdout.write("^C\n");
                $2WcTR$fs.closeSync(fd);
                if (sigint) $2WcTR$process.exit(130);
                $2WcTR$process.stdin.setRawMode && $2WcTR$process.stdin.setRawMode(wasRaw);
                return null;
            }
            // catch a ^D and exit
            if (character == 4) {
                if (str.length == 0 && eot) {
                    $2WcTR$process.stdout.write("exit\n");
                    $2WcTR$process.exit(0);
                }
            }
            // catch the terminating character
            if (character == $51a101c4cf49dfb6$var$term) {
                $2WcTR$fs.closeSync(fd);
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
                    $2WcTR$process.stdout.write("	");
                    continue;
                }
                var item = res[cycle++] || res[cycle = 0, cycle++];
                if (item) {
                    $2WcTR$process.stdout.write("\r\x1b[K" + ask + item);
                    str = item;
                    insert = item.length;
                }
            }
            if (character == 127 || $2WcTR$process.platform == "win32" && character == 8) {
                if (!insert) continue;
                str = str.slice(0, insert - 1) + str.slice(insert);
                insert--;
                $2WcTR$process.stdout.write("\x1b[2D");
            } else {
                if (character < 32 || character > 126) continue;
                str = str.slice(0, insert) + String.fromCharCode(character) + str.slice(insert);
                insert++;
            }
            promptPrint(masked, ask, echo, str, insert);
        }
        $2WcTR$process.stdout.write("\n");
        $2WcTR$process.stdin.setRawMode && $2WcTR$process.stdin.setRawMode(wasRaw);
        return str || value || "";
    }
    function promptPrint(masked, ask, echo, str, insert) {
        if (masked) $2WcTR$process.stdout.write("\x1b[2K\x1b[0G" + ask + Array(str.length + 1).join(echo));
        else {
            $2WcTR$process.stdout.write("\x1b[s");
            if (insert == str.length) $2WcTR$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else if (ask) $2WcTR$process.stdout.write("\x1b[2K\x1b[0G" + ask + str);
            else $2WcTR$process.stdout.write("\x1b[2K\x1b[0G" + str + "\x1b[" + (str.length - insert) + "D");
            // Reposition the cursor to the right of the insertion point
            var askLength = $1YCa9(ask).length;
            $2WcTR$process.stdout.write(`\u001b[${askLength + 1 + (echo == "" ? 0 : insert)}G`);
        }
    }
}
module.exports = $51a101c4cf49dfb6$var$create;

});
parcelRequire.register("1YCa9", function(module, exports) {
"use strict";

var $05cAb = parcelRequire("05cAb");
const $1708ff5f98bed685$var$stripAnsi = (string)=>typeof string === "string" ? string.replace($05cAb(), "") : string;
module.exports = $1708ff5f98bed685$var$stripAnsi;
module.exports.default = $1708ff5f98bed685$var$stripAnsi;

});
parcelRequire.register("05cAb", function(module, exports) {
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




$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $417d5ecdfeae70b0$export$2e2bcd8739ae039);
/**
 * * Read the README.md file before executing the file.
 * * For Exercise's Question, refer to exercises.md file in this directory.
 */ /*
 * This Spacer() function is used to enter blank lines in the output.
 * It basically uses console.log(), but the advantage here is that
 * it also takes a parameter of type number.
 * The value determines the number of blank lines in output.
 */ const $168026c4b387c3ee$var$Spacer = (numOfSpaces)=>{
    for(let i = 1; i <= (numOfSpaces == undefined ? 1 : numOfSpaces); i++)console.log();
};
var $168026c4b387c3ee$export$2e2bcd8739ae039 = $168026c4b387c3ee$var$Spacer;



const $bef609095c514509$var$getInput = (parcelRequire("70vyc"))({
    sigint: true
});
var $bef609095c514509$export$2e2bcd8739ae039 = $bef609095c514509$var$getInput;



const $7a54dd91ebf681ea$var$SpaceAround = (fn, spaceAbove, spaceBelow)=>{
    (0, $168026c4b387c3ee$export$2e2bcd8739ae039)(spaceAbove);
    fn();
    (0, $168026c4b387c3ee$export$2e2bcd8739ae039)(spaceBelow);
};
var $7a54dd91ebf681ea$export$2e2bcd8739ae039 = $7a54dd91ebf681ea$var$SpaceAround;


var $2266340f27e5c1f6$exports = {};
"use strict";
const $2266340f27e5c1f6$var$ESC = "\x1b";
const $2266340f27e5c1f6$var$CSI = `${$2266340f27e5c1f6$var$ESC}[`;
const $2266340f27e5c1f6$var$beep = "\x07";
const $2266340f27e5c1f6$var$cursor = {
    to (x, y) {
        if (!y) return `${$2266340f27e5c1f6$var$CSI}${x + 1}G`;
        return `${$2266340f27e5c1f6$var$CSI}${y + 1};${x + 1}H`;
    },
    move (x, y) {
        let ret = "";
        if (x < 0) ret += `${$2266340f27e5c1f6$var$CSI}${-x}D`;
        else if (x > 0) ret += `${$2266340f27e5c1f6$var$CSI}${x}C`;
        if (y < 0) ret += `${$2266340f27e5c1f6$var$CSI}${-y}A`;
        else if (y > 0) ret += `${$2266340f27e5c1f6$var$CSI}${y}B`;
        return ret;
    },
    up: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}${count}A`,
    down: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}${count}B`,
    forward: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}${count}C`,
    backward: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}${count}D`,
    nextLine: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}E`.repeat(count),
    prevLine: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}F`.repeat(count),
    left: `${$2266340f27e5c1f6$var$CSI}G`,
    hide: `${$2266340f27e5c1f6$var$CSI}?25l`,
    show: `${$2266340f27e5c1f6$var$CSI}?25h`,
    save: `${$2266340f27e5c1f6$var$ESC}7`,
    restore: `${$2266340f27e5c1f6$var$ESC}8`
};
const $2266340f27e5c1f6$var$scroll = {
    up: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}S`.repeat(count),
    down: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}T`.repeat(count)
};
const $2266340f27e5c1f6$var$erase = {
    screen: `${$2266340f27e5c1f6$var$CSI}2J`,
    up: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}1J`.repeat(count),
    down: (count = 1)=>`${$2266340f27e5c1f6$var$CSI}J`.repeat(count),
    line: `${$2266340f27e5c1f6$var$CSI}2K`,
    lineEnd: `${$2266340f27e5c1f6$var$CSI}K`,
    lineStart: `${$2266340f27e5c1f6$var$CSI}1K`,
    lines (count) {
        let clear = "";
        for(let i = 0; i < count; i++)clear += this.line + (i < count - 1 ? $2266340f27e5c1f6$var$cursor.up() : "");
        if (count) clear += $2266340f27e5c1f6$var$cursor.left;
        return clear;
    }
};
$2266340f27e5c1f6$exports = {
    cursor: $2266340f27e5c1f6$var$cursor,
    scroll: $2266340f27e5c1f6$var$scroll,
    erase: $2266340f27e5c1f6$var$erase,
    beep: $2266340f27e5c1f6$var$beep
};





var $dfe518de425e986f$exports = {};
var $dfe518de425e986f$var$x = String;
var $dfe518de425e986f$var$create = function() {
    return {
        isColorSupported: false,
        reset: $dfe518de425e986f$var$x,
        bold: $dfe518de425e986f$var$x,
        dim: $dfe518de425e986f$var$x,
        italic: $dfe518de425e986f$var$x,
        underline: $dfe518de425e986f$var$x,
        inverse: $dfe518de425e986f$var$x,
        hidden: $dfe518de425e986f$var$x,
        strikethrough: $dfe518de425e986f$var$x,
        black: $dfe518de425e986f$var$x,
        red: $dfe518de425e986f$var$x,
        green: $dfe518de425e986f$var$x,
        yellow: $dfe518de425e986f$var$x,
        blue: $dfe518de425e986f$var$x,
        magenta: $dfe518de425e986f$var$x,
        cyan: $dfe518de425e986f$var$x,
        white: $dfe518de425e986f$var$x,
        gray: $dfe518de425e986f$var$x,
        bgBlack: $dfe518de425e986f$var$x,
        bgRed: $dfe518de425e986f$var$x,
        bgGreen: $dfe518de425e986f$var$x,
        bgYellow: $dfe518de425e986f$var$x,
        bgBlue: $dfe518de425e986f$var$x,
        bgMagenta: $dfe518de425e986f$var$x,
        bgCyan: $dfe518de425e986f$var$x,
        bgWhite: $dfe518de425e986f$var$x
    };
};
$dfe518de425e986f$exports = $dfe518de425e986f$var$create();
$dfe518de425e986f$exports.createColors = $dfe518de425e986f$var$create;



function $19a71fb7f114ebdf$var$z({ onlyFirst: t1 = !1 } = {}) {
    const u = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))"
    ].join("|");
    return new RegExp(u, t1 ? void 0 : "g");
}
function $19a71fb7f114ebdf$var$$(t1) {
    if (typeof t1 != "string") throw new TypeError(`Expected a \`string\`, got \`${typeof t1}\``);
    return t1.replace($19a71fb7f114ebdf$var$z(), "");
}
var $19a71fb7f114ebdf$var$m = {}, $19a71fb7f114ebdf$var$G = {
    get exports () {
        return $19a71fb7f114ebdf$var$m;
    },
    set exports (t){
        $19a71fb7f114ebdf$var$m = t;
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
})($19a71fb7f114ebdf$var$G);
const $19a71fb7f114ebdf$var$K = $19a71fb7f114ebdf$var$m;
var $19a71fb7f114ebdf$var$Y = function() {
    return /\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62(?:\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73|\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74|\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67)\uDB40\uDC7F|(?:\uD83E\uDDD1\uD83C\uDFFF\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFF\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFE])|(?:\uD83E\uDDD1\uD83C\uDFFE\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFE\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFD\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFD\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFC\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFC\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|(?:\uD83E\uDDD1\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83E\uDDD1|\uD83D\uDC69\uD83C\uDFFB\u200D\uD83E\uDD1D\u200D(?:\uD83D[\uDC68\uDC69]))(?:\uD83C[\uDFFC-\uDFFF])|\uD83D\uDC68(?:\uD83C\uDFFB(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFC-\uDFFF])|[\u2695\u2696\u2708]\uFE0F|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))?|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFF]))|\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D)?\uD83D\uDC68|(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFE])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB-\uDFFD\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFC\uDFFE\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83E\uDD1D\u200D\uD83D\uDC68(?:\uD83C[\uDFFB\uDFFD-\uDFFF])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])\uFE0F|\u200D(?:(?:\uD83D[\uDC68\uDC69])\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D[\uDC66\uDC67])|\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC)?|(?:\uD83D\uDC69(?:\uD83C\uDFFB\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|(?:\uD83C[\uDFFC-\uDFFF])\u200D\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69]))|\uD83E\uDDD1(?:\uD83C[\uDFFB-\uDFFF])\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1)(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67]))|\uD83D\uDC69(?:\u200D(?:\u2764\uFE0F\u200D(?:\uD83D\uDC8B\u200D(?:\uD83D[\uDC68\uDC69])|\uD83D[\uDC68\uDC69])|\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83E\uDDD1(?:\u200D(?:\uD83E\uDD1D\u200D\uD83E\uDDD1|\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFF\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFE\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFD\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFC\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD])|\uD83C\uDFFB\u200D(?:\uD83C[\uDF3E\uDF73\uDF7C\uDF84\uDF93\uDFA4\uDFA8\uDFEB\uDFED]|\uD83D[\uDCBB\uDCBC\uDD27\uDD2C\uDE80\uDE92]|\uD83E[\uDDAF-\uDDB3\uDDBC\uDDBD]))|\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66|\uD83D\uDC69\u200D\uD83D\uDC69\u200D(?:\uD83D[\uDC66\uDC67])|\uD83D\uDC69\u200D\uD83D\uDC67\u200D(?:\uD83D[\uDC66\uDC67])|(?:\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8|\uD83E\uDDD1(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDC69(?:\uD83C\uDFFF\u200D[\u2695\u2696\u2708]|\uD83C\uDFFE\u200D[\u2695\u2696\u2708]|\uD83C\uDFFD\u200D[\u2695\u2696\u2708]|\uD83C\uDFFC\u200D[\u2695\u2696\u2708]|\uD83C\uDFFB\u200D[\u2695\u2696\u2708]|\u200D[\u2695\u2696\u2708])|\uD83D\uDE36\u200D\uD83C\uDF2B|\uD83C\uDFF3\uFE0F\u200D\u26A7|\uD83D\uDC3B\u200D\u2744|(?:(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF])\u200D[\u2640\u2642]|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])\u200D[\u2640\u2642]|\uD83C\uDFF4\u200D\u2620|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])\u200D[\u2640\u2642]|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u2328\u23CF\u23ED-\u23EF\u23F1\u23F2\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB\u25FC\u2600-\u2604\u260E\u2611\u2618\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u2692\u2694-\u2697\u2699\u269B\u269C\u26A0\u26A7\u26B0\u26B1\u26C8\u26CF\u26D1\u26D3\u26E9\u26F0\u26F1\u26F4\u26F7\u26F8\u2702\u2708\u2709\u270F\u2712\u2714\u2716\u271D\u2721\u2733\u2734\u2744\u2747\u2763\u27A1\u2934\u2935\u2B05-\u2B07\u3030\u303D\u3297\u3299]|\uD83C[\uDD70\uDD71\uDD7E\uDD7F\uDE02\uDE37\uDF21\uDF24-\uDF2C\uDF36\uDF7D\uDF96\uDF97\uDF99-\uDF9B\uDF9E\uDF9F\uDFCD\uDFCE\uDFD4-\uDFDF\uDFF5\uDFF7]|\uD83D[\uDC3F\uDCFD\uDD49\uDD4A\uDD6F\uDD70\uDD73\uDD76-\uDD79\uDD87\uDD8A-\uDD8D\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA\uDECB\uDECD-\uDECF\uDEE0-\uDEE5\uDEE9\uDEF0\uDEF3])\uFE0F|\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08|\uD83D\uDC69\u200D\uD83D\uDC67|\uD83D\uDC69\u200D\uD83D\uDC66|\uD83D\uDE35\u200D\uD83D\uDCAB|\uD83D\uDE2E\u200D\uD83D\uDCA8|\uD83D\uDC15\u200D\uD83E\uDDBA|\uD83E\uDDD1(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83D\uDC69(?:\uD83C\uDFFF|\uD83C\uDFFE|\uD83C\uDFFD|\uD83C\uDFFC|\uD83C\uDFFB)?|\uD83C\uDDFD\uD83C\uDDF0|\uD83C\uDDF6\uD83C\uDDE6|\uD83C\uDDF4\uD83C\uDDF2|\uD83D\uDC08\u200D\u2B1B|\u2764\uFE0F\u200D(?:\uD83D\uDD25|\uD83E\uDE79)|\uD83D\uDC41\uFE0F|\uD83C\uDFF3\uFE0F|\uD83C\uDDFF(?:\uD83C[\uDDE6\uDDF2\uDDFC])|\uD83C\uDDFE(?:\uD83C[\uDDEA\uDDF9])|\uD83C\uDDFC(?:\uD83C[\uDDEB\uDDF8])|\uD83C\uDDFB(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDEE\uDDF3\uDDFA])|\uD83C\uDDFA(?:\uD83C[\uDDE6\uDDEC\uDDF2\uDDF3\uDDF8\uDDFE\uDDFF])|\uD83C\uDDF9(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDED\uDDEF-\uDDF4\uDDF7\uDDF9\uDDFB\uDDFC\uDDFF])|\uD83C\uDDF8(?:\uD83C[\uDDE6-\uDDEA\uDDEC-\uDDF4\uDDF7-\uDDF9\uDDFB\uDDFD-\uDDFF])|\uD83C\uDDF7(?:\uD83C[\uDDEA\uDDF4\uDDF8\uDDFA\uDDFC])|\uD83C\uDDF5(?:\uD83C[\uDDE6\uDDEA-\uDDED\uDDF0-\uDDF3\uDDF7-\uDDF9\uDDFC\uDDFE])|\uD83C\uDDF3(?:\uD83C[\uDDE6\uDDE8\uDDEA-\uDDEC\uDDEE\uDDF1\uDDF4\uDDF5\uDDF7\uDDFA\uDDFF])|\uD83C\uDDF2(?:\uD83C[\uDDE6\uDDE8-\uDDED\uDDF0-\uDDFF])|\uD83C\uDDF1(?:\uD83C[\uDDE6-\uDDE8\uDDEE\uDDF0\uDDF7-\uDDFB\uDDFE])|\uD83C\uDDF0(?:\uD83C[\uDDEA\uDDEC-\uDDEE\uDDF2\uDDF3\uDDF5\uDDF7\uDDFC\uDDFE\uDDFF])|\uD83C\uDDEF(?:\uD83C[\uDDEA\uDDF2\uDDF4\uDDF5])|\uD83C\uDDEE(?:\uD83C[\uDDE8-\uDDEA\uDDF1-\uDDF4\uDDF6-\uDDF9])|\uD83C\uDDED(?:\uD83C[\uDDF0\uDDF2\uDDF3\uDDF7\uDDF9\uDDFA])|\uD83C\uDDEC(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEE\uDDF1-\uDDF3\uDDF5-\uDDFA\uDDFC\uDDFE])|\uD83C\uDDEB(?:\uD83C[\uDDEE-\uDDF0\uDDF2\uDDF4\uDDF7])|\uD83C\uDDEA(?:\uD83C[\uDDE6\uDDE8\uDDEA\uDDEC\uDDED\uDDF7-\uDDFA])|\uD83C\uDDE9(?:\uD83C[\uDDEA\uDDEC\uDDEF\uDDF0\uDDF2\uDDF4\uDDFF])|\uD83C\uDDE8(?:\uD83C[\uDDE6\uDDE8\uDDE9\uDDEB-\uDDEE\uDDF0-\uDDF5\uDDF7\uDDFA-\uDDFF])|\uD83C\uDDE7(?:\uD83C[\uDDE6\uDDE7\uDDE9-\uDDEF\uDDF1-\uDDF4\uDDF6-\uDDF9\uDDFB\uDDFC\uDDFE\uDDFF])|\uD83C\uDDE6(?:\uD83C[\uDDE8-\uDDEC\uDDEE\uDDF1\uDDF2\uDDF4\uDDF6-\uDDFA\uDDFC\uDDFD\uDDFF])|[#\*0-9]\uFE0F\u20E3|\u2764\uFE0F|(?:\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD])(?:\uD83C[\uDFFB-\uDFFF])|(?:\u26F9|\uD83C[\uDFCB\uDFCC]|\uD83D\uDD75)(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|\uD83C\uDFF4|(?:[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5])(?:\uD83C[\uDFFB-\uDFFF])|(?:[\u261D\u270C\u270D]|\uD83D[\uDD74\uDD90])(?:\uFE0F|\uD83C[\uDFFB-\uDFFF])|[\u270A\u270B]|\uD83C[\uDF85\uDFC2\uDFC7]|\uD83D[\uDC08\uDC15\uDC3B\uDC42\uDC43\uDC46-\uDC50\uDC66\uDC67\uDC6B-\uDC6D\uDC72\uDC74-\uDC76\uDC78\uDC7C\uDC83\uDC85\uDC8F\uDC91\uDCAA\uDD7A\uDD95\uDD96\uDE2E\uDE35\uDE36\uDE4C\uDE4F\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1C\uDD1E\uDD1F\uDD30-\uDD34\uDD36\uDD77\uDDB5\uDDB6\uDDBB\uDDD2\uDDD3\uDDD5]|\uD83C[\uDFC3\uDFC4\uDFCA]|\uD83D[\uDC6E\uDC70\uDC71\uDC73\uDC77\uDC81\uDC82\uDC86\uDC87\uDE45-\uDE47\uDE4B\uDE4D\uDE4E\uDEA3\uDEB4-\uDEB6]|\uD83E[\uDD26\uDD35\uDD37-\uDD39\uDD3D\uDD3E\uDDB8\uDDB9\uDDCD-\uDDCF\uDDD4\uDDD6-\uDDDD]|\uD83D\uDC6F|\uD83E[\uDD3C\uDDDE\uDDDF]|[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF84\uDF86-\uDF93\uDFA0-\uDFC1\uDFC5\uDFC6\uDFC8\uDFC9\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC07\uDC09-\uDC14\uDC16-\uDC3A\uDC3C-\uDC3E\uDC40\uDC44\uDC45\uDC51-\uDC65\uDC6A\uDC79-\uDC7B\uDC7D-\uDC80\uDC84\uDC88-\uDC8E\uDC90\uDC92-\uDCA9\uDCAB-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDDA4\uDDFB-\uDE2D\uDE2F-\uDE34\uDE37-\uDE44\uDE48-\uDE4A\uDE80-\uDEA2\uDEA4-\uDEB3\uDEB7-\uDEBF\uDEC1-\uDEC5\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0D\uDD0E\uDD10-\uDD17\uDD1D\uDD20-\uDD25\uDD27-\uDD2F\uDD3A\uDD3F-\uDD45\uDD47-\uDD76\uDD78\uDD7A-\uDDB4\uDDB7\uDDBA\uDDBC-\uDDCB\uDDD0\uDDE0-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6]|(?:[\u231A\u231B\u23E9-\u23EC\u23F0\u23F3\u25FD\u25FE\u2614\u2615\u2648-\u2653\u267F\u2693\u26A1\u26AA\u26AB\u26BD\u26BE\u26C4\u26C5\u26CE\u26D4\u26EA\u26F2\u26F3\u26F5\u26FA\u26FD\u2705\u270A\u270B\u2728\u274C\u274E\u2753-\u2755\u2757\u2795-\u2797\u27B0\u27BF\u2B1B\u2B1C\u2B50\u2B55]|\uD83C[\uDC04\uDCCF\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE1A\uDE2F\uDE32-\uDE36\uDE38-\uDE3A\uDE50\uDE51\uDF00-\uDF20\uDF2D-\uDF35\uDF37-\uDF7C\uDF7E-\uDF93\uDFA0-\uDFCA\uDFCF-\uDFD3\uDFE0-\uDFF0\uDFF4\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E\uDC40\uDC42-\uDCFC\uDCFF-\uDD3D\uDD4B-\uDD4E\uDD50-\uDD67\uDD7A\uDD95\uDD96\uDDA4\uDDFB-\uDE4F\uDE80-\uDEC5\uDECC\uDED0-\uDED2\uDED5-\uDED7\uDEEB\uDEEC\uDEF4-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])|(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDD78\uDD7A-\uDDCB\uDDCD-\uDDFF\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6])\uFE0F|(?:[\u261D\u26F9\u270A-\u270D]|\uD83C[\uDF85\uDFC2-\uDFC4\uDFC7\uDFCA-\uDFCC]|\uD83D[\uDC42\uDC43\uDC46-\uDC50\uDC66-\uDC78\uDC7C\uDC81-\uDC83\uDC85-\uDC87\uDC8F\uDC91\uDCAA\uDD74\uDD75\uDD7A\uDD90\uDD95\uDD96\uDE45-\uDE47\uDE4B-\uDE4F\uDEA3\uDEB4-\uDEB6\uDEC0\uDECC]|\uD83E[\uDD0C\uDD0F\uDD18-\uDD1F\uDD26\uDD30-\uDD39\uDD3C-\uDD3E\uDD77\uDDB5\uDDB6\uDDB8\uDDB9\uDDBB\uDDCD-\uDDCF\uDDD1-\uDDDD])/g;
};
function $19a71fb7f114ebdf$var$c(t1, u = {}) {
    if (typeof t1 != "string" || t1.length === 0 || (u = {
        ambiguousIsNarrow: !0,
        ...u
    }, t1 = $19a71fb7f114ebdf$var$$(t1), t1.length === 0)) return 0;
    t1 = t1.replace($19a71fb7f114ebdf$var$Y(), "  ");
    const F = u.ambiguousIsNarrow ? 1 : 2;
    let e = 0;
    for (const s of t1){
        const C = s.codePointAt(0);
        if (C <= 31 || C >= 127 && C <= 159 || C >= 768 && C <= 879) continue;
        switch($19a71fb7f114ebdf$var$K.eastAsianWidth(s)){
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
const $19a71fb7f114ebdf$var$v = 10, $19a71fb7f114ebdf$var$M = (t1 = 0)=>(u)=>`\x1B[${u + t1}m`, $19a71fb7f114ebdf$var$L = (t1 = 0)=>(u)=>`\x1B[${38 + t1};5;${u}m`, $19a71fb7f114ebdf$var$T = (t1 = 0)=>(u, F, e)=>`\x1B[${38 + t1};2;${u};${F};${e}m`, $19a71fb7f114ebdf$var$r = {
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
Object.keys($19a71fb7f114ebdf$var$r.modifier);
const $19a71fb7f114ebdf$var$Z = Object.keys($19a71fb7f114ebdf$var$r.color), $19a71fb7f114ebdf$var$H = Object.keys($19a71fb7f114ebdf$var$r.bgColor);
[
    ...$19a71fb7f114ebdf$var$Z,
    ...$19a71fb7f114ebdf$var$H
];
function $19a71fb7f114ebdf$var$U() {
    const t1 = new Map;
    for (const [u, F] of Object.entries($19a71fb7f114ebdf$var$r)){
        for (const [e, s] of Object.entries(F))$19a71fb7f114ebdf$var$r[e] = {
            open: `\x1B[${s[0]}m`,
            close: `\x1B[${s[1]}m`
        }, F[e] = $19a71fb7f114ebdf$var$r[e], t1.set(s[0], s[1]);
        Object.defineProperty($19a71fb7f114ebdf$var$r, u, {
            value: F,
            enumerable: !1
        });
    }
    return Object.defineProperty($19a71fb7f114ebdf$var$r, "codes", {
        value: t1,
        enumerable: !1
    }), $19a71fb7f114ebdf$var$r.color.close = "\x1b[39m", $19a71fb7f114ebdf$var$r.bgColor.close = "\x1b[49m", $19a71fb7f114ebdf$var$r.color.ansi = $19a71fb7f114ebdf$var$M(), $19a71fb7f114ebdf$var$r.color.ansi256 = $19a71fb7f114ebdf$var$L(), $19a71fb7f114ebdf$var$r.color.ansi16m = $19a71fb7f114ebdf$var$T(), $19a71fb7f114ebdf$var$r.bgColor.ansi = $19a71fb7f114ebdf$var$M($19a71fb7f114ebdf$var$v), $19a71fb7f114ebdf$var$r.bgColor.ansi256 = $19a71fb7f114ebdf$var$L($19a71fb7f114ebdf$var$v), $19a71fb7f114ebdf$var$r.bgColor.ansi16m = $19a71fb7f114ebdf$var$T($19a71fb7f114ebdf$var$v), Object.defineProperties($19a71fb7f114ebdf$var$r, {
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
            value: (u)=>$19a71fb7f114ebdf$var$r.rgbToAnsi256(...$19a71fb7f114ebdf$var$r.hexToRgb(u)),
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
            value: (u, F, e)=>$19a71fb7f114ebdf$var$r.ansi256ToAnsi($19a71fb7f114ebdf$var$r.rgbToAnsi256(u, F, e)),
            enumerable: !1
        },
        hexToAnsi: {
            value: (u)=>$19a71fb7f114ebdf$var$r.ansi256ToAnsi($19a71fb7f114ebdf$var$r.hexToAnsi256(u)),
            enumerable: !1
        }
    }), $19a71fb7f114ebdf$var$r;
}
const $19a71fb7f114ebdf$var$q = $19a71fb7f114ebdf$var$U(), $19a71fb7f114ebdf$var$p = new Set([
    "\x1b",
    "\x9b"
]), $19a71fb7f114ebdf$var$J = 39, $19a71fb7f114ebdf$var$b = "\x07", $19a71fb7f114ebdf$var$W = "[", $19a71fb7f114ebdf$var$Q = "]", $19a71fb7f114ebdf$var$I = "m", $19a71fb7f114ebdf$var$w = `${$19a71fb7f114ebdf$var$Q}8;;`, $19a71fb7f114ebdf$var$N = (t1)=>`${$19a71fb7f114ebdf$var$p.values().next().value}${$19a71fb7f114ebdf$var$W}${t1}${$19a71fb7f114ebdf$var$I}`, $19a71fb7f114ebdf$var$j = (t1)=>`${$19a71fb7f114ebdf$var$p.values().next().value}${$19a71fb7f114ebdf$var$w}${t1}${$19a71fb7f114ebdf$var$b}`, $19a71fb7f114ebdf$var$X = (t1)=>t1.split(" ").map((u)=>$19a71fb7f114ebdf$var$c(u)), $19a71fb7f114ebdf$var$_ = (t1, u, F)=>{
    const e = [
        ...u
    ];
    let s = !1, C = !1, D = $19a71fb7f114ebdf$var$c($19a71fb7f114ebdf$var$$(t1[t1.length - 1]));
    for (const [i, o] of e.entries()){
        const E = $19a71fb7f114ebdf$var$c(o);
        if (D + E <= F ? t1[t1.length - 1] += o : (t1.push(o), D = 0), $19a71fb7f114ebdf$var$p.has(o) && (s = !0, C = e.slice(i + 1).join("").startsWith($19a71fb7f114ebdf$var$w)), s) {
            C ? o === $19a71fb7f114ebdf$var$b && (s = !1, C = !1) : o === $19a71fb7f114ebdf$var$I && (s = !1);
            continue;
        }
        D += E, D === F && i < e.length - 1 && (t1.push(""), D = 0);
    }
    !D && t1[t1.length - 1].length > 0 && t1.length > 1 && (t1[t1.length - 2] += t1.pop());
}, $19a71fb7f114ebdf$var$DD = (t1)=>{
    const u = t1.split(" ");
    let F = u.length;
    for(; F > 0 && !($19a71fb7f114ebdf$var$c(u[F - 1]) > 0);)F--;
    return F === u.length ? t1 : u.slice(0, F).join(" ") + u.slice(F).join("");
}, $19a71fb7f114ebdf$var$uD = (t1, u, F = {})=>{
    if (F.trim !== !1 && t1.trim() === "") return "";
    let e = "", s, C;
    const D = $19a71fb7f114ebdf$var$X(t1);
    let i = [
        ""
    ];
    for (const [E, a] of t1.split(" ").entries()){
        F.trim !== !1 && (i[i.length - 1] = i[i.length - 1].trimStart());
        let n = $19a71fb7f114ebdf$var$c(i[i.length - 1]);
        if (E !== 0 && (n >= u && (F.wordWrap === !1 || F.trim === !1) && (i.push(""), n = 0), (n > 0 || F.trim === !1) && (i[i.length - 1] += " ", n++)), F.hard && D[E] > u) {
            const B = u - n, A = 1 + Math.floor((D[E] - B - 1) / u);
            Math.floor((D[E] - 1) / u) < A && i.push(""), $19a71fb7f114ebdf$var$_(i, a, u);
            continue;
        }
        if (n + D[E] > u && n > 0 && D[E] > 0) {
            if (F.wordWrap === !1 && n < u) {
                $19a71fb7f114ebdf$var$_(i, a, u);
                continue;
            }
            i.push("");
        }
        if (n + D[E] > u && F.wordWrap === !1) {
            $19a71fb7f114ebdf$var$_(i, a, u);
            continue;
        }
        i[i.length - 1] += a;
    }
    F.trim !== !1 && (i = i.map((E)=>$19a71fb7f114ebdf$var$DD(E)));
    const o = [
        ...i.join(`
`)
    ];
    for (const [E, a] of o.entries()){
        if (e += a, $19a71fb7f114ebdf$var$p.has(a)) {
            const { groups: B } = new RegExp(`(?:\\${$19a71fb7f114ebdf$var$W}(?<code>\\d+)m|\\${$19a71fb7f114ebdf$var$w}(?<uri>.*)${$19a71fb7f114ebdf$var$b})`).exec(o.slice(E).join("")) || {
                groups: {}
            };
            if (B.code !== void 0) {
                const A = Number.parseFloat(B.code);
                s = A === $19a71fb7f114ebdf$var$J ? void 0 : A;
            } else B.uri !== void 0 && (C = B.uri.length === 0 ? void 0 : B.uri);
        }
        const n = $19a71fb7f114ebdf$var$q.codes.get(Number(s));
        o[E + 1] === `
` ? (C && (e += $19a71fb7f114ebdf$var$j("")), s && n && (e += $19a71fb7f114ebdf$var$N(n))) : a === `
` && (s && n && (e += $19a71fb7f114ebdf$var$N(s)), C && (e += $19a71fb7f114ebdf$var$j(C)));
    }
    return e;
};
function $19a71fb7f114ebdf$var$P(t1, u, F) {
    return String(t1).normalize().replace(/\r\n/g, `
`).split(`
`).map((e)=>$19a71fb7f114ebdf$var$uD(e, u, F)).join(`
`);
}
function $19a71fb7f114ebdf$var$FD(t1, u) {
    if (t1 === u) return;
    const F = t1.split(`
`), e = u.split(`
`), s = [];
    for(let C = 0; C < Math.max(F.length, e.length); C++)F[C] !== e[C] && s.push(C);
    return s;
}
const $19a71fb7f114ebdf$var$R = Symbol("clack:cancel");
function $19a71fb7f114ebdf$export$3b22524397b493c6(t1) {
    return t1 === $19a71fb7f114ebdf$var$R;
}
function $19a71fb7f114ebdf$var$g(t1, u) {
    t1.isTTY && t1.setRawMode(u);
}
const $19a71fb7f114ebdf$var$V = new Map([
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
]), $19a71fb7f114ebdf$var$tD = new Set([
    "up",
    "down",
    "left",
    "right",
    "space",
    "enter"
]);
class $19a71fb7f114ebdf$export$83716a4aa1642908 {
    constructor({ render: u, input: F = (0, $2WcTR$nodeprocess.stdin), output: e = (0, $2WcTR$nodeprocess.stdout), ...s }, C = !0){
        this._track = !1, this._cursor = 0, this.state = "initial", this.error = "", this.subscribers = new Map, this._prevFrame = "", this.opts = s, this.onKeypress = this.onKeypress.bind(this), this.close = this.close.bind(this), this.render = this.render.bind(this), this._render = u.bind(this), this._track = C, this.input = F, this.output = e;
    }
    prompt() {
        const u = new (0, $2WcTR$nodetty.WriteStream)(0);
        return u._write = (F, e, s)=>{
            this._track && (this.value = this.rl.line.replace(/\t/g, ""), this._cursor = this.rl.cursor, this.emit("value", this.value)), s();
        }, this.input.pipe(u), this.rl = (0, ($parcel$interopDefault($2WcTR$nodereadline))).createInterface({
            input: this.input,
            output: u,
            tabSize: 2,
            prompt: "",
            escapeCodeTimeout: 50
        }), (0, ($parcel$interopDefault($2WcTR$nodereadline))).emitKeypressEvents(this.input, this.rl), this.rl.prompt(), this.opts.initialValue !== void 0 && this._track && this.rl.write(this.opts.initialValue), this.input.on("keypress", this.onKeypress), $19a71fb7f114ebdf$var$g(this.input, !0), this.output.on("resize", this.render), this.render(), new Promise((F, e)=>{
            this.once("submit", ()=>{
                this.output.write((0, $2266340f27e5c1f6$exports.cursor).show), this.output.off("resize", this.render), $19a71fb7f114ebdf$var$g(this.input, !1), F(this.value);
            }), this.once("cancel", ()=>{
                this.output.write((0, $2266340f27e5c1f6$exports.cursor).show), this.output.off("resize", this.render), $19a71fb7f114ebdf$var$g(this.input, !1), F($19a71fb7f114ebdf$var$R);
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
        if (this.state === "error" && (this.state = "active"), F?.name && !this._track && $19a71fb7f114ebdf$var$V.has(F.name) && this.emit("cursor", $19a71fb7f114ebdf$var$V.get(F.name)), F?.name && $19a71fb7f114ebdf$var$tD.has(F.name) && this.emit("cursor", F.name), u && (u.toLowerCase() === "y" || u.toLowerCase() === "n") && this.emit("confirm", u.toLowerCase() === "y"), u && this.emit("key", u.toLowerCase()), F?.name === "return") {
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
`), $19a71fb7f114ebdf$var$g(this.input, !1), this.rl.close(), this.emit(`${this.state}`, this.value), this.unsubscribe();
    }
    restoreCursor() {
        const u = $19a71fb7f114ebdf$var$P(this._prevFrame, $2WcTR$process.stdout.columns, {
            hard: !0
        }).split(`
`).length - 1;
        this.output.write((0, $2266340f27e5c1f6$exports.cursor).move(-999, u * -1));
    }
    render() {
        const u = $19a71fb7f114ebdf$var$P(this._render(this) ?? "", $2WcTR$process.stdout.columns, {
            hard: !0
        });
        if (u !== this._prevFrame) {
            if (this.state === "initial") this.output.write((0, $2266340f27e5c1f6$exports.cursor).hide);
            else {
                const F = $19a71fb7f114ebdf$var$FD(this._prevFrame, u);
                if (this.restoreCursor(), F && F?.length === 1) {
                    const e = F[0];
                    this.output.write((0, $2266340f27e5c1f6$exports.cursor).move(0, e)), this.output.write((0, $2266340f27e5c1f6$exports.erase).lines(1));
                    const s = u.split(`
`);
                    this.output.write(s[e]), this._prevFrame = u, this.output.write((0, $2266340f27e5c1f6$exports.cursor).move(0, s.length - e - 1));
                    return;
                } else if (F && F?.length > 1) {
                    const e = F[0];
                    this.output.write((0, $2266340f27e5c1f6$exports.cursor).move(0, e)), this.output.write((0, $2266340f27e5c1f6$exports.erase).down());
                    const C = u.split(`
`).slice(e);
                    this.output.write(C.join(`
`)), this._prevFrame = u;
                    return;
                }
                this.output.write((0, $2266340f27e5c1f6$exports.erase).down());
            }
            this.output.write(u), this.state === "initial" && (this.state = "active"), this._prevFrame = u;
        }
    }
}
class $19a71fb7f114ebdf$export$c6657d69d1e9e62a extends $19a71fb7f114ebdf$export$83716a4aa1642908 {
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
            this.output.write((0, $2266340f27e5c1f6$exports.cursor).move(0, -1)), this.value = F, this.state = "submit", this.close();
        }), this.on("cursor", ()=>{
            this.value = !this.value;
        });
    }
}
class $19a71fb7f114ebdf$export$52efdcf404b90ff0 extends $19a71fb7f114ebdf$export$83716a4aa1642908 {
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
class $19a71fb7f114ebdf$export$a59643384d647394 extends $19a71fb7f114ebdf$export$83716a4aa1642908 {
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
class $19a71fb7f114ebdf$export$7a2d0153ca6f8af4 extends $19a71fb7f114ebdf$export$83716a4aa1642908 {
    constructor({ mask: u, ...F }){
        super(F), this.valueWithCursor = "", this._mask = "•", this._mask = u ?? "•", this.on("finalize", ()=>{
            this.valueWithCursor = this.masked;
        }), this.on("value", ()=>{
            if (this.cursor >= this.value.length) this.valueWithCursor = `${this.masked}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).hidden("_"))}`;
            else {
                const e = this.masked.slice(0, this.cursor), s = this.masked.slice(this.cursor);
                this.valueWithCursor = `${e}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse(s[0])}${s.slice(1)}`;
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
class $19a71fb7f114ebdf$export$f41bb830a1914a2 extends $19a71fb7f114ebdf$export$83716a4aa1642908 {
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
class $19a71fb7f114ebdf$export$3e496bc2be8c252a extends $19a71fb7f114ebdf$export$83716a4aa1642908 {
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
class $19a71fb7f114ebdf$export$d68664da9992e91c extends $19a71fb7f114ebdf$export$83716a4aa1642908 {
    constructor(u){
        super(u), this.valueWithCursor = "", this.on("finalize", ()=>{
            this.value || (this.value = u.defaultValue), this.valueWithCursor = this.value;
        }), this.on("value", ()=>{
            if (this.cursor >= this.value.length) this.valueWithCursor = `${this.value}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).hidden("_"))}`;
            else {
                const F = this.value.slice(0, this.cursor), e = this.value.slice(this.cursor);
                this.valueWithCursor = `${F}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse(e[0])}${e.slice(1)}`;
            }
        });
    }
    get cursor() {
        return this._cursor;
    }
}
function $19a71fb7f114ebdf$export$837bd02682cd3db9({ input: t1 = (0, $2WcTR$nodeprocess.stdin), output: u = (0, $2WcTR$nodeprocess.stdout), overwrite: F = !0, hideCursor: e = !0 } = {}) {
    const s = $2WcTR$nodereadline.createInterface({
        input: t1,
        output: u,
        prompt: "",
        tabSize: 1
    });
    $2WcTR$nodereadline.emitKeypressEvents(t1, s), t1.isTTY && t1.setRawMode(!0);
    const C = (D, { name: i })=>{
        if (String(D) === "\x03" && $2WcTR$process.exit(0), !F) return;
        let E = i === "return" ? 0 : -1, a = i === "return" ? -1 : 0;
        $2WcTR$nodereadline.moveCursor(u, E, a, ()=>{
            $2WcTR$nodereadline.clearLine(u, 1, ()=>{
                t1.once("keypress", C);
            });
        });
    };
    return e && $2WcTR$process.stdout.write((0, $2266340f27e5c1f6$exports.cursor).hide), t1.once("keypress", C), ()=>{
        t1.off("keypress", C), e && $2WcTR$process.stdout.write((0, $2266340f27e5c1f6$exports.cursor).show), t1.isTTY && t1.setRawMode(!1), s.terminal = !1, s.close();
    };
}






function $77cdac647ae9de8c$var$q() {
    return (0, ($parcel$interopDefault($2WcTR$nodeprocess))).platform !== "win32" ? (0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.TERM !== "linux" : Boolean((0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.CI) || Boolean((0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.WT_SESSION) || Boolean((0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.TERMINUS_SUBLIME) || (0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.ConEmuTask === "{cmd::Cmder}" || (0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.TERM_PROGRAM === "Terminus-Sublime" || (0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.TERM_PROGRAM === "vscode" || (0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.TERM === "xterm-256color" || (0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.TERM === "alacritty" || (0, ($parcel$interopDefault($2WcTR$nodeprocess))).env.TERMINAL_EMULATOR === "JetBrains-JediTerm";
}
const $77cdac647ae9de8c$var$_ = $77cdac647ae9de8c$var$q(), $77cdac647ae9de8c$var$o = (r, n)=>$77cdac647ae9de8c$var$_ ? r : n, $77cdac647ae9de8c$var$H = $77cdac647ae9de8c$var$o("◆", "*"), $77cdac647ae9de8c$var$I = $77cdac647ae9de8c$var$o("■", "x"), $77cdac647ae9de8c$var$x = $77cdac647ae9de8c$var$o("▲", "x"), $77cdac647ae9de8c$var$S = $77cdac647ae9de8c$var$o("◇", "o"), $77cdac647ae9de8c$var$K = $77cdac647ae9de8c$var$o("┌", "T"), $77cdac647ae9de8c$var$a = $77cdac647ae9de8c$var$o("│", "|"), $77cdac647ae9de8c$var$d = $77cdac647ae9de8c$var$o("└", "—"), $77cdac647ae9de8c$var$b = $77cdac647ae9de8c$var$o("●", ">"), $77cdac647ae9de8c$var$E = $77cdac647ae9de8c$var$o("○", " "), $77cdac647ae9de8c$var$C = $77cdac647ae9de8c$var$o("◻", "[•]"), $77cdac647ae9de8c$var$w = $77cdac647ae9de8c$var$o("◼", "[+]"), $77cdac647ae9de8c$var$M = $77cdac647ae9de8c$var$o("◻", "[ ]"), $77cdac647ae9de8c$var$U = $77cdac647ae9de8c$var$o("▪", "•"), $77cdac647ae9de8c$var$B = $77cdac647ae9de8c$var$o("─", "-"), $77cdac647ae9de8c$var$Z = $77cdac647ae9de8c$var$o("╮", "+"), $77cdac647ae9de8c$var$z = $77cdac647ae9de8c$var$o("├", "+"), $77cdac647ae9de8c$var$X = $77cdac647ae9de8c$var$o("╯", "+"), $77cdac647ae9de8c$var$J = $77cdac647ae9de8c$var$o("●", "•"), $77cdac647ae9de8c$var$Y = $77cdac647ae9de8c$var$o("◆", "*"), $77cdac647ae9de8c$var$Q = $77cdac647ae9de8c$var$o("▲", "!"), $77cdac647ae9de8c$var$ee = $77cdac647ae9de8c$var$o("■", "x"), $77cdac647ae9de8c$var$y = (r)=>{
    switch(r){
        case "initial":
        case "active":
            return (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$H);
        case "cancel":
            return (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).red($77cdac647ae9de8c$var$I);
        case "error":
            return (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$x);
        case "submit":
            return (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$S);
    }
}, $77cdac647ae9de8c$export$6f093cfa640b7166 = (r)=>new (0, $19a71fb7f114ebdf$export$d68664da9992e91c)({
        validate: r.validate,
        placeholder: r.placeholder,
        defaultValue: r.defaultValue,
        initialValue: r.initialValue,
        render () {
            const n = `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
${$77cdac647ae9de8c$var$y(this.state)}  ${r.message}
`, i = r.placeholder ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse(r.placeholder[0]) + (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(r.placeholder.slice(1)) : (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).hidden("_")), t = this.value ? this.valueWithCursor : i;
            switch(this.state){
                case "error":
                    return `${n.trim()}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$a)}  ${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow(this.error)}
`;
                case "submit":
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(this.value || r.placeholder)}`;
                case "cancel":
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(this.value ?? ""))}${this.value?.trim() ? `
` + (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a) : ""}`;
                default:
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  ${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$d)}
`;
            }
        }
    }).prompt(), $77cdac647ae9de8c$export$b9394e9ffbbc2ec7 = (r)=>new (0, $19a71fb7f114ebdf$export$7a2d0153ca6f8af4)({
        validate: r.validate,
        mask: r.mask ?? $77cdac647ae9de8c$var$U,
        render () {
            const n = `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
${$77cdac647ae9de8c$var$y(this.state)}  ${r.message}
`, i = this.valueWithCursor, t = this.masked;
            switch(this.state){
                case "error":
                    return `${n.trim()}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$a)}  ${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow(this.error)}
`;
                case "submit":
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(t)}`;
                case "cancel":
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(t ?? ""))}${t ? `
` + (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a) : ""}`;
                default:
                    return `${n}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  ${i}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$d)}
`;
            }
        }
    }).prompt(), $77cdac647ae9de8c$export$715f9d76bb8c1fea = (r)=>{
    const n = r.active ?? "Yes", i = r.inactive ?? "No";
    return new (0, $19a71fb7f114ebdf$export$c6657d69d1e9e62a)({
        active: n,
        inactive: i,
        initialValue: r.initialValue ?? !0,
        render () {
            const t = `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
${$77cdac647ae9de8c$var$y(this.state)}  ${r.message}
`, s = this.value ? n : i;
            switch(this.state){
                case "submit":
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(s)}`;
                case "cancel":
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(s))}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}`;
                default:
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  ${this.value ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$b)} ${n}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim($77cdac647ae9de8c$var$E)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(n)}`} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim("/")} ${this.value ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim($77cdac647ae9de8c$var$E)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(i)}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$b)} ${i}`}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$d)}
`;
            }
        }
    }).prompt();
}, $77cdac647ae9de8c$export$2e6c959c16ff56b8 = (r)=>{
    const n = (t, s)=>{
        const c = t.label ?? String(t.value);
        return s === "active" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$b)} ${c} ${t.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(`(${t.hint})`) : ""}` : s === "selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(c)}` : s === "cancelled" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(c))}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim($77cdac647ae9de8c$var$E)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(c)}`;
    };
    let i = 0;
    return new (0, $19a71fb7f114ebdf$export$f41bb830a1914a2)({
        options: r.options,
        initialValue: r.initialValue,
        render () {
            const t = `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
${$77cdac647ae9de8c$var$y(this.state)}  ${r.message}
`;
            switch(this.state){
                case "submit":
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${n(this.options[this.cursor], "selected")}`;
                case "cancel":
                    return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${n(this.options[this.cursor], "cancelled")}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}`;
                default:
                    {
                        const s = r.maxItems === void 0 ? 1 / 0 : Math.max(r.maxItems, 5);
                        this.cursor >= i + s - 3 ? i = Math.max(Math.min(this.cursor - s + 3, this.options.length - s), 0) : this.cursor < i + 2 && (i = Math.max(this.cursor - 2, 0));
                        const c = s < this.options.length && i > 0, l = s < this.options.length && i + s < this.options.length;
                        return `${t}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  ${this.options.slice(i, i + s).map((u, m, $)=>m === 0 && c ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim("...") : m === $.length - 1 && l ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim("...") : n(u, m + i === this.cursor ? "active" : "inactive")).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  `)}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$d)}
`;
                    }
            }
        }
    }).prompt();
}, $77cdac647ae9de8c$export$5d0cfdc259377591 = (r)=>{
    const n = (i, t = "inactive")=>{
        const s = i.label ?? String(i.value);
        return t === "selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(s)}` : t === "cancelled" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(s))}` : t === "active" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).bgCyan((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray(` ${i.value} `))} ${s} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(`(${i.hint})`) : ""}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse(` ${i.value} `)))} ${s} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(`(${i.hint})`) : ""}`;
    };
    return new (0, $19a71fb7f114ebdf$export$3e496bc2be8c252a)({
        options: r.options,
        initialValue: r.initialValue,
        render () {
            const i = `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
${$77cdac647ae9de8c$var$y(this.state)}  ${r.message}
`;
            switch(this.state){
                case "submit":
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${n(this.options.find((t)=>t.value === this.value), "selected")}`;
                case "cancel":
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${n(this.options[0], "cancelled")}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}`;
                default:
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  ${this.options.map((t, s)=>n(t, s === this.cursor ? "active" : "inactive")).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  `)}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$d)}
`;
            }
        }
    }).prompt();
}, $77cdac647ae9de8c$export$afd90303e38e32b1 = (r)=>{
    const n = (i, t)=>{
        const s = i.label ?? String(i.value);
        return t === "active" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$C)} ${s} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(`(${i.hint})`) : ""}` : t === "selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$w)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(s)}` : t === "cancelled" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(s))}` : t === "active-selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$w)} ${s} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(`(${i.hint})`) : ""}` : t === "submitted" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(s)}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim($77cdac647ae9de8c$var$M)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(s)}`;
    };
    return new (0, $19a71fb7f114ebdf$export$a59643384d647394)({
        options: r.options,
        initialValues: r.initialValues,
        required: r.required ?? !0,
        cursorAt: r.cursorAt,
        validate (i) {
            if (this.required && i.length === 0) return `Please select at least one option.
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).reset((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(`Press ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse(" space ")))} to select, ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse(" enter ")))} to submit`))}`;
        },
        render () {
            let i = `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
${$77cdac647ae9de8c$var$y(this.state)}  ${r.message}
`;
            switch(this.state){
                case "submit":
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${this.options.filter(({ value: t })=>this.value.includes(t)).map((t)=>n(t, "submitted")).join((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(", ")) || (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim("none")}`;
                case "cancel":
                    {
                        const t = this.options.filter(({ value: s })=>this.value.includes(s)).map((s)=>n(s, "cancelled")).join((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(", "));
                        return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${t.trim() ? `${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}` : ""}`;
                    }
                case "error":
                    {
                        const t = this.error.split(`
`).map((s, c)=>c === 0 ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow(s)}` : `   ${s}`).join(`
`);
                        return i + (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$a) + "  " + this.options.map((s, c)=>{
                            const l = this.value.includes(s.value), u = c === this.cursor;
                            return u && l ? n(s, "active-selected") : l ? n(s, "selected") : n(s, u ? "active" : "inactive");
                        }).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$a)}  `) + `
` + t + `
`;
                    }
                default:
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  ${this.options.map((t, s)=>{
                        const c = this.value.includes(t.value), l = s === this.cursor;
                        return l && c ? n(t, "active-selected") : c ? n(t, "selected") : n(t, l ? "active" : "inactive");
                    }).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  `)}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$d)}
`;
            }
        }
    }).prompt();
}, $77cdac647ae9de8c$export$69ced5e54e73dabf = (r)=>{
    const n = (i, t, s = [])=>{
        const c = i.label ?? String(i.value), l = typeof i.group == "string", u = l && (s[s.indexOf(i) + 1] ?? {
            group: !0
        }), m = l && u.group === !0, $ = l ? `${m ? $77cdac647ae9de8c$var$d : $77cdac647ae9de8c$var$a} ` : "";
        return t === "active" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim($)}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$C)} ${c} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(`(${i.hint})`) : ""}` : t === "group-active" ? `${$}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$C)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(c)}` : t === "group-active-selected" ? `${$}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$w)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(c)}` : t === "selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim($)}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$w)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(c)}` : t === "cancelled" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).strikethrough((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(c))}` : t === "active-selected" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim($)}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$w)} ${c} ${i.hint ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(`(${i.hint})`) : ""}` : t === "submitted" ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(c)}` : `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim($)}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim($77cdac647ae9de8c$var$M)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(c)}`;
    };
    return new (0, $19a71fb7f114ebdf$export$52efdcf404b90ff0)({
        options: r.options,
        initialValues: r.initialValues,
        required: r.required ?? !0,
        cursorAt: r.cursorAt,
        validate (i) {
            if (this.required && i.length === 0) return `Please select at least one option.
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).reset((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(`Press ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse(" space ")))} to select, ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).bgWhite((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).inverse(" enter ")))} to submit`))}`;
        },
        render () {
            let i = `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
${$77cdac647ae9de8c$var$y(this.state)}  ${r.message}
`;
            switch(this.state){
                case "submit":
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${this.options.filter(({ value: t })=>this.value.includes(t)).map((t)=>n(t, "submitted")).join((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(", "))}`;
                case "cancel":
                    {
                        const t = this.options.filter(({ value: s })=>this.value.includes(s)).map((s)=>n(s, "cancelled")).join((0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(", "));
                        return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${t.trim() ? `${t}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}` : ""}`;
                    }
                case "error":
                    {
                        const t = this.error.split(`
`).map((s, c)=>c === 0 ? `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow(s)}` : `   ${s}`).join(`
`);
                        return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$a)}  ${this.options.map((s, c, l)=>{
                            const u = this.value.includes(s.value) || s.group === !0 && this.isGroupSelected(`${s.value}`), m = c === this.cursor;
                            return !m && typeof s.group == "string" && this.options[this.cursor].value === s.group ? n(s, u ? "group-active-selected" : "group-active", l) : m && u ? n(s, "active-selected", l) : u ? n(s, "selected", l) : n(s, m ? "active" : "inactive", l);
                        }).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$a)}  `)}
${t}
`;
                    }
                default:
                    return `${i}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  ${this.options.map((t, s, c)=>{
                        const l = this.value.includes(t.value) || t.group === !0 && this.isGroupSelected(`${t.value}`), u = s === this.cursor;
                        return !u && typeof t.group == "string" && this.options[this.cursor].value === t.group ? n(t, l ? "group-active-selected" : "group-active", c) : u && l ? n(t, "active-selected", c) : l ? n(t, "selected", c) : n(t, u ? "active" : "inactive", c);
                    }).join(`
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$a)}  `)}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).cyan($77cdac647ae9de8c$var$d)}
`;
            }
        }
    }).prompt();
}, $77cdac647ae9de8c$var$R = (r)=>r.replace($77cdac647ae9de8c$var$me(), ""), $77cdac647ae9de8c$export$a92e4c44d367d0af = (r = "", n = "")=>{
    const i = `
${r}
`.split(`
`), t = $77cdac647ae9de8c$var$R(n).length, s = Math.max(i.reduce((l, u)=>(u = $77cdac647ae9de8c$var$R(u), u.length > l ? u.length : l), 0), t) + 2, c = i.map((l)=>`${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).dim(l)}${" ".repeat(s - $77cdac647ae9de8c$var$R(l).length)}${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}`).join(`
`);
    $2WcTR$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$S)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).reset(n)} ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$B.repeat(Math.max(s - t - 1, 1)) + $77cdac647ae9de8c$var$Z)}
${c}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$z + $77cdac647ae9de8c$var$B.repeat(s + 2) + $77cdac647ae9de8c$var$X)}
`);
}, $77cdac647ae9de8c$export$70b61ad426ddbe54 = (r = "")=>{
    $2WcTR$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$d)}  ${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).red(r)}

`);
}, $77cdac647ae9de8c$export$affaf52642033041 = (r = "")=>{
    $2WcTR$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$K)}  ${r}
`);
}, $77cdac647ae9de8c$export$ed2c61a743ec1950 = (r = "")=>{
    $2WcTR$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$d)}  ${r}

`);
}, $77cdac647ae9de8c$export$bef1f36f5486a6a3 = {
    message: (r = "", { symbol: n = (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a) } = {})=>{
        const i = [
            `${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}`
        ];
        if (r) {
            const [t, ...s] = r.split(`
`);
            i.push(`${n}  ${t}`, ...s.map((c)=>`${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}  ${c}`));
        }
        $2WcTR$process.stdout.write(`${i.join(`
`)}
`);
    },
    info: (r)=>{
        $77cdac647ae9de8c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).blue($77cdac647ae9de8c$var$J)
        });
    },
    success: (r)=>{
        $77cdac647ae9de8c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$Y)
        });
    },
    step: (r)=>{
        $77cdac647ae9de8c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$S)
        });
    },
    warn: (r)=>{
        $77cdac647ae9de8c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).yellow($77cdac647ae9de8c$var$Q)
        });
    },
    warning: (r)=>{
        $77cdac647ae9de8c$export$bef1f36f5486a6a3.warn(r);
    },
    error: (r)=>{
        $77cdac647ae9de8c$export$bef1f36f5486a6a3.message(r, {
            symbol: (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).red($77cdac647ae9de8c$var$ee)
        });
    }
}, $77cdac647ae9de8c$export$641374ffb95bc399 = ()=>{
    const r = $77cdac647ae9de8c$var$_ ? [
        "◒",
        "◐",
        "◓",
        "◑"
    ] : [
        "•",
        "o",
        "O",
        "0"
    ], n = $77cdac647ae9de8c$var$_ ? 80 : 120;
    let i, t, s = !1, c = "";
    const l = (v = "")=>{
        s = !0, i = (0, $19a71fb7f114ebdf$export$837bd02682cd3db9)(), c = v.replace(/\.+$/, ""), $2WcTR$process.stdout.write(`${(0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).gray($77cdac647ae9de8c$var$a)}
`);
        let g = 0, p = 0;
        t = setInterval(()=>{
            const O = (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).magenta(r[g]), P = ".".repeat(Math.floor(p)).slice(0, 3);
            $2WcTR$process.stdout.write((0, $2266340f27e5c1f6$exports.cursor).move(-999, 0)), $2WcTR$process.stdout.write((0, $2266340f27e5c1f6$exports.erase).down(1)), $2WcTR$process.stdout.write(`${O}  ${c}${P}`), g = g + 1 < r.length ? g + 1 : 0, p = p < r.length ? p + .125 : 0;
        }, n);
    }, u = (v = "", g = 0)=>{
        c = v ?? c, s = !1, clearInterval(t);
        const p = g === 0 ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).green($77cdac647ae9de8c$var$S) : g === 1 ? (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).red($77cdac647ae9de8c$var$I) : (0, (/*@__PURE__*/$parcel$interopDefault($dfe518de425e986f$exports))).red($77cdac647ae9de8c$var$x);
        $2WcTR$process.stdout.write((0, $2266340f27e5c1f6$exports.cursor).move(-999, 0)), $2WcTR$process.stdout.write((0, $2266340f27e5c1f6$exports.erase).down(1)), $2WcTR$process.stdout.write(`${p}  ${c}
`), i();
    }, m = (v = "")=>{
        c = v ?? c;
    }, $ = (v)=>{
        const g = v > 1 ? "Something went wrong" : "Canceled";
        s && u(g, v);
    };
    return $2WcTR$process.on("uncaughtExceptionMonitor", ()=>$(2)), $2WcTR$process.on("unhandledRejection", ()=>$(2)), $2WcTR$process.on("SIGINT", ()=>$(1)), $2WcTR$process.on("SIGTERM", ()=>$(1)), $2WcTR$process.on("exit", $), {
        start: l,
        stop: u,
        message: m
    };
};
function $77cdac647ae9de8c$var$me() {
    const r = [
        "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)",
        "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"
    ].join("|");
    return new RegExp(r, "g");
}
const $77cdac647ae9de8c$export$e5e25fbcc1f7affe = async (r, n)=>{
    const i = {}, t = Object.keys(r);
    for (const s of t){
        const c = r[s], l = await c({
            results: i
        })?.catch((u)=>{
            throw u;
        });
        if (typeof n?.onCancel == "function" && (0, $19a71fb7f114ebdf$export$3b22524397b493c6)(l)) {
            i[s] = "canceled", n.onCancel({
                results: i
            });
            continue;
        }
        i[s] = l;
    }
    return i;
};



const $07b3886a9cba6ba1$var$Spinner = async (timeout)=>{
    const s = (0, $77cdac647ae9de8c$export$641374ffb95bc399)();
    s.start();
    await (0, $2WcTR$nodetimerspromises.setTimeout)(timeout == undefined ? 2000 : timeout);
    s.stop();
};
var $07b3886a9cba6ba1$export$2e2bcd8739ae039 = $07b3886a9cba6ba1$var$Spinner;



const $8b1a5def7fa01836$var$Start = (message)=>{
    $77cdac647ae9de8c$export$affaf52642033041(message);
};
var $8b1a5def7fa01836$export$2e2bcd8739ae039 = $8b1a5def7fa01836$var$Start;



const $a8d35cb46479363d$var$End = (message)=>{
    $77cdac647ae9de8c$export$ed2c61a743ec1950(message);
};
var $a8d35cb46479363d$export$2e2bcd8739ae039 = $a8d35cb46479363d$var$End;






const $417d5ecdfeae70b0$var$Exercise21 = ()=>{
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
        (0, $7a54dd91ebf681ea$export$2e2bcd8739ae039)(()=>console.log(`${key}:`, value), 1, 0);
    });
    (0, $168026c4b387c3ee$export$2e2bcd8739ae039)();
};
// TODO: Uncomment the statement below to execute the exercise function
$417d5ecdfeae70b0$var$Exercise21();
var $417d5ecdfeae70b0$export$2e2bcd8739ae039 = $417d5ecdfeae70b0$var$Exercise21;


