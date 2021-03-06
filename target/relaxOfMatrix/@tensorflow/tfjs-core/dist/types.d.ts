export interface ShapeMap {
    R0: number[];
    R1: [number];
    R2: [number, number];
    R3: [number, number, number];
    R4: [number, number, number, number];
    R5: [number, number, number, number, number];
    R6: [number, number, number, number, number, number];
}
export interface DataTypeMap {
    float32: Float32Array;
    int32: Int32Array;
    bool: Uint8Array;
    complex64: Float32Array;
    string: string[];
}
export interface SingleValueMap {
    bool: boolean;
    int32: number;
    float32: number;
    complex64: number;
    string: string;
}
export declare type DataType = keyof DataTypeMap;
export declare type NumericDataType = 'float32' | 'int32' | 'bool' | 'complex64';
export declare type TypedArray = Float32Array | Int32Array | Uint8Array;
export declare type DataValues = DataTypeMap[DataType];
export declare enum Rank {
    R0 = "R0",
    R1 = "R1",
    R2 = "R2",
    R3 = "R3",
    R4 = "R4",
    R5 = "R5",
    R6 = "R6"
}
export declare type FlatVector = boolean[] | number[] | TypedArray;
export declare type RegularArray<T> = T[] | T[][] | T[][][] | T[][][][] | T[][][][][] | T[][][][][][];
export interface RecursiveArray<T extends any> {
    [index: number]: T | RecursiveArray<T>;
}
export declare function upcastType(typeA: DataType, typeB: DataType): DataType;
export declare function sumOutType(type: DataType): DataType;
export declare type TensorLike = TypedArray | number | boolean | string | RegularArray<number> | RegularArray<boolean> | RegularArray<string>;
export declare type TensorLike1D = TypedArray | number[] | boolean[] | string[];
export declare type TensorLike2D = TypedArray | number[] | number[][] | boolean[] | boolean[][] | string[] | string[][];
export declare type TensorLike3D = TypedArray | number[] | number[][][] | boolean[] | boolean[][][] | string[] | string[][][];
export declare type TensorLike4D = TypedArray | number[] | number[][][][] | boolean[] | boolean[][][][] | string[] | string[][][][];
export declare type TensorLike5D = TypedArray | number[] | number[][][][][] | boolean[] | boolean[][][][][] | string[] | string[][][][][];
export declare type TensorLike6D = TypedArray | number[] | number[][][][][][] | boolean[] | boolean[][][][][][] | string[] | string[][][][][][];
