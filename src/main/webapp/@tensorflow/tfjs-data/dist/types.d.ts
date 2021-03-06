import { DataType } from '@tensorflow/tfjs-core';
import { TensorContainer, TensorContainerArray, TensorContainerObject } from '@tensorflow/tfjs-core/dist/tensor_types';
import { Dataset } from './dataset';
import { LazyIterator } from './iterators/lazy_iterator';
export declare type DataElement = TensorContainer;
export declare type DataElementObject = TensorContainerObject;
export declare type DataElementArray = TensorContainerArray;
export declare type Container<T> = ContainerObject<T> | ContainerArray<T>;
export declare type ContainerOrT<T> = Container<T> | T;
export interface ContainerObject<T> {
    [x: string]: ContainerOrT<T>;
}
export interface ContainerArray<T> extends Array<ContainerOrT<T>> {
}
export declare type DatasetContainer = Container<Dataset<DataElement>>;
export declare type IteratorContainer = Container<LazyIterator<DataElement>>;
export declare type FileElement = File | Blob | Uint8Array;
export interface ColumnConfig {
    required?: boolean;
    dtype?: DataType;
    default?: DataElement;
    isLabel?: boolean;
}
export interface CSVConfig {
    hasHeader?: boolean;
    columnNames?: string[];
    columnConfigs?: {
        [key: string]: ColumnConfig;
    };
    configuredColumnsOnly?: boolean;
    delimiter?: string;
}
