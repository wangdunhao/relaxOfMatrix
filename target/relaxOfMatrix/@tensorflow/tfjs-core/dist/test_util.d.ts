import { Features } from './environment_util';
import { Tensor } from './tensor';
import { TypedArray } from './types';
export declare const WEBGL_ENVS: Features;
export declare const NODE_ENVS: Features;
export declare const CHROME_ENVS: Features;
export declare const BROWSER_ENVS: Features;
export declare const CPU_ENVS: Features;
export declare const ALL_ENVS: Features;
export declare function expectArraysClose(actual: Tensor | TypedArray | number[], expected: Tensor | TypedArray | number[] | boolean[], epsilon?: number): void;
export interface DoneFn {
    (): void;
    fail: (message?: Error | string) => void;
}
export declare function expectPromiseToFail(fn: () => Promise<{}>, done: DoneFn): void;
export declare function expectArraysEqual(actual: Tensor | TypedArray | number[] | string[], expected: Tensor | TypedArray | number[] | boolean[] | string[]): void;
export declare function expectNumbersClose(a: number, e: number, epsilon?: number): void;
export declare function expectValuesInRange(actual: Tensor | TypedArray | number[], low: number, high: number): void;
export declare function expectArrayBuffersEqual(actual: ArrayBuffer, expected: ArrayBuffer): void;
