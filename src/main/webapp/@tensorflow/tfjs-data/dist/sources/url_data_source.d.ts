import { DataSource } from '../datasource';
import { ByteChunkIterator } from '../iterators/byte_chunk_iterator';
import { FileChunkIteratorOptions } from '../iterators/file_chunk_iterator';
export declare class URLDataSource extends DataSource {
    protected readonly url: RequestInfo;
    protected readonly fileOptions: FileChunkIteratorOptions;
    constructor(url: RequestInfo, fileOptions?: FileChunkIteratorOptions);
    iterator(): Promise<ByteChunkIterator>;
}
