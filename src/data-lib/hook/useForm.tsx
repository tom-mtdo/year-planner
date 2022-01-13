import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { compKeys, paths } from '../util/constant';
import { pickBy } from 'lodash';
import useError from './useError';

export enum FORM_STATUS {
    CLEAN = 'clean',
    DIRTY = 'dirty'
}

const useForm = () => {
    const {getValue, setValue} = useContext(DataContext);
    const {removeError} = useError();

    const setFormStatus = (formDataPath: string = '', status: FORM_STATUS) => {
        if( getValue && setValue && Boolean(formDataPath)) { 
            const statusPath = `${formDataPath}.${compKeys._status}`;
            const currentStatus = getValue(statusPath);
            // if status is clean already then return
            // clean mean status = clean or undefined or null
            if(currentStatus === status) {
                return;
            }
            setValue(statusPath, status);
        }
    }

    const resetForm = (formDataPath: string = '') => {
        setFormStatus(formDataPath, FORM_STATUS.CLEAN);
        removeError(formDataPath);
    }

    const touchForm = (formDataPath: string = '') => {
        setFormStatus(formDataPath, FORM_STATUS.DIRTY);
    }

    return {resetForm, touchForm};
};

export default useForm;