"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
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
var tf = require("@tensorflow/tfjs-core");
var seedrandom = require("seedrandom");
var lazy_iterator_1 = require("./iterators/lazy_iterator");
var lazy_iterator_2 = require("./iterators/lazy_iterator");
var lazy_iterator_3 = require("./iterators/lazy_iterator");
var deep_map_1 = require("./util/deep_map");
var Dataset = (function () {
    function Dataset() {
    }
    Dataset.prototype.filter = function (filterer) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, base.iterator()];
                    case 1: return [2, (_a.sent()).filter(function (x) { return tf.tidy(function () { return filterer(x); }); })];
                }
            });
        }); });
    };
    Dataset.prototype.map = function (transform) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, base.iterator()];
                    case 1: return [2, (_a.sent()).map(function (x) { return tf.tidy(function () { return transform(x); }); })];
                }
            });
        }); });
    };
    Dataset.prototype.mapAsync = function (transform) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, base.iterator()];
                    case 1: return [2, (_a.sent()).mapAsync(transform)];
                }
            });
        }); });
    };
    Dataset.prototype.batch = function (batchSize, smallLastBatch) {
        var _this = this;
        if (smallLastBatch === void 0) { smallLastBatch = true; }
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, base.iterator()];
                    case 1: return [2, (_a.sent())
                            .columnMajorBatch(batchSize, smallLastBatch, deepBatchConcat)];
                }
            });
        }); });
    };
    Dataset.prototype.concatenate = function (dataset) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { var _a, _b; return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4, base.iterator()];
                case 1:
                    _b = (_a = (_c.sent())).concatenate;
                    return [4, dataset.iterator()];
                case 2: return [2, _b.apply(_a, [_c.sent()])];
            }
        }); }); });
    };
    Dataset.prototype.repeat = function (count) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var iteratorIterator;
            return __generator(this, function (_a) {
                iteratorIterator = lazy_iterator_1.iteratorFromFunction(function () { return __awaiter(_this, void 0, void 0, function () { var _a; return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = {};
                            return [4, base.iterator()];
                        case 1: return [2, (_a.value = _b.sent(), _a.done = false, _a)];
                    }
                }); }); });
                return [2, lazy_iterator_2.iteratorFromConcatenated(iteratorIterator.take(count))];
            });
        }); });
    };
    Dataset.prototype.take = function (count) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, base.iterator()];
                case 1: return [2, (_a.sent()).take(count)];
            }
        }); }); });
    };
    Dataset.prototype.skip = function (count) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, base.iterator()];
                case 1: return [2, (_a.sent()).skip(count)];
            }
        }); }); });
    };
    Dataset.prototype.shuffle = function (bufferSize, seed, reshuffleEachIteration) {
        var _this = this;
        if (reshuffleEachIteration === void 0) { reshuffleEachIteration = true; }
        var base = this;
        var random = seedrandom.alea(seed || tf.util.now().toString());
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
            var seed2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        seed2 = random.int32();
                        if (reshuffleEachIteration) {
                            seed2 += random.int32();
                        }
                        return [4, base.iterator()];
                    case 1: return [2, (_a.sent()).shuffle(bufferSize, seed2.toString())];
                }
            });
        }); });
    };
    Dataset.prototype.prefetch = function (bufferSize) {
        var _this = this;
        var base = this;
        return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, base.iterator()];
                case 1: return [2, (_a.sent()).prefetch(bufferSize)];
            }
        }); }); });
    };
    Dataset.prototype.collectAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.iterator()];
                    case 1: return [2, (_a.sent()).collect()];
                }
            });
        });
    };
    Dataset.prototype.forEach = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.iterator()];
                    case 1: return [2, (_a.sent()).forEach(f)];
                }
            });
        });
    };
    return Dataset;
}());
exports.Dataset = Dataset;
function datasetFromIteratorFn(iteratorFn) {
    return new (function (_super) {
        __extends(class_1, _super);
        function class_1() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        class_1.prototype.iterator = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2, iteratorFn()];
                });
            });
        };
        return class_1;
    }(Dataset))();
}
exports.datasetFromIteratorFn = datasetFromIteratorFn;
function array(items) {
    var _this = this;
    return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2, lazy_iterator_3.iteratorFromItems(items)];
    }); }); });
}
exports.array = array;
function zip(datasets) {
    var _this = this;
    if (!deep_map_1.isIterable(datasets)) {
        throw new Error('The argument to zip() must be an object or array.');
    }
    return datasetFromIteratorFn(function () { return __awaiter(_this, void 0, void 0, function () {
        var streams;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, deep_map_1.deepMapAndAwaitAll(datasets, function (d) {
                        if (d instanceof Dataset) {
                            return { value: d.iterator(), recurse: false };
                        }
                        else if (deep_map_1.isIterable(d)) {
                            return { value: null, recurse: true };
                        }
                        else {
                            throw new Error('Leaves of the structure passed to zip() must be Datasets, ' +
                                'not primitives.');
                        }
                    })];
                case 1:
                    streams = _a.sent();
                    return [2, lazy_iterator_1.iteratorFromZipped(streams, lazy_iterator_1.ZipMismatchMode.SHORTEST)];
            }
        });
    }); });
}
exports.zip = zip;
function deepBatchConcat(rows) {
    if (rows === null) {
        return null;
    }
    var exampleRow = rows[0];
    if (typeof (exampleRow) === 'string') {
        return { value: rows, recurse: false };
    }
    if (!deep_map_1.isIterable(exampleRow)) {
        var value = batchConcat(rows);
        return { value: value, recurse: false };
    }
    if (deep_map_1.isNumericArray(exampleRow)) {
        var value = batchConcat(rows);
        return { value: value, recurse: false };
    }
    return { value: null, recurse: true };
}
function batchConcat(arrays) {
    var elementShape = shapeAndValues(arrays[0])[0];
    var batchShape = [arrays.length].concat(elementShape);
    var resultVals = new Float32Array(batchShape.reduce(function (x, y) { return x * y; }));
    var offset = 0;
    for (var _i = 0, arrays_1 = arrays; _i < arrays_1.length; _i++) {
        var a = arrays_1[_i];
        var _a = shapeAndValues(a), aShape = _a[0], aVals = _a[1];
        if (!tf.util.arraysEqual(aShape, elementShape)) {
            throw new Error('Elements must have the same shape to be batched');
        }
        resultVals.set(aVals, offset);
        offset += aVals.length;
    }
    return tf.Tensor.make(batchShape, { values: resultVals });
}
function shapeAndValues(array) {
    if (array instanceof tf.Tensor) {
        return [array.shape, array.dataSync()];
    }
    else if (Array.isArray(array)) {
        return [[array.length], array];
    }
    else {
        return [[], [array]];
    }
}
//# sourceMappingURL=dataset.js.map