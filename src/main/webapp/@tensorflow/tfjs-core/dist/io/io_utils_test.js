"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var ops_1 = require("../ops/ops");
var test_util_1 = require("../test_util");
var test_util_2 = require("../test_util");
var io_utils_1 = require("./io_utils");
describe('concatenateTypedArrays', function () {
    it('Single float arrays', function () {
        var x = new Float32Array([1.1, 2.2, 3.3]);
        var buffer = io_utils_1.concatenateTypedArrays([x]);
        expect(buffer.byteLength).toEqual(12);
        expect(new Float32Array(buffer, 0, 3)).toEqual(x);
    });
    it('Float arrays', function () {
        var x = new Float32Array([1.1, 2.2, 3.3]);
        var y = new Float32Array([-1.1, -2.2, -3.3]);
        var buffer = io_utils_1.concatenateTypedArrays([x, y]);
        expect(buffer.byteLength).toEqual(24);
        expect(new Float32Array(buffer, 0, 3)).toEqual(x);
        expect(new Float32Array(buffer, 12, 3)).toEqual(y);
    });
    it('Single int32 arrays', function () {
        var x = new Int32Array([11, 22, 33]);
        var buffer = io_utils_1.concatenateTypedArrays([x]);
        expect(buffer.byteLength).toEqual(12);
        expect(new Int32Array(buffer, 0, 3)).toEqual(x);
    });
    it('Int32 arrays', function () {
        var x = new Int32Array([11, 22, 33]);
        var y = new Int32Array([-11, -22, -33]);
        var buffer = io_utils_1.concatenateTypedArrays([x, y]);
        expect(buffer.byteLength).toEqual(24);
        expect(new Int32Array(buffer, 0, 3)).toEqual(x);
        expect(new Int32Array(buffer, 12, 3)).toEqual(y);
    });
    it('Single uint8 arrays', function () {
        var x = new Uint8Array([11, 22, 33]);
        var buffer = io_utils_1.concatenateTypedArrays([x]);
        expect(buffer.byteLength).toEqual(3);
        expect(new Uint8Array(buffer, 0, 3)).toEqual(x);
    });
    it('Uint8 arrays', function () {
        var x = new Uint8Array([11, 22, 33]);
        var y = new Uint8Array([111, 122, 133]);
        var buffer = io_utils_1.concatenateTypedArrays([x, y]);
        expect(buffer.byteLength).toEqual(6);
        expect(new Uint8Array(buffer, 0, 3)).toEqual(x);
        expect(new Uint8Array(buffer, 3, 3)).toEqual(y);
    });
    it('Mixed Uint8, Int32 and Float32 arrays', function () {
        var x = new Uint8Array([0, 1, 1, 0]);
        var y = new Int32Array([10, 20, 30, 40]);
        var z = new Float32Array([-1.1, -2.2, -3.3, -4.4]);
        var buffer = io_utils_1.concatenateTypedArrays([x, y, z]);
        expect(buffer.byteLength).toEqual(1 * 4 + 4 * 4 + 4 * 4);
        expect(new Uint8Array(buffer, 0, 4)).toEqual(x);
        expect(new Int32Array(buffer, 4, 4)).toEqual(y);
        expect(new Float32Array(buffer, 20, 4)).toEqual(z);
    });
    it('Concatenate Float32Arrays from SubArrays', function () {
        var x1 = new Float32Array([1.1, 2.2, 3.3]);
        var x2 = new Float32Array([-1.1, -2.2, -3.3]);
        var xConcatenated = io_utils_1.concatenateTypedArrays([x1, x2]);
        var y1 = new Float32Array(xConcatenated, 0, 3);
        var y2 = new Float32Array(xConcatenated, 3 * 4, 3);
        expect(y1.buffer.byteLength).toEqual(6 * 4);
        expect(y2.buffer.byteLength).toEqual(6 * 4);
        var yConcatenated = io_utils_1.concatenateTypedArrays([y1, y2]);
        expect(yConcatenated.byteLength).toEqual(6 * 4);
        expect(new Float32Array(yConcatenated, 0, 3)).toEqual(x1);
        expect(new Float32Array(yConcatenated, 3 * 4, 3)).toEqual(x2);
    });
    it('Concatenate Int32Array from SubArrays', function () {
        var x1 = new Int32Array([11, 22, 33]);
        var x2 = new Int32Array([-11, -22, -33]);
        var xConcatenated = io_utils_1.concatenateTypedArrays([x1, x2]);
        var y1 = new Int32Array(xConcatenated, 0, 3);
        var y2 = new Int32Array(xConcatenated, 3 * 4, 3);
        expect(y1.buffer.byteLength).toEqual(6 * 4);
        expect(y2.buffer.byteLength).toEqual(6 * 4);
        var yConcatenated = io_utils_1.concatenateTypedArrays([y1, y2]);
        expect(yConcatenated.byteLength).toEqual(6 * 4);
        expect(new Int32Array(yConcatenated, 0, 3)).toEqual(x1);
        expect(new Int32Array(yConcatenated, 3 * 4, 3)).toEqual(x2);
    });
    it('Concatenate Uint8Array from SubArrays', function () {
        var x1 = new Uint8Array([11, 22, 33]);
        var x2 = new Uint8Array([44, 55, 66]);
        var xConcatenated = io_utils_1.concatenateTypedArrays([x1, x2]);
        var y1 = new Uint8Array(xConcatenated, 0, 3);
        var y2 = new Uint8Array(xConcatenated, 3, 3);
        expect(y1.buffer.byteLength).toEqual(6);
        expect(y2.buffer.byteLength).toEqual(6);
        var yConcatenated = io_utils_1.concatenateTypedArrays([y1, y2]);
        expect(yConcatenated.byteLength).toEqual(6);
        expect(new Uint8Array(yConcatenated, 0, 3)).toEqual(x1);
        expect(new Uint8Array(yConcatenated, 3, 3)).toEqual(x2);
    });
    it('Concatenate mixed TypedArrays from SubArrays', function () {
        var x1 = new Uint8Array([11, 22, 33, 44]);
        var x2 = new Int32Array([-44, -55, -66]);
        var x3 = new Float32Array([1.1, 2.2, 3.3]);
        var xConcatenated = io_utils_1.concatenateTypedArrays([x1, x2, x3]);
        var y1 = new Uint8Array(xConcatenated, 0, 4);
        var y2 = new Int32Array(xConcatenated, 4, 3);
        var y3 = new Float32Array(xConcatenated, 4 + 3 * 4, 3);
        expect(y1.buffer.byteLength).toEqual(4 + 3 * 4 + 3 * 4);
        expect(y2.buffer.byteLength).toEqual(4 + 3 * 4 + 3 * 4);
        expect(y3.buffer.byteLength).toEqual(4 + 3 * 4 + 3 * 4);
        var yConcatenated = io_utils_1.concatenateTypedArrays([y1, y2, y3]);
        expect(yConcatenated.byteLength).toEqual(4 + 3 * 4 + 3 * 4);
        expect(new Uint8Array(yConcatenated, 0, 4)).toEqual(x1);
        expect(new Int32Array(yConcatenated, 4, 3)).toEqual(x2);
        expect(new Float32Array(yConcatenated, 4 + 3 * 4, 3)).toEqual(x3);
    });
    it('null and undefined inputs', function () {
        expect(function () { return io_utils_1.concatenateTypedArrays(null); }).toThrow();
        expect(function () { return io_utils_1.concatenateTypedArrays(undefined); }).toThrow();
    });
    it('empty input array', function () {
        expect(io_utils_1.concatenateTypedArrays([]).byteLength).toEqual(0);
    });
    it('Unsupported dtype', function () {
        var x = new Int16Array([0, 1, 1, 0]);
        expect(function () { return io_utils_1.concatenateTypedArrays([x]); })
            .toThrowError(/Unsupported TypedArray subtype: Int16Array/);
    });
});
describe('encodeWeights', function () {
    it('Float32 tensors', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var tensors;
        return __generator(this, function (_a) {
            tensors = {
                x1: ops_1.tensor2d([[10, 20], [30, 40]]),
                x2: ops_1.scalar(42),
                x3: ops_1.tensor1d([-1.3, -3.7, 1.3, 3.7]),
            };
            tf.io.encodeWeights(tensors)
                .then(function (dataAndSpecs) {
                var data = dataAndSpecs.data;
                var specs = dataAndSpecs.specs;
                expect(data.byteLength).toEqual(4 * (4 + 1 + 4));
                expect(new Float32Array(data, 0, 4)).toEqual(new Float32Array([
                    10, 20, 30, 40
                ]));
                expect(new Float32Array(data, 16, 1)).toEqual(new Float32Array([42]));
                expect(new Float32Array(data, 20, 4)).toEqual(new Float32Array([
                    -1.3, -3.7, 1.3, 3.7
                ]));
                expect(specs).toEqual([
                    {
                        name: 'x1',
                        dtype: 'float32',
                        shape: [2, 2],
                    },
                    {
                        name: 'x2',
                        dtype: 'float32',
                        shape: [],
                    },
                    {
                        name: 'x3',
                        dtype: 'float32',
                        shape: [4],
                    }
                ]);
                done();
            })
                .catch(function (err) {
                console.error(err.stack);
            });
            return [2];
        });
    }); });
    it('Int32 tensors', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var tensors;
        return __generator(this, function (_a) {
            tensors = {
                x1: ops_1.tensor2d([[10, 20], [30, 40]], [2, 2], 'int32'),
                x2: ops_1.scalar(42, 'int32'),
                x3: ops_1.tensor1d([-1, -3, -3, -7], 'int32'),
            };
            tf.io.encodeWeights(tensors)
                .then(function (dataAndSpecs) {
                var data = dataAndSpecs.data;
                var specs = dataAndSpecs.specs;
                expect(data.byteLength).toEqual(4 * (4 + 1 + 4));
                expect(new Int32Array(data, 0, 4)).toEqual(new Int32Array([
                    10, 20, 30, 40
                ]));
                expect(new Int32Array(data, 16, 1)).toEqual(new Int32Array([42]));
                expect(new Int32Array(data, 20, 4)).toEqual(new Int32Array([
                    -1, -3, -3, -7
                ]));
                expect(specs).toEqual([
                    {
                        name: 'x1',
                        dtype: 'int32',
                        shape: [2, 2],
                    },
                    {
                        name: 'x2',
                        dtype: 'int32',
                        shape: [],
                    },
                    {
                        name: 'x3',
                        dtype: 'int32',
                        shape: [4],
                    }
                ]);
                done();
            })
                .catch(function (err) {
                console.error(err.stack);
            });
            return [2];
        });
    }); });
    it('Bool tensors', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var tensors;
        return __generator(this, function (_a) {
            tensors = {
                x1: ops_1.tensor2d([[true, false], [false, true]], [2, 2], 'bool'),
                x2: ops_1.scalar(false, 'bool'),
                x3: ops_1.tensor1d([false, true, true, false], 'bool'),
            };
            tf.io.encodeWeights(tensors)
                .then(function (dataAndSpecs) {
                var data = dataAndSpecs.data;
                var specs = dataAndSpecs.specs;
                expect(data.byteLength).toEqual(4 + 1 + 4);
                expect(new Uint8Array(data, 0, 4)).toEqual(new Uint8Array([
                    1, 0, 0, 1
                ]));
                expect(new Uint8Array(data, 4, 1)).toEqual(new Uint8Array([0]));
                expect(new Uint8Array(data, 5, 4)).toEqual(new Uint8Array([
                    0, 1, 1, 0
                ]));
                expect(specs).toEqual([
                    {
                        name: 'x1',
                        dtype: 'bool',
                        shape: [2, 2],
                    },
                    {
                        name: 'x2',
                        dtype: 'bool',
                        shape: [],
                    },
                    {
                        name: 'x3',
                        dtype: 'bool',
                        shape: [4],
                    }
                ]);
                done();
            })
                .catch(function (err) {
                console.error(err.stack);
            });
            return [2];
        });
    }); });
    it('Mixed dtype tensors', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var tensors;
        return __generator(this, function (_a) {
            tensors = {
                x1: ops_1.tensor2d([[10, 20], [30, 40]], [2, 2], 'int32'),
                x2: ops_1.scalar(13.37, 'float32'),
                x3: ops_1.tensor1d([true, false, false, true], 'bool'),
            };
            tf.io.encodeWeights(tensors)
                .then(function (dataAndSpecs) {
                var data = dataAndSpecs.data;
                var specs = dataAndSpecs.specs;
                expect(data.byteLength).toEqual(4 * 4 + 4 * 1 + 1 * 4);
                expect(new Int32Array(data, 0, 4)).toEqual(new Int32Array([
                    10, 20, 30, 40
                ]));
                expect(new Float32Array(data, 16, 1))
                    .toEqual(new Float32Array([13.37]));
                expect(new Uint8Array(data, 20, 4)).toEqual(new Uint8Array([
                    1, 0, 0, 1
                ]));
                expect(specs).toEqual([
                    {
                        name: 'x1',
                        dtype: 'int32',
                        shape: [2, 2],
                    },
                    {
                        name: 'x2',
                        dtype: 'float32',
                        shape: [],
                    },
                    {
                        name: 'x3',
                        dtype: 'bool',
                        shape: [4],
                    }
                ]);
                done();
            })
                .catch(function (err) {
                console.error(err.stack);
            });
            return [2];
        });
    }); });
});
jasmine_util_1.describeWithFlags('decodeWeights', {}, function () {
    it('Mixed dtype tensors', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var tensors;
        return __generator(this, function (_a) {
            tensors = {
                x1: ops_1.tensor2d([[10, 20], [30, 40]], [2, 2], 'int32'),
                x2: ops_1.scalar(13.37, 'float32'),
                x3: ops_1.tensor1d([true, false, false], 'bool'),
                y1: ops_1.tensor2d([-10, -20, -30], [3, 1], 'float32'),
            };
            tf.io.encodeWeights(tensors)
                .then(function (dataAndSpecs) {
                var data = dataAndSpecs.data;
                var specs = dataAndSpecs.specs;
                expect(data.byteLength).toEqual(4 * 4 + 4 * 1 + 1 * 3 + 4 * 3);
                var decoded = tf.io.decodeWeights(data, specs);
                expect(Object.keys(decoded).length).toEqual(4);
                test_util_1.expectArraysEqual(decoded['x1'], tensors['x1']);
                test_util_1.expectArraysEqual(decoded['x2'], tensors['x2']);
                test_util_1.expectArraysEqual(decoded['x3'], tensors['x3']);
                test_util_1.expectArraysEqual(decoded['y1'], tensors['y1']);
                done();
            })
                .catch(function (err) {
                console.error(err.stack);
            });
            return [2];
        });
    }); });
    it('Unsupported dtype raises Error', function () {
        var buffer = new ArrayBuffer(4);
        var specs = [
            {
                name: 'x',
                dtype: 'int16',
                shape: [],
            },
            { name: 'y', dtype: 'int16', shape: [] }
        ];
        expect(function () { return tf.io.decodeWeights(buffer, specs); })
            .toThrowError(/Unsupported dtype in weight \'x\': int16/);
    });
    it('support quantization uint8 weights', function () {
        var manifestSpecs = [
            {
                'name': 'weight0',
                'dtype': 'float32',
                'shape': [3],
                'quantization': { 'min': -1, 'scale': 0.1, 'dtype': 'uint8' }
            },
            {
                'name': 'weight1',
                'dtype': 'int32',
                'shape': [3],
                'quantization': { 'min': -1, 'scale': 0.1, 'dtype': 'uint8' }
            }
        ];
        var data = new Uint8Array([0, 48, 255, 0, 48, 255]);
        var decoded = tf.io.decodeWeights(data.buffer, manifestSpecs);
        var weight0 = decoded['weight0'];
        test_util_2.expectArraysClose(weight0, [-1, 3.8, 24.5]);
        expect(weight0.shape).toEqual([3]);
        expect(weight0.dtype).toEqual('float32');
        var weight1 = decoded['weight1'];
        test_util_1.expectArraysEqual(weight1, [-1, 4, 25]);
        expect(weight1.shape).toEqual([3]);
        expect(weight1.dtype).toEqual('int32');
    });
    it('support quantization uint16 weights', function () {
        var manifestSpecs = [
            {
                'name': 'weight0',
                'dtype': 'float32',
                'shape': [3],
                'quantization': { 'min': -1, 'scale': 0.1, 'dtype': 'uint16' }
            },
            {
                'name': 'weight1',
                'dtype': 'int32',
                'shape': [3],
                'quantization': { 'min': -1, 'scale': 0.1, 'dtype': 'uint16' }
            }
        ];
        var data = new Uint16Array([0, 48, 255, 0, 48, 255]);
        var decoded = tf.io.decodeWeights(data.buffer, manifestSpecs);
        var weight0 = decoded['weight0'];
        test_util_2.expectArraysClose(weight0, [-1, 3.8, 24.5]);
        expect(weight0.shape).toEqual([3]);
        expect(weight0.dtype).toEqual('float32');
        var weight1 = decoded['weight1'];
        test_util_1.expectArraysEqual(weight1, [-1, 4, 25]);
        expect(weight1.shape).toEqual([3]);
        expect(weight1.dtype).toEqual('int32');
    });
});
describe('stringByteLength', function () {
    it('ASCII only', function () {
        var str = '_Lorem ipsum 1337!';
        expect(io_utils_1.stringByteLength(str)).toEqual(str.length);
    });
    it('Mixed narrow and wide chars', function () {
        var str = 'aЖ文1';
        expect(io_utils_1.stringByteLength(str.slice(0, 1))).toEqual(1);
        expect(io_utils_1.stringByteLength(str.slice(0, 2))).toEqual(3);
        expect(io_utils_1.stringByteLength(str.slice(0, 3))).toEqual(6);
        expect(io_utils_1.stringByteLength(str.slice(0, 4))).toEqual(7);
    });
});
describe('arrayBufferToBase64String-base64StringToArrayBuffer', function () {
    it('Round trip', function () {
        var x = [];
        for (var k = 0; k < 2; ++k) {
            for (var i = 0; i < 254; ++i) {
                x.push(i + k);
            }
            for (var i = 254; i >= 0; --i) {
                x.push(i + k);
            }
        }
        var buffer = Uint8Array.from(x).buffer;
        var base64Str = io_utils_1.arrayBufferToBase64String(buffer);
        var decoded = Array.from(new Uint8Array(io_utils_1.base64StringToArrayBuffer(base64Str)));
        expect(decoded).toEqual(x);
    });
});
describe('concatenateArrayBuffers', function () {
    it('Concatenate 3 non-empty ArrayBuffers', function () {
        var buffer1 = new Uint8Array([1, 2, 3]);
        var buffer2 = new Uint8Array([11, 22, 33, 44]);
        var buffer3 = new Uint8Array([111, 222, 100]);
        var out = io_utils_1.concatenateArrayBuffers([buffer1.buffer, buffer2.buffer, buffer3.buffer]);
        expect(new Uint8Array(out)).toEqual(new Uint8Array([
            1, 2, 3, 11, 22, 33, 44, 111, 222, 100
        ]));
    });
    it('Concatenate non-empty and empty ArrayBuffers', function () {
        var buffer1 = new Uint8Array([1, 2, 3]);
        var buffer2 = new Uint8Array([11, 22, 33, 44]);
        var buffer3 = new Uint8Array([]);
        var buffer4 = new Uint8Array([150, 100, 50]);
        var out = io_utils_1.concatenateArrayBuffers([buffer1.buffer, buffer2.buffer, buffer3.buffer, buffer4.buffer]);
        expect(new Uint8Array(out)).toEqual(new Uint8Array([
            1, 2, 3, 11, 22, 33, 44, 150, 100, 50
        ]));
    });
    it('A single ArrayBuffer', function () {
        var buffer1 = new Uint8Array([1, 3, 3, 7]);
        var out = io_utils_1.concatenateArrayBuffers([buffer1.buffer]);
        expect(new Uint8Array(out)).toEqual(buffer1);
    });
    it('Zero ArrayBuffers', function () {
        expect(new Uint8Array(io_utils_1.concatenateArrayBuffers([])))
            .toEqual(new Uint8Array([]));
    });
});
describe('basename', function () {
    it('Paths without slashes', function () {
        expect(io_utils_1.basename('foo.txt')).toEqual('foo.txt');
        expect(io_utils_1.basename('bar')).toEqual('bar');
    });
    it('Paths with slashes', function () {
        expect(io_utils_1.basename('qux/foo.txt')).toEqual('foo.txt');
        expect(io_utils_1.basename('qux/My Model.json')).toEqual('My Model.json');
        expect(io_utils_1.basename('foo/bar/baz')).toEqual('baz');
        expect(io_utils_1.basename('/foo/bar/baz')).toEqual('baz');
        expect(io_utils_1.basename('foo/bar/baz/')).toEqual('baz');
        expect(io_utils_1.basename('foo/bar/baz//')).toEqual('baz');
    });
});
//# sourceMappingURL=io_utils_test.js.map