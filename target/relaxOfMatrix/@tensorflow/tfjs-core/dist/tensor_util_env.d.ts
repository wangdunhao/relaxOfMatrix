import { Tensor } from './tensor';
import { DataType, TensorLike } from './types';
export declare function inferShape(val: TensorLike): number[];
export declare function convertToTensor<T extends Tensor>(x: T | TensorLike, argName: string, functionName: string, parseAsDtype?: DataType | 'numeric'): T;
export declare function convertToTensorArray<T extends Tensor>(arg: Array<T | TensorLike>, argName: string, functionName: string): T[];
