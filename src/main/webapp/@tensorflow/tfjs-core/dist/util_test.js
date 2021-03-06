"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tensor_util_env_1 = require("./tensor_util_env");
var util = require("./util");
describe('Util', function () {
    it('Correctly gets size from shape', function () {
        expect(util.sizeFromShape([1, 2, 3, 4])).toEqual(24);
    });
    it('Correctly identifies scalars', function () {
        expect(util.isScalarShape([])).toBe(true);
        expect(util.isScalarShape([1, 2])).toBe(false);
        expect(util.isScalarShape([1])).toBe(false);
    });
    it('Number arrays equal', function () {
        expect(util.arraysEqual([1, 2, 3, 6], [1, 2, 3, 6])).toBe(true);
        expect(util.arraysEqual([1, 2], [1, 2, 3])).toBe(false);
        expect(util.arraysEqual([1, 2, 5], [1, 2])).toBe(false);
    });
    it('Is integer', function () {
        expect(util.isInt(0.5)).toBe(false);
        expect(util.isInt(1)).toBe(true);
    });
    it('Size to squarish shape (perfect square)', function () {
        expect(util.sizeToSquarishShape(9)).toEqual([3, 3]);
    });
    it('Size to squarish shape (prime number)', function () {
        expect(util.sizeToSquarishShape(11)).toEqual([1, 11]);
    });
    it('Size to squarish shape (almost square)', function () {
        expect(util.sizeToSquarishShape(35)).toEqual([5, 7]);
    });
    it('Size of 1 to squarish shape', function () {
        expect(util.sizeToSquarishShape(1)).toEqual([1, 1]);
    });
    it('infer shape single number', function () {
        expect(tensor_util_env_1.inferShape(4)).toEqual([]);
    });
    it('infer shape 1d array', function () {
        expect(tensor_util_env_1.inferShape([1, 2, 5])).toEqual([3]);
    });
    it('infer shape 2d array', function () {
        expect(tensor_util_env_1.inferShape([[1, 2, 5], [5, 4, 1]])).toEqual([2, 3]);
    });
    it('infer shape 3d array', function () {
        var a = [[[1, 2], [2, 3], [5, 6]], [[5, 6], [4, 5], [1, 2]]];
        expect(tensor_util_env_1.inferShape(a)).toEqual([2, 3, 2]);
    });
    it('infer shape 4d array', function () {
        var a = [
            [[[1], [2]], [[2], [3]], [[5], [6]]], [[[5], [6]], [[4], [5]], [[1], [2]]]
        ];
        expect(tensor_util_env_1.inferShape(a)).toEqual([2, 3, 2, 1]);
    });
    it('infer shape of typed array', function () {
        var a = new Float32Array([1, 2, 3, 4, 5]);
        expect(tensor_util_env_1.inferShape(a)).toEqual([5]);
    });
});
describe('util.flatten', function () {
    it('nested number arrays', function () {
        expect(util.flatten([[1, 2, 3], [4, 5, 6]])).toEqual([1, 2, 3, 4, 5, 6]);
        expect(util.flatten([[[1, 2], [3, 4], [5, 6], [7, 8]]])).toEqual([
            1, 2, 3, 4, 5, 6, 7, 8
        ]);
        expect(util.flatten([1, 2, 3, 4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });
    it('nested string arrays', function () {
        expect(util.flatten([['a', 'b'], ['c', [['d']]]])).toEqual([
            'a', 'b', 'c', 'd'
        ]);
        expect(util.flatten([['a', ['b']], ['c', [['d']], 'e']])).toEqual([
            'a', 'b', 'c', 'd', 'e'
        ]);
    });
});
describe('util.bytesFromStringArray', function () {
    it('count each character as 2 bytes', function () {
        expect(util.bytesFromStringArray(['a', 'bb', 'ccc'])).toBe(6 * 2);
        expect(util.bytesFromStringArray(['a', 'bb', 'cccddd'])).toBe(9 * 2);
        expect(util.bytesFromStringArray(['даниел'])).toBe(6 * 2);
    });
});
describe('util.inferDtype', function () {
    it('a single string => string', function () {
        expect(util.inferDtype('hello')).toBe('string');
    });
    it('a single boolean => bool', function () {
        expect(util.inferDtype(true)).toBe('bool');
        expect(util.inferDtype(false)).toBe('bool');
    });
    it('a single number => float32', function () {
        expect(util.inferDtype(0)).toBe('float32');
        expect(util.inferDtype(34)).toBe('float32');
    });
    it('a list of strings => string', function () {
        expect(util.inferDtype(['a', 'b', 'c'])).toBe('string');
        expect(util.inferDtype([
            [['a']], [['b']], [['c']], [['d']]
        ])).toBe('string');
    });
    it('a list of bools => float32', function () {
        expect(util.inferDtype([false, true, false])).toBe('bool');
        expect(util.inferDtype([
            [[true]], [[false]], [[true]], [[true]]
        ])).toBe('bool');
    });
    it('a list of numbers => float32', function () {
        expect(util.inferDtype([0, 1, 2])).toBe('float32');
        expect(util.inferDtype([[[0]], [[1]], [[2]], [[3]]])).toBe('float32');
    });
});
describe('util.repeatedTry', function () {
    it('resolves', function (doneFn) {
        var counter = 0;
        var checkFn = function () {
            counter++;
            if (counter === 2) {
                return true;
            }
            return false;
        };
        util.repeatedTry(checkFn).then(doneFn).catch(function () {
            throw new Error('Rejected backoff.');
        });
    });
    it('rejects', function (doneFn) {
        var checkFn = function () { return false; };
        util.repeatedTry(checkFn, function () { return 0; }, 5)
            .then(function () {
            throw new Error('Backoff resolved');
        })
            .catch(doneFn);
    });
});
describe('util.inferFromImplicitShape', function () {
    it('empty shape', function () {
        var result = util.inferFromImplicitShape([], 0);
        expect(result).toEqual([]);
    });
    it('[2, 3, 4] -> [2, 3, 4]', function () {
        var result = util.inferFromImplicitShape([2, 3, 4], 24);
        expect(result).toEqual([2, 3, 4]);
    });
    it('[2, -1, 4] -> [2, 3, 4], size=24', function () {
        var result = util.inferFromImplicitShape([2, -1, 4], 24);
        expect(result).toEqual([2, 3, 4]);
    });
    it('[-1, 3, 4] -> [2, 3, 4], size=24', function () {
        var result = util.inferFromImplicitShape([-1, 3, 4], 24);
        expect(result).toEqual([2, 3, 4]);
    });
    it('[2, 3, -1] -> [2, 3, 4], size=24', function () {
        var result = util.inferFromImplicitShape([2, 3, -1], 24);
        expect(result).toEqual([2, 3, 4]);
    });
    it('[2, -1, -1] throws error', function () {
        expect(function () { return util.inferFromImplicitShape([2, -1, -1], 24); }).toThrowError();
    });
    it('[2, 3, -1] size=13 throws error', function () {
        expect(function () { return util.inferFromImplicitShape([2, 3, -1], 13); }).toThrowError();
    });
    it('[2, 3, 4] size=25 (should be 24) throws error', function () {
        expect(function () { return util.inferFromImplicitShape([2, 3, 4], 25); }).toThrowError();
    });
});
describe('util.squeezeShape', function () {
    it('scalar', function () {
        var _a = util.squeezeShape([]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([]);
        expect(keptDims).toEqual([]);
    });
    it('1x1 reduced to scalar', function () {
        var _a = util.squeezeShape([1, 1]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([]);
        expect(keptDims).toEqual([]);
    });
    it('1x3x1 reduced to [3]', function () {
        var _a = util.squeezeShape([1, 3, 1]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([3]);
        expect(keptDims).toEqual([1]);
    });
    it('1x1x4 reduced to [4]', function () {
        var _a = util.squeezeShape([1, 1, 4]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([4]);
        expect(keptDims).toEqual([2]);
    });
    it('2x3x4 not reduction', function () {
        var _a = util.squeezeShape([2, 3, 4]), newShape = _a.newShape, keptDims = _a.keptDims;
        expect(newShape).toEqual([2, 3, 4]);
        expect(keptDims).toEqual([0, 1, 2]);
    });
    describe('with axis', function () {
        it('should only reduce dimensions specified by axis', function () {
            var _a = util.squeezeShape([1, 1, 1, 1, 4], [1, 2]), newShape = _a.newShape, keptDims = _a.keptDims;
            expect(newShape).toEqual([1, 1, 4]);
            expect(keptDims).toEqual([0, 3, 4]);
        });
        it('throws error when specified axis is not squeezable', function () {
            expect(function () { return util.squeezeShape([1, 1, 2, 1, 4], [1, 2]); }).toThrowError();
        });
    });
});
describe('util.checkComputationForNaN', function () {
    it('Float32Array has NaN', function () {
        expect(function () { return util.checkComputationForNaN(new Float32Array([1, 2, 3, NaN, 4, 255]), 'float32', ''); })
            .toThrowError();
    });
    it('Float32Array no NaN', function () {
        expect(function () { return util.checkComputationForNaN(new Float32Array([1, 2, 3, 4, -1, 255]), 'float32', ''); })
            .not.toThrowError();
    });
});
describe('util.checkConversionForNaN', function () {
    it('Float32Array has NaN', function () {
        expect(function () { return util.checkConversionForNaN(new Float32Array([1, 2, 3, NaN, 4, 255]), 'float32'); })
            .not.toThrowError();
    });
    it('Int32Array has NaN', function () {
        expect(function () { return util.checkConversionForNaN([1, 2, 3, 4, NaN], 'int32'); })
            .toThrowError();
    });
});
describe('util.hasEncodingLoss', function () {
    it('complex64 to any', function () {
        expect(util.hasEncodingLoss('complex64', 'complex64')).toBe(false);
        expect(util.hasEncodingLoss('complex64', 'float32')).toBe(true);
        expect(util.hasEncodingLoss('complex64', 'int32')).toBe(true);
        expect(util.hasEncodingLoss('complex64', 'bool')).toBe(true);
    });
    it('any to complex64', function () {
        expect(util.hasEncodingLoss('bool', 'complex64')).toBe(false);
        expect(util.hasEncodingLoss('int32', 'complex64')).toBe(false);
        expect(util.hasEncodingLoss('float32', 'complex64')).toBe(false);
        expect(util.hasEncodingLoss('complex64', 'complex64')).toBe(false);
    });
    it('any to float32', function () {
        expect(util.hasEncodingLoss('bool', 'float32')).toBe(false);
        expect(util.hasEncodingLoss('int32', 'float32')).toBe(false);
        expect(util.hasEncodingLoss('float32', 'float32')).toBe(false);
        expect(util.hasEncodingLoss('complex64', 'float32')).toBe(true);
    });
    it('float32 to any', function () {
        expect(util.hasEncodingLoss('float32', 'float32')).toBe(false);
        expect(util.hasEncodingLoss('float32', 'int32')).toBe(true);
        expect(util.hasEncodingLoss('float32', 'bool')).toBe(true);
        expect(util.hasEncodingLoss('float32', 'complex64')).toBe(false);
    });
    it('int32 to lower', function () {
        expect(util.hasEncodingLoss('int32', 'int32')).toBe(false);
        expect(util.hasEncodingLoss('int32', 'bool')).toBe(true);
    });
    it('lower to int32', function () {
        expect(util.hasEncodingLoss('bool', 'int32')).toBe(false);
    });
    it('bool to bool', function () {
        expect(util.hasEncodingLoss('bool', 'bool')).toBe(false);
    });
});
//# sourceMappingURL=util_test.js.map