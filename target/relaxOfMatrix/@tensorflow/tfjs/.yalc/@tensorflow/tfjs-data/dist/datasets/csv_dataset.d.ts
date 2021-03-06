import { Dataset } from '../dataset';
import { DataSource } from '../datasource';
import { LazyIterator } from '../iterators/lazy_iterator';
import { CSVConfig, DataElement } from '../types';
import { TextLineDataset } from './text_line_dataset';
export declare class CSVDataset extends Dataset<DataElement> {
    protected readonly input: DataSource;
    base: TextLineDataset;
    private hasHeader;
    private fullColumnNames;
    private columnNamesValidated;
    private columnConfigs;
    private configuredColumnsOnly;
    private delimiter;
    columnNames(): Promise<string[]>;
    private setColumnNames();
    private maybeReadHeaderLine();
    constructor(input: DataSource, csvConfig?: CSVConfig);
    iterator(): Promise<LazyIterator<DataElement>>;
    makeDataElement(line: string): DataElement;
    private getBoolean(value);
    private parseRow(line);
}
