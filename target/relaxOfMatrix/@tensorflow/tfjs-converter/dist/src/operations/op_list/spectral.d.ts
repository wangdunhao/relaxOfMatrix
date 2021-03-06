export declare const json: {
    'tfOpName': string;
    'dlOpName': string;
    'category': string;
    'params': ({
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        unsupported?: undefined;
    } | {
        'tfInputIndex': number;
        'dlParamName': string;
        'type': string;
        'unsupported': boolean;
    })[];
}[];
