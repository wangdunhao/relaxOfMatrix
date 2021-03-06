import { LazyIterator } from './lazy_iterator';
import { StringIterator } from './string_iterator';
export declare abstract class ByteChunkIterator extends LazyIterator<Uint8Array> {
    decodeUTF8(): StringIterator;
}
