"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var environment_1 = require("./environment");
var tensor_1 = require("./tensor");
var util_1 = require("./util");
function inferShape(val) {
    var firstElem = val;
    if (util_1.isTypedArray(val)) {
        return [val.length];
    }
    if (!Array.isArray(val)) {
        return [];
    }
    var shape = [];
    while (firstElem instanceof Array) {
        shape.push(firstElem.length);
        firstElem = firstElem[0];
    }
    if (val instanceof Array && environment_1.ENV.get('TENSORLIKE_CHECK_SHAPE_CONSISTENCY')) {
        deepAssertShapeConsistency(val, shape, []);
    }
    return shape;
}
exports.inferShape = inferShape;
function deepAssertShapeConsistency(val, shape, indices) {
    indices = indices || [];
    if (!(val instanceof Array)) {
        util_1.assert(shape.length === 0, function () { return "Element arr[" + indices.join('][') + "] is a primitive, " +
            ("but should be an array of " + shape[0] + " elements"); });
        return;
    }
    util_1.assert(shape.length > 0, function () { return "Element arr[" + indices.join('][') + "] should be a primitive, " +
        ("but is an array of " + val.length + " elements"); });
    util_1.assert(val.length === shape[0], function () { return "Element arr[" + indices.join('][') + "] should have " + shape[0] + " " +
        ("elements, but has " + val.length + " elements"); });
    var subShape = shape.slice(1);
    for (var i = 0; i < val.length; ++i) {
        deepAssertShapeConsistency(val[i], subShape, indices.concat(i));
    }
}
function assertDtype(expectedDtype, actualDType, argName, functionName) {
    if (expectedDtype == null) {
        return;
    }
    if (expectedDtype !== 'numeric' && expectedDtype !== actualDType ||
        expectedDtype === 'numeric' && actualDType === 'string') {
        throw new Error("Argument '" + argName + "' passed to '" + functionName + "' must " +
            ("be " + expectedDtype + " tensor, but got " + actualDType + " tensor"));
    }
}
function convertToTensor(x, argName, functionName, parseAsDtype) {
    if (parseAsDtype === void 0) { parseAsDtype = 'numeric'; }
    if (x instanceof tensor_1.Tensor) {
        assertDtype(parseAsDtype, x.dtype, argName, functionName);
        return x;
    }
    var inferredDtype = util_1.inferDtype(x);
    if (inferredDtype !== 'string' &&
        ['bool', 'int32', 'float32'].indexOf(parseAsDtype) >= 0) {
        inferredDtype = parseAsDtype;
    }
    assertDtype(parseAsDtype, inferredDtype, argName, functionName);
    if (!util_1.isTypedArray(x) && !Array.isArray(x) && typeof x !== 'number' &&
        typeof x !== 'boolean' && typeof x !== 'string') {
        throw new Error("Argument '" + argName + "' passed to '" + functionName + "' must be a " +
            ("Tensor or TensorLike, but got '" + x.constructor.name + "'"));
    }
    var inferredShape = inferShape(x);
    if (!util_1.isTypedArray(x) && !Array.isArray(x)) {
        x = [x];
    }
    var values = inferredDtype !== 'string' ?
        util_1.toTypedArray(x, inferredDtype, environment_1.ENV.get('DEBUG')) :
        util_1.flatten(x);
    return tensor_1.Tensor.make(inferredShape, { values: values }, inferredDtype);
}
exports.convertToTensor = convertToTensor;
function convertToTensorArray(arg, argName, functionName) {
    if (!Array.isArray(arg)) {
        throw new Error("Argument " + argName + " passed to " + functionName + " must be a " +
            '`Tensor[]` or `TensorLike[]`');
    }
    var tensors = arg;
    return tensors.map(function (t, i) { return convertToTensor(t, argName + "[" + i + "]", functionName); });
}
exports.convertToTensorArray = convertToTensorArray;
//# sourceMappingURL=tensor_util_env.js.map