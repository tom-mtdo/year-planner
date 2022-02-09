import { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataProvider';
import { compKeys } from '../util/constant';
import { get } from 'lodash';
import useError from './useError';
import useRegistry from './useRegistry';
import { pathToId } from '../util/util';
import useHandler from './useHandler';
import { isEmpty } from '../util/validation';

export enum FORM_STATUS {
    CLEAN = 'clean',
    DIRTY = 'dirty'
}

/**
 * 
 * @param props compToFocus: compId of comp which will get focus after loaded
 * @returns 
 */
const useForm = (props?: {compToFocus?: string}) => {
    const {getValue, setValue} = useContext(DataContext);
    const {removeError} = useError();
    const {getChildren} = useRegistry();
    const {validate} = useHandler();

    const {getCompRef} = useRegistry();
    const compRef = props?.compToFocus ? getCompRef(props?.compToFocus) : undefined;
  
    const focusOnComp = () => {
      if(compRef) { compRef.focus(); }
    }
  
    // focus on item after load
    useEffect(() => {
        focusOnComp()  
    }, [compRef]);

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

    const validateForm = (formDataPath: string, validation: any) => {
        const errors: any = {};
        const children = getChildren(pathToId(formDataPath)) || {};
        const childKeys = Object.keys(children);

        childKeys.forEach((key, index) => {
            const path = get(children[key], 'compDataPath');
            const errorMsg = validate(path, validation);
            if (!isEmpty(errorMsg)) {
                errors[`'${path}'`] = errorMsg;
              }
        })
        return errors;
    }

    return {resetForm, touchForm, validateForm};
};

export default useForm;