"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var tfc = require("@tensorflow/tfjs-core");
var compiled_api_1 = require("../data/compiled_api");
var operation_mapper_1 = require("../operations/operation_mapper");
var graph_executor_1 = require("./graph_executor");
exports.TFHUB_SEARCH_PARAM = '?tfjs-format=file';
exports.DEFAULT_MODEL_NAME = 'tensorflowjs_model.pb';
exports.DEFAULT_MANIFEST_NAME = 'weights_manifest.json';
var FrozenModel = (function () {
    function FrozenModel(modelUrl, weightManifestUrl, requestOption, weightPrefix) {
        this.modelUrl = modelUrl;
        this.weightManifestUrl = weightManifestUrl;
        this.requestOption = requestOption;
        this.weightPrefix = weightPrefix;
        this.version = 'n/a';
    }
    Object.defineProperty(FrozenModel.prototype, "modelVersion", {
        get: function () {
            return this.version;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrozenModel.prototype, "inputNodes", {
        get: function () {
            return this.executor.inputNodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrozenModel.prototype, "outputNodes", {
        get: function () {
            return this.executor.outputNodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrozenModel.prototype, "inputs", {
        get: function () {
            return this.executor.inputs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrozenModel.prototype, "outputs", {
        get: function () {
            return this.executor.outputs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FrozenModel.prototype, "weights", {
        get: function () {
            return this.executor.weightMap;
        },
        enumerable: true,
        configurable: true
    });
    FrozenModel.prototype.findIOHandler = function () {
        var path = [this.modelUrl, this.weightManifestUrl];
        if (this.requestOption) {
            this.handler = tfc.io.browserHTTPRequest(path, this.requestOption, this.weightPrefix);
        }
        else {
            var handlers = tfc.io.getLoadHandlers(path);
            if (handlers.length === 0) {
                handlers.push(tfc.io.browserHTTPRequest(path, this.requestOption));
            }
            else if (handlers.length > 1) {
                throw new Error("Found more than one (" + handlers.length + ") load handlers for " +
                    ("URL '" + [path] + "'"));
            }
            this.handler = handlers[0];
        }
    };
    FrozenModel.prototype.load = function () {
        return __awaiter(this, void 0, void 0, function () {
            var artifacts, graph, weightMap;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.findIOHandler();
                        if (this.handler.load == null) {
                            throw new Error('Cannot proceed with model loading because the IOHandler provided ' +
                                'does not have the `load` method implemented.');
                        }
                        return [4, this.handler.load()];
                    case 1:
                        artifacts = _a.sent();
                        graph = compiled_api_1.tensorflow.GraphDef.decode(new Uint8Array(artifacts.modelTopology));
                        this.version = graph.versions.producer + "." + graph.versions.minConsumer;
                        weightMap = tfc.io.decodeWeights(artifacts.weightData, artifacts.weightSpecs);
                        this.executor =
                            new graph_executor_1.GraphExecutor(operation_mapper_1.OperationMapper.Instance.transformGraph(graph));
                        this.executor.weightMap = this.convertTensorMapToTensorsMap(weightMap);
                        return [2, true];
                }
            });
        });
    };
    FrozenModel.prototype.predict = function (inputs, config) {
        return this.execute_(inputs, true, this.outputNodes);
    };
    FrozenModel.prototype.constructTensorMap = function (inputs) {
        var inputArray = inputs instanceof tfc.Tensor ? [inputs] : inputs;
        if (inputArray.length !== this.inputNodes.length) {
            throw new Error('Input tensor count mismatch,' +
                ("the frozen model has " + this.inputNodes.length + " placeholders, ") +
                ("while there are " + inputArray.length + " input tensors."));
        }
        return this.inputNodes.reduce(function (map, inputName, i) {
            map[inputName] = inputArray[i];
            return map;
        }, {});
    };
    FrozenModel.prototype.execute = function (inputs, outputs) {
        return this.execute_(inputs, false, outputs);
    };
    FrozenModel.prototype.execute_ = function (inputs, strictInputCheck, outputs) {
        if (strictInputCheck === void 0) { strictInputCheck = true; }
        outputs = outputs || this.outputNodes;
        if (inputs instanceof tfc.Tensor || Array.isArray(inputs)) {
            inputs = this.constructTensorMap(inputs);
        }
        if (this.executor.isControlFlowModel || this.executor.isDynamicShapeModel) {
            throw new Error('The model contains control flow or dynamic shape ops, ' +
                'please use executeAsync method');
        }
        var result = this.executor.execute(this.convertTensorMapToTensorsMap(inputs), strictInputCheck, outputs);
        var keys = Object.keys(result);
        return (Array.isArray(outputs) && outputs.length > 1) ?
            outputs.map(function (node) { return result[node]; }) :
            result[keys[0]];
    };
    FrozenModel.prototype.executeAsync = function (inputs, outputs) {
        return __awaiter(this, void 0, void 0, function () {
            var result, keys;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.executor.isControlFlowModel ||
                            this.executor.isDynamicShapeModel)) {
                            throw new Error('The model does not contain control flow or dynamic shape ops, ' +
                                'please use execute method for better performance.');
                        }
                        outputs = outputs || this.outputNodes;
                        if (inputs instanceof tfc.Tensor || Array.isArray(inputs)) {
                            inputs = this.constructTensorMap(inputs);
                        }
                        return [4, this.executor.executeAsync(this.convertTensorMapToTensorsMap(inputs), outputs)];
                    case 1:
                        result = _a.sent();
                        keys = Object.keys(result);
                        return [2, Array.isArray(outputs) && outputs.length > 1 ?
                                outputs.map(function (node) { return result[node]; }) :
                                result[keys[0]]];
                }
            });
        });
    };
    FrozenModel.prototype.convertTensorMapToTensorsMap = function (map) {
        return Object.keys(map).reduce(function (newMap, key) {
            newMap[key] = [map[key]];
            return newMap;
        }, {});
    };
    FrozenModel.prototype.dispose = function () {
        this.executor.dispose();
    };
    return FrozenModel;
}());
exports.FrozenModel = FrozenModel;
function loadFrozenModel(modelUrl, weightsManifestUrl, requestOption) {
    return __awaiter(this, void 0, void 0, function () {
        var model;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    model = new FrozenModel(modelUrl, weightsManifestUrl, requestOption);
                    return [4, model.load()];
                case 1:
                    _a.sent();
                    return [2, model];
            }
        });
    });
}
exports.loadFrozenModel = loadFrozenModel;
function loadTfHubModule(tfhubModuleUrl, requestOption) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!tfhubModuleUrl.endsWith('/')) {
                tfhubModuleUrl = tfhubModuleUrl + '/';
            }
            return [2, loadFrozenModel("" + tfhubModuleUrl + exports.DEFAULT_MODEL_NAME + exports.TFHUB_SEARCH_PARAM, "" + tfhubModuleUrl + exports.DEFAULT_MANIFEST_NAME + exports.TFHUB_SEARCH_PARAM, requestOption)];
        });
    });
}
exports.loadTfHubModule = loadTfHubModule;
//# sourceMappingURL=frozen_model.js.map