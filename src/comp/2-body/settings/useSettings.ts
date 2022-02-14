import { useContext } from "react";
import { DataContext } from "../../../data-lib/context/DataProvider";
import { paths } from "../../../util/constant";
import { BOOLEAN_STR_VALUES, compKeys } from "../../../data-lib/util/constant";
import { names } from "../../../util/constant";
import useForm, { FORM_STATUS } from "../../../data-lib/hook/useForm";
import { isEmpty } from "../../../data-lib/util/validation";
import { yearPlanner as validation } from "../../0-YearPlanner/validation";
import { pathToId } from "../../../data-lib/util/util";

const useSettings = () => {
  const { getValue, setValue } = useContext(DataContext);
  // const { moveToYear } = useCommon();
  const compToFocus = pathToId(paths.temp.settings.year);
  const { resetForm, validateForm } = useForm({ compToFocus });

  const isShown = getValue ? getValue(paths.temp.settings._isShown) : false;

  const isEditing =
    getValue && getValue(paths.temp.settings._status) === FORM_STATUS.DIRTY
      ? true
      : false;

  const resetSettings = () => {
    if (!getValue || !setValue) {
      return;
    }

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
      [names.state]: state,
    });
    resetForm(paths.temp.settings._path);
  };

  const closeSettings = () => {
    if (!getValue || !setValue) {
      return;
    }

    resetSettings();
    const isShown = getValue(paths.temp.settings[compKeys._isShown]);
    if (BOOLEAN_STR_VALUES.FALSE !== isShown) {
      setValue(
        paths.temp.settings[compKeys._isShown],
        BOOLEAN_STR_VALUES.FALSE
      );
    }
  };

  const applySettings = () => {
    if (!getValue || !setValue) {
      return;
    }

    const errors = validateForm(
      paths.temp.settings[compKeys._path],
      validation
    );
    if (!isEmpty(errors)) {
      return;
    }

    const activeYear = getValue(paths.runtime.year);
    const activeCountry = getValue(paths.runtime.country);
    const activeState = getValue(paths.runtime.state);

    const settingsYear = getValue(paths.temp.settings.year);
    const settingsCountry = getValue(paths.temp.settings.country);
    const settingsState = getValue(paths.temp.settings.state);

    if (
      activeYear !== settingsYear ||
      activeCountry !== settingsCountry ||
      activeState !== settingsState
    ) {
      const preRuntime = getValue(paths.runtime[compKeys._path]);
      setValue(paths.runtime[compKeys._path], {
        ...preRuntime,
        year: settingsYear,
        country: settingsCountry,
        state: settingsState,
      });
      resetForm(paths.temp.settings._path);
    }
  };

  return { isShown, isEditing, resetSettings, closeSettings, applySettings };
};

export default useSettings;
