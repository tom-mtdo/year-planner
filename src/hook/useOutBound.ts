// If uuid empty then generate a new one and save to local storage

import { isEmpty } from "../data-lib/util/validation";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { DataContext } from "../data-lib/context/DataProvider";
import { names, paths } from '../util/constant';
import { DayInfo, getStrDate } from "../util/util";
import { set } from "lodash";

const UUID = "uuid";
export const YEAR_PLANNER = 'yearPlanner';

const useOutBound = function () {
  const { getValue, setValue } = useContext(DataContext);
  
  const setUuid = () => {
    if (isEmpty(localStorage.getItem(UUID))) {
      localStorage.setItem(UUID, uuidv4());
    }
  };

  // Todo save to buffer then call api
  const saveData = () => {
    if (!getValue || !setValue) {
      return;
    }

    const year = getValue(paths.runtime.year);
    const country = getValue(paths.runtime.country);
    const state = getValue(paths.runtime.state);
    const calendar = getValue(paths.runtime.calendar);
    // extract user data
    if (!calendar || !Array.isArray(calendar)) {
      return;
    }

    let userData = {};
    calendar.forEach((aMonth, index) => {
      if (aMonth && Array.isArray(aMonth)) {
        aMonth.forEach((aDay: DayInfo, index) => {
          if (aDay.note) {
            const strDate = getStrDate(aDay.date);
            set(userData, `date${strDate}.note`, aDay.note);
          }
        });
      }
    });

    const prevData = getValue(paths.userData._path);
    const storeData = {
      year,
      country,
      state,
      userData: prevData
    };

    // add string 'year' to fix lodash function
    // TODO: check function: if userData is empty, clear userData saved in local storage
    if (!isEmpty(userData)) {
      const newUserData = { ...prevData, [`${names.year}${year}`]: userData };
      setValue(`${paths.userData._path}`, newUserData);
      storeData.userData = newUserData;
      // setValue(`${paths.userData._path}.${names.year}${activeYear}`, userData);
    }

    localStorage.setItem(YEAR_PLANNER, JSON.stringify(storeData));
  };

  return { setUuid, saveData };
};

export default useOutBound;
