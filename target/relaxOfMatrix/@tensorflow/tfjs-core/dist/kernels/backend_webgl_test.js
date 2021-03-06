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
var test_util_1 = require("../test_util");
var backend_webgl_1 = require("./backend_webgl");
jasmine_util_1.describeWithFlags('lazy packing and unpacking', test_util_1.WEBGL_ENVS, function () {
    var webglLazilyUnpackFlagSaved;
    beforeAll(function () {
        webglLazilyUnpackFlagSaved = tf.ENV.get('WEBGL_LAZILY_UNPACK');
        tf.ENV.set('WEBGL_LAZILY_UNPACK', true);
    });
    afterAll(function () {
        tf.ENV.set('WEBGL_LAZILY_UNPACK', webglLazilyUnpackFlagSaved);
    });
    it('should not leak memory when lazily unpacking', function () {
        var a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
        var b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
        var c = tf.matMul(a, b);
        var startNumBytes = tf.memory().numBytes;
        var startNumTensors = tf.memory().numTensors;
        tf.add(c, 1);
        expect(tf.memory().numBytes - startNumBytes).toEqual(16);
        expect(tf.memory().numTensors - startNumTensors).toEqual(1);
    });
    it('should not leak memory when lazily packing', function () {
        var a = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
        var b = tf.tensor2d([0, 1, -3, 2, 2, 1], [3, 2]);
        var c = tf.add(a, 1);
        var startNumBytes = tf.memory().numBytes;
        var startNumTensors = tf.memory().numTensors;
        tf.matMul(b, c);
        expect(tf.memory().numBytes - startNumBytes).toEqual(36);
        expect(tf.memory().numTensors - startNumTensors).toEqual(1);
    });
    it('should work when the same input must be represented by' +
        'different textures', function () {
        var a = tf.tensor1d([1, 2]);
        var res = tf.dot(a, a);
        test_util_1.expectArraysClose(res, [5]);
    });
});
jasmine_util_1.describeWithFlags('backendWebGL', test_util_1.WEBGL_ENVS, function () {
    var prevBackend;
    beforeAll(function () {
        prevBackend = tf.getBackend();
    });
    afterEach(function () {
        tf.setBackend(prevBackend);
        tf.ENV.removeBackend('test-storage');
    });
    it('register empty string tensor', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var t = tf.Tensor.make([3], {}, 'string');
        expect(backend.readSync(t.dataId) == null).toBe(true);
    });
    it('register empty string tensor and write', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var t = tf.Tensor.make([3], {}, 'string');
        backend.write(t.dataId, ['c', 'a', 'b']);
        test_util_1.expectArraysEqual(backend.readSync(t.dataId), ['c', 'a', 'b']);
    });
    it('register string tensor with values', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var t = tf.Tensor.make([3], { values: ['a', 'b', 'c'] }, 'string');
        test_util_1.expectArraysEqual(backend.readSync(t.dataId), ['a', 'b', 'c']);
    });
    it('register string tensor with values and overwrite', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var t = tf.Tensor.make([3], { values: ['a', 'b', 'c'] }, 'string');
        backend.write(t.dataId, ['c', 'a', 'b']);
        test_util_1.expectArraysEqual(backend.readSync(t.dataId), ['c', 'a', 'b']);
    });
    it('register string tensor with values and wrong shape throws error', function () {
        var backend = new backend_webgl_1.MathBackendWebGL();
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        expect(function () { return tf.Tensor.make([4], { values: ['a', 'b', 'c'] }, 'string'); })
            .toThrowError();
    });
    it('delayed storage, reading', function () {
        var delayedStorage = true;
        var backend = new backend_webgl_1.MathBackendWebGL(null, delayedStorage);
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var texManager = backend.getTextureManager();
        var t = tf.Tensor.make([3], {}, 'float32');
        backend.write(t.dataId, new Float32Array([1, 2, 3]));
        expect(texManager.getNumUsedTextures()).toBe(0);
        backend.getTexture(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(1);
        test_util_1.expectArraysClose(backend.readSync(t.dataId), new Float32Array([1, 2, 3]));
        expect(texManager.getNumUsedTextures()).toBe(0);
        backend.getTexture(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(1);
        backend.disposeData(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(0);
    });
    it('delayed storage, overwriting', function () {
        var delayedStorage = true;
        var backend = new backend_webgl_1.MathBackendWebGL(null, delayedStorage);
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var texManager = backend.getTextureManager();
        var t = tf.Tensor.make([3], {}, 'float32');
        backend.write(t.dataId, new Float32Array([1, 2, 3]));
        backend.getTexture(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(1);
        backend.write(t.dataId, new Float32Array([4, 5, 6]));
        expect(texManager.getNumUsedTextures()).toBe(0);
        test_util_1.expectArraysClose(backend.readSync(t.dataId), new Float32Array([4, 5, 6]));
        backend.getTexture(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(1);
        test_util_1.expectArraysClose(backend.readSync(t.dataId), new Float32Array([4, 5, 6]));
        expect(texManager.getNumUsedTextures()).toBe(0);
    });
    it('immediate storage reading', function () {
        var delayedStorage = false;
        var backend = new backend_webgl_1.MathBackendWebGL(null, delayedStorage);
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var texManager = backend.getTextureManager();
        var t = tf.Tensor.make([3], {}, 'float32');
        backend.write(t.dataId, new Float32Array([1, 2, 3]));
        expect(texManager.getNumUsedTextures()).toBe(1);
        test_util_1.expectArraysClose(backend.readSync(t.dataId), new Float32Array([1, 2, 3]));
        expect(texManager.getNumUsedTextures()).toBe(1);
        backend.disposeData(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(0);
    });
    it('immediate storage overwriting', function () {
        var delayedStorage = false;
        var backend = new backend_webgl_1.MathBackendWebGL(null, delayedStorage);
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var texManager = backend.getTextureManager();
        var t = tf.Tensor.make([3], {}, 'float32');
        backend.write(t.dataId, new Float32Array([1, 2, 3]));
        expect(texManager.getNumUsedTextures()).toBe(1);
        backend.write(t.dataId, new Float32Array([4, 5, 6]));
        expect(texManager.getNumUsedTextures()).toBe(1);
        test_util_1.expectArraysClose(backend.readSync(t.dataId), new Float32Array([4, 5, 6]));
        expect(texManager.getNumUsedTextures()).toBe(1);
        backend.disposeData(t.dataId);
        expect(texManager.getNumUsedTextures()).toBe(0);
    });
    it('disposal of backend disposes all textures', function () {
        var delayedStorage = false;
        var backend = new backend_webgl_1.MathBackendWebGL(null, delayedStorage);
        var texManager = backend.getTextureManager();
        tf.ENV.registerBackend('test-storage', function () { return backend; });
        tf.setBackend('test-storage');
        var t = tf.Tensor.make([3], {}, 'float32');
        backend.write(t.dataId, new Float32Array([1, 2, 3]));
        var t2 = tf.Tensor.make([3], {}, 'float32');
        backend.write(t2.dataId, new Float32Array([4, 5, 6]));
        expect(texManager.getNumUsedTextures()).toBe(2);
        backend.dispose();
        expect(texManager.getNumUsedTextures()).toBe(0);
    });
});
jasmine_util_1.describeWithFlags('Custom window size', test_util_1.WEBGL_ENVS, function () {
    it('Set screen area to be 1x1', function () { return __awaiter(_this, void 0, void 0, function () {
        var oldBackend, a;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spyOnProperty(window, 'screen', 'get')
                        .and.returnValue({ height: 1, width: 1 });
                    oldBackend = tf.getBackend();
                    tf.ENV.registerBackend('custom-webgl', function () { return new backend_webgl_1.MathBackendWebGL(); });
                    tf.setBackend('custom-webgl');
                    a = tf.ones([100, 100]);
                    expect(tf.memory().numBytesInGPU).toBe(0);
                    return [4, a.square().data()];
                case 1:
                    _a.sent();
                    expect(tf.memory().numBytesInGPU).toBe(0);
                    test_util_1.expectArraysEqual(a, new Float32Array(100 * 100).fill(1));
                    tf.setBackend(oldBackend);
                    tf.ENV.removeBackend('custom-webgl');
                    return [2];
            }
        });
    }); });
});
var FLOAT32_WEBGL_ENVS = Object.assign({
    'WEBGL_RENDER_FLOAT32_ENABLED': true,
    'WEBGL_SIZE_UPLOAD_UNIFORM': backend_webgl_1.SIZE_UPLOAD_UNIFORM
}, test_util_1.WEBGL_ENVS);
jasmine_util_1.describeWithFlags('upload tensors as uniforms', FLOAT32_WEBGL_ENVS, function () {
    it('small tensor gets uploaded as scalar', function () {
        var m = tf.memory();
        expect(m.numBytesInGPU).toBe(0);
        var a = tf.zeros([backend_webgl_1.SIZE_UPLOAD_UNIFORM - 1]);
        a.square();
        m = tf.memory();
        expect(m.numBytesInGPU).toBe(a.size * 4);
    });
    it('large tensor gets uploaded to gpu', function () {
        var m = tf.memory();
        expect(m.numBytesInGPU).toBe(0);
        var a = tf.zeros([backend_webgl_1.SIZE_UPLOAD_UNIFORM + 1]);
        a.square();
        m = tf.memory();
        expect(m.numBytesInGPU).toBe(a.size * 4 * 2);
    });
    it('download and re-upload an output of a shader', function () {
        var vals = new Float32Array(backend_webgl_1.SIZE_UPLOAD_UNIFORM + 1);
        vals.fill(2);
        var a = tf.square(vals);
        a.dataSync();
        var res = a.square();
        var expected = new Float32Array(backend_webgl_1.SIZE_UPLOAD_UNIFORM + 1);
        expected.fill(16);
        test_util_1.expectArraysClose(res, expected);
    });
});
//# sourceMappingURL=backend_webgl_test.js.map