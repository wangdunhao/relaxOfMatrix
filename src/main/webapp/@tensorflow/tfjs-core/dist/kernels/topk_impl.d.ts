import { Tensor } from '../tensor';
import { NumericDataType, TypedArray } from '../types';
export declare function topkImpl<T extends Tensor>(x: TypedArray, xShape: number[], xDtype: NumericDataType, k: number, sorted: boolean): [T, T];
