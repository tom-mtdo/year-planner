import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { paths } from "../../util/constant";
import { BOOLEAN_STR_VALUES, compKeys } from "../../data-lib/util/constant";
import { names } from "../../util/constant";
import useForm, { FORM_STATUS } from "../../data-lib/hook/useForm";
import { isEmpty } from "../../data-lib/util/validation";
import { yearPlanner as validation } from "../../util/validation";
import useYearPlanner from "../1-YearPlanner/useYearPlanner";

const useSettings = () => {
  const { getValue, setValue } = useContext(DataContext);
  const { resetForm, validateForm } = useForm();
  const { moveToYear } = useYearPlanner();

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
    if (!getValue) {
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
      moveToYear(settingsYear, settingsCountry, settingsState);
      resetForm(paths.temp.settings._path);
    }
  };

  return { isShown, isEditing, resetSettings, closeSettings, applySettings };
};

export default useSettings;
