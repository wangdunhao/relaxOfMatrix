import { Tensor, Tensor2D } from '../tensor';
import { TensorLike } from '../types';
declare function logicalNot_<T extends Tensor>(x: T | TensorLike): T;
declare function logicalAnd_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;
declare function logicalOr_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;
declare function logicalXor_<T extends Tensor>(a: Tensor | TensorLike, b: Tensor | TensorLike): T;
declare function where_<T extends Tensor>(condition: Tensor | TensorLike, a: T | TensorLike, b: T | TensorLike): T;
declare function whereAsync_(condition: Tensor | TensorLike): Promise<Tensor2D>;
export declare const logicalAnd: typeof logicalAnd_;
export declare const logicalNot: typeof logicalNot_;
export declare const logicalOr: typeof logicalOr_;
export declare const logicalXor: typeof logicalXor_;
export declare const where: typeof where_;
export declare const whereAsync: typeof whereAsync_;
export {};
