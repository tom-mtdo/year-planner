import { useContext, useState } from 'react';
import { DataContext } from '../context/DataProvider';

export enum FORM_STATUS {
    CLEAN = 'clean',
    DIRTY = 'dirty'
}

const useForm = (input: {dataPath: string}) => {
    const [dataPath] = useState(input.dataPath);
    const {getValue, setValue} = useContext(DataContext);

    const resetForm = () => {
        if( getValue && setValue && dataPath) { 
            const currentStatus = getValue(dataPath);
            // if status is clean already then return
            // clean mean status = clean or undefined or null
            if(currentStatus === FORM_STATUS.CLEAN || !Boolean(currentStatus)) {
                return;
            }
            setValue(dataPath, FORM_STATUS.CLEAN);
        }
    }

    const touchForm = () => {
        if( getValue && setValue && dataPath) { 
            const currentStatus = getValue(dataPath);
            if(currentStatus === FORM_STATUS.DIRTY) {
                return;
            }
            setValue(dataPath, FORM_STATUS.DIRTY); 
        }
    }

    return {resetForm, touchForm};
};

export default useForm;