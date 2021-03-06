import * as tf from '@tensorflow/tfjs-core';
import { Dataset } from './dataset';
export declare type ElementArray = number | number[] | tf.Tensor | string;
export declare type TabularRecord = {
    [key: string]: ElementArray;
};
export interface NumericColumnStatistics {
    min: number;
    max: number;
    mean: number;
    variance: number;
    stddev: number;
    length: number;
}
export interface DatasetStatistics {
    [key: string]: NumericColumnStatistics;
}
export declare function scaleTo01(min: number, max: number): (value: ElementArray) => ElementArray;
export declare function computeDatasetStatistics(dataset: Dataset<TabularRecord>, sampleSize?: number, shuffleWindowSize?: number): Promise<DatasetStatistics>;
