import { ByteChunkIterator } from './iterators/byte_chunk_iterator';
export declare abstract class DataSource {
    abstract iterator(): Promise<ByteChunkIterator>;
}
