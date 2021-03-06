export declare type DeepMapResult = {
    value: any;
    recurse: boolean;
};
export declare function deepMap(input: any, mapFn: (x: any) => DeepMapResult): any | any[];
export declare function deepZip(inputs: any[], zipFn?: (xs: any[]) => DeepMapResult): any | any[];
export declare function zipToList(x: any[]): DeepMapResult;
export declare type DeepMapAsyncResult = {
    value: Promise<any>;
    recurse: boolean;
};
export declare function deepMapAndAwaitAll(input: any, mapFn: (x: any) => DeepMapAsyncResult): Promise<any | any[]>;
export declare function isIterable(obj: any): boolean;
export declare function isNumericArray(obj: any): boolean;
