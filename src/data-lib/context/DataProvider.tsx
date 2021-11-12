import React from 'react';
import useData from './useData';

/**
 * Data context
 */
export interface IDataContext {
    data?: any;
    getValue?: (dataPath: string) => any;
    setValue?: (dataPath: string, value: any) => void;
}

export const DataContext = React.createContext<IDataContext>({});

/**
 * Data context provider
 */
export interface IDataProvider {
    prepopData?: any;
    children?: any;
}

export const DataProvider = (props: IDataProvider) => {
    const { children, prepopData } = props;
    const { data, getValue, setValue } = useData(prepopData);

    return (
        <DataContext.Provider value={{data, getValue, setValue}}>
            {children}
        </DataContext.Provider>
    )
};
