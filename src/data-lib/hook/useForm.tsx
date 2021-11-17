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

    const resetForm = (formDataPath: string = '') => {
        if( getValue && setValue && Boolean(formDataPath)) { 
            const statusPath = `${formDataPath}.${compKeys._status}`;
            const currentStatus = getValue(statusPath);
            // if status is clean already then return
            // clean mean status = clean or undefined or null
            if(currentStatus === FORM_STATUS.CLEAN || !Boolean(currentStatus)) {
                return;
            }
            setValue(statusPath, FORM_STATUS.CLEAN);
        }
    }

    const touchForm = (formDataPath: string = '') => {
        if( getValue && setValue && Boolean(formDataPath)) { 
            const statusPath = `${formDataPath}.${compKeys._status}`;
            const currentStatus = getValue(statusPath);
            // if status is dirty already then don't need to update status
            if(currentStatus === FORM_STATUS.DIRTY) {
                return;
            }
            setValue(statusPath, FORM_STATUS.DIRTY); 
        }
    }

    return {resetForm, touchForm};
};

export default useForm;