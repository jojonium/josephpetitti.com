(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
var FileManager_1 = require("./FileManager");
var DictionaryManager = /** @class */ (function () {
    function DictionaryManager() {
        this.dict = {};
    }
    DictionaryManager.prototype.getAllWords = function () {
        return Object.keys(this.dict);
    };
    /** each line of the file should be a separate word */
    DictionaryManager.prototype.addWordsFromFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var words, _i, words_1, w;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, FileManager_1.FileManager.getWordsAsArray(FileManager_1.FileManager.WORD_BANK_PATH)];
                    case 1:
                        words = _a.sent();
                        for (_i = 0, words_1 = words; _i < words_1.length; _i++) {
                            w = words_1[_i];
                            this.dict[w] = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    DictionaryManager.prototype.numWords = function () {
        return Object.keys(this.dict).length;
    };
    DictionaryManager.prototype.clear = function () {
        this.dict = {};
    };
    /** checks whether a word is in the dictionary */
    DictionaryManager.prototype.validate = function (word) {
        return this.dict[word] !== undefined;
    };
    /**
     * returns the number of letters in gword that match a unique letter in sword
     * @param sword the secret word we're trying to guess
     * @param gword the guess word
     */
    DictionaryManager.sharedLetters = function (sword, gword) {
        var counter = 0;
        for (var _i = 0, sword_1 = sword; _i < sword_1.length; _i++) {
            var letter = sword_1[_i];
            if (gword.includes(letter)) {
                counter++;
                gword = gword.replace(letter, "");
            }
        }
        return counter;
    };
    return DictionaryManager;
}());
exports.DictionaryManager = DictionaryManager;

},{"./FileManager":2}],2:[function(require,module,exports){
(function (__dirname){
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var readline_1 = require("readline");
exports.FileManager = {
    WORD_BANK_PATH: path_1.join(__dirname, "assets", "manywords.txt"),
    H_PATH: path_1.join(__dirname, "assets", "imdb-frequencies.txt"),
    // get string from filesystem
    getText: function (path) {
        return new Promise(function (resolve) {
            fs_1.readFile(path, function (err, data) {
                if (err)
                    throw err;
                resolve(data.toString());
            });
        });
    },
    getWordsAsArray: function (path) {
        return new Promise(function (resolve) {
            exports.FileManager.getText(path).then(function (text) {
                resolve(text.split(/\s+/g).filter(function (x) { return x.length !== 0; }));
            });
        });
    },
    /**
     * @param path the path to a file containing a stringified JSON of word
     * frequencies
     */
    generateH: function (path) {
        return new Promise(function (resolve) {
            exports.FileManager.getText(path).then(function (text) {
                var h = JSON.parse(text);
                for (var key in h) {
                    h[key]++;
                }
                var sum = Object.values(h).reduce(function (a, b) { return a + b; });
                for (var key in h) {
                    h[key] /= sum;
                }
                resolve(h);
            });
        });
    },
    frequenciesFromFolder: function (path) { return __awaiter(void 0, void 0, void 0, function () {
        var words, arr, _i, arr_1, w, filenames, _a, filenames_1, file, rl, rl_1, rl_1_1, line, _b, _c, word, e_1_1;
        var e_1, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    words = {};
                    return [4 /*yield*/, exports.FileManager.getWordsAsArray(exports.FileManager.WORD_BANK_PATH)];
                case 1:
                    arr = _e.sent();
                    for (_i = 0, arr_1 = arr; _i < arr_1.length; _i++) {
                        w = arr_1[_i];
                        words[w] = 0;
                    }
                    return [4 /*yield*/, fs_1.promises.readdir(path)];
                case 2:
                    filenames = _e.sent();
                    _a = 0, filenames_1 = filenames;
                    _e.label = 3;
                case 3:
                    if (!(_a < filenames_1.length)) return [3 /*break*/, 16];
                    file = filenames_1[_a];
                    rl = readline_1.createInterface({
                        input: fs_1.createReadStream(path_1.join(path, file)),
                        crlfDelay: Infinity,
                    });
                    _e.label = 4;
                case 4:
                    _e.trys.push([4, 9, 10, 15]);
                    rl_1 = __asyncValues(rl);
                    _e.label = 5;
                case 5: return [4 /*yield*/, rl_1.next()];
                case 6:
                    if (!(rl_1_1 = _e.sent(), !rl_1_1.done)) return [3 /*break*/, 8];
                    line = rl_1_1.value;
                    for (_b = 0, _c = line.split(/[^a-zA-Z]/); _b < _c.length; _b++) {
                        word = _c[_b];
                        if (words[word] !== undefined)
                            words[word]++;
                    }
                    _e.label = 7;
                case 7: return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 15];
                case 9:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 15];
                case 10:
                    _e.trys.push([10, , 13, 14]);
                    if (!(rl_1_1 && !rl_1_1.done && (_d = rl_1.return))) return [3 /*break*/, 12];
                    return [4 /*yield*/, _d.call(rl_1)];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12: return [3 /*break*/, 14];
                case 13:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 14: return [7 /*endfinally*/];
                case 15:
                    _a++;
                    return [3 /*break*/, 3];
                case 16: return [2 /*return*/, words];
            }
        });
    }); },
};

}).call(this,"/build/src")

},{"fs":8,"path":9,"readline":8}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DictionaryManager_1 = require("./DictionaryManager");
var FileManager_1 = require("./FileManager");
var Jotto_1 = require("./Jotto");
/** a Jotto agent that implements a greedy algorithm */
var GreedyAgent = /** @class */ (function () {
    function GreedyAgent(h) {
        if (h === void 0) { h = {}; }
        this.h = {}; // frequency table
        this.output = console.log;
        this.secretWord = "";
        this.words = [];
        this.h = h;
        this.L = 5;
        this.epsilon = 1;
    }
    GreedyAgent.prototype.setUp = function () {
        var _this = this;
        return new Promise(function (resolve) {
            FileManager_1.FileManager.getWordsAsArray(FileManager_1.FileManager.WORD_BANK_PATH).then(function (words) {
                _this.words = words;
                _this.secretWord = _this.pickRandomWord();
                if (Object.keys(_this.h).length !== _this.words.length) {
                    for (var _i = 0, _a = _this.words; _i < _a.length; _i++) {
                        var w = _a[_i];
                        _this.h[w] = 1 / _this.words.length;
                    }
                }
                resolve(_this.secretWord);
            });
        });
    };
    GreedyAgent.prototype.processResults = function (gr) {
        if (!gr.won()) {
            if (gr.correctLetters() === 0) {
                this.words = this.words.filter(function (w) {
                    return (w !== gr.getWord() &&
                        DictionaryManager_1.DictionaryManager.sharedLetters(gr.getWord(), w) === 0 &&
                        !gr.isAnagram(w, gr.getWord()));
                });
            }
            else if (gr.correctLetters() < 5) {
                this.words = this.words.filter(function (w) {
                    return (w !== gr.getWord() &&
                        DictionaryManager_1.DictionaryManager.sharedLetters(gr.getWord(), w) >=
                            gr.correctLetters() &&
                        !gr.isAnagram(w, gr.getWord()));
                });
            }
            else {
                this.words = this.words.filter(function (w) {
                    return (w !== gr.getWord() &&
                        DictionaryManager_1.DictionaryManager.sharedLetters(gr.getWord(), w) >=
                            gr.correctLetters());
                });
            }
            this.epsilon = 0;
            Jotto_1.GLOBALS.out += this.words.length + ", ";
            return;
        }
    };
    GreedyAgent.prototype.pickRandomWord = function () {
        return this.words[Math.floor(Math.random() * this.words.length)];
    };
    GreedyAgent.prototype.getGuess = function () {
        var _this = this;
        if (Math.random() < this.epsilon) {
            return new Promise(function (resolve) { return resolve(_this.pickRandomWord()); });
        }
        else {
            return new Promise(function (resolve) { return resolve(_this.guesserGBR()); });
        }
    };
    GreedyAgent.prototype.guesserGBR = function () {
        var maxN = 0;
        var bestWords = [];
        var startTime = new Date().valueOf();
        for (var _i = 0, _a = this.words; _i < _a.length; _i++) {
            var w = _a[_i];
            if (new Date().valueOf() - startTime >= 2000)
                break;
            var n = this.ExpNumElims(w);
            if (n > maxN) {
                bestWords = [w];
                maxN = n;
            }
            else if (n === maxN) {
                bestWords.push(w);
            }
        }
        return bestWords[Math.floor(Math.random() * bestWords.length)];
    };
    GreedyAgent.prototype.ExpNumElims = function (word) {
        var A = this.AnswerProbs(word);
        var n = 0;
        for (var j = 0; j <= this.L; j++) {
            n += A[j] * this.NumElims(word, j);
        }
        return n;
    };
    GreedyAgent.prototype.AnswerProbs = function (word) {
        var A = new Array(this.L + 1).fill(0);
        for (var _i = 0, _a = this.words; _i < _a.length; _i++) {
            var w = _a[_i];
            var k = DictionaryManager_1.DictionaryManager.sharedLetters(word, w);
            A[k] += this.h[w];
        }
        var sum = A.reduce(function (a, b) { return a + b; }, 0);
        for (var j = 0; j <= this.L; j++) {
            A[j] /= sum;
        }
        return A; // needs to be 5 elements
    };
    GreedyAgent.prototype.NumElims = function (word, j) {
        var counter = 0;
        for (var _i = 0, _a = this.words; _i < _a.length; _i++) {
            var w = _a[_i];
            if (DictionaryManager_1.DictionaryManager.sharedLetters(word, w) !== j) {
                counter++;
            }
        }
        return counter;
    };
    return GreedyAgent;
}());
exports.GreedyAgent = GreedyAgent;

},{"./DictionaryManager":1,"./FileManager":2,"./Jotto":5}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GuessResult = /** @class */ (function () {
    function GuessResult(word, isWinningGuess, numCorrect) {
        this.word = word;
        this.isWinningGuess = isWinningGuess;
        this.numCorrect = numCorrect;
    }
    /** whether the guess is the winning word */
    GuessResult.prototype.won = function () {
        return this.isWinningGuess;
    };
    /** returns the word that was guessed */
    GuessResult.prototype.getWord = function () {
        return this.word;
    };
    /** the number of letters the guess shares with the correct word */
    GuessResult.prototype.correctLetters = function () {
        return this.numCorrect;
    };
    GuessResult.prototype.isAnagram = function (word1, word2) {
        var word1Array = word1.split("").sort().join(""), word2Array = word2.split("").sort().join("");
        return word1Array === word2Array;
    };
    return GuessResult;
}());
exports.GuessResult = GuessResult;

},{}],5:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
var DictionaryManager_1 = require("./DictionaryManager");
var GuessResult_1 = require("./GuessResult");
exports.GLOBALS = {
    out: "",
};
/** This class manages the rules for a game of Jotto */
var Jotto = /** @class */ (function () {
    function Jotto(p1, p2, dm) {
        this.p1 = p1;
        this.p2 = p2;
        this.p1Secret = "";
        this.p2Secret = "";
        this.dictionaryManager = dm;
    }
    Jotto.prototype.setUp = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(this.dictionaryManager.numWords() === 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.dictionaryManager.addWordsFromFile()];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        _a = this;
                        return [4 /*yield*/, this.p1.setUp()];
                    case 3:
                        _a.p1Secret = _c.sent();
                        _b = this;
                        return [4 /*yield*/, this.p2.setUp()];
                    case 4:
                        _b.p2Secret = _c.sent();
                        exports.GLOBALS.out += this.p2Secret + ", ";
                        return [2 /*return*/];
                }
            });
        });
    };
    /** checks whether a word is legal */
    Jotto.prototype.validate = function (word) {
        return this.dictionaryManager.validate(word);
    };
    /**
     * Runs the game until someone wins or 1000 turns have passed, then returns
     * the winner (or null if time ran out) and the number of turns it took
     */
    Jotto.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var turnCounter, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.dictionaryManager.validate(this.p1Secret))
                            throw new Error("p1 has illegal secret word: '" + this.p1Secret + "'");
                        if (!this.dictionaryManager.validate(this.p2Secret))
                            throw new Error("p2 has illegal secret word: '" + this.p2Secret + "'");
                        turnCounter = 0;
                        _a.label = 1;
                    case 1:
                        if (!(turnCounter < 1000)) return [3 /*break*/, 4];
                        turnCounter++;
                        return [4 /*yield*/, this.oneTurn(this.p1, this.p2Secret)];
                    case 2:
                        result = _a.sent();
                        this.p1.processResults(result);
                        if (result.won())
                            return [2 /*return*/, {
                                    winner: this.p1,
                                    turns: turnCounter,
                                    winnersWord: this.p1Secret,
                                }];
                        return [4 /*yield*/, this.oneTurn(this.p2, this.p1Secret)];
                    case 3:
                        result = _a.sent();
                        this.p2.processResults(result);
                        if (result.won())
                            return [2 /*return*/, {
                                    winner: this.p2,
                                    turns: turnCounter,
                                    winnersWord: this.p2Secret,
                                }];
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, { winner: null, turns: turnCounter, winnersWord: null }];
                }
            });
        });
    };
    Jotto.prototype.oneTurn = function (activePlayer, secret) {
        var _this = this;
        return new Promise(function (resolve) {
            activePlayer.getGuess().then(function (guess) {
                var opponent = activePlayer === _this.p1 ? _this.p2 : _this.p1;
                if (!_this.dictionaryManager.validate(guess)) {
                    throw new Error("Illegal word '" + guess + "'");
                }
                if (guess === secret) {
                    resolve(new GuessResult_1.GuessResult(guess, true, 5));
                }
                var sl = DictionaryManager_1.DictionaryManager.sharedLetters(secret, guess);
                opponent.output("I guess <b>" + guess + "</b>, which shares <b>" + sl + "</b> letter" + (sl !== 1 ? "s" : "") + " with your secret word");
                resolve(new GuessResult_1.GuessResult(guess, false, sl));
            });
        });
    };
    return Jotto;
}());
exports.Jotto = Jotto;

},{"./DictionaryManager":1,"./GuessResult":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WebAgent = /** @class */ (function () {
    function WebAgent(dm) {
        var _this = this;
        this.knownScores = {};
        this.dictionaryManager = dm;
        this.secretWord = "";
        // set up HTML
        this.form = document.createElement("form");
        this.form.id = "input-form";
        this.inputBox = document.createElement("input");
        this.inputBox.type = "text";
        this.inputBox.id = "input";
        this.inputBox.placeholder = "Type here";
        this.inputBox.maxLength = 5;
        this.submitButton = document.createElement("button");
        this.submitButton.innerText = "Submit";
        this.submitButton.type = "submit";
        this.submitButton.id = "submit-button";
        this.submitButton.disabled = true;
        this.inputBox.addEventListener("input", function () {
            _this.submitButton.disabled = _this.inputBox.value.length !== 5;
        });
        this.log = document.createElement("div");
        this.log.id = "log";
        this.previous = document.createElement("div");
        this.previous.id = "previous";
        var main = document.getElementById("main-container");
        if (main === null)
            throw new Error("Main not found");
        var sideBar = document.createElement("div");
        sideBar.id = "side-bar";
        main.appendChild(this.log);
        this.form.appendChild(this.inputBox);
        this.form.appendChild(this.submitButton);
        main.appendChild(this.form);
        main.appendChild(sideBar);
    }
    WebAgent.prototype.setUp = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.output("Enter a secret 5-letter word, and I'll try to guess it");
            _this.getNextWord().then(function (word) {
                _this.secretWord = word;
                var sideBar = document.getElementById("side-bar");
                if (!sideBar)
                    throw new Error("No side bar");
                var letterGrid = document.createElement("div");
                letterGrid.id = "letter-grid";
                sideBar.appendChild(letterGrid);
                var _loop_1 = function (l) {
                    var d = document.createElement("div");
                    d.classList.add("letter");
                    d.innerText = l;
                    d.addEventListener("click", function () {
                        if (d.style.backgroundColor === "") {
                            d.style.backgroundColor = "rgba(48, 102, 190, 1)";
                            d.style.color = "white";
                        }
                        else if (d.style.backgroundColor === "rgb(48, 102, 190)") {
                            d.style.backgroundColor = "gray";
                            d.style.color = "black";
                        }
                        else {
                            d.style.backgroundColor = "";
                            d.style.color = "black";
                        }
                    });
                    letterGrid.appendChild(d);
                };
                for (var _i = 0, _a = "abcdefghijklmnopqrstuvwxyz"; _i < _a.length; _i++) {
                    var l = _a[_i];
                    _loop_1(l);
                }
                sideBar.insertAdjacentHTML("beforeend", "<h3>Your word:</h3> " + ("<span>" + _this.secretWord + "</span>"));
                sideBar.appendChild(_this.previous);
                _this.updatePrevious();
                resolve(word);
            });
        });
    };
    WebAgent.prototype.getGuess = function () {
        var _this = this;
        return new Promise(function (resolve) {
            setTimeout(function () {
                _this.output("Try to guess my word");
                _this.getNextWord().then(resolve);
            }, 300);
        });
    };
    WebAgent.prototype.processResults = function (gr) {
        if (gr.won()) {
            this.output("You're right, <b>" + gr.getWord() + "</b> was my word!");
        }
        else {
            this.knownScores[gr.getWord()] = gr.correctLetters();
            this.updatePrevious();
            this.output("<b>" + gr.getWord() + "</b> has " +
                ("<b>" + gr.correctLetters() + "</b> letter") +
                (gr.correctLetters() !== 1 ? "s" : "") +
                " in common with my word");
        }
    };
    WebAgent.prototype.output = function (sentence) {
        var p = document.createElement("p");
        p.style.opacity = "0";
        setTimeout(function () { return (p.style.opacity = "1"); }, 300);
        p.innerHTML = sentence;
        this.log.appendChild(p);
        this.log.scrollTo(0, this.log.scrollHeight);
    };
    WebAgent.prototype.getNextWord = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var listener = function (ev) {
                ev.preventDefault();
                if (_this.inputBox === null)
                    throw new Error("No input box");
                if (_this.inputBox.value.length !== 5)
                    return;
                var w = _this.inputBox.value.toLowerCase();
                if (!_this.dictionaryManager.validate(w)) {
                    _this.output("<b>" + _this.inputBox.value + "</b> isn't a real word!");
                    return;
                }
                _this.form.removeEventListener("submit", listener);
                _this.inputBox.value = "";
                _this.submitButton.disabled = true;
                setTimeout(function () {
                    resolve(w);
                }, 100);
            };
            _this.form.addEventListener("submit", listener);
        });
    };
    WebAgent.prototype.updatePrevious = function () {
        if (Object.keys(this.knownScores).length < 1)
            return;
        this.previous.innerHTML = "<h3>Known scores:</h3>";
        for (var k in this.knownScores) {
            var s = document.createElement("span");
            s.classList.add("known-score-row");
            var w = document.createElement("span");
            w.innerText = k;
            var l = document.createElement("span");
            l.innerText = "" + this.knownScores[k];
            s.appendChild(w);
            s.appendChild(l);
            this.previous.appendChild(s);
        }
        this.previous.scrollTo(0, this.previous.scrollHeight);
    };
    return WebAgent;
}());
exports.WebAgent = WebAgent;

},{}],7:[function(require,module,exports){
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
Object.defineProperty(exports, "__esModule", { value: true });
var FileManager_1 = require("../src/FileManager");
var Jotto_1 = require("../src/Jotto");
var GreedyAgent_1 = require("../src/GreedyAgent");
var WebAgent_1 = require("./WebAgent");
var DictionaryManager_1 = require("../src/DictionaryManager");
// Don't use HumanAgent here!
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var dm, h, p1, p2, j, val;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                FileManager_1.FileManager.WORD_BANK_PATH = "assets/wordbank.txt";
                FileManager_1.FileManager.H_PATH = "assets/imdb-frequencies.txt";
                // get string from server instead of filesystem
                FileManager_1.FileManager.getText = function (path) {
                    return new Promise(function (resolve) {
                        fetch(path)
                            .then(function (response) { return response.text(); })
                            .then(resolve);
                    });
                };
                dm = new DictionaryManager_1.DictionaryManager();
                return [4 /*yield*/, dm.addWordsFromFile()];
            case 1:
                _a.sent();
                return [4 /*yield*/, FileManager_1.FileManager.generateH(FileManager_1.FileManager.H_PATH)];
            case 2:
                h = _a.sent();
                p1 = new WebAgent_1.WebAgent(dm);
                p2 = new GreedyAgent_1.GreedyAgent(h);
                j = new Jotto_1.Jotto(p1, p2, dm);
                return [4 /*yield*/, j.setUp()];
            case 3:
                _a.sent();
                return [4 /*yield*/, j.startGame()];
            case 4:
                val = _a.sent();
                if (val.winner === null) {
                    p1.output("The game ended without a winner after 1000 turns");
                }
                else if (val.winner === p1) {
                    p1.output("Congratulations! It took " + val.turns + " turns for you to win");
                    Jotto_1.GLOBALS.out = -1 * val.turns + ", " + Jotto_1.GLOBALS.out;
                }
                else {
                    p1.output("I win! And it only took me " + val.turns + " turns");
                    p1.output("My secret word was <b>" + val.winnersWord + "</b>");
                    Jotto_1.GLOBALS.out = val.turns + ", " + Jotto_1.GLOBALS.out;
                }
                return [2 /*return*/];
        }
    });
}); })();

},{"../src/DictionaryManager":1,"../src/FileManager":2,"../src/GreedyAgent":3,"../src/Jotto":5,"./WebAgent":6}],8:[function(require,module,exports){

},{}],9:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))

},{"_process":10}],10:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9zcmMvRGljdGlvbmFyeU1hbmFnZXIuanMiLCJidWlsZC9zcmMvRmlsZU1hbmFnZXIuanMiLCJidWlsZC9zcmMvR3JlZWR5QWdlbnQuanMiLCJidWlsZC9zcmMvR3Vlc3NSZXN1bHQuanMiLCJidWlsZC9zcmMvSm90dG8uanMiLCJidWlsZC93ZWJzcmMvV2ViQWdlbnQuanMiLCJidWlsZC93ZWJzcmMvd2ViLmpzIiwibm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbGliL19lbXB0eS5qcyIsIm5vZGVfbW9kdWxlcy9wYXRoLWJyb3dzZXJpZnkvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5U0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBGaWxlTWFuYWdlcl8xID0gcmVxdWlyZShcIi4vRmlsZU1hbmFnZXJcIik7XG52YXIgRGljdGlvbmFyeU1hbmFnZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGljdGlvbmFyeU1hbmFnZXIoKSB7XG4gICAgICAgIHRoaXMuZGljdCA9IHt9O1xuICAgIH1cbiAgICBEaWN0aW9uYXJ5TWFuYWdlci5wcm90b3R5cGUuZ2V0QWxsV29yZHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmRpY3QpO1xuICAgIH07XG4gICAgLyoqIGVhY2ggbGluZSBvZiB0aGUgZmlsZSBzaG91bGQgYmUgYSBzZXBhcmF0ZSB3b3JkICovXG4gICAgRGljdGlvbmFyeU1hbmFnZXIucHJvdG90eXBlLmFkZFdvcmRzRnJvbUZpbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3b3JkcywgX2ksIHdvcmRzXzEsIHc7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6IHJldHVybiBbNCAvKnlpZWxkKi8sIEZpbGVNYW5hZ2VyXzEuRmlsZU1hbmFnZXIuZ2V0V29yZHNBc0FycmF5KEZpbGVNYW5hZ2VyXzEuRmlsZU1hbmFnZXIuV09SRF9CQU5LX1BBVEgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgd29yZHMgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKF9pID0gMCwgd29yZHNfMSA9IHdvcmRzOyBfaSA8IHdvcmRzXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdyA9IHdvcmRzXzFbX2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZGljdFt3XSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGljdGlvbmFyeU1hbmFnZXIucHJvdG90eXBlLm51bVdvcmRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5kaWN0KS5sZW5ndGg7XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5TWFuYWdlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGljdCA9IHt9O1xuICAgIH07XG4gICAgLyoqIGNoZWNrcyB3aGV0aGVyIGEgd29yZCBpcyBpbiB0aGUgZGljdGlvbmFyeSAqL1xuICAgIERpY3Rpb25hcnlNYW5hZ2VyLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uICh3b3JkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpY3Rbd29yZF0gIT09IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIHJldHVybnMgdGhlIG51bWJlciBvZiBsZXR0ZXJzIGluIGd3b3JkIHRoYXQgbWF0Y2ggYSB1bmlxdWUgbGV0dGVyIGluIHN3b3JkXG4gICAgICogQHBhcmFtIHN3b3JkIHRoZSBzZWNyZXQgd29yZCB3ZSdyZSB0cnlpbmcgdG8gZ3Vlc3NcbiAgICAgKiBAcGFyYW0gZ3dvcmQgdGhlIGd1ZXNzIHdvcmRcbiAgICAgKi9cbiAgICBEaWN0aW9uYXJ5TWFuYWdlci5zaGFyZWRMZXR0ZXJzID0gZnVuY3Rpb24gKHN3b3JkLCBnd29yZCkge1xuICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgIGZvciAodmFyIF9pID0gMCwgc3dvcmRfMSA9IHN3b3JkOyBfaSA8IHN3b3JkXzEubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGV0dGVyID0gc3dvcmRfMVtfaV07XG4gICAgICAgICAgICBpZiAoZ3dvcmQuaW5jbHVkZXMobGV0dGVyKSkge1xuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICBnd29yZCA9IGd3b3JkLnJlcGxhY2UobGV0dGVyLCBcIlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnRlcjtcbiAgICB9O1xuICAgIHJldHVybiBEaWN0aW9uYXJ5TWFuYWdlcjtcbn0oKSk7XG5leHBvcnRzLkRpY3Rpb25hcnlNYW5hZ2VyID0gRGljdGlvbmFyeU1hbmFnZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaWN0aW9uYXJ5TWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19hc3luY1ZhbHVlcyA9ICh0aGlzICYmIHRoaXMuX19hc3luY1ZhbHVlcykgfHwgZnVuY3Rpb24gKG8pIHtcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xuICAgIHZhciBtID0gb1tTeW1ib2wuYXN5bmNJdGVyYXRvcl0sIGk7XG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cbiAgICBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCBkLCB2KSB7IFByb21pc2UucmVzb2x2ZSh2KS50aGVuKGZ1bmN0aW9uKHYpIHsgcmVzb2x2ZSh7IHZhbHVlOiB2LCBkb25lOiBkIH0pOyB9LCByZWplY3QpOyB9XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIGZzXzEgPSByZXF1aXJlKFwiZnNcIik7XG52YXIgcGF0aF8xID0gcmVxdWlyZShcInBhdGhcIik7XG52YXIgcmVhZGxpbmVfMSA9IHJlcXVpcmUoXCJyZWFkbGluZVwiKTtcbmV4cG9ydHMuRmlsZU1hbmFnZXIgPSB7XG4gICAgV09SRF9CQU5LX1BBVEg6IHBhdGhfMS5qb2luKF9fZGlybmFtZSwgXCIuLlwiLCBcIm1hbnl3b3Jkcy50eHRcIiksXG4gICAgSF9QQVRIOiBwYXRoXzEuam9pbihfX2Rpcm5hbWUsIFwiLi5cIiwgXCJpbWRiLWZyZXF1ZW5jaWVzLnR4dFwiKSxcbiAgICAvLyBnZXQgc3RyaW5nIGZyb20gZmlsZXN5c3RlbVxuICAgIGdldFRleHQ6IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgZnNfMS5yZWFkRmlsZShwYXRoLCBmdW5jdGlvbiAoZXJyLCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVycilcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YS50b1N0cmluZygpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGdldFdvcmRzQXNBcnJheTogZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBleHBvcnRzLkZpbGVNYW5hZ2VyLmdldFRleHQocGF0aCkudGhlbihmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodGV4dC5zcGxpdCgvXFxzKy9nKS5maWx0ZXIoZnVuY3Rpb24gKHgpIHsgcmV0dXJuIHgubGVuZ3RoICE9PSAwOyB9KSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGF0aCB0aGUgcGF0aCB0byBhIGZpbGUgY29udGFpbmluZyBhIHN0cmluZ2lmaWVkIEpTT04gb2Ygd29yZFxuICAgICAqIGZyZXF1ZW5jaWVzXG4gICAgICovXG4gICAgZ2VuZXJhdGVIOiBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIGV4cG9ydHMuRmlsZU1hbmFnZXIuZ2V0VGV4dChwYXRoKS50aGVuKGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGggPSBKU09OLnBhcnNlKHRleHQpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBoKSB7XG4gICAgICAgICAgICAgICAgICAgIGhba2V5XSsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgc3VtID0gT2JqZWN0LnZhbHVlcyhoKS5yZWR1Y2UoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEgKyBiOyB9KTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gaCkge1xuICAgICAgICAgICAgICAgICAgICBoW2tleV0gLz0gc3VtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXNvbHZlKGgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZnJlcXVlbmNpZXNGcm9tRm9sZGVyOiBmdW5jdGlvbiAocGF0aCkgeyByZXR1cm4gX19hd2FpdGVyKHZvaWQgMCwgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHdvcmRzLCBhcnIsIF9pLCBhcnJfMSwgdywgZmlsZW5hbWVzLCBfYSwgZmlsZW5hbWVzXzEsIGZpbGUsIHJsLCBybF8xLCBybF8xXzEsIGxpbmUsIF9iLCBfYywgd29yZCwgZV8xXzE7XG4gICAgICAgIHZhciBlXzEsIF9kO1xuICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9lKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKF9lLmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICB3b3JkcyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBleHBvcnRzLkZpbGVNYW5hZ2VyLmdldFdvcmRzQXNBcnJheShleHBvcnRzLkZpbGVNYW5hZ2VyLldPUkRfQkFOS19QQVRIKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICBhcnIgPSBfZS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoX2kgPSAwLCBhcnJfMSA9IGFycjsgX2kgPCBhcnJfMS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHcgPSBhcnJfMVtfaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB3b3Jkc1t3XSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgZnNfMS5wcm9taXNlcy5yZWFkZGlyKHBhdGgpXTtcbiAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lcyA9IF9lLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgX2EgPSAwLCBmaWxlbmFtZXNfMSA9IGZpbGVuYW1lcztcbiAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSAzO1xuICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEoX2EgPCBmaWxlbmFtZXNfMS5sZW5ndGgpKSByZXR1cm4gWzMgLypicmVhayovLCAxNl07XG4gICAgICAgICAgICAgICAgICAgIGZpbGUgPSBmaWxlbmFtZXNfMVtfYV07XG4gICAgICAgICAgICAgICAgICAgIHJsID0gcmVhZGxpbmVfMS5jcmVhdGVJbnRlcmZhY2Uoe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IGZzXzEuY3JlYXRlUmVhZFN0cmVhbShwYXRoXzEuam9pbihwYXRoLCBmaWxlKSksXG4gICAgICAgICAgICAgICAgICAgICAgICBjcmxmRGVsYXk6IEluZmluaXR5LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgX2UubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgX2UudHJ5cy5wdXNoKFs0LCA5LCAxMCwgMTVdKTtcbiAgICAgICAgICAgICAgICAgICAgcmxfMSA9IF9fYXN5bmNWYWx1ZXMocmwpO1xuICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDU7XG4gICAgICAgICAgICAgICAgY2FzZSA1OiByZXR1cm4gWzQgLyp5aWVsZCovLCBybF8xLm5leHQoKV07XG4gICAgICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgICAgICBpZiAoIShybF8xXzEgPSBfZS5zZW50KCksICFybF8xXzEuZG9uZSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDhdO1xuICAgICAgICAgICAgICAgICAgICBsaW5lID0gcmxfMV8xLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKF9iID0gMCwgX2MgPSBsaW5lLnNwbGl0KC9bXmEtekEtWl0vKTsgX2IgPCBfYy5sZW5ndGg7IF9iKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdvcmQgPSBfY1tfYl07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAod29yZHNbd29yZF0gIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3b3Jkc1t3b3JkXSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF9lLmxhYmVsID0gNztcbiAgICAgICAgICAgICAgICBjYXNlIDc6IHJldHVybiBbMyAvKmJyZWFrKi8sIDVdO1xuICAgICAgICAgICAgICAgIGNhc2UgODogcmV0dXJuIFszIC8qYnJlYWsqLywgMTVdO1xuICAgICAgICAgICAgICAgIGNhc2UgOTpcbiAgICAgICAgICAgICAgICAgICAgZV8xXzEgPSBfZS5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGVfMSA9IHsgZXJyb3I6IGVfMV8xIH07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDE1XTtcbiAgICAgICAgICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgICAgICAgICBfZS50cnlzLnB1c2goWzEwLCAsIDEzLCAxNF0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIShybF8xXzEgJiYgIXJsXzFfMS5kb25lICYmIChfZCA9IHJsXzEucmV0dXJuKSkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDEyXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgX2QuY2FsbChybF8xKV07XG4gICAgICAgICAgICAgICAgY2FzZSAxMTpcbiAgICAgICAgICAgICAgICAgICAgX2Uuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICBfZS5sYWJlbCA9IDEyO1xuICAgICAgICAgICAgICAgIGNhc2UgMTI6IHJldHVybiBbMyAvKmJyZWFrKi8sIDE0XTtcbiAgICAgICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgICAgICBpZiAoZV8xKSB0aHJvdyBlXzEuZXJyb3I7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbNyAvKmVuZGZpbmFsbHkqL107XG4gICAgICAgICAgICAgICAgY2FzZSAxNDogcmV0dXJuIFs3IC8qZW5kZmluYWxseSovXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE1OlxuICAgICAgICAgICAgICAgICAgICBfYSsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCAzXTtcbiAgICAgICAgICAgICAgICBjYXNlIDE2OiByZXR1cm4gWzIgLypyZXR1cm4qLywgd29yZHNdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTsgfSxcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1GaWxlTWFuYWdlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBEaWN0aW9uYXJ5TWFuYWdlcl8xID0gcmVxdWlyZShcIi4vRGljdGlvbmFyeU1hbmFnZXJcIik7XG52YXIgRmlsZU1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL0ZpbGVNYW5hZ2VyXCIpO1xudmFyIEpvdHRvXzEgPSByZXF1aXJlKFwiLi9Kb3R0b1wiKTtcbi8qKiBhIEpvdHRvIGFnZW50IHRoYXQgaW1wbGVtZW50cyBhIGdyZWVkeSBhbGdvcml0aG0gKi9cbnZhciBHcmVlZHlBZ2VudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHcmVlZHlBZ2VudChoKSB7XG4gICAgICAgIGlmIChoID09PSB2b2lkIDApIHsgaCA9IHt9OyB9XG4gICAgICAgIHRoaXMuaCA9IHt9OyAvLyBmcmVxdWVuY3kgdGFibGVcbiAgICAgICAgdGhpcy5vdXRwdXQgPSBjb25zb2xlLmxvZztcbiAgICAgICAgdGhpcy5zZWNyZXRXb3JkID0gXCJcIjtcbiAgICAgICAgdGhpcy53b3JkcyA9IFtdO1xuICAgICAgICB0aGlzLmggPSBoO1xuICAgICAgICB0aGlzLkwgPSA1O1xuICAgICAgICB0aGlzLmVwc2lsb24gPSAxO1xuICAgIH1cbiAgICBHcmVlZHlBZ2VudC5wcm90b3R5cGUuc2V0VXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgRmlsZU1hbmFnZXJfMS5GaWxlTWFuYWdlci5nZXRXb3Jkc0FzQXJyYXkoRmlsZU1hbmFnZXJfMS5GaWxlTWFuYWdlci5XT1JEX0JBTktfUEFUSCkudGhlbihmdW5jdGlvbiAod29yZHMpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy53b3JkcyA9IHdvcmRzO1xuICAgICAgICAgICAgICAgIF90aGlzLnNlY3JldFdvcmQgPSBfdGhpcy5waWNrUmFuZG9tV29yZCgpO1xuICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhfdGhpcy5oKS5sZW5ndGggIT09IF90aGlzLndvcmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gX3RoaXMud29yZHM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdyA9IF9hW19pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLmhbd10gPSAxIC8gX3RoaXMud29yZHMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc29sdmUoX3RoaXMuc2VjcmV0V29yZCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHcmVlZHlBZ2VudC5wcm90b3R5cGUucHJvY2Vzc1Jlc3VsdHMgPSBmdW5jdGlvbiAoZ3IpIHtcbiAgICAgICAgaWYgKCFnci53b24oKSkge1xuICAgICAgICAgICAgaWYgKGdyLmNvcnJlY3RMZXR0ZXJzKCkgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLndvcmRzID0gdGhpcy53b3Jkcy5maWx0ZXIoZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh3ICE9PSBnci5nZXRXb3JkKCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIERpY3Rpb25hcnlNYW5hZ2VyXzEuRGljdGlvbmFyeU1hbmFnZXIuc2hhcmVkTGV0dGVycyhnci5nZXRXb3JkKCksIHcpID09PSAwICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhZ3IuaXNBbmFncmFtKHcsIGdyLmdldFdvcmQoKSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZ3IuY29ycmVjdExldHRlcnMoKSA8IDUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndvcmRzID0gdGhpcy53b3Jkcy5maWx0ZXIoZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICh3ICE9PSBnci5nZXRXb3JkKCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIERpY3Rpb25hcnlNYW5hZ2VyXzEuRGljdGlvbmFyeU1hbmFnZXIuc2hhcmVkTGV0dGVycyhnci5nZXRXb3JkKCksIHcpID49XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3IuY29ycmVjdExldHRlcnMoKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgIWdyLmlzQW5hZ3JhbSh3LCBnci5nZXRXb3JkKCkpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMud29yZHMgPSB0aGlzLndvcmRzLmZpbHRlcihmdW5jdGlvbiAodykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHcgIT09IGdyLmdldFdvcmQoKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgRGljdGlvbmFyeU1hbmFnZXJfMS5EaWN0aW9uYXJ5TWFuYWdlci5zaGFyZWRMZXR0ZXJzKGdyLmdldFdvcmQoKSwgdykgPj1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnci5jb3JyZWN0TGV0dGVycygpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXBzaWxvbiA9IDA7XG4gICAgICAgICAgICBKb3R0b18xLkdMT0JBTFMub3V0ICs9IHRoaXMud29yZHMubGVuZ3RoICsgXCIsIFwiO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBHcmVlZHlBZ2VudC5wcm90b3R5cGUucGlja1JhbmRvbVdvcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndvcmRzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMud29yZHMubGVuZ3RoKV07XG4gICAgfTtcbiAgICBHcmVlZHlBZ2VudC5wcm90b3R5cGUuZ2V0R3Vlc3MgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgdGhpcy5lcHNpbG9uKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmV0dXJuIHJlc29sdmUoX3RoaXMucGlja1JhbmRvbVdvcmQoKSk7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiByZXNvbHZlKF90aGlzLmd1ZXNzZXJHQlIoKSk7IH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBHcmVlZHlBZ2VudC5wcm90b3R5cGUuZ3Vlc3NlckdCUiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG1heE4gPSAwO1xuICAgICAgICB2YXIgYmVzdFdvcmRzID0gW107XG4gICAgICAgIHZhciBzdGFydFRpbWUgPSBuZXcgRGF0ZSgpLnZhbHVlT2YoKTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMud29yZHM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgdyA9IF9hW19pXTtcbiAgICAgICAgICAgIGlmIChuZXcgRGF0ZSgpLnZhbHVlT2YoKSAtIHN0YXJ0VGltZSA+PSAyMDAwKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIG4gPSB0aGlzLkV4cE51bUVsaW1zKHcpO1xuICAgICAgICAgICAgaWYgKG4gPiBtYXhOKSB7XG4gICAgICAgICAgICAgICAgYmVzdFdvcmRzID0gW3ddO1xuICAgICAgICAgICAgICAgIG1heE4gPSBuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobiA9PT0gbWF4Tikge1xuICAgICAgICAgICAgICAgIGJlc3RXb3Jkcy5wdXNoKHcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0V29yZHNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYmVzdFdvcmRzLmxlbmd0aCldO1xuICAgIH07XG4gICAgR3JlZWR5QWdlbnQucHJvdG90eXBlLkV4cE51bUVsaW1zID0gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgICAgdmFyIEEgPSB0aGlzLkFuc3dlclByb2JzKHdvcmQpO1xuICAgICAgICB2YXIgbiA9IDA7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IHRoaXMuTDsgaisrKSB7XG4gICAgICAgICAgICBuICs9IEFbal0gKiB0aGlzLk51bUVsaW1zKHdvcmQsIGopO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuO1xuICAgIH07XG4gICAgR3JlZWR5QWdlbnQucHJvdG90eXBlLkFuc3dlclByb2JzID0gZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgICAgdmFyIEEgPSBuZXcgQXJyYXkodGhpcy5MICsgMSkuZmlsbCgwKTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IHRoaXMud29yZHM7IF9pIDwgX2EubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgICAgICB2YXIgdyA9IF9hW19pXTtcbiAgICAgICAgICAgIHZhciBrID0gRGljdGlvbmFyeU1hbmFnZXJfMS5EaWN0aW9uYXJ5TWFuYWdlci5zaGFyZWRMZXR0ZXJzKHdvcmQsIHcpO1xuICAgICAgICAgICAgQVtrXSArPSB0aGlzLmhbd107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1bSA9IEEucmVkdWNlKGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhICsgYjsgfSwgMCk7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IHRoaXMuTDsgaisrKSB7XG4gICAgICAgICAgICBBW2pdIC89IHN1bTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQTsgLy8gbmVlZHMgdG8gYmUgNSBlbGVtZW50c1xuICAgIH07XG4gICAgR3JlZWR5QWdlbnQucHJvdG90eXBlLk51bUVsaW1zID0gZnVuY3Rpb24gKHdvcmQsIGopIHtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDAsIF9hID0gdGhpcy53b3JkczsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIHZhciB3ID0gX2FbX2ldO1xuICAgICAgICAgICAgaWYgKERpY3Rpb25hcnlNYW5hZ2VyXzEuRGljdGlvbmFyeU1hbmFnZXIuc2hhcmVkTGV0dGVycyh3b3JkLCB3KSAhPT0gaikge1xuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY291bnRlcjtcbiAgICB9O1xuICAgIHJldHVybiBHcmVlZHlBZ2VudDtcbn0oKSk7XG5leHBvcnRzLkdyZWVkeUFnZW50ID0gR3JlZWR5QWdlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1HcmVlZHlBZ2VudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBHdWVzc1Jlc3VsdCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHdWVzc1Jlc3VsdCh3b3JkLCBpc1dpbm5pbmdHdWVzcywgbnVtQ29ycmVjdCkge1xuICAgICAgICB0aGlzLndvcmQgPSB3b3JkO1xuICAgICAgICB0aGlzLmlzV2lubmluZ0d1ZXNzID0gaXNXaW5uaW5nR3Vlc3M7XG4gICAgICAgIHRoaXMubnVtQ29ycmVjdCA9IG51bUNvcnJlY3Q7XG4gICAgfVxuICAgIC8qKiB3aGV0aGVyIHRoZSBndWVzcyBpcyB0aGUgd2lubmluZyB3b3JkICovXG4gICAgR3Vlc3NSZXN1bHQucHJvdG90eXBlLndvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNXaW5uaW5nR3Vlc3M7XG4gICAgfTtcbiAgICAvKiogcmV0dXJucyB0aGUgd29yZCB0aGF0IHdhcyBndWVzc2VkICovXG4gICAgR3Vlc3NSZXN1bHQucHJvdG90eXBlLmdldFdvcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndvcmQ7XG4gICAgfTtcbiAgICAvKiogdGhlIG51bWJlciBvZiBsZXR0ZXJzIHRoZSBndWVzcyBzaGFyZXMgd2l0aCB0aGUgY29ycmVjdCB3b3JkICovXG4gICAgR3Vlc3NSZXN1bHQucHJvdG90eXBlLmNvcnJlY3RMZXR0ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5udW1Db3JyZWN0O1xuICAgIH07XG4gICAgR3Vlc3NSZXN1bHQucHJvdG90eXBlLmlzQW5hZ3JhbSA9IGZ1bmN0aW9uICh3b3JkMSwgd29yZDIpIHtcbiAgICAgICAgdmFyIHdvcmQxQXJyYXkgPSB3b3JkMS5zcGxpdChcIlwiKS5zb3J0KCkuam9pbihcIlwiKSwgd29yZDJBcnJheSA9IHdvcmQyLnNwbGl0KFwiXCIpLnNvcnQoKS5qb2luKFwiXCIpO1xuICAgICAgICByZXR1cm4gd29yZDFBcnJheSA9PT0gd29yZDJBcnJheTtcbiAgICB9O1xuICAgIHJldHVybiBHdWVzc1Jlc3VsdDtcbn0oKSk7XG5leHBvcnRzLkd1ZXNzUmVzdWx0ID0gR3Vlc3NSZXN1bHQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1HdWVzc1Jlc3VsdC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRGljdGlvbmFyeU1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuL0RpY3Rpb25hcnlNYW5hZ2VyXCIpO1xudmFyIEd1ZXNzUmVzdWx0XzEgPSByZXF1aXJlKFwiLi9HdWVzc1Jlc3VsdFwiKTtcbmV4cG9ydHMuR0xPQkFMUyA9IHtcbiAgICBvdXQ6IFwiXCIsXG59O1xuLyoqIFRoaXMgY2xhc3MgbWFuYWdlcyB0aGUgcnVsZXMgZm9yIGEgZ2FtZSBvZiBKb3R0byAqL1xudmFyIEpvdHRvID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEpvdHRvKHAxLCBwMiwgZG0pIHtcbiAgICAgICAgdGhpcy5wMSA9IHAxO1xuICAgICAgICB0aGlzLnAyID0gcDI7XG4gICAgICAgIHRoaXMucDFTZWNyZXQgPSBcIlwiO1xuICAgICAgICB0aGlzLnAyU2VjcmV0ID0gXCJcIjtcbiAgICAgICAgdGhpcy5kaWN0aW9uYXJ5TWFuYWdlciA9IGRtO1xuICAgIH1cbiAgICBKb3R0by5wcm90b3R5cGUuc2V0VXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYy5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISh0aGlzLmRpY3Rpb25hcnlNYW5hZ2VyLm51bVdvcmRzKCkgPT09IDApKSByZXR1cm4gWzMgLypicmVhayovLCAyXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMuZGljdGlvbmFyeU1hbmFnZXIuYWRkV29yZHNGcm9tRmlsZSgpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX2MubGFiZWwgPSAyO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCB0aGlzLnAxLnNldFVwKCldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5wMVNlY3JldCA9IF9jLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iID0gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMucDIuc2V0VXAoKV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIF9iLnAyU2VjcmV0ID0gX2Muc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0cy5HTE9CQUxTLm91dCArPSB0aGlzLnAyU2VjcmV0ICsgXCIsIFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi9dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIC8qKiBjaGVja3Mgd2hldGhlciBhIHdvcmQgaXMgbGVnYWwgKi9cbiAgICBKb3R0by5wcm90b3R5cGUudmFsaWRhdGUgPSBmdW5jdGlvbiAod29yZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kaWN0aW9uYXJ5TWFuYWdlci52YWxpZGF0ZSh3b3JkKTtcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJ1bnMgdGhlIGdhbWUgdW50aWwgc29tZW9uZSB3aW5zIG9yIDEwMDAgdHVybnMgaGF2ZSBwYXNzZWQsIHRoZW4gcmV0dXJuc1xuICAgICAqIHRoZSB3aW5uZXIgKG9yIG51bGwgaWYgdGltZSByYW4gb3V0KSBhbmQgdGhlIG51bWJlciBvZiB0dXJucyBpdCB0b29rXG4gICAgICovXG4gICAgSm90dG8ucHJvdG90eXBlLnN0YXJ0R2FtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHR1cm5Db3VudGVyLCByZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9hKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfYS5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGljdGlvbmFyeU1hbmFnZXIudmFsaWRhdGUodGhpcy5wMVNlY3JldCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicDEgaGFzIGlsbGVnYWwgc2VjcmV0IHdvcmQ6ICdcIiArIHRoaXMucDFTZWNyZXQgKyBcIidcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZGljdGlvbmFyeU1hbmFnZXIudmFsaWRhdGUodGhpcy5wMlNlY3JldCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwicDIgaGFzIGlsbGVnYWwgc2VjcmV0IHdvcmQ6ICdcIiArIHRoaXMucDJTZWNyZXQgKyBcIidcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0dXJuQ291bnRlciA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBfYS5sYWJlbCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghKHR1cm5Db3VudGVyIDwgMTAwMCkpIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHVybkNvdW50ZXIrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMub25lVHVybih0aGlzLnAxLCB0aGlzLnAyU2VjcmV0KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucDEucHJvY2Vzc1Jlc3VsdHMocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQud29uKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbm5lcjogdGhpcy5wMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5zOiB0dXJuQ291bnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbm5lcnNXb3JkOiB0aGlzLnAxU2VjcmV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIHRoaXMub25lVHVybih0aGlzLnAyLCB0aGlzLnAxU2VjcmV0KV07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucDIucHJvY2Vzc1Jlc3VsdHMocmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQud29uKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbm5lcjogdGhpcy5wMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR1cm5zOiB0dXJuQ291bnRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbm5lcnNXb3JkOiB0aGlzLnAyU2VjcmV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6IHJldHVybiBbMiAvKnJldHVybiovLCB7IHdpbm5lcjogbnVsbCwgdHVybnM6IHR1cm5Db3VudGVyLCB3aW5uZXJzV29yZDogbnVsbCB9XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBKb3R0by5wcm90b3R5cGUub25lVHVybiA9IGZ1bmN0aW9uIChhY3RpdmVQbGF5ZXIsIHNlY3JldCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIGFjdGl2ZVBsYXllci5nZXRHdWVzcygpLnRoZW4oZnVuY3Rpb24gKGd1ZXNzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wcG9uZW50ID0gYWN0aXZlUGxheWVyID09PSBfdGhpcy5wMSA/IF90aGlzLnAyIDogX3RoaXMucDE7XG4gICAgICAgICAgICAgICAgaWYgKCFfdGhpcy5kaWN0aW9uYXJ5TWFuYWdlci52YWxpZGF0ZShndWVzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSWxsZWdhbCB3b3JkICdcIiArIGd1ZXNzICsgXCInXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZ3Vlc3MgPT09IHNlY3JldCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBHdWVzc1Jlc3VsdF8xLkd1ZXNzUmVzdWx0KGd1ZXNzLCB0cnVlLCA1KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBzbCA9IERpY3Rpb25hcnlNYW5hZ2VyXzEuRGljdGlvbmFyeU1hbmFnZXIuc2hhcmVkTGV0dGVycyhzZWNyZXQsIGd1ZXNzKTtcbiAgICAgICAgICAgICAgICBvcHBvbmVudC5vdXRwdXQoXCJJIGd1ZXNzIDxiPlwiICsgZ3Vlc3MgKyBcIjwvYj4sIHdoaWNoIHNoYXJlcyA8Yj5cIiArIHNsICsgXCI8L2I+IGxldHRlclwiICsgKHNsICE9PSAxID8gXCJzXCIgOiBcIlwiKSArIFwiIHdpdGggeW91ciBzZWNyZXQgd29yZFwiKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKG5ldyBHdWVzc1Jlc3VsdF8xLkd1ZXNzUmVzdWx0KGd1ZXNzLCBmYWxzZSwgc2wpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBKb3R0bztcbn0oKSk7XG5leHBvcnRzLkpvdHRvID0gSm90dG87XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Kb3R0by5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBXZWJBZ2VudCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBXZWJBZ2VudChkbSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB0aGlzLmtub3duU2NvcmVzID0ge307XG4gICAgICAgIHRoaXMuZGljdGlvbmFyeU1hbmFnZXIgPSBkbTtcbiAgICAgICAgdGhpcy5zZWNyZXRXb3JkID0gXCJcIjtcbiAgICAgICAgLy8gc2V0IHVwIEhUTUxcbiAgICAgICAgdGhpcy5mb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIik7XG4gICAgICAgIHRoaXMuZm9ybS5pZCA9IFwiaW5wdXQtZm9ybVwiO1xuICAgICAgICB0aGlzLmlucHV0Qm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgICAgICB0aGlzLmlucHV0Qm94LnR5cGUgPSBcInRleHRcIjtcbiAgICAgICAgdGhpcy5pbnB1dEJveC5pZCA9IFwiaW5wdXRcIjtcbiAgICAgICAgdGhpcy5pbnB1dEJveC5wbGFjZWhvbGRlciA9IFwiVHlwZSBoZXJlXCI7XG4gICAgICAgIHRoaXMuaW5wdXRCb3gubWF4TGVuZ3RoID0gNTtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi5pbm5lclRleHQgPSBcIlN1Ym1pdFwiO1xuICAgICAgICB0aGlzLnN1Ym1pdEJ1dHRvbi50eXBlID0gXCJzdWJtaXRcIjtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24uaWQgPSBcInN1Ym1pdC1idXR0b25cIjtcbiAgICAgICAgdGhpcy5zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmlucHV0Qm94LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBfdGhpcy5pbnB1dEJveC52YWx1ZS5sZW5ndGggIT09IDU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmxvZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMubG9nLmlkID0gXCJsb2dcIjtcbiAgICAgICAgdGhpcy5wcmV2aW91cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMucHJldmlvdXMuaWQgPSBcInByZXZpb3VzXCI7XG4gICAgICAgIHZhciBtYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluLWNvbnRhaW5lclwiKTtcbiAgICAgICAgaWYgKG1haW4gPT09IG51bGwpXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJNYWluIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgdmFyIHNpZGVCYXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBzaWRlQmFyLmlkID0gXCJzaWRlLWJhclwiO1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHRoaXMubG9nKTtcbiAgICAgICAgdGhpcy5mb3JtLmFwcGVuZENoaWxkKHRoaXMuaW5wdXRCb3gpO1xuICAgICAgICB0aGlzLmZvcm0uYXBwZW5kQ2hpbGQodGhpcy5zdWJtaXRCdXR0b24pO1xuICAgICAgICBtYWluLmFwcGVuZENoaWxkKHRoaXMuZm9ybSk7XG4gICAgICAgIG1haW4uYXBwZW5kQ2hpbGQoc2lkZUJhcik7XG4gICAgfVxuICAgIFdlYkFnZW50LnByb3RvdHlwZS5zZXRVcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgICAgICAgICBfdGhpcy5vdXRwdXQoXCJFbnRlciBhIHNlY3JldCA1LWxldHRlciB3b3JkLCBhbmQgSSdsbCB0cnkgdG8gZ3Vlc3MgaXRcIik7XG4gICAgICAgICAgICBfdGhpcy5nZXROZXh0V29yZCgpLnRoZW4oZnVuY3Rpb24gKHdvcmQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5zZWNyZXRXb3JkID0gd29yZDtcbiAgICAgICAgICAgICAgICB2YXIgc2lkZUJhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2lkZS1iYXJcIik7XG4gICAgICAgICAgICAgICAgaWYgKCFzaWRlQmFyKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBzaWRlIGJhclwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbGV0dGVyR3JpZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgICAgICAgICAgbGV0dGVyR3JpZC5pZCA9IFwibGV0dGVyLWdyaWRcIjtcbiAgICAgICAgICAgICAgICBzaWRlQmFyLmFwcGVuZENoaWxkKGxldHRlckdyaWQpO1xuICAgICAgICAgICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGwpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICAgICAgICAgICAgICBkLmNsYXNzTGlzdC5hZGQoXCJsZXR0ZXJcIik7XG4gICAgICAgICAgICAgICAgICAgIGQuaW5uZXJUZXh0ID0gbDtcbiAgICAgICAgICAgICAgICAgICAgZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGQuc3R5bGUuYmFja2dyb3VuZENvbG9yID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoNDgsIDEwMiwgMTkwLCAxKVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuc3R5bGUuY29sb3IgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChkLnN0eWxlLmJhY2tncm91bmRDb2xvciA9PT0gXCJyZ2IoNDgsIDEwMiwgMTkwKVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImdyYXlcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLnN0eWxlLmNvbG9yID0gXCJibGFja1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuc3R5bGUuY29sb3IgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsZXR0ZXJHcmlkLmFwcGVuZENoaWxkKGQpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgX2kgPSAwLCBfYSA9IFwiYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpcIjsgX2kgPCBfYS5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBfYVtfaV07XG4gICAgICAgICAgICAgICAgICAgIF9sb29wXzEobCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNpZGVCYXIuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIFwiPGgzPllvdXIgV29yZDo8L2gzPiBcIiArIChcIjxzcGFuPlwiICsgX3RoaXMuc2VjcmV0V29yZCArIFwiPC9zcGFuPlwiKSk7XG4gICAgICAgICAgICAgICAgc2lkZUJhci5hcHBlbmRDaGlsZChfdGhpcy5wcmV2aW91cyk7XG4gICAgICAgICAgICAgICAgX3RoaXMudXBkYXRlUHJldmlvdXMoKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHdvcmQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgV2ViQWdlbnQucHJvdG90eXBlLmdldEd1ZXNzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIF90aGlzLm91dHB1dChcIlRyeSB0byBndWVzcyBteSB3b3JkXCIpO1xuICAgICAgICAgICAgICAgIF90aGlzLmdldE5leHRXb3JkKCkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgV2ViQWdlbnQucHJvdG90eXBlLnByb2Nlc3NSZXN1bHRzID0gZnVuY3Rpb24gKGdyKSB7XG4gICAgICAgIGlmIChnci53b24oKSkge1xuICAgICAgICAgICAgdGhpcy5vdXRwdXQoXCJZb3UncmUgcmlnaHQsIDxiPlwiICsgZ3IuZ2V0V29yZCgpICsgXCI8L2I+IHdhcyBteSB3b3JkIVwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMua25vd25TY29yZXNbZ3IuZ2V0V29yZCgpXSA9IGdyLmNvcnJlY3RMZXR0ZXJzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVByZXZpb3VzKCk7XG4gICAgICAgICAgICB0aGlzLm91dHB1dChcIjxiPlwiICsgZ3IuZ2V0V29yZCgpICsgXCI8L2I+IGhhcyBcIiArXG4gICAgICAgICAgICAgICAgKFwiPGI+XCIgKyBnci5jb3JyZWN0TGV0dGVycygpICsgXCI8L2I+IGxldHRlclwiKSArXG4gICAgICAgICAgICAgICAgKGdyLmNvcnJlY3RMZXR0ZXJzKCkgIT09IDEgPyBcInNcIiA6IFwiXCIpICtcbiAgICAgICAgICAgICAgICBcIiBpbiBjb21tb24gd2l0aCBteSB3b3JkXCIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBXZWJBZ2VudC5wcm90b3R5cGUub3V0cHV0ID0gZnVuY3Rpb24gKHNlbnRlbmNlKSB7XG4gICAgICAgIHZhciBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgICAgIHAuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgcmV0dXJuIChwLnN0eWxlLm9wYWNpdHkgPSBcIjFcIik7IH0sIDMwMCk7XG4gICAgICAgIHAuaW5uZXJIVE1MID0gc2VudGVuY2U7XG4gICAgICAgIHRoaXMubG9nLmFwcGVuZENoaWxkKHApO1xuICAgICAgICB0aGlzLmxvZy5zY3JvbGxUbygwLCB0aGlzLmxvZy5zY3JvbGxIZWlnaHQpO1xuICAgIH07XG4gICAgV2ViQWdlbnQucHJvdG90eXBlLmdldE5leHRXb3JkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgIHZhciBsaXN0ZW5lciA9IGZ1bmN0aW9uIChldikge1xuICAgICAgICAgICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlucHV0Qm94ID09PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBpbnB1dCBib3hcIik7XG4gICAgICAgICAgICAgICAgaWYgKF90aGlzLmlucHV0Qm94LnZhbHVlLmxlbmd0aCAhPT0gNSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciB3ID0gX3RoaXMuaW5wdXRCb3gudmFsdWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoIV90aGlzLmRpY3Rpb25hcnlNYW5hZ2VyLnZhbGlkYXRlKHcpKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLm91dHB1dChcIjxiPlwiICsgX3RoaXMuaW5wdXRCb3gudmFsdWUgKyBcIjwvYj4gaXNuJ3QgYSByZWFsIHdvcmQhXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF90aGlzLmZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgX3RoaXMuaW5wdXRCb3gudmFsdWUgPSBcIlwiO1xuICAgICAgICAgICAgICAgIF90aGlzLnN1Ym1pdEJ1dHRvbi5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodyk7XG4gICAgICAgICAgICAgICAgfSwgMTAwKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBfdGhpcy5mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgbGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFdlYkFnZW50LnByb3RvdHlwZS51cGRhdGVQcmV2aW91cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMua25vd25TY29yZXMpLmxlbmd0aCA8IDEpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMucHJldmlvdXMuaW5uZXJIVE1MID0gXCI8aDM+S25vd24gU2NvcmVzOjwvaDM+XCI7XG4gICAgICAgIGZvciAodmFyIGsgaW4gdGhpcy5rbm93blNjb3Jlcykge1xuICAgICAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgICAgIHMuY2xhc3NMaXN0LmFkZChcImtub3duLXNjb3JlLXJvd1wiKTtcbiAgICAgICAgICAgIHZhciB3ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICB3LmlubmVyVGV4dCA9IGs7XG4gICAgICAgICAgICB2YXIgbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgbC5pbm5lclRleHQgPSBcIlwiICsgdGhpcy5rbm93blNjb3Jlc1trXTtcbiAgICAgICAgICAgIHMuYXBwZW5kQ2hpbGQodyk7XG4gICAgICAgICAgICBzLmFwcGVuZENoaWxkKGwpO1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91cy5hcHBlbmRDaGlsZChzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByZXZpb3VzLnNjcm9sbFRvKDAsIHRoaXMucHJldmlvdXMuc2Nyb2xsSGVpZ2h0KTtcbiAgICB9O1xuICAgIHJldHVybiBXZWJBZ2VudDtcbn0oKSk7XG5leHBvcnRzLldlYkFnZW50ID0gV2ViQWdlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1XZWJBZ2VudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgRmlsZU1hbmFnZXJfMSA9IHJlcXVpcmUoXCIuLi9zcmMvRmlsZU1hbmFnZXJcIik7XG52YXIgSm90dG9fMSA9IHJlcXVpcmUoXCIuLi9zcmMvSm90dG9cIik7XG52YXIgR3JlZWR5QWdlbnRfMSA9IHJlcXVpcmUoXCIuLi9zcmMvR3JlZWR5QWdlbnRcIik7XG52YXIgV2ViQWdlbnRfMSA9IHJlcXVpcmUoXCIuL1dlYkFnZW50XCIpO1xudmFyIERpY3Rpb25hcnlNYW5hZ2VyXzEgPSByZXF1aXJlKFwiLi4vc3JjL0RpY3Rpb25hcnlNYW5hZ2VyXCIpO1xuLy8gRG9uJ3QgdXNlIEh1bWFuQWdlbnQgaGVyZSFcbihmdW5jdGlvbiAoKSB7IHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBkbSwgaCwgcDEsIHAyLCBqLCB2YWw7XG4gICAgcmV0dXJuIF9fZ2VuZXJhdG9yKHRoaXMsIGZ1bmN0aW9uIChfYSkge1xuICAgICAgICBzd2l0Y2ggKF9hLmxhYmVsKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgRmlsZU1hbmFnZXJfMS5GaWxlTWFuYWdlci5XT1JEX0JBTktfUEFUSCA9IFwid29yZGJhbmsudHh0XCI7XG4gICAgICAgICAgICAgICAgRmlsZU1hbmFnZXJfMS5GaWxlTWFuYWdlci5IX1BBVEggPSBcImltZGItZnJlcXVlbmNpZXMudHh0XCI7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHN0cmluZyBmcm9tIHNlcnZlciBpbnN0ZWFkIG9mIGZpbGVzeXN0ZW1cbiAgICAgICAgICAgICAgICBGaWxlTWFuYWdlcl8xLkZpbGVNYW5hZ2VyLmdldFRleHQgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKHBhdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7IHJldHVybiByZXNwb25zZS50ZXh0KCk7IH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZG0gPSBuZXcgRGljdGlvbmFyeU1hbmFnZXJfMS5EaWN0aW9uYXJ5TWFuYWdlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIGRtLmFkZFdvcmRzRnJvbUZpbGUoKV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgX2Euc2VudCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBbNCAvKnlpZWxkKi8sIEZpbGVNYW5hZ2VyXzEuRmlsZU1hbmFnZXIuZ2VuZXJhdGVIKEZpbGVNYW5hZ2VyXzEuRmlsZU1hbmFnZXIuSF9QQVRIKV07XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgaCA9IF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICBwMSA9IG5ldyBXZWJBZ2VudF8xLldlYkFnZW50KGRtKTtcbiAgICAgICAgICAgICAgICBwMiA9IG5ldyBHcmVlZHlBZ2VudF8xLkdyZWVkeUFnZW50KGgpO1xuICAgICAgICAgICAgICAgIGogPSBuZXcgSm90dG9fMS5Kb3R0byhwMSwgcDIsIGRtKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBqLnNldFVwKCldO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIF9hLnNlbnQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBqLnN0YXJ0R2FtZSgpXTtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICB2YWwgPSBfYS5zZW50KCk7XG4gICAgICAgICAgICAgICAgaWYgKHZhbC53aW5uZXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcDEub3V0cHV0KFwiVGhlIGdhbWUgZW5kZWQgd2l0aG91dCBhIHdpbm5lciBhZnRlciAxMDAwIHR1cm5zXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWwud2lubmVyID09PSBwMSkge1xuICAgICAgICAgICAgICAgICAgICBwMS5vdXRwdXQoXCJDb25ncmF0dWxhdGlvbnMhIEl0IHRvb2sgXCIgKyB2YWwudHVybnMgKyBcIiB0dXJucyBmb3IgeW91IHRvIHdpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgSm90dG9fMS5HTE9CQUxTLm91dCA9IC0xICogdmFsLnR1cm5zICsgXCIsIFwiICsgSm90dG9fMS5HTE9CQUxTLm91dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHAxLm91dHB1dChcIkkgd2luISBBbmQgaXQgb25seSB0b29rIG1lIFwiICsgdmFsLnR1cm5zICsgXCIgdHVybnNcIik7XG4gICAgICAgICAgICAgICAgICAgIHAxLm91dHB1dChcIk15IHNlY3JldCB3b3JkIHdhcyA8Yj5cIiArIHZhbC53aW5uZXJzV29yZCArIFwiPC9iPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgSm90dG9fMS5HTE9CQUxTLm91dCA9IHZhbC50dXJucyArIFwiLCBcIiArIEpvdHRvXzEuR0xPQkFMUy5vdXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgfVxuICAgIH0pO1xufSk7IH0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD13ZWIuanMubWFwIiwiIiwiLy8gLmRpcm5hbWUsIC5iYXNlbmFtZSwgYW5kIC5leHRuYW1lIG1ldGhvZHMgYXJlIGV4dHJhY3RlZCBmcm9tIE5vZGUuanMgdjguMTEuMSxcbi8vIGJhY2twb3J0ZWQgYW5kIHRyYW5zcGxpdGVkIHdpdGggQmFiZWwsIHdpdGggYmFja3dhcmRzLWNvbXBhdCBmaXhlc1xuXG4vLyBDb3B5cmlnaHQgSm95ZW50LCBJbmMuIGFuZCBvdGhlciBOb2RlIGNvbnRyaWJ1dG9ycy5cbi8vXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuLy8gY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0XG4vLyBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGVcbi8vIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy9cbi8vIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4vLyBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbi8vXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTXG4vLyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4vLyBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOXG4vLyBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSxcbi8vIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUlxuLy8gT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRVxuLy8gVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBTT0ZUV0FSRS5cblxuLy8gcmVzb2x2ZXMgLiBhbmQgLi4gZWxlbWVudHMgaW4gYSBwYXRoIGFycmF5IHdpdGggZGlyZWN0b3J5IG5hbWVzIHRoZXJlXG4vLyBtdXN0IGJlIG5vIHNsYXNoZXMsIGVtcHR5IGVsZW1lbnRzLCBvciBkZXZpY2UgbmFtZXMgKGM6XFwpIGluIHRoZSBhcnJheVxuLy8gKHNvIGFsc28gbm8gbGVhZGluZyBhbmQgdHJhaWxpbmcgc2xhc2hlcyAtIGl0IGRvZXMgbm90IGRpc3Rpbmd1aXNoXG4vLyByZWxhdGl2ZSBhbmQgYWJzb2x1dGUgcGF0aHMpXG5mdW5jdGlvbiBub3JtYWxpemVBcnJheShwYXJ0cywgYWxsb3dBYm92ZVJvb3QpIHtcbiAgLy8gaWYgdGhlIHBhdGggdHJpZXMgdG8gZ28gYWJvdmUgdGhlIHJvb3QsIGB1cGAgZW5kcyB1cCA+IDBcbiAgdmFyIHVwID0gMDtcbiAgZm9yICh2YXIgaSA9IHBhcnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGxhc3QgPSBwYXJ0c1tpXTtcbiAgICBpZiAobGFzdCA9PT0gJy4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChsYXN0ID09PSAnLi4nKSB7XG4gICAgICBwYXJ0cy5zcGxpY2UoaSwgMSk7XG4gICAgICB1cCsrO1xuICAgIH0gZWxzZSBpZiAodXApIHtcbiAgICAgIHBhcnRzLnNwbGljZShpLCAxKTtcbiAgICAgIHVwLS07XG4gICAgfVxuICB9XG5cbiAgLy8gaWYgdGhlIHBhdGggaXMgYWxsb3dlZCB0byBnbyBhYm92ZSB0aGUgcm9vdCwgcmVzdG9yZSBsZWFkaW5nIC4uc1xuICBpZiAoYWxsb3dBYm92ZVJvb3QpIHtcbiAgICBmb3IgKDsgdXAtLTsgdXApIHtcbiAgICAgIHBhcnRzLnVuc2hpZnQoJy4uJyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhcnRzO1xufVxuXG4vLyBwYXRoLnJlc29sdmUoW2Zyb20gLi4uXSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlc29sdmUgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHJlc29sdmVkUGF0aCA9ICcnLFxuICAgICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IGZhbHNlO1xuXG4gIGZvciAodmFyIGkgPSBhcmd1bWVudHMubGVuZ3RoIC0gMTsgaSA+PSAtMSAmJiAhcmVzb2x2ZWRBYnNvbHV0ZTsgaS0tKSB7XG4gICAgdmFyIHBhdGggPSAoaSA+PSAwKSA/IGFyZ3VtZW50c1tpXSA6IHByb2Nlc3MuY3dkKCk7XG5cbiAgICAvLyBTa2lwIGVtcHR5IGFuZCBpbnZhbGlkIGVudHJpZXNcbiAgICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgdG8gcGF0aC5yZXNvbHZlIG11c3QgYmUgc3RyaW5ncycpO1xuICAgIH0gZWxzZSBpZiAoIXBhdGgpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHJlc29sdmVkUGF0aCA9IHBhdGggKyAnLycgKyByZXNvbHZlZFBhdGg7XG4gICAgcmVzb2x2ZWRBYnNvbHV0ZSA9IHBhdGguY2hhckF0KDApID09PSAnLyc7XG4gIH1cblxuICAvLyBBdCB0aGlzIHBvaW50IHRoZSBwYXRoIHNob3VsZCBiZSByZXNvbHZlZCB0byBhIGZ1bGwgYWJzb2x1dGUgcGF0aCwgYnV0XG4gIC8vIGhhbmRsZSByZWxhdGl2ZSBwYXRocyB0byBiZSBzYWZlIChtaWdodCBoYXBwZW4gd2hlbiBwcm9jZXNzLmN3ZCgpIGZhaWxzKVxuXG4gIC8vIE5vcm1hbGl6ZSB0aGUgcGF0aFxuICByZXNvbHZlZFBhdGggPSBub3JtYWxpemVBcnJheShmaWx0ZXIocmVzb2x2ZWRQYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIXJlc29sdmVkQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICByZXR1cm4gKChyZXNvbHZlZEFic29sdXRlID8gJy8nIDogJycpICsgcmVzb2x2ZWRQYXRoKSB8fCAnLic7XG59O1xuXG4vLyBwYXRoLm5vcm1hbGl6ZShwYXRoKVxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5ub3JtYWxpemUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHZhciBpc0Fic29sdXRlID0gZXhwb3J0cy5pc0Fic29sdXRlKHBhdGgpLFxuICAgICAgdHJhaWxpbmdTbGFzaCA9IHN1YnN0cihwYXRoLCAtMSkgPT09ICcvJztcblxuICAvLyBOb3JtYWxpemUgdGhlIHBhdGhcbiAgcGF0aCA9IG5vcm1hbGl6ZUFycmF5KGZpbHRlcihwYXRoLnNwbGl0KCcvJyksIGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gISFwO1xuICB9KSwgIWlzQWJzb2x1dGUpLmpvaW4oJy8nKTtcblxuICBpZiAoIXBhdGggJiYgIWlzQWJzb2x1dGUpIHtcbiAgICBwYXRoID0gJy4nO1xuICB9XG4gIGlmIChwYXRoICYmIHRyYWlsaW5nU2xhc2gpIHtcbiAgICBwYXRoICs9ICcvJztcbiAgfVxuXG4gIHJldHVybiAoaXNBYnNvbHV0ZSA/ICcvJyA6ICcnKSArIHBhdGg7XG59O1xuXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLmlzQWJzb2x1dGUgPSBmdW5jdGlvbihwYXRoKSB7XG4gIHJldHVybiBwYXRoLmNoYXJBdCgwKSA9PT0gJy8nO1xufTtcblxuLy8gcG9zaXggdmVyc2lvblxuZXhwb3J0cy5qb2luID0gZnVuY3Rpb24oKSB7XG4gIHZhciBwYXRocyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCk7XG4gIHJldHVybiBleHBvcnRzLm5vcm1hbGl6ZShmaWx0ZXIocGF0aHMsIGZ1bmN0aW9uKHAsIGluZGV4KSB7XG4gICAgaWYgKHR5cGVvZiBwICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIHRvIHBhdGguam9pbiBtdXN0IGJlIHN0cmluZ3MnKTtcbiAgICB9XG4gICAgcmV0dXJuIHA7XG4gIH0pLmpvaW4oJy8nKSk7XG59O1xuXG5cbi8vIHBhdGgucmVsYXRpdmUoZnJvbSwgdG8pXG4vLyBwb3NpeCB2ZXJzaW9uXG5leHBvcnRzLnJlbGF0aXZlID0gZnVuY3Rpb24oZnJvbSwgdG8pIHtcbiAgZnJvbSA9IGV4cG9ydHMucmVzb2x2ZShmcm9tKS5zdWJzdHIoMSk7XG4gIHRvID0gZXhwb3J0cy5yZXNvbHZlKHRvKS5zdWJzdHIoMSk7XG5cbiAgZnVuY3Rpb24gdHJpbShhcnIpIHtcbiAgICB2YXIgc3RhcnQgPSAwO1xuICAgIGZvciAoOyBzdGFydCA8IGFyci5sZW5ndGg7IHN0YXJ0KyspIHtcbiAgICAgIGlmIChhcnJbc3RhcnRdICE9PSAnJykgYnJlYWs7XG4gICAgfVxuXG4gICAgdmFyIGVuZCA9IGFyci5sZW5ndGggLSAxO1xuICAgIGZvciAoOyBlbmQgPj0gMDsgZW5kLS0pIHtcbiAgICAgIGlmIChhcnJbZW5kXSAhPT0gJycpIGJyZWFrO1xuICAgIH1cblxuICAgIGlmIChzdGFydCA+IGVuZCkgcmV0dXJuIFtdO1xuICAgIHJldHVybiBhcnIuc2xpY2Uoc3RhcnQsIGVuZCAtIHN0YXJ0ICsgMSk7XG4gIH1cblxuICB2YXIgZnJvbVBhcnRzID0gdHJpbShmcm9tLnNwbGl0KCcvJykpO1xuICB2YXIgdG9QYXJ0cyA9IHRyaW0odG8uc3BsaXQoJy8nKSk7XG5cbiAgdmFyIGxlbmd0aCA9IE1hdGgubWluKGZyb21QYXJ0cy5sZW5ndGgsIHRvUGFydHMubGVuZ3RoKTtcbiAgdmFyIHNhbWVQYXJ0c0xlbmd0aCA9IGxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGlmIChmcm9tUGFydHNbaV0gIT09IHRvUGFydHNbaV0pIHtcbiAgICAgIHNhbWVQYXJ0c0xlbmd0aCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICB2YXIgb3V0cHV0UGFydHMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IHNhbWVQYXJ0c0xlbmd0aDsgaSA8IGZyb21QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIG91dHB1dFBhcnRzLnB1c2goJy4uJyk7XG4gIH1cblxuICBvdXRwdXRQYXJ0cyA9IG91dHB1dFBhcnRzLmNvbmNhdCh0b1BhcnRzLnNsaWNlKHNhbWVQYXJ0c0xlbmd0aCkpO1xuXG4gIHJldHVybiBvdXRwdXRQYXJ0cy5qb2luKCcvJyk7XG59O1xuXG5leHBvcnRzLnNlcCA9ICcvJztcbmV4cG9ydHMuZGVsaW1pdGVyID0gJzonO1xuXG5leHBvcnRzLmRpcm5hbWUgPSBmdW5jdGlvbiAocGF0aCkge1xuICBpZiAodHlwZW9mIHBhdGggIT09ICdzdHJpbmcnKSBwYXRoID0gcGF0aCArICcnO1xuICBpZiAocGF0aC5sZW5ndGggPT09IDApIHJldHVybiAnLic7XG4gIHZhciBjb2RlID0gcGF0aC5jaGFyQ29kZUF0KDApO1xuICB2YXIgaGFzUm9vdCA9IGNvZGUgPT09IDQ3IC8qLyovO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICBmb3IgKHZhciBpID0gcGF0aC5sZW5ndGggLSAxOyBpID49IDE7IC0taSkge1xuICAgIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgZW5kID0gaTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgIC8vIFdlIHNhdyB0aGUgZmlyc3Qgbm9uLXBhdGggc2VwYXJhdG9yXG4gICAgICBtYXRjaGVkU2xhc2ggPSBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgcmV0dXJuIGhhc1Jvb3QgPyAnLycgOiAnLic7XG4gIGlmIChoYXNSb290ICYmIGVuZCA9PT0gMSkge1xuICAgIC8vIHJldHVybiAnLy8nO1xuICAgIC8vIEJhY2t3YXJkcy1jb21wYXQgZml4OlxuICAgIHJldHVybiAnLyc7XG4gIH1cbiAgcmV0dXJuIHBhdGguc2xpY2UoMCwgZW5kKTtcbn07XG5cbmZ1bmN0aW9uIGJhc2VuYW1lKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcblxuICB2YXIgc3RhcnQgPSAwO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICB2YXIgaTtcblxuICBmb3IgKGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgaWYgKHBhdGguY2hhckNvZGVBdChpKSA9PT0gNDcgLyovKi8pIHtcbiAgICAgICAgLy8gSWYgd2UgcmVhY2hlZCBhIHBhdGggc2VwYXJhdG9yIHRoYXQgd2FzIG5vdCBwYXJ0IG9mIGEgc2V0IG9mIHBhdGhcbiAgICAgICAgLy8gc2VwYXJhdG9ycyBhdCB0aGUgZW5kIG9mIHRoZSBzdHJpbmcsIHN0b3Agbm93XG4gICAgICAgIGlmICghbWF0Y2hlZFNsYXNoKSB7XG4gICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAvLyBwYXRoIGNvbXBvbmVudFxuICAgICAgbWF0Y2hlZFNsYXNoID0gZmFsc2U7XG4gICAgICBlbmQgPSBpICsgMTtcbiAgICB9XG4gIH1cblxuICBpZiAoZW5kID09PSAtMSkgcmV0dXJuICcnO1xuICByZXR1cm4gcGF0aC5zbGljZShzdGFydCwgZW5kKTtcbn1cblxuLy8gVXNlcyBhIG1peGVkIGFwcHJvYWNoIGZvciBiYWNrd2FyZHMtY29tcGF0aWJpbGl0eSwgYXMgZXh0IGJlaGF2aW9yIGNoYW5nZWRcbi8vIGluIG5ldyBOb2RlLmpzIHZlcnNpb25zLCBzbyBvbmx5IGJhc2VuYW1lKCkgYWJvdmUgaXMgYmFja3BvcnRlZCBoZXJlXG5leHBvcnRzLmJhc2VuYW1lID0gZnVuY3Rpb24gKHBhdGgsIGV4dCkge1xuICB2YXIgZiA9IGJhc2VuYW1lKHBhdGgpO1xuICBpZiAoZXh0ICYmIGYuc3Vic3RyKC0xICogZXh0Lmxlbmd0aCkgPT09IGV4dCkge1xuICAgIGYgPSBmLnN1YnN0cigwLCBmLmxlbmd0aCAtIGV4dC5sZW5ndGgpO1xuICB9XG4gIHJldHVybiBmO1xufTtcblxuZXhwb3J0cy5leHRuYW1lID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgaWYgKHR5cGVvZiBwYXRoICE9PSAnc3RyaW5nJykgcGF0aCA9IHBhdGggKyAnJztcbiAgdmFyIHN0YXJ0RG90ID0gLTE7XG4gIHZhciBzdGFydFBhcnQgPSAwO1xuICB2YXIgZW5kID0gLTE7XG4gIHZhciBtYXRjaGVkU2xhc2ggPSB0cnVlO1xuICAvLyBUcmFjayB0aGUgc3RhdGUgb2YgY2hhcmFjdGVycyAoaWYgYW55KSB3ZSBzZWUgYmVmb3JlIG91ciBmaXJzdCBkb3QgYW5kXG4gIC8vIGFmdGVyIGFueSBwYXRoIHNlcGFyYXRvciB3ZSBmaW5kXG4gIHZhciBwcmVEb3RTdGF0ZSA9IDA7XG4gIGZvciAodmFyIGkgPSBwYXRoLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgdmFyIGNvZGUgPSBwYXRoLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGNvZGUgPT09IDQ3IC8qLyovKSB7XG4gICAgICAgIC8vIElmIHdlIHJlYWNoZWQgYSBwYXRoIHNlcGFyYXRvciB0aGF0IHdhcyBub3QgcGFydCBvZiBhIHNldCBvZiBwYXRoXG4gICAgICAgIC8vIHNlcGFyYXRvcnMgYXQgdGhlIGVuZCBvZiB0aGUgc3RyaW5nLCBzdG9wIG5vd1xuICAgICAgICBpZiAoIW1hdGNoZWRTbGFzaCkge1xuICAgICAgICAgIHN0YXJ0UGFydCA9IGkgKyAxO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIGlmIChlbmQgPT09IC0xKSB7XG4gICAgICAvLyBXZSBzYXcgdGhlIGZpcnN0IG5vbi1wYXRoIHNlcGFyYXRvciwgbWFyayB0aGlzIGFzIHRoZSBlbmQgb2Ygb3VyXG4gICAgICAvLyBleHRlbnNpb25cbiAgICAgIG1hdGNoZWRTbGFzaCA9IGZhbHNlO1xuICAgICAgZW5kID0gaSArIDE7XG4gICAgfVxuICAgIGlmIChjb2RlID09PSA0NiAvKi4qLykge1xuICAgICAgICAvLyBJZiB0aGlzIGlzIG91ciBmaXJzdCBkb3QsIG1hcmsgaXQgYXMgdGhlIHN0YXJ0IG9mIG91ciBleHRlbnNpb25cbiAgICAgICAgaWYgKHN0YXJ0RG90ID09PSAtMSlcbiAgICAgICAgICBzdGFydERvdCA9IGk7XG4gICAgICAgIGVsc2UgaWYgKHByZURvdFN0YXRlICE9PSAxKVxuICAgICAgICAgIHByZURvdFN0YXRlID0gMTtcbiAgICB9IGVsc2UgaWYgKHN0YXJ0RG90ICE9PSAtMSkge1xuICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBhbmQgbm9uLXBhdGggc2VwYXJhdG9yIGJlZm9yZSBvdXIgZG90LCBzbyB3ZSBzaG91bGRcbiAgICAgIC8vIGhhdmUgYSBnb29kIGNoYW5jZSBhdCBoYXZpbmcgYSBub24tZW1wdHkgZXh0ZW5zaW9uXG4gICAgICBwcmVEb3RTdGF0ZSA9IC0xO1xuICAgIH1cbiAgfVxuXG4gIGlmIChzdGFydERvdCA9PT0gLTEgfHwgZW5kID09PSAtMSB8fFxuICAgICAgLy8gV2Ugc2F3IGEgbm9uLWRvdCBjaGFyYWN0ZXIgaW1tZWRpYXRlbHkgYmVmb3JlIHRoZSBkb3RcbiAgICAgIHByZURvdFN0YXRlID09PSAwIHx8XG4gICAgICAvLyBUaGUgKHJpZ2h0LW1vc3QpIHRyaW1tZWQgcGF0aCBjb21wb25lbnQgaXMgZXhhY3RseSAnLi4nXG4gICAgICBwcmVEb3RTdGF0ZSA9PT0gMSAmJiBzdGFydERvdCA9PT0gZW5kIC0gMSAmJiBzdGFydERvdCA9PT0gc3RhcnRQYXJ0ICsgMSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gcGF0aC5zbGljZShzdGFydERvdCwgZW5kKTtcbn07XG5cbmZ1bmN0aW9uIGZpbHRlciAoeHMsIGYpIHtcbiAgICBpZiAoeHMuZmlsdGVyKSByZXR1cm4geHMuZmlsdGVyKGYpO1xuICAgIHZhciByZXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChmKHhzW2ldLCBpLCB4cykpIHJlcy5wdXNoKHhzW2ldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbn1cblxuLy8gU3RyaW5nLnByb3RvdHlwZS5zdWJzdHIgLSBuZWdhdGl2ZSBpbmRleCBkb24ndCB3b3JrIGluIElFOFxudmFyIHN1YnN0ciA9ICdhYicuc3Vic3RyKC0xKSA9PT0gJ2InXG4gICAgPyBmdW5jdGlvbiAoc3RyLCBzdGFydCwgbGVuKSB7IHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pIH1cbiAgICA6IGZ1bmN0aW9uIChzdHIsIHN0YXJ0LCBsZW4pIHtcbiAgICAgICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSBzdHIubGVuZ3RoICsgc3RhcnQ7XG4gICAgICAgIHJldHVybiBzdHIuc3Vic3RyKHN0YXJ0LCBsZW4pO1xuICAgIH1cbjtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iXX0=
