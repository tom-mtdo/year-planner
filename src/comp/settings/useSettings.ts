import { useContext } from 'react';
import { DataContext } from '../../data-lib/context/DataProvider';
import { paths } from '../../util/constant';
import { compKeys } from '../../data-lib/util/constant';
import { names } from '../../util/constant';
import { FORM_STATUS } from '../../data-lib/hook/useForm';

const useSettings = () => {
    const {getValue, setValue} = useContext(DataContext);

    const resetData = () => {
        if(!getValue || !setValue) { return; }

        const year = getValue(paths.runtime.year);
        const country = getValue(paths.runtime.country);
        const state = getValue(paths.runtime.state);

        const path = paths.temp.settings[compKeys._path];
        const settingsData = getValue(path);
        
        setValue(path, {
            ...settingsData,
            [compKeys._status]: FORM_STATUS.CLEAN,
            [names.year]: year,
            [names.country]: country,
            [names.state]: state
        });

    };

    return {resetData};
};

export default useSettings;