import React from 'react';
import useData from './useData';

/**
 * Data context
 */
export interface IDataContext {
    data?: any;
    getCompValue?: (dataPath: string) => any;
    setCompValue?: (dataPath: string, value: any) => void;
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
    const { data, getCompValue, setCompValue } = useData(prepopData);

    return (
        <DataContext.Provider value={{data, getCompValue, setCompValue}}>
            {children}
        </DataContext.Provider>
    )
};
