import { Dataset } from '../dataset';
import { DataSource } from '../datasource';
import { LazyIterator } from '../iterators/lazy_iterator';
export declare class TextLineDataset extends Dataset<string> {
    protected readonly input: DataSource;
    constructor(input: DataSource);
    iterator(): Promise<LazyIterator<string>>;
}
