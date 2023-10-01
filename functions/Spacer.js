"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Spacer = function (numOfSpaces) {
    if (numOfSpaces === void 0) { numOfSpaces = 1; }
    for (var i = 1; i <= numOfSpaces; i++) {
        console.log();
    }
};
exports.default = Spacer;
