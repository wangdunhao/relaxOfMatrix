import { serialization, Tensor } from '@tensorflow/tfjs-core';
import { Activation as ActivationFn, ActivationIdentifier } from '../activations';
import { Constraint, ConstraintIdentifier } from '../constraints';
import { Layer, LayerConfig } from '../engine/topology';
import { Initializer, InitializerIdentifier } from '../initializers';
import { Regularizer, RegularizerIdentifier } from '../regularizers';
import { Kwargs, Shape } from '../types';
export interface DropoutLayerConfig extends LayerConfig {
    rate: number;
    noiseShape?: number[];
    seed?: number;
}
export declare class Dropout extends Layer {
    static className: string;
    private readonly rate;
    private readonly rateScalar;
    private readonly noiseShape;
    private readonly seed;
    constructor(config: DropoutLayerConfig);
    private getNoiseShape(input);
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    getConfig(): serialization.ConfigDict;
}
export interface DenseLayerConfig extends LayerConfig {
    units: number;
    activation?: ActivationIdentifier;
    useBias?: boolean;
    kernelInitializer?: InitializerIdentifier | Initializer;
    biasInitializer?: InitializerIdentifier | Initializer;
    inputDim?: number;
    kernelConstraint?: ConstraintIdentifier | Constraint;
    biasConstraint?: ConstraintIdentifier | Constraint;
    kernelRegularizer?: RegularizerIdentifier | Regularizer;
    biasRegularizer?: RegularizerIdentifier | Regularizer;
    activityRegularizer?: RegularizerIdentifier | Regularizer;
}
export declare class Dense extends Layer {
    static className: string;
    private units;
    private activation;
    private useBias;
    private kernelInitializer;
    private biasInitializer;
    private kernel;
    private bias;
    readonly DEFAULT_KERNEL_INITIALIZER: InitializerIdentifier;
    readonly DEFAULT_BIAS_INITIALIZER: InitializerIdentifier;
    private readonly kernelConstraint?;
    private readonly biasConstraint?;
    private readonly kernelRegularizer?;
    private readonly biasRegularizer?;
    constructor(config: DenseLayerConfig);
    build(inputShape: Shape | Shape[]): void;
    computeOutputShape(inputShape: Shape | Shape[]): Shape | Shape[];
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    getConfig(): serialization.ConfigDict;
}
export declare class Flatten extends Layer {
    static className: string;
    constructor(config?: LayerConfig);
    computeOutputShape(inputShape: Shape | Shape[]): Shape | Shape[];
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
}
export interface ActivationLayerConfig extends LayerConfig {
    activation: ActivationIdentifier;
}
export declare class Activation extends Layer {
    static className: string;
    activation: ActivationFn;
    constructor(config: ActivationLayerConfig);
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    getConfig(): serialization.ConfigDict;
}
export interface ReshapeLayerConfig extends LayerConfig {
    targetShape: Shape;
}
export interface RepeatVectorLayerConfig extends LayerConfig {
    n: number;
}
export declare class RepeatVector extends Layer {
    static className: string;
    readonly n: number;
    constructor(config: RepeatVectorLayerConfig);
    computeOutputShape(inputShape: Shape): Shape;
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    getConfig(): serialization.ConfigDict;
}
export declare class Reshape extends Layer {
    static className: string;
    private targetShape;
    constructor(config: ReshapeLayerConfig);
    private isUnknown(dim);
    private fixUnknownDimension(inputShape, outputShape);
    computeOutputShape(inputShape: Shape): Shape;
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    getConfig(): serialization.ConfigDict;
}
export interface PermuteLayerConfig extends LayerConfig {
    dims: number[];
}
export declare class Permute extends Layer {
    static className: string;
    readonly dims: number[];
    private readonly dimsIncludingBatch;
    constructor(config: PermuteLayerConfig);
    computeOutputShape(inputShape: Shape | Shape[]): Shape | Shape[];
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    getConfig(): serialization.ConfigDict;
}
