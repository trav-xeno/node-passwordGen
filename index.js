"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var inq = require("inquirer");
var chalk = require("chalk");
var fs_1 = require("fs");
var writeToFile = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fs_1.promises.writeFile("password..txt", data, "utf8")];
            case 1:
                _a.sent();
                console.log(chalk.blue("password.txt has been created!"));
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(chalk.redBright("There was an error while trying to create the password.txt!"));
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var ask = function () {
    return inq.prompt([
        {
            type: "input",
            name: "length",
            message: "How long would you like your password?",
            validate: function (length) {
                if (length === "") {
                    return "This can" + chalk.red("NOT be empty");
                }
                else if (isNaN(length)) {
                    return "This " + chalk.red("MUST be a number!");
                }
                else if (parseInt(length) < 8 || parseInt(length) > 128) {
                    return ("This can " +
                        chalk.red.underline("NOT") +
                        "be " +
                        chalk.redBright.underline("LESS then 8 and MORE than 128!") +
                        " " +
                        +chalk.underline("Please enter again"));
                }
                return true;
            }
        },
        {
            type: "checkbox",
            name: "result",
            message: "What would you like to add?:",
            choices: ["numbers", "Special Chars", "lower case", "upper case"],
            validate: function (result) {
                if (result.length == 0) {
                    return ("You " +
                        chalk.red("MUST") +
                        " select at least " +
                        chalk.underline("one!"));
                }
                return true;
            }
        }
    ]);
};
var GenPassword = /** @class */ (function () {
    function GenPassword(length, list) {
        this.list = list;
        this.length = length;
        this.num = false;
        this.sp = false;
        this.lowChar = false;
        this.upChar = false;
    }
    GenPassword.prototype.check = function () {
        if (this.list.length == 4) {
            this.num = true;
            this.sp = true;
            this.lowChar = true;
            this.upChar = true;
        }
        else {
            if (this.list.includes("numbers")) {
                this.num = true;
            }
            if (this.list.includes("Special Chars")) {
                this.sp = true;
            }
            if (this.list.includes("lower case")) {
                this.lowChar = true;
            }
            if (this.list.includes("upper case ")) {
                this.upChar = true;
            }
        }
    };
    GenPassword.prototype.genString = function () {
        var str = "";
        // code use ascII codes but this is easier then going through all the numbers
        //the ascII way might be fast but i'll have to check to see peroramnce if there is no performacne differance then this is fine
        var lowerCase = "abcdefghijklmnopqrstuvwxyz";
        var upperCase = lowerCase.toUpperCase();
        var number = "0123456789";
        var spChar = "!@#-_.,:|~?+*=";
        if (this.num) {
            str += number;
        }
        if (this.sp) {
            str += spChar;
        }
        if (this.lowChar) {
            str += lowerCase;
        }
        if (this.upChar) {
            str += upperCase;
        }
        return str;
    };
    GenPassword.prototype.create = function () {
        var len = parseInt(this.length);
        this.check();
        var str = this.genString();
        var pass = "";
        for (var i = 0; i < len; i++) {
            pass += str.charAt(Math.floor(Math.random() * str.length));
        }
        return pass;
    };
    return GenPassword;
}());
var App = /** @class */ (function () {
    function App() {
    }
    App.prototype.generate = function (ob) {
        console.log(ob);
        var length = ob.length, result = ob.result;
        var gen = new GenPassword(length, result);
        return gen.create();
    };
    App.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, password;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, ask()];
                    case 1:
                        _a.result = _b.sent();
                        return [4 /*yield*/, this.generate(this.result)];
                    case 2:
                        password = _b.sent();
                        console.log(chalk.blue("-----your password-----"));
                        console.log(chalk.green(password));
                        writeToFile(password);
                        return [2 /*return*/];
                }
            });
        });
    };
    return App;
}());
var app = function () {
    var genpass = new App();
    genpass.start();
};
app();
