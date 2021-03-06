"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tf = require("../index");
var jasmine_util_1 = require("../jasmine_util");
var test_util_1 = require("../test_util");
jasmine_util_1.describeWithFlags('1D FFT', test_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2 elements)', function () {
        var t1Real = tf.tensor1d([1, 2]);
        var t1Imag = tf.tensor1d([1, 1]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.fft(t1), [3, 2, -1, 0]);
    });
    it('should calculate FFT from Tensor directly', function () {
        var t1Real = tf.tensor1d([1, 2]);
        var t1Imag = tf.tensor1d([1, 1]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(t1.fft(), [3, 2, -1, 0]);
    });
    it('should return the same value as TensorFlow (3 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3]);
        var t1Imag = tf.tensor1d([0, 0, 0]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.fft(t1), [6, 0, -1.5, 0.866025, -1.5, -0.866025]);
    });
    it('should return the same value as TensorFlow with imaginary (3 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3]);
        var t1Imag = tf.tensor1d([1, 2, 3]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.fft(t1), [6, 6, -2.3660252, -0.63397473, -0.6339747, -2.3660254]);
    });
    it('should return the same value as TensorFlow (negative 3 elements)', function () {
        var t1Real = tf.tensor1d([-1, -2, -3]);
        var t1Imag = tf.tensor1d([-1, -2, -3]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.fft(t1), [-5.9999995, -6, 2.3660252, 0.63397473, 0.6339747, 2.3660254]);
    });
    it('should return the same value with TensorFlow (4 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3, 4]);
        var t1Imag = tf.tensor1d([0, 0, 0, 0]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.fft(t1), [10, 0, -2, 2, -2, 0, -2, -2]);
    });
    it('should return the same value as TensorFlow with imaginary (4 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3, 4]);
        var t1Imag = tf.tensor1d([1, 2, 3, 4]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.fft(t1), [10, 10, -4, 0, -2, -2, 0, -4]);
    });
});
jasmine_util_1.describeWithFlags('2D FFT', test_util_1.ALL_ENVS, function () {
    it('2D: should return the same value as TensorFlow', function () {
        var t1Real = tf.tensor2d([1, 2, 3, 4], [2, 2]);
        var t1Imag = tf.tensor2d([5, 6, 7, 8], [2, 2]);
        var t1 = tf.complex(t1Real, t1Imag);
        var y = tf.spectral.fft(t1);
        test_util_1.expectArraysClose(y, [3, 11, -1, -1, 7, 15, -1, -1]);
        expect(y.shape).toEqual(t1Real.shape);
    });
    it('3D: should return the same value as TensorFlow', function () {
        var t1Real = tf.tensor3d([1, 2, 3, 4, -1, -2, -3, -4], [2, 2, 2]);
        var t1Imag = tf.tensor3d([5, 6, 7, 8, -5, -6, -7, -8], [2, 2, 2]);
        var t1 = tf.complex(t1Real, t1Imag);
        var y = tf.spectral.fft(t1);
        test_util_1.expectArraysClose(y, [3, 11, -1, -1, 7, 15, -1, -1, -3, -11, 1, 1, -7, -15, 1, 1]);
        expect(y.shape).toEqual(t1Real.shape);
    });
});
jasmine_util_1.describeWithFlags('1D IFFT', test_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2 elements)', function () {
        var t1Real = tf.tensor1d([1, 2]);
        var t1Imag = tf.tensor1d([1, 1]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.ifft(t1), [1.5, 1, -0.5, 0]);
    });
    it('should calculate FFT from Tensor directly', function () {
        var t1Real = tf.tensor1d([1, 2]);
        var t1Imag = tf.tensor1d([1, 1]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(t1.ifft(), [1.5, 1, -0.5, 0]);
    });
    it('should return the same value as TensorFlow (3 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3]);
        var t1Imag = tf.tensor1d([0, 0, 0]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.ifft(t1), [
            2, -3.9736431e-08, -0.49999997, -.28867507, -0.49999994, 2.8867519e-01
        ]);
    });
    it('should return the same value as TensorFlow with imaginary (3 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3]);
        var t1Imag = tf.tensor1d([1, 2, 3]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.ifft(t1), [2, 1.9999999, -0.21132492, -0.78867507, -0.7886752, -0.2113249]);
    });
    it('should return the same value as TensorFlow (negative 3 elements)', function () {
        var t1Real = tf.tensor1d([-1, -2, -3]);
        var t1Imag = tf.tensor1d([-1, -2, -3]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.ifft(t1), [-2, -1.9999999, 0.21132492, 0.78867507, 0.7886752, 0.2113249]);
    });
    it('should return the same value with TensorFlow (4 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3, 4]);
        var t1Imag = tf.tensor1d([0, 0, 0, 0]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.ifft(t1), [2.5, 0, -0.5, -0.5, -0.5, 0, -0.5, 0.5]);
    });
    it('should return the same value as TensorFlow with imaginary (4 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3, 4]);
        var t1Imag = tf.tensor1d([1, 2, 3, 4]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.ifft(t1), [2.5, 2.5, 0, -1, -0.5, -0.5, -1, 0]);
    });
});
jasmine_util_1.describeWithFlags('2D IFFT', test_util_1.ALL_ENVS, function () {
    it('2D: should return the same value as TensorFlow', function () {
        var t1Real = tf.tensor2d([1, 2, 3, 4], [2, 2]);
        var t1Imag = tf.tensor2d([5, 6, 7, 8], [2, 2]);
        var t1 = tf.complex(t1Real, t1Imag);
        var y = tf.spectral.ifft(t1);
        test_util_1.expectArraysClose(y, [1.5, 5.5, -0.5, -0.5, 3.5, 7.5, -0.5, -0.5]);
        expect(y.shape).toEqual(t1Real.shape);
    });
    it('3D: should return the same value as TensorFlow', function () {
        var t1Real = tf.tensor3d([1, 2, 3, 4, -1, -2, -3, -4], [2, 2, 2]);
        var t1Imag = tf.tensor3d([5, 6, 7, 8, -5, -6, -7, -8], [2, 2, 2]);
        var t1 = tf.complex(t1Real, t1Imag);
        var y = tf.spectral.ifft(t1);
        test_util_1.expectArraysClose(y, [
            1.5, 5.5, -0.5, -0.5, 3.5, 7.5, -0.5, -0.5, -1.5, -5.5, 0.5, 0.5, -3.5,
            -7.5, 0.5, 0.5
        ]);
        expect(y.shape).toEqual(t1Real.shape);
    });
});
jasmine_util_1.describeWithFlags('1D RFFT', test_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (3 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3]);
        test_util_1.expectArraysClose(tf.spectral.rfft(t1Real), [6, 1.1920929e-07, -1.4999999, 8.6602521e-01]);
    });
    it('should return the same value with TensorFlow (6 elements)', function () {
        var t1Real = tf.tensor1d([-3, -2, -1, 1, 2, 3]);
        test_util_1.expectArraysClose(tf.spectral.rfft(t1Real), [
            -5.8859587e-07, 1.1920929e-07, -3.9999995, 6.9282026e+00, -2.9999998,
            1.7320497, -4.0000000, -2.3841858e-07
        ]);
    });
});
jasmine_util_1.describeWithFlags('2D RFFT', test_util_1.WEBGL_ENVS, function () {
    it('should return the same value with TensorFlow (2x2 elements)', function () {
        var t1Real = tf.tensor2d([1, 2, 3, 4], [2, 2]);
        test_util_1.expectArraysClose(tf.spectral.rfft(t1Real), [3, 0, -1, 0, 7, 0, -1, 0]);
    });
    it('should return the same value with TensorFlow (2x3 elements)', function () {
        var t1Real = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
        test_util_1.expectArraysClose(tf.spectral.rfft(t1Real), [
            6, 1.1920929e-07, -1.4999999, 8.6602521e-01, 15, -5.9604645e-08,
            -1.4999998, 8.6602545e-01
        ]);
    });
    it('should return the same value with TensorFlow (2x2x2 elements)', function () {
        var t1Real = tf.tensor3d([1, 2, 3, 4, 5, 6, 7, 8], [2, 2, 2]);
        test_util_1.expectArraysClose(tf.spectral.rfft(t1Real), [3, 0, -1, 0, 7, 0, -1, 0, 11, 0, -1, 0, 15, 0, -1, 0]);
    });
});
jasmine_util_1.describeWithFlags('1D IRFFT', test_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2 elements)', function () {
        var t1Real = tf.tensor1d([1, 2]);
        var t1Imag = tf.tensor1d([0, 0]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.irfft(t1), [1.5, -0.5]);
    });
    it('should return the same value with TensorFlow (5 elements)', function () {
        var t1Real = tf.tensor1d([1, 2, 3, 4, 5]);
        var t1Imag = tf.tensor1d([0, 0, 0, 0, 0]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.irfft(t1), [3, -0.8535534, 0, -0.14644662, 0, -0.14644662, 0, -0.8535534]);
    });
    it('should return the same value with TensorFlow (5 elements) with imag', function () {
        var t1Real = tf.tensor1d([1, 2, 3, 4, 5]);
        var t1Imag = tf.tensor1d([1, 2, 3, 4, 5]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.irfft(t1), [3, -2.6642137, 0.5, -0.45710677, 0, 0.16421354, -0.5, 0.95710677]);
    });
});
jasmine_util_1.describeWithFlags('2D IRFFT', test_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2x2 elements)', function () {
        var t1Real = tf.tensor2d([1, 2, 3, 4], [2, 2]);
        var t1Imag = tf.tensor2d([0, 0, 0, 0], [2, 2]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.irfft(t1), [1.5, -0.5, 3.5, -0.5]);
    });
    it('should return the same value with TensorFlow (2x3 elements)', function () {
        var t1Real = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
        var t1Imag = tf.tensor2d([0, 0, 0, 0, 0, 0], [2, 3]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.irfft(t1), [2, -0.5, 0, -0.5, 5, -0.5, 0, -0.5]);
    });
    it('should return the same value with TensorFlow (2x3 elements) with imag', function () {
        var t1Real = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
        var t1Imag = tf.tensor2d([1, 2, 3, 4, 5, 6], [2, 3]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.irfft(t1), [2, -1.5, 0, 0.5, 5, -3, 0, 2]);
    });
});
jasmine_util_1.describeWithFlags('3D IRFFT', test_util_1.ALL_ENVS, function () {
    it('should return the same value with TensorFlow (2x2x2 elements)', function () {
        var t1Real = tf.tensor3d([1, 2, 3, 4, 1, 2, 3, 4], [2, 2, 2]);
        var t1Imag = tf.tensor3d([0, 0, 0, 0, 0, 0, 0, 0], [2, 2, 2]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.irfft(t1), [1.5, -0.5, 3.5, -0.5, 1.5, -0.5, 3.5, -0.5]);
    });
    it('should return the same value with TensorFlow (2x2x3 elements)', function () {
        var t1Real = tf.tensor3d([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6], [2, 2, 3]);
        var t1Imag = tf.tensor3d([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [2, 2, 3]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.irfft(t1), [
            2, -0.5, 0, -0.5, 5, -0.5, 0, -0.5, 2, -0.5, 0, -0.5, 5, -0.5, 0, -0.5
        ]);
    });
    it('should return the same value with TensorFlow (2x2x3 elements) with imag', function () {
        var t1Real = tf.tensor3d([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6], [2, 2, 3]);
        var t1Imag = tf.tensor3d([1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6], [2, 2, 3]);
        var t1 = tf.complex(t1Real, t1Imag);
        test_util_1.expectArraysClose(tf.spectral.irfft(t1), [2, -1.5, 0, 0.5, 5, -3, 0, 2, 2, -1.5, 0, 0.5, 5, -3, 0, 2]);
    });
});
//# sourceMappingURL=spectral_ops_test.js.map