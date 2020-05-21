import { FC, ReactElement } from "react";
import { InputProps } from "../Input";
interface DataSource {
    value: string;
}
export declare type DataSourceType<T = {}> = T & DataSource;
interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
    fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    template?: (item: DataSourceType) => ReactElement;
}
declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
