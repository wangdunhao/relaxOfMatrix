import { LazyIterator } from './lazy_iterator';
export declare abstract class StringIterator extends LazyIterator<string> {
    split(separator: string): StringIterator;
}
