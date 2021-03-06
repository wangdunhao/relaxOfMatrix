"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = [
    {
        'tfOpName': 'Cast',
        'dlOpName': 'cast',
        'category': 'transformation',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }, {
                'tfParamName': 'SrcT',
                'dlParamName': 'sdtype',
                'type': 'dtype',
                'notSupported': true
            },
            { 'tfParamName': 'DstT', 'dlParamName': 'dtype', 'type': 'dtype' }
        ]
    },
    {
        'tfOpName': 'ExpandDims',
        'dlOpName': 'expandDims',
        'category': 'transformation',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }, {
                'tfInputIndex': 1,
                'tfParamNameDeprecated': 'dim',
                'dlParamName': 'axis',
                'type': 'number'
            }
        ]
    },
    {
        'tfOpName': 'Pad',
        'dlOpName': 'pad',
        'category': 'transformation',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'padding', 'type': 'number[]' }, {
                'tfParamName': 'constant_value',
                'dlParamName': 'constantValue',
                'type': 'number',
                'defaultValue': 0
            }
        ]
    },
    {
        'tfOpName': 'PadV2',
        'dlOpName': 'pad',
        'category': 'transformation',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'padding', 'type': 'number[]' }, {
                'tfInputIndex': 2,
                'dlParamName': 'constantValue',
                'type': 'number',
                'defaultValue': 0
            }
        ]
    },
    {
        'tfOpName': 'Reshape',
        'dlOpName': 'reshape',
        'category': 'transformation',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'shape', 'type': 'number[]' }
        ]
    },
    {
        'tfOpName': 'Squeeze',
        'dlOpName': 'squeeze',
        'category': 'transformation',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }, {
                'tfParamName': 'axis',
                'tfParamNameDeprecated': 'squeeze_dims',
                'dlParamName': 'axis',
                'type': 'number[]'
            }
        ]
    },
    {
        'tfOpName': 'SpaceToBatchND',
        'dlOpName': 'spaceToBatchND',
        'category': 'transformation',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'blockShape', 'type': 'number[]' },
            { 'tfInputIndex': 2, 'dlParamName': 'paddings', 'type': 'number[]' }
        ]
    },
    {
        'tfOpName': 'BatchToSpaceND',
        'dlOpName': 'batchToSpaceND',
        'category': 'transformation',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'blockShape', 'type': 'number[]' },
            { 'tfInputIndex': 2, 'dlParamName': 'crops', 'type': 'number[]' }
        ]
    },
    {
        'tfOpName': 'DepthToSpace',
        'dlOpName': 'depthToSpace',
        'category': 'transformation',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'x', 'type': 'tensor' }, {
                'tfParamName': 'block_size',
                'dlParamName': 'blockSize',
                'type': 'number'
            },
            {
                'tfParamName': 'data_format',
                'dlParamName': 'dataFormat',
                'type': 'string'
            }
        ]
    }
];
//# sourceMappingURL=transformation.js.map