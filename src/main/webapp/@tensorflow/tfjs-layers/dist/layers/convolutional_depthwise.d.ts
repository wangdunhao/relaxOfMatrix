import { serialization, Tensor } from '@tensorflow/tfjs-core';
import { DataFormat } from '../common';
import { Constraint, ConstraintIdentifier } from '../constraints';
import { Initializer, InitializerIdentifier } from '../initializers';
import { Regularizer, RegularizerIdentifier } from '../regularizers';
import { Kwargs, Shape } from '../types';
import { BaseConv, BaseConvLayerConfig } from './convolutional';
export declare function depthwiseConv2d(x: Tensor, depthwiseKernel: Tensor, strides?: [number, number], padding?: string, dataFormat?: DataFormat, dilationRate?: [number, number]): Tensor;
export interface DepthwiseConv2DLayerConfig extends BaseConvLayerConfig {
    kernelSize: number | [number, number];
    depthMultiplier?: number;
    depthwiseInitializer?: InitializerIdentifier | Initializer;
    depthwiseConstraint?: ConstraintIdentifier | Constraint;
    depthwiseRegularizer?: RegularizerIdentifier | Regularizer;
}
export declare class DepthwiseConv2D extends BaseConv {
    static className: string;
    private readonly depthMultiplier;
    private readonly depthwiseInitializer;
    private readonly depthwiseConstraint;
    private readonly depthwiseRegularizer;
    private depthwiseKernel;
    constructor(config: DepthwiseConv2DLayerConfig);
    build(inputShape: Shape | Shape[]): void;
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    computeOutputShape(inputShape: Shape | Shape[]): Shape | Shape[];
    getConfig(): serialization.ConfigDict;
}
