export declare const json: ({
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'tfInputParamLength': number;
        'dlParamName': string;
        'type': string;
    } | {
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        tfInputParamLength?: undefined;
    })[];
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        tfParamName?: undefined;
        defaultValue?: undefined;
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        tfInputIndex?: undefined;
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'notSupported': boolean;
        tfInputIndex?: undefined;
        defaultValue?: undefined;
    })[];
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        notSupported?: undefined;
    } | {
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        'notSupported': boolean;
    })[];
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'tfInputParamLength': number;
        'dlParamName': string;
        'type': string;
        tfParamName?: undefined;
        defaultValue?: undefined;
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        tfInputIndex?: undefined;
        tfInputParamLength?: undefined;
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        'notSupported': boolean;
        tfInputIndex?: undefined;
        tfInputParamLength?: undefined;
    })[];
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        tfParamName?: undefined;
    } | {
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        defaultValue?: undefined;
        tfParamName?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'defaultValue': number;
        tfInputIndex?: undefined;
    })[];
} | {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        tfParamName?: undefined;
        defaultValue?: undefined;
        notSupported?: undefined;
    } | {
        'tfParamName': string;
        'dlParamName': string;
        'type': string;
        'defaultValue': boolean;
        'notSupported': boolean;
        tfInputIndex?: undefined;
    })[];
})[];
