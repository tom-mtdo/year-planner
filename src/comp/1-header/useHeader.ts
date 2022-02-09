import { isNumber } from "lodash";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import useCommon from "../../hook/useCommon";
import { paths } from "../../util/constant";
import { countryCodeToName } from "../../util/util";
import useSettings from "../settings/useSettings";
import { CHANGE_YEAR_TYPE } from "./Header";
import { compKeys } from '../../data-lib/util/constant';
import { getNot } from "../../data-lib/util/util";

export enum ButtonNames {
  SETTINGS = "settings",
  TODAY = 'today'
}

const useHeader = function () {
  const { getValue, setValue } = useContext(DataContext);
  const { moveToYear } = useCommon();
  const { resetSettings } = useSettings();

  const strActiveYear = getValue ? getValue(paths.runtime.year) : "";
  const activeYear = parseInt(strActiveYear);
  const countryCode = getValue ? getValue(paths.runtime.country) : "";
  const activeCountry = countryCodeToName(countryCode) ?? "";
  const activeState = getValue ? getValue(paths.runtime.state) : "";

  const changeYear = (value: number, valueType?: CHANGE_YEAR_TYPE) => {
    if (isNumber(value)) {
      const newYear =
        CHANGE_YEAR_TYPE.VALUE === valueType ? value : activeYear + value;
      moveToYear(`${newYear}`);
    }
  };

  const handleClick = (input: {buttonName: ButtonNames}) => {
    switch (input.buttonName) {
      case ButtonNames.SETTINGS:
        showHideSettings();
        break;
      case ButtonNames.TODAY:
        changeYear((new Date()).getFullYear(), CHANGE_YEAR_TYPE.VALUE);
        break;
      default:
        console.log("Unknown button");
    }
  };

  const showHideSettings = () => {
    if(!getValue || !setValue || !resetSettings) { return; }
    const path = paths.temp.settings[compKeys._isShown];
    resetSettings();
    setValue(path, getNot(getValue(path)));
  }

  return { activeYear, activeCountry, activeState, changeYear, handleClick };
};

export default useHeader;
