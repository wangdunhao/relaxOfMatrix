import { serialization, Tensor } from '@tensorflow/tfjs-core';
import { Constraint, ConstraintIdentifier } from '../constraints';
import { Layer, LayerConfig } from '../engine/topology';
import { Initializer, InitializerIdentifier } from '../initializers';
import { Regularizer, RegularizerIdentifier } from '../regularizers';
import { Kwargs, Shape } from '../types';
export interface EmbeddingLayerConfig extends LayerConfig {
    inputDim: number;
    outputDim: number;
    embeddingsInitializer?: InitializerIdentifier | Initializer;
    embeddingsRegularizer?: RegularizerIdentifier | Regularizer;
    activityRegularizer?: RegularizerIdentifier | Regularizer;
    embeddingsConstraint?: ConstraintIdentifier | Constraint;
    maskZero?: boolean;
    inputLength?: number | number[];
}
export declare class Embedding extends Layer {
    static className: string;
    private inputDim;
    private outputDim;
    private embeddingsInitializer;
    private maskZero;
    private inputLength;
    private embeddings;
    readonly DEFAULT_EMBEDDINGS_INITIALIZER: InitializerIdentifier;
    private readonly embeddingsRegularizer?;
    private readonly embeddingsConstraint?;
    constructor(config: EmbeddingLayerConfig);
    build(inputShape: Shape | Shape[]): void;
    protected warnOnIncompatibleInputShape(inputShape: Shape): void;
    computeMask(inputs: Tensor | Tensor[], mask?: Tensor | Tensor[]): Tensor;
    computeOutputShape(inputShape: Shape | Shape[]): Shape | Shape[];
    call(inputs: Tensor | Tensor[], kwargs: Kwargs): Tensor | Tensor[];
    getConfig(): serialization.ConfigDict;
}
