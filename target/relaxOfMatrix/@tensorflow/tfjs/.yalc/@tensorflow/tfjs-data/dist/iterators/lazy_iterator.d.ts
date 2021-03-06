import { DataElement, IteratorContainer } from '../types';
import { DeepMapResult } from '../util/deep_map';
import { RingBuffer } from '../util/ring_buffer';
export declare function iteratorFromItems<T>(items: T[]): LazyIterator<T>;
export declare function iteratorFromIncrementing(start: number): LazyIterator<number>;
export declare function iteratorFromFunction<T>(func: () => IteratorResult<T> | Promise<IteratorResult<T>>): LazyIterator<T>;
export declare function iteratorFromConcatenated<T>(baseIterators: LazyIterator<LazyIterator<T>>, baseErrorHandler?: (e: Error) => boolean): LazyIterator<T>;
export declare function iteratorFromConcatenatedFunction<T>(iteratorFunc: () => IteratorResult<LazyIterator<T>>, count: number, baseErrorHandler?: (e: Error) => boolean): LazyIterator<T>;
export declare function iteratorFromZipped<O extends DataElement>(iterators: IteratorContainer, mismatchMode?: ZipMismatchMode): LazyIterator<O>;
export declare abstract class LazyIterator<T> {
    abstract summary(): string;
    abstract next(): Promise<IteratorResult<T>>;
    collect(maxItems?: number, prefetch?: number): Promise<T[]>;
    resolveFully(): Promise<void>;
    resolveWhile(predicate: (r: T) => boolean): Promise<void>;
    handleErrors(handler: (error: Error) => boolean): LazyIterator<T>;
    filter(predicate: (value: T) => boolean): LazyIterator<T>;
    map<O>(transform: (value: T) => O): LazyIterator<O>;
    mapAsync<O>(transform: (value: T) => Promise<O>): LazyIterator<O>;
    serialMapAsync<O>(transform: (value: T) => Promise<O>): LazyIterator<O>;
    flatmap<O>(transform: (value: T) => O[]): LazyIterator<O>;
    forEach(f: (value: T) => void): Promise<void>;
    serialForEach(f: (value: T) => Promise<boolean>): Promise<void>;
    rowMajorBatch(batchSize: number, smallLastBatch?: boolean): LazyIterator<T[]>;
    columnMajorBatch(batchSize: number, smallLastBatch?: boolean, zipFn?: (xs: any[]) => DeepMapResult): LazyIterator<DataElement>;
    concatenate(iterator: LazyIterator<T>, baseErrorHandler?: (e: Error) => boolean): LazyIterator<T>;
    take(count: number): LazyIterator<T>;
    skip(count: number): LazyIterator<T>;
    prefetch(bufferSize: number): LazyIterator<T>;
    shuffle(windowSize: number, seed?: string): LazyIterator<T>;
    serial(): LazyIterator<T>;
}
export declare abstract class OneToManyIterator<T> extends LazyIterator<T> {
    private lastRead;
    protected outputQueue: RingBuffer<T>;
    constructor();
    next(): Promise<IteratorResult<T>>;
    protected abstract pump(): Promise<boolean>;
    serialNext(): Promise<IteratorResult<T>>;
}
export declare class ChainedIterator<T> extends LazyIterator<T> {
    private readonly baseErrorHandler;
    private lastRead;
    private iterator;
    private moreIterators;
    constructor(iterators: LazyIterator<LazyIterator<T>>, baseErrorHandler?: (e: Error) => boolean);
    summary(): string;
    next(): Promise<IteratorResult<T>>;
    private readFromChain(lastRead);
}
export declare enum ZipMismatchMode {
    FAIL = 0,
    SHORTEST = 1,
    LONGEST = 2,
}
export declare class PrefetchIterator<T> extends LazyIterator<T> {
    protected upstream: LazyIterator<T>;
    protected bufferSize: number;
    protected buffer: RingBuffer<Promise<IteratorResult<T>>>;
    constructor(upstream: LazyIterator<T>, bufferSize: number);
    summary(): string;
    protected refill(): void;
    next(): Promise<IteratorResult<T>>;
}
export declare class ShuffleIterator<T> extends PrefetchIterator<T> {
    protected upstream: LazyIterator<T>;
    protected windowSize: number;
    private readonly random;
    private lastRead;
    private upstreamExhausted;
    constructor(upstream: LazyIterator<T>, windowSize: number, seed?: string);
    next(): Promise<IteratorResult<T>>;
    private randomInt(max);
    protected chooseIndex(): number;
    serialNext(): Promise<IteratorResult<T>>;
}
