import { FileElement } from '../types';
import { ByteChunkIterator } from './byte_chunk_iterator';
export interface FileChunkIteratorOptions {
    offset?: number;
    chunkSize?: number;
}
export declare class FileChunkIterator extends ByteChunkIterator {
    protected file: FileElement;
    protected options: FileChunkIteratorOptions;
    offset: number;
    chunkSize: number;
    constructor(file: FileElement, options?: FileChunkIteratorOptions);
    summary(): string;
    next(): Promise<IteratorResult<Uint8Array>>;
}
