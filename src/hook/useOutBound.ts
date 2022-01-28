// If uuid empty then generate a new one and save to local storage

import { isEmpty } from "../data-lib/util/validation";
import { v4 as uuidv4 } from "uuid";
import { useContext } from "react";
import { DataContext } from "../data-lib/context/DataProvider";
import { names, paths } from "../util/constant";
import { DayInfo, getStrDate } from "../util/util";
import { set } from "lodash";

const UUID = "uuid";

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

    const activeYear = getValue(paths.runtime.year);
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

    // add string 'year' to fix lodash function
    if (!isEmpty(userData)) {
      const prevData = getValue(paths.userData._path);
      const newData = { ...prevData, [`${names.year}${activeYear}`]: userData };
      localStorage.setItem("userData", JSON.stringify(newData));
      setValue(`${paths.userData._path}`, newData);
      // setValue(`${paths.userData._path}.${names.year}${activeYear}`, userData);
    }
  };

  return { setUuid, saveData };
};

export default useOutBound;
