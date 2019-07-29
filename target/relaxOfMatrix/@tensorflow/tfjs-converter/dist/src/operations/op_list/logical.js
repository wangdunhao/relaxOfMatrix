"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = [
    {
        'tfOpName': 'Equal',
        'dlOpName': 'equal',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'NotEqual',
        'dlOpName': 'notEqual',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Greater',
        'dlOpName': 'greater',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'GreaterEqual',
        'dlOpName': 'greaterEqual',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Less',
        'dlOpName': 'less',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LessEqual',
        'dlOpName': 'lessEqual',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LogicalAnd',
        'dlOpName': 'logicalAnd',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LogicalNot',
        'dlOpName': 'logicalNot',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'LogicalOr',
        'dlOpName': 'logicalOr',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    },
    {
        'tfOpName': 'Select',
        'dlOpName': 'where',
        'category': 'logical',
        'params': [
            { 'tfInputIndex': 0, 'dlParamName': 'condition', 'type': 'tensor' },
            { 'tfInputIndex': 1, 'dlParamName': 'a', 'type': 'tensor' },
            { 'tfInputIndex': 2, 'dlParamName': 'b', 'type': 'tensor' }, {
                'tfParamName': 'T',
                'dlParamName': 'dtype',
                'type': 'dtype',
                'notSupported': true
            }
        ]
    }
];
//# sourceMappingURL=logical.js.map