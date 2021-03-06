import { DataType, DataTypeMap, DataValues, NumericDataType, Rank, ShapeMap, SingleValueMap, TensorLike, TensorLike1D, TensorLike3D, TensorLike4D, TypedArray } from './types';
export interface TensorData<D extends DataType> {
    dataId?: DataId;
    values?: DataTypeMap[D];
}
export declare class TensorBuffer<R extends Rank, D extends DataType = 'float32'> {
    dtype: D;
    size: number;
    shape: ShapeMap[R];
    strides: number[];
    values: DataTypeMap[D];
    constructor(shape: ShapeMap[R], dtype: D, values?: DataTypeMap[D]);
    set(value: SingleValueMap[D], ...locs: number[]): void;
    get(...locs: number[]): SingleValueMap[D];
    locToIndex(locs: number[]): number;
    indexToLoc(index: number): number[];
    readonly rank: number;
    toTensor(): Tensor<R>;
}
export interface TensorTracker {
    registerTensor(t: Tensor): void;
    disposeTensor(t: Tensor): void;
    write(dataId: DataId, values: DataValues): void;
    read(dataId: DataId): Promise<DataValues>;
    readSync(dataId: DataId): DataValues;
    registerVariable(v: Variable): void;
    nextTensorId(): number;
    nextVariableId(): number;
}
export interface OpHandler {
    cast<T extends Tensor>(x: T, dtype: DataType): T;
    buffer<R extends Rank, D extends DataType>(shape: ShapeMap[R], dtype: D, values?: DataTypeMap[D]): TensorBuffer<R, D>;
    print<T extends Tensor>(x: T, verbose: boolean): void;
    reshape<R2 extends Rank>(x: Tensor, shape: ShapeMap[R2]): Tensor<R2>;
    expandDims<R2 extends Rank>(x: Tensor, axis: number): Tensor<R2>;
    cumsum<T extends Tensor>(x: Tensor, axis: number, exclusive: boolean, reverse: boolean): T;
    squeeze<T extends Tensor>(x: Tensor, axis?: number[]): T;
    clone<T extends Tensor>(x: T): T;
    tile<T extends Tensor>(x: T, reps: number[]): T;
    gather<T extends Tensor>(x: T, indices: Tensor1D | TensorLike1D, axis: number): T;
    matMul<T extends Tensor>(a: T, b: T | TensorLike, transposeA: boolean, transposeB: boolean): T;
    dot(t1: Tensor, t2: Tensor | TensorLike): Tensor;
    norm(x: Tensor, ord: number | 'euclidean' | 'fro', axis: number | number[], keepDims: boolean): Tensor;
    slice<R extends Rank, T extends Tensor<R>>(x: T, begin: number | number[], size?: number | number[]): T;
    split<T extends Tensor>(x: T, numOrSizeSplits: number[] | number, axis?: number): T[];
    reverse<T extends Tensor>(x: T, axis?: number | number[]): T;
    concat<T extends Tensor>(tensors: Array<T | TensorLike>, axis: number): T;
    stack<T extends Tensor>(tensors: Array<T | TensorLike>, axis: number): Tensor;
    unstack<T extends Tensor>(value: T, axis: number): Tensor[];
    pad<T extends Tensor>(x: T, paddings: Array<[number, number]>, constantValue: number): T;
    batchNormalization<R extends Rank>(x: Tensor<R>, mean: Tensor<R> | Tensor1D | TensorLike, variance: Tensor<R> | Tensor1D | TensorLike, varianceEpsilon: number, scale?: Tensor<R> | Tensor1D | TensorLike, offset?: Tensor<R> | Tensor1D | TensorLike): Tensor<R>;
    all<T extends Tensor>(x: Tensor, axis: number | number[], keepDims: boolean): T;
    any<T extends Tensor>(x: Tensor, axis: number | number[], keepDims: boolean): T;
    logSumExp<T extends Tensor>(x: Tensor, axis: number | number[], keepDims: boolean): T;
    sum<T extends Tensor>(x: Tensor, axis: number | number[], keepDims: boolean): T;
    prod<T extends Tensor>(x: Tensor, axis: number | number[], keepDims: boolean): T;
    mean<T extends Tensor>(x: Tensor, axis: number | number[], keepDims: boolean): T;
    min<T extends Tensor>(x: Tensor, axis: number | number[], keepDims: boolean): T;
    max<T extends Tensor>(x: Tensor, axis: number | number[], keepDims: boolean): T;
    argMin<T extends Tensor>(x: Tensor, axis: number): T;
    argMax<T extends Tensor>(x: Tensor, axis: number): T;
    add<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    addStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    atan2<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    sub<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    subStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    pow<T extends Tensor>(base: T, exp: Tensor | TensorLike): T;
    powStrict<T extends Tensor>(base: T, exp: Tensor | TensorLike): T;
    mul<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    mulStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    div<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    floorDiv<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    divStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    mod<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    modStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    minimum<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    minimumStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    maximum<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    maximumStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    squaredDifference<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    squaredDifferenceStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    transpose<T extends Tensor>(x: T, perm?: number[]): T;
    logicalNot<T extends Tensor>(x: T): T;
    logicalAnd<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    logicalOr<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    logicalXor<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    where<T extends Tensor>(condition: Tensor | TensorLike, a: T, b: T | TensorLike): T;
    notEqual<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    notEqualStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    less<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    lessStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    equal<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    equalStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    lessEqual<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    lessEqualStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    greater<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    greaterStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    greaterEqual<T extends Tensor>(a: Tensor, b: Tensor | TensorLike): T;
    greaterEqualStrict<T extends Tensor>(a: T, b: T | TensorLike): T;
    neg<T extends Tensor>(x: T): T;
    ceil<T extends Tensor>(x: T): T;
    floor<T extends Tensor>(x: T): T;
    sign<T extends Tensor>(x: T): T;
    round<T extends Tensor>(x: T): T;
    exp<T extends Tensor>(x: T): T;
    expm1<T extends Tensor>(x: T): T;
    log<T extends Tensor>(x: T): T;
    log1p<T extends Tensor>(x: T): T;
    sqrt<T extends Tensor>(x: T): T;
    rsqrt<T extends Tensor>(x: T): T;
    square<T extends Tensor>(x: T): T;
    reciprocal<T extends Tensor>(x: T): T;
    abs<T extends Tensor>(x: T): T;
    clipByValue<T extends Tensor>(x: T, clipValueMin: number, clipValueMax: number): T;
    sigmoid<T extends Tensor>(x: T): T;
    logSigmoid<T extends Tensor>(x: T): T;
    softplus<T extends Tensor>(x: T): T;
    zerosLike<T extends Tensor>(x: T): T;
    onesLike<T extends Tensor>(x: T): T;
    sin<T extends Tensor>(x: T): T;
    cos<T extends Tensor>(x: T): T;
    tan<T extends Tensor>(x: T): T;
    asin<T extends Tensor>(x: T): T;
    acos<T extends Tensor>(x: T): T;
    atan<T extends Tensor>(x: T): T;
    sinh<T extends Tensor>(x: T): T;
    cosh<T extends Tensor>(x: T): T;
    tanh<T extends Tensor>(x: T): T;
    asinh<T extends Tensor>(x: T): T;
    acosh<T extends Tensor>(x: T): T;
    atanh<T extends Tensor>(x: T): T;
    erf<T extends Tensor>(x: T): T;
    step<T extends Tensor>(x: T, alpha: number): T;
    relu<T extends Tensor>(x: T): T;
    elu<T extends Tensor>(x: T): T;
    selu<T extends Tensor>(x: T): T;
    leakyRelu<T extends Tensor>(x: T, alpha: number): T;
    prelu<T extends Tensor>(x: T, alpha: T | TensorLike): T;
    softmax<T extends Tensor>(logits: T, dim: number): T;
    logSoftmax<T extends Tensor>(logits: T, axis: number): T;
    image: {
        resizeBilinear<T extends Tensor3D | Tensor4D>(images: T, size: [number, number], alignCorners: boolean): T;
        resizeNearestNeighbor<T extends Tensor3D | Tensor4D>(images: T, size: [number, number], alignCorners: boolean): T;
    };
    conv1d<T extends Tensor2D | Tensor3D>(x: T, filter: Tensor3D | TensorLike3D, stride: number, pad: 'valid' | 'same' | number, dataFormat: 'NWC' | 'NCW', dilation: number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    conv2d<T extends Tensor3D | Tensor4D>(x: T, filter: Tensor4D | TensorLike4D, strides: [number, number] | number, pad: 'valid' | 'same' | number, dataFormat: 'NHWC' | 'NCHW', dilations: [number, number] | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    conv2dTranspose<T extends Tensor3D | Tensor4D>(x: T, filter: Tensor4D | TensorLike4D, outputShape: [number, number, number, number] | [number, number, number], strides: [number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    depthwiseConv2d<T extends Tensor3D | Tensor4D>(x: T, filter: Tensor4D | TensorLike4D, strides: [number, number] | number, pad: 'valid' | 'same' | number, dataFormat: 'NHWC' | 'NCHW', dilations: [number, number] | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    separableConv2d<T extends Tensor3D | Tensor4D>(x: T | TensorLike, depthwiseFilter: Tensor4D | TensorLike4D, pointwiseFilter: Tensor4D | TensorLike, strides: [number, number] | number, pad: 'valid' | 'same', dilation: [number, number] | number, dataFormat: 'NHWC' | 'NCHW'): T;
    maxPool<T extends Tensor3D | Tensor4D>(x: T, filterSize: [number, number] | number, strides: [number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    avgPool<T extends Tensor3D | Tensor4D>(x: T, filterSize: [number, number] | number, strides: [number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    pool<T extends Tensor3D | Tensor4D>(input: T, windowShape: [number, number] | number, poolingType: 'avg' | 'max', padding: 'valid' | 'same' | number, diationRate?: [number, number] | number, strides?: [number, number] | number): T;
    localResponseNormalization<T extends Tensor3D | Tensor4D>(x: T, depthRadius: number, bias: number, alpha: number, beta: number): T;
    unsortedSegmentSum<T extends Tensor>(x: T, segmentIds: Tensor1D | TensorLike1D, numSegments: number): T;
    batchToSpaceND<T extends Tensor>(x: T, blockShape: number[], crops: number[][]): T;
    spaceToBatchND<T extends Tensor>(x: T, blockShape: number[], paddings: number[][]): T;
    topk<T extends Tensor>(x: T, k: number, sorted: boolean): {
        values: T;
        indices: T;
    };
    stridedSlice<T extends Tensor>(x: T, begin: number[], end: number[], strides: number[], beginMask: number, endMask: number): T;
    depthToSpace(x: Tensor4D, blockSize: number, dataFormat: string): Tensor4D;
    spectral: {
        fft(x: Tensor): Tensor;
        ifft(x: Tensor): Tensor;
    };
}
export declare function setTensorTracker(fn: () => TensorTracker): void;
export declare function setOpHandler(handler: OpHandler): void;
export declare type DataId = object;
export declare class Tensor<R extends Rank = Rank> {
    readonly id: number;
    dataId: DataId;
    readonly shape: ShapeMap[R];
    readonly size: number;
    readonly dtype: DataType;
    readonly rankType: R;
    readonly strides: number[];
    protected constructor(shape: ShapeMap[R], dtype: DataType, values?: DataValues, dataId?: DataId);
    static make<T extends Tensor<R>, D extends DataType = 'float32', R extends Rank = Rank>(shape: ShapeMap[R], data: TensorData<D>, dtype?: D): T;
    flatten(): Tensor1D;
    asScalar(): Scalar;
    as1D(): Tensor1D;
    as2D(rows: number, columns: number): Tensor2D;
    as3D(rows: number, columns: number, depth: number): Tensor3D;
    as4D(rows: number, columns: number, depth: number, depth2: number): Tensor4D;
    asType<T extends this>(this: T, dtype: DataType): T;
    readonly rank: number;
    get(...locs: number[]): number;
    buffer<D extends DataType>(): TensorBuffer<R, D>;
    data<D extends DataType = NumericDataType>(): Promise<DataTypeMap[D]>;
    dataSync<D extends DataType = NumericDataType>(): DataTypeMap[D];
    dispose(): void;
    private isDisposedInternal;
    readonly isDisposed: boolean;
    private throwIfDisposed;
    toFloat<T extends this>(this: T): T;
    toInt(): this;
    toBool(): this;
    print(verbose?: boolean): void;
    reshape<R2 extends Rank>(newShape: ShapeMap[R2]): Tensor<R2>;
    reshapeAs<T extends Tensor>(x: T): T;
    expandDims<R2 extends Rank>(axis?: number): Tensor<R2>;
    cumsum<T extends Tensor>(axis?: number, exclusive?: boolean, reverse?: boolean): T;
    squeeze<T extends Tensor>(axis?: number[]): T;
    clone<T extends Tensor>(this: T): T;
    toString(verbose?: boolean): string;
    tile<T extends this>(this: T, reps: number[]): T;
    gather<T extends this>(this: T, indices: Tensor1D | TensorLike1D, axis?: number): T;
    matMul<T extends Tensor>(this: T, b: T | TensorLike, transposeA?: boolean, transposeB?: boolean): T;
    dot(b: Tensor | TensorLike): Tensor;
    norm(ord?: number | 'euclidean' | 'fro', axis?: number | number[], keepDims?: boolean): Tensor;
    slice<T extends Tensor<R>>(this: T, begin: number | number[], size?: number | number[]): T;
    reverse<T extends Tensor>(this: T, axis?: number | number[]): T;
    concat<T extends Tensor>(this: T, x: T | Array<T | TensorLike>, axis?: number): T;
    split<T extends Tensor>(this: T, numOrSizeSplits: number[] | number, axis?: number): T[];
    stack(x: Tensor, axis?: number): Tensor;
    unstack(x: Tensor, axis?: number): Tensor[];
    pad<T extends Tensor>(this: T, paddings: Array<[number, number]>, constantValue?: number): T;
    batchNormalization(mean: Tensor<R> | Tensor1D | TensorLike, variance: Tensor<R> | Tensor1D | TensorLike, varianceEpsilon?: number, scale?: Tensor<R> | Tensor1D | TensorLike, offset?: Tensor<R> | Tensor1D | TensorLike): Tensor<R>;
    all<T extends Tensor>(axis?: number | number[], keepDims?: boolean): T;
    any<T extends Tensor>(axis?: number | number[], keepDims?: boolean): T;
    logSumExp<T extends Tensor>(axis?: number | number[], keepDims?: boolean): T;
    sum<T extends Tensor>(axis?: number | number[], keepDims?: boolean): T;
    prod<T extends Tensor>(axis?: number | number[], keepDims?: boolean): T;
    mean<T extends Tensor>(axis?: number | number[], keepDims?: boolean): T;
    min<T extends Tensor>(axis?: number | number[], keepDims?: boolean): T;
    max<T extends Tensor>(axis?: number | number[], keepDims?: boolean): T;
    argMin<T extends Tensor>(axis?: number): T;
    argMax<T extends Tensor>(axis?: number): T;
    cast<T extends this>(dtype: DataType): T;
    add<T extends Tensor>(x: Tensor | TensorLike): T;
    addStrict<T extends this>(this: T, x: T | TensorLike): T;
    atan2<T extends this>(this: T, x: T | TensorLike): T;
    sub<T extends Tensor>(x: Tensor | TensorLike): T;
    subStrict<T extends this>(this: T, x: T | TensorLike): T;
    pow<T extends Tensor>(this: T, exp: Tensor | TensorLike): T;
    powStrict(exp: Tensor | TensorLike): Tensor<R>;
    mul<T extends Tensor>(x: Tensor | TensorLike): T;
    mulStrict<T extends this>(this: T, x: T | TensorLike): T;
    div<T extends Tensor>(x: Tensor | TensorLike): T;
    floorDiv<T extends Tensor>(x: Tensor | TensorLike): T;
    divStrict<T extends this>(this: T, x: T | TensorLike): T;
    minimum<T extends Tensor>(x: Tensor | TensorLike): T;
    minimumStrict<T extends this>(this: T, x: T | TensorLike): T;
    maximum<T extends Tensor>(x: Tensor | TensorLike): T;
    maximumStrict<T extends this>(this: T, x: T | TensorLike): T;
    mod<T extends Tensor>(x: Tensor | TensorLike): T;
    modStrict<T extends this>(this: T, x: T | TensorLike): T;
    squaredDifference<T extends Tensor>(x: Tensor | TensorLike): T;
    squaredDifferenceStrict<T extends this>(this: T, x: T | TensorLike): T;
    transpose<T extends Tensor>(this: T, perm?: number[]): T;
    notEqual<T extends Tensor>(x: Tensor | TensorLike): T;
    notEqualStrict<T extends this>(this: T, x: T | TensorLike): T;
    less<T extends Tensor>(x: Tensor | TensorLike): T;
    lessStrict<T extends this>(this: T, x: T | TensorLike): T;
    equal<T extends Tensor>(x: Tensor | TensorLike): T;
    equalStrict<T extends this>(this: T, x: T | TensorLike): T;
    lessEqual<T extends Tensor>(x: Tensor | TensorLike): T;
    lessEqualStrict<T extends this>(this: T, x: T | TensorLike): T;
    greater<T extends Tensor>(x: Tensor | TensorLike): T;
    greaterStrict<T extends this>(this: T, x: T | TensorLike): T;
    greaterEqual<T extends Tensor>(x: Tensor | TensorLike): T;
    greaterEqualStrict<T extends this>(this: T, x: T | TensorLike): T;
    logicalAnd(x: Tensor | TensorLike): Tensor;
    logicalOr(x: Tensor | TensorLike): Tensor;
    logicalNot<T extends Tensor>(this: T): T;
    logicalXor(x: Tensor | TensorLike): Tensor;
    where(condition: Tensor | TensorLike, x: Tensor | TensorLike): Tensor;
    neg<T extends Tensor>(this: T): T;
    ceil<T extends Tensor>(this: T): T;
    floor<T extends Tensor>(this: T): T;
    sign<T extends Tensor>(this: T): T;
    exp<T extends Tensor>(this: T): T;
    expm1<T extends Tensor>(this: T): T;
    log<T extends Tensor>(this: T): T;
    log1p<T extends Tensor>(this: T): T;
    sqrt<T extends Tensor>(this: T): T;
    rsqrt<T extends Tensor>(this: T): T;
    square<T extends Tensor>(this: T): T;
    reciprocal<T extends Tensor>(this: T): T;
    abs<T extends Tensor>(this: T): T;
    clipByValue(min: number, max: number): Tensor<R>;
    relu<T extends Tensor>(this: T): T;
    elu<T extends Tensor>(this: T): T;
    selu<T extends Tensor>(this: T): T;
    leakyRelu(alpha?: number): Tensor<R>;
    prelu(alpha: Tensor<R> | TensorLike): Tensor<R>;
    sigmoid<T extends Tensor>(this: T): T;
    logSigmoid<T extends Tensor>(this: T): T;
    softplus<T extends Tensor>(this: T): T;
    zerosLike<T extends Tensor>(this: T): T;
    onesLike<T extends Tensor>(this: T): T;
    sin<T extends Tensor>(this: T): T;
    cos<T extends Tensor>(this: T): T;
    tan<T extends Tensor>(this: T): T;
    asin<T extends Tensor>(this: T): T;
    acos<T extends Tensor>(this: T): T;
    atan<T extends Tensor>(this: T): T;
    sinh<T extends Tensor>(this: T): T;
    cosh<T extends Tensor>(this: T): T;
    tanh<T extends Tensor>(this: T): T;
    asinh<T extends Tensor>(this: T): T;
    acosh<T extends Tensor>(this: T): T;
    atanh<T extends Tensor>(this: T): T;
    erf<T extends Tensor>(this: T): T;
    round<T extends Tensor>(this: T): T;
    step<T extends Tensor>(this: T, alpha?: number): T;
    softmax<T extends this>(this: T, dim?: number): T;
    logSoftmax<T extends this>(this: T, axis?: number): T;
    resizeBilinear<T extends Tensor3D | Tensor4D>(this: T, newShape2D: [number, number], alignCorners?: boolean): T;
    resizeNearestNeighbor<T extends Tensor3D | Tensor4D>(this: T, newShape2D: [number, number], alignCorners?: boolean): T;
    conv1d<T extends Tensor2D | Tensor3D>(this: T, filter: Tensor3D | TensorLike3D, stride: number, pad: 'valid' | 'same' | number, dataFormat?: 'NWC' | 'NCW', dilation?: number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    conv2d<T extends Tensor3D | Tensor4D>(this: T, filter: Tensor4D | TensorLike4D, strides: [number, number] | number, pad: 'valid' | 'same' | number, dataFormat?: 'NHWC' | 'NCHW', dilations?: [number, number] | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    conv2dTranspose<T extends Tensor3D | Tensor4D>(this: T, filter: Tensor4D | TensorLike4D, outputShape: [number, number, number, number] | [number, number, number], strides: [number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    depthwiseConv2D<T extends Tensor3D | Tensor4D>(this: T, filter: Tensor4D | TensorLike4D, strides: [number, number] | number, pad: 'valid' | 'same' | number, dataFormat?: 'NHWC' | 'NCHW', dilations?: [number, number] | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    separableConv2d<T extends Tensor3D | Tensor4D>(this: T | TensorLike, depthwiseFilter: Tensor4D | TensorLike4D, pointwiseFilter: Tensor4D | TensorLike, strides: [number, number] | number, pad: 'valid' | 'same', dilation?: [number, number] | number, dataFormat?: 'NHWC' | 'NCHW'): T;
    avgPool<T extends Tensor3D | Tensor4D>(this: T, filterSize: [number, number] | number, strides: [number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    maxPool<T extends Tensor3D | Tensor4D>(this: T, filterSize: [number, number] | number, strides: [number, number] | number, pad: 'valid' | 'same' | number, dimRoundingMode?: 'floor' | 'round' | 'ceil'): T;
    localResponseNormalization<T extends Tensor3D | Tensor4D>(this: T, radius?: number, bias?: number, alpha?: number, beta?: number): T;
    pool<T extends Tensor3D | Tensor4D>(this: T, windowShape: [number, number] | number, poolingType: 'max' | 'avg', padding: 'valid' | 'same' | number, dilationRate?: [number, number] | number, strides?: [number, number] | number): T;
    variable(trainable?: boolean, name?: string, dtype?: DataType): Variable<R>;
    unsortedSegmentSum<T extends Tensor>(this: T, segmentIds: Tensor1D | TensorLike1D, numSegments: number): T;
    batchToSpaceND<T extends Tensor>(this: T, blockShape: number[], crops: number[][]): T;
    spaceToBatchND<T extends Tensor>(this: T, blockShape: number[], paddings: number[][]): T;
    topk<T extends Tensor>(this: T, k?: number, sorted?: boolean): {
        values: T;
        indices: T;
    };
    stridedSlice<T extends Tensor>(this: T, begin: number[], end: number[], strides: number[], beginMask?: number, endMask?: number): T;
    depthToSpace(this: Tensor4D, blockSize: number, dataFormat: 'NHWC' | 'NCHW'): Tensor4D;
    fft(this: Tensor): Tensor;
    ifft(this: Tensor): Tensor;
}
export interface NumericTensor<R extends Rank = Rank> extends Tensor<R> {
    dtype: NumericDataType;
    data(): Promise<TypedArray>;
    dataSync(): TypedArray;
}
export interface StringTensor<R extends Rank = Rank> extends Tensor<R> {
    dtype: 'string';
    dataSync(): string[];
    data(): Promise<string[]>;
}
export declare type Scalar = Tensor<Rank.R0>;
export declare type Tensor1D = Tensor<Rank.R1>;
export declare type Tensor2D = Tensor<Rank.R2>;
export declare type Tensor3D = Tensor<Rank.R3>;
export declare type Tensor4D = Tensor<Rank.R4>;
export declare type Tensor5D = Tensor<Rank.R5>;
export declare type Tensor6D = Tensor<Rank.R6>;
export declare class Variable<R extends Rank = Rank> extends Tensor<R> {
    trainable: boolean;
    name: string;
    private constructor();
    static variable<R extends Rank>(initialValue: Tensor<R>, trainable?: boolean, name?: string, dtype?: DataType): Variable<R>;
    assign(newValue: Tensor<R>): void;
}
declare const variable: typeof Variable.variable;
export { variable };
