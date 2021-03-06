import * as tfc from '@tensorflow/tfjs-core';
import { NamedTensorsMap, TensorInfo } from '../data/types';
export declare const TFHUB_SEARCH_PARAM = "?tfjs-format=file";
export declare const DEFAULT_MODEL_NAME = "tensorflowjs_model.pb";
export declare const DEFAULT_MANIFEST_NAME = "weights_manifest.json";
export declare class FrozenModel implements tfc.InferenceModel {
    private modelUrl;
    private weightManifestUrl;
    private requestOption;
    private weightPrefix;
    private executor;
    private version;
    private handler;
    readonly modelVersion: string;
    readonly inputNodes: string[];
    readonly outputNodes: string[];
    readonly inputs: TensorInfo[];
    readonly outputs: TensorInfo[];
    readonly weights: NamedTensorsMap;
    constructor(modelUrl: string, weightManifestUrl: string, requestOption?: RequestInit, weightPrefix?: string);
    private findIOHandler();
    load(): Promise<boolean>;
    predict(inputs: tfc.Tensor | tfc.Tensor[] | tfc.NamedTensorMap, config?: tfc.ModelPredictConfig): tfc.Tensor | tfc.Tensor[] | tfc.NamedTensorMap;
    private constructTensorMap(inputs);
    execute(inputs: tfc.Tensor | tfc.Tensor[] | tfc.NamedTensorMap, outputs?: string | string[]): tfc.Tensor | tfc.Tensor[];
    private execute_(inputs, strictInputCheck?, outputs?);
    executeAsync(inputs: tfc.Tensor | tfc.Tensor[] | tfc.NamedTensorMap, outputs?: string | string[]): Promise<tfc.Tensor | tfc.Tensor[]>;
    private convertTensorMapToTensorsMap(map);
    dispose(): void;
}
export declare function loadFrozenModel(modelUrl: string, weightsManifestUrl: string, requestOption?: RequestInit): Promise<FrozenModel>;
export declare function loadTfHubModule(tfhubModuleUrl: string, requestOption?: RequestInit): Promise<FrozenModel>;
