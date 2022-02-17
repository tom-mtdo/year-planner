import { isNumber } from "lodash";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { paths, MinYear, MaxYear } from "../../util/constant";
import { countryCodeToName } from "../../util/util";
import useSettings from "../2-body/settings/useSettings";
import { CHANGE_YEAR_TYPE } from "./Header";
import { compKeys } from "../../data-lib/util/constant";
import { getNot } from "../../data-lib/util/util";

export enum ButtonNames {
  SETTINGS = "settings",
  TODAY = "today",
}

const useHeader = function () {
  const { getValue, setValue } = useContext(DataContext);

  const { resetSettings } = useSettings();
  
  const strActiveYear = getValue ? getValue(paths.runtime.year) : "";
  const activeYear = parseInt(strActiveYear);
  const countryCode = getValue ? getValue(paths.runtime.country) : "";
  const activeCountry = countryCodeToName(countryCode) ?? "";
  const activeState = getValue ? getValue(paths.runtime.state) : "";

  const changeYear = (
    value: number,
    valueType: CHANGE_YEAR_TYPE = CHANGE_YEAR_TYPE.OFFSET
  ) => {
    if (!isNumber(value) || !getValue || !setValue) {
      return;
    }

    const newYear = valueType === CHANGE_YEAR_TYPE.VALUE ? value: activeYear + value;

    if (newYear < MinYear || newYear > MaxYear) {
      return;
    }

    setValue(paths.runtime.year, newYear + '');
  };

  const handleClick = (input: { buttonName: ButtonNames }) => {
    switch (input.buttonName) {
      case ButtonNames.SETTINGS:
        showHideSettings();
        break;
      case ButtonNames.TODAY:
        changeYear(new Date().getFullYear(), CHANGE_YEAR_TYPE.VALUE);
        break;
      default:
        console.log("Unknown button");
    }
  };

  const showHideSettings = () => {
    if (!getValue || !setValue || !resetSettings) {
      return;
    }
    const path = paths.temp.settings[compKeys._isShown];
    resetSettings();
    setValue(path, getNot(getValue(path)));
  };

  return { activeYear, activeCountry, activeState, changeYear, handleClick };
};

export default useHeader;
