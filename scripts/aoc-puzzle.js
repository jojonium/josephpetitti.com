/* (c) 2022 Joseph Petitti | https://josephpetitti.com/license.txt */

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
var _this = this;
var Tile = /** @class */ (function () {
    function Tile(contents) {
        this.top = '';
        this.right = '';
        this.bottom = '';
        this.left = '';
        var _a = contents.split("\n"), idLine = _a[0], lines = _a.slice(1);
        this.contents = lines.map(function (s) { return s.trim().split(''); });
        this.id = +idLine.split(":")[0].split(" ")[1];
        this.updateSides();
    }
    Tile.prototype.updateSides = function () {
        this.top = this.contents[0].join('');
        this.bottom = this.contents[this.contents.length - 1].join('');
        this.right = this.contents.map(function (l) { return l[l.length - 1]; }).join('');
        this.left = this.contents.map(function (l) { return l[0]; }).join('');
        return this;
    };
    Tile.prototype.flipX = function () {
        this.contents = this.contents.map(function (l) { return l.reverse(); });
        this.updateSides();
        return this;
    };
    Tile.prototype.flipY = function () {
        this.contents = this.contents.reverse();
        this.updateSides();
        return this;
    };
    Tile.prototype.rotate = function (n) {
        var _this = this;
        if (n === void 0) { n = 1; }
        if (n === 0)
            return this;
        for (var turns = 0; turns < n; turns++) {
            this.contents =
                this.contents.map(function (_, i) { return _this.contents.map(function (x) { return x[i]; }).reverse(); });
        }
        this.updateSides();
        return this;
    };
    Tile.prototype.prettyPrint = function () {
        return this.contents.map(function (s) { return s.join(''); }).join('\n');
    };
    Tile.prototype["try"] = function (above, toRight, below, toLeft) {
        return (above === undefined || this.top === above.bottom) &&
            (toRight === undefined || this.right === toRight.left) &&
            (below === undefined || this.bottom === below.top) &&
            (toLeft === undefined || this.left === toLeft.right);
    };
    Tile.prototype.fit = function (ctx, settings, full, x, y) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var above, toRight, below, toLeft, n;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        above = ((_a = full[x]) !== null && _a !== void 0 ? _a : [])[y - 1];
                        toRight = ((_b = full[x + 1]) !== null && _b !== void 0 ? _b : [])[y];
                        below = ((_c = full[x]) !== null && _c !== void 0 ? _c : [])[y + 1];
                        toLeft = ((_d = full[x - 1]) !== null && _d !== void 0 ? _d : [])[y];
                        return [4 /*yield*/, paint(ctx, settings, this, x, y, true)];
                    case 1:
                        _e.sent();
                        for (n = 0; n <= 3; ++n) {
                            this.rotate(1);
                            // Normal
                            if (this["try"](above, toRight, below, toLeft)) {
                                return [2 /*return*/, this];
                            }
                            // Flipped X
                            this.flipX();
                            if (this["try"](above, toRight, below, toLeft)) {
                                return [2 /*return*/, this];
                            }
                            // Flipped Y
                            this.flipX();
                            this.flipY();
                            if (this["try"](above, toRight, below, toLeft)) {
                                return [2 /*return*/, this];
                            }
                            // Flipped X and Y
                            this.flipX();
                            if (this["try"](above, toRight, below, toLeft)) {
                                return [2 /*return*/, this];
                            }
                            this.flipX();
                            this.flipY();
                        }
                        return [2 /*return*/, false];
                }
            });
        });
    };
    return Tile;
}());
var sort = function (tiles) {
    var corners = [];
    var edges = [];
    var middle = [];
    var _loop_1 = function (tile) {
        var others = tiles.filter(function (x) { return x !== tile; }).map(function (t) { return [
            t.top, t.top.split('').reverse().join(''),
            t.right, t.right.split('').reverse().join(''),
            t.bottom, t.bottom.split('').reverse().join(''),
            t.left, t.left.split('').reverse().join(''),
        ]; });
        var topAppearances = 0;
        var rightAppearances = 0;
        var bottomAppearances = 0;
        var leftAppearances = 0;
        for (var _a = 0, others_1 = others; _a < others_1.length; _a++) {
            var other = others_1[_a];
            if (other.includes(tile.top))
                topAppearances++;
            if (other.includes(tile.right))
                rightAppearances++;
            if (other.includes(tile.bottom))
                bottomAppearances++;
            if (other.includes(tile.left))
                leftAppearances++;
        }
        var c = 0;
        if (topAppearances === 0)
            c++;
        if (rightAppearances === 0)
            c++;
        if (bottomAppearances === 0)
            c++;
        if (leftAppearances === 0)
            c++;
        if (c === 2) {
            corners.push({
                t: tile,
                tu: topAppearances === 0,
                ru: rightAppearances === 0,
                bu: bottomAppearances === 0,
                lu: leftAppearances === 0
            });
        }
        else if (c === 1)
            edges.push(tile);
        else if (c === 0)
            middle.push(tile);
        else
            console.error("That's not supposed to happen! " + c);
    };
    for (var _i = 0, tiles_1 = tiles; _i < tiles_1.length; _i++) {
        var tile = tiles_1[_i];
        _loop_1(tile);
    }
    return { corners: corners, edges: edges, middle: middle };
};
var solve = function (tiles, ctx, settings) { return __awaiter(_this, void 0, void 0, function () {
    var sorted, dimensions, image, i, _a, tile, tu, ru, bu, lu, rotations, r, slotIn, _loop_2, y, slot, _loop_3, x, _loop_4, y, _loop_5, x, o, x, y, x, x, y, y;
    var _this = this;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sorted = sort(tiles);
                dimensions = Math.sqrt(tiles.length);
                image = new Array(dimensions);
                for (i = 0; i < dimensions; ++i) {
                    image[i] = new Array(dimensions);
                    image[i].fill(undefined);
                }
                _a = sorted.corners.shift(), tile = _a.t, tu = _a.tu, ru = _a.ru, bu = _a.bu, lu = _a.lu;
                rotations = 0;
                if (bu && lu)
                    rotations = 1;
                else if (ru && bu)
                    rotations = 2;
                else if (tu && ru)
                    rotations = 3;
                r = 0;
                _b.label = 1;
            case 1:
                if (!(r < rotations)) return [3 /*break*/, 4];
                return [4 /*yield*/, paint(ctx, settings, tile, 0, 0, true)];
            case 2:
                _b.sent();
                tile.rotate();
                _b.label = 3;
            case 3:
                r++;
                return [3 /*break*/, 1];
            case 4:
                image[0][0] = tile;
                return [4 /*yield*/, paint(ctx, settings, tile, 0, 0, false)];
            case 5:
                _b.sent();
                slotIn = function (x, y, pool) { return __awaiter(_this, void 0, void 0, function () {
                    var e, fit;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                e = pool.length - 1;
                                _a.label = 1;
                            case 1:
                                if (!(e >= 0)) return [3 /*break*/, 5];
                                return [4 /*yield*/, pool[e].fit(ctx, settings, image, x, y)];
                            case 2:
                                fit = _a.sent();
                                if (!(fit !== false)) return [3 /*break*/, 4];
                                image[x][y] = fit;
                                return [4 /*yield*/, paint(ctx, settings, fit, x, y, false)];
                            case 3:
                                _a.sent();
                                return [2 /*return*/, fit];
                            case 4:
                                e--;
                                return [3 /*break*/, 1];
                            case 5: throw new Error("Nothing fits in ".concat(x, ",").concat(y));
                        }
                    });
                }); };
                _loop_2 = function (y) {
                    var slot_1;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0: return [4 /*yield*/, slotIn(0, y, sorted.edges)];
                            case 1:
                                slot_1 = _c.sent();
                                sorted.edges = sorted.edges.filter(function (e) { return e !== slot_1; });
                                return [2 /*return*/];
                        }
                    });
                };
                y = 1;
                _b.label = 6;
            case 6:
                if (!(y < dimensions - 1)) return [3 /*break*/, 9];
                return [5 /*yield**/, _loop_2(y)];
            case 7:
                _b.sent();
                _b.label = 8;
            case 8:
                y++;
                return [3 /*break*/, 6];
            case 9: return [4 /*yield*/, slotIn(0, dimensions - 1, sorted.corners.map(function (c) { return c.t; }))];
            case 10:
                slot = _b.sent();
                sorted.corners = sorted.corners.filter(function (c) { return c.t !== slot; });
                _loop_3 = function (x) {
                    var slot_2;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, slotIn(x, dimensions - 1, sorted.edges)];
                            case 1:
                                slot_2 = _d.sent();
                                sorted.edges = sorted.edges.filter(function (e) { return e !== slot_2; });
                                return [2 /*return*/];
                        }
                    });
                };
                x = 1;
                _b.label = 11;
            case 11:
                if (!(x < dimensions - 1)) return [3 /*break*/, 14];
                return [5 /*yield**/, _loop_3(x)];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13:
                x++;
                return [3 /*break*/, 11];
            case 14: return [4 /*yield*/, slotIn(dimensions - 1, dimensions - 1, sorted.corners.map(function (c) { return c.t; }))];
            case 15:
                // Fill in bottom right corner
                slot = _b.sent();
                sorted.corners = sorted.corners.filter(function (c) { return c.t !== slot; });
                _loop_4 = function (y) {
                    var slot_3;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0: return [4 /*yield*/, slotIn(dimensions - 1, y, sorted.edges)];
                            case 1:
                                slot_3 = _e.sent();
                                sorted.edges = sorted.edges.filter(function (e) { return e !== slot_3; });
                                return [2 /*return*/];
                        }
                    });
                };
                y = dimensions - 2;
                _b.label = 16;
            case 16:
                if (!(y > 0)) return [3 /*break*/, 19];
                return [5 /*yield**/, _loop_4(y)];
            case 17:
                _b.sent();
                _b.label = 18;
            case 18:
                y--;
                return [3 /*break*/, 16];
            case 19: return [4 /*yield*/, slotIn(dimensions - 1, 0, sorted.corners.map(function (c) { return c.t; }))];
            case 20:
                // Fill in top right corner
                slot = _b.sent();
                sorted.corners = sorted.corners.filter(function (c) { return c.t !== slot; });
                _loop_5 = function (x) {
                    var slot_4;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0: return [4 /*yield*/, slotIn(x, 0, sorted.edges)];
                            case 1:
                                slot_4 = _f.sent();
                                sorted.edges = sorted.edges.filter(function (e) { return e !== slot_4; });
                                return [2 /*return*/];
                        }
                    });
                };
                x = dimensions - 2;
                _b.label = 21;
            case 21:
                if (!(x > 0)) return [3 /*break*/, 24];
                return [5 /*yield**/, _loop_5(x)];
            case 22:
                _b.sent();
                _b.label = 23;
            case 23:
                x--;
                return [3 /*break*/, 21];
            case 24:
                o = 1;
                _b.label = 25;
            case 25:
                if (!(o < dimensions / 2)) return [3 /*break*/, 42];
                x = o;
                _b.label = 26;
            case 26:
                if (!(x < dimensions - o)) return [3 /*break*/, 29];
                return [4 /*yield*/, slotIn(x, o, sorted.middle)];
            case 27:
                slot = _b.sent();
                sorted.middle = sorted.middle.filter(function (e) { return e !== slot; });
                _b.label = 28;
            case 28:
                x++;
                return [3 /*break*/, 26];
            case 29:
                y = o + 1;
                _b.label = 30;
            case 30:
                if (!(y < dimensions - o)) return [3 /*break*/, 33];
                x = dimensions - o - 1;
                return [4 /*yield*/, slotIn(x, y, sorted.middle)];
            case 31:
                slot = _b.sent();
                sorted.middle = sorted.middle.filter(function (e) { return e !== slot; });
                _b.label = 32;
            case 32:
                y++;
                return [3 /*break*/, 30];
            case 33:
                x = dimensions - o - 2;
                _b.label = 34;
            case 34:
                if (!(x >= o)) return [3 /*break*/, 37];
                y = dimensions - o - 1;
                return [4 /*yield*/, slotIn(x, y, sorted.middle)];
            case 35:
                slot = _b.sent();
                sorted.middle = sorted.middle.filter(function (e) { return e !== slot; });
                _b.label = 36;
            case 36:
                x--;
                return [3 /*break*/, 34];
            case 37:
                y = dimensions - o - 2;
                _b.label = 38;
            case 38:
                if (!(y > o)) return [3 /*break*/, 41];
                return [4 /*yield*/, slotIn(o, y, sorted.middle)];
            case 39:
                slot = _b.sent();
                sorted.middle = sorted.middle.filter(function (e) { return e !== slot; });
                _b.label = 40;
            case 40:
                y--;
                return [3 /*break*/, 38];
            case 41:
                o++;
                return [3 /*break*/, 25];
            case 42: return [2 /*return*/, image];
        }
    });
}); };
var printImage = function (image) {
    var _a;
    var str = '';
    for (var y = 0; y < image[0].length; ++y) {
        for (var l = 0; l < 10; ++l) {
            for (var x = 0; x < image.length; ++x) {
                var temp = (image[x][y] === undefined)
                    ? ' '.repeat(10)
                    : (_a = image[x][y]) === null || _a === void 0 ? void 0 : _a.contents[l].join('');
                str += temp + ' ';
            }
            str += '\n';
        }
        str += '\n';
    }
    return str;
};
var paragraphsAsStrings = function (filename) { return __awaiter(_this, void 0, void 0, function () {
    var fetchResponse, text;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch(filename)];
            case 1:
                fetchResponse = _a.sent();
                return [4 /*yield*/, fetchResponse.text()];
            case 2:
                text = _a.sent();
                return [2 /*return*/, text.trim().split("\n\n")];
        }
    });
}); };
var wait = function (ms) { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve) { return setTimeout(function () {
                resolve();
            }, ms); })];
    });
}); };
var paint = function (ctx, settings, tile, x, y, active, noSleep) {
    if (active === void 0) { active = false; }
    if (noSleep === void 0) { noSleep = false; }
    return __awaiter(_this, void 0, void 0, function () {
        var xOffset, yOffset, i, j;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!noSleep) return [3 /*break*/, 2];
                    return [4 /*yield*/, wait(settings.sleepTime)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    xOffset = x * settings.pixelsPerSide * settings.pixelSize
                        + settings.gapSize * x;
                    yOffset = y * settings.pixelsPerSide * settings.pixelSize
                        + settings.gapSize * y;
                    ctx.save();
                    ctx.fillStyle = settings.bgColor;
                    ctx.fillRect(xOffset, yOffset, settings.pixelsPerSide * settings.pixelSize, settings.pixelsPerSide * settings.pixelSize);
                    ctx.fillStyle = active ? settings.currentColor : settings.doneColor;
                    for (i = 0; i < tile.contents.length; i++) {
                        for (j = 0; j < tile.contents[i].length; j++) {
                            if (tile.contents[i][j] !== '#')
                                continue;
                            ctx.fillRect(xOffset + (j * settings.pixelSize), yOffset + (i * settings.pixelSize), settings.pixelSize, settings.pixelSize);
                        }
                    }
                    ctx.restore();
                    return [2 /*return*/];
            }
        });
    });
};
var start = function (tiles, ctx, cs) { return __awaiter(_this, void 0, void 0, function () {
    var totalWidth, totalHeight;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                totalWidth = cs.tileWidth * cs.pixelsPerSide * cs.pixelSize
                    + cs.gapSize * (cs.tileWidth - 1);
                totalHeight = cs.tileHeight * cs.pixelsPerSide * cs.pixelSize
                    + cs.gapSize * (cs.tileHeight - 1);
                ctx.save();
                ctx.fillStyle = cs.bgColor;
                ctx.fillRect(0, 0, totalWidth, totalHeight);
                ctx.restore();
                return [4 /*yield*/, solve(tiles, ctx, cs)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
(function () { return __awaiter(_this, void 0, void 0, function () {
    var input, tiles, cs, canvas, ctx, button;
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, paragraphsAsStrings('puzzle-input.txt')];
            case 1:
                input = _a.sent();
                tiles = input.map(function (para) { return new Tile(para); });
                cs = {
                    tileWidth: Math.floor(Math.sqrt(tiles.length)),
                    tileHeight: Math.floor(Math.sqrt(tiles.length)),
                    pixelsPerSide: 10,
                    pixelSize: 4,
                    gapSize: 1,
                    bgColor: '#1f0053',
                    doneColor: '#3066be',
                    currentColor: '#f1a208',
                    sleepTime: 1
                };
                canvas = document.getElementById('puzzle-canvas');
                if (!canvas)
                    throw new Error("Couldn't get canvas");
                canvas.width = cs.tileWidth * cs.pixelsPerSide * cs.pixelSize
                    + cs.gapSize * (cs.tileWidth - 1);
                canvas.height = cs.tileHeight * cs.pixelsPerSide * cs.pixelSize
                    + cs.gapSize * (cs.tileHeight - 1);
                ctx = canvas.getContext("2d");
                if (ctx === null)
                    throw new Error("Couldn't get 2D canvas context");
                ctx.save();
                ctx.fillStyle = cs.bgColor;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();
                button = document.getElementById('start-button');
                if (!button)
                    throw new Error("Couldn't get start button");
                button.addEventListener("click", function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                button.disabled = true;
                                return [4 /*yield*/, start(tiles, ctx, cs)];
                            case 1:
                                _a.sent();
                                button.disabled = false;
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [2 /*return*/];
        }
    });
}); })();
