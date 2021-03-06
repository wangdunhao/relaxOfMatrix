import { Tensor } from '@tensorflow/tfjs-core';
import { Kwargs } from '../types';
import { SymbolicTensor } from './topology';
export interface Feed {
    key: SymbolicTensor;
    value: Tensor;
}
export declare class FeedDict {
    private id2Value;
    private name2Id;
    constructor(feeds?: Feed[] | FeedDict);
    add(key: SymbolicTensor, value: Tensor): FeedDict;
    addFeed(feed: Feed): void;
    hasKey(key: SymbolicTensor): boolean;
    names(): string[];
    getValue(key: SymbolicTensor | string): Tensor;
}
export interface ExecutionProbe {
    maxNumTensors?: number;
    minNumTensors?: number;
}
export declare function execute(fetches: SymbolicTensor | SymbolicTensor[], feedDict: FeedDict, kwargs?: Kwargs, probe?: ExecutionProbe): Tensor | Tensor[] | [Tensor | Tensor[]];
