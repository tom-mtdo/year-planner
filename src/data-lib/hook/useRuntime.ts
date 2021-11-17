import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
export interface IRuntimeArgs {
    compId?: string;
    compDataPath?: string;
    compValue?: any;
    data?: any;
}
const useRuntime = () => {
    const {data} = useContext(DataContext);

    const runFunction = (inFunction: any, args: IRuntimeArgs, defaultValue?: any) => {
        const input = {
            ...args,
            data
        }

        if(typeof inFunction === 'function') {
            try {
                return inFunction(input);
            } catch (e) {
                return defaultValue ?? 'Function at runtime error'
            }
        } else {
            return inFunction ?? defaultValue 
        }
    }

    return {runFunction};
}

export default useRuntime;