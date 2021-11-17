import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { compKeys } from '../util/constant';

export enum FORM_STATUS {
    CLEAN = 'clean',
    DIRTY = 'dirty'
}

const useForm = () => {
    // const [dataPath, setFormPath] = useState<string>(input?.dataPath ?? '');
    const {getValue, setValue} = useContext(DataContext);

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
    }

    const touchForm = (formDataPath: string = '') => {
        setFormStatus(formDataPath, FORM_STATUS.DIRTY);
    }

    return {resetForm, touchForm};
};

export default useForm;