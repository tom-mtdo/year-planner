import { useContext, useEffect, useRef } from 'react';
import { DataContext } from "../../data-lib/context/DataProvider";
import { DayInfo, getCalendar, getStrDate } from "../../util/util";
import { paths, MaxYear, MinYear, names } from '../../util/constant';
import { isEmpty, isNumber, set } from "lodash";
import { compKeys } from '../../data-lib/util/constant';
import useRuntime from '../../data-lib/hook/useRuntime';
import { yearPlanner as yearPlannerValidation} from '../../util/validation';
import useInBound from '../../hook/useInBound';

const useYearPlanner = function () {
  const { getValue, setValue } = useContext(DataContext);
  const { loadValidation } = useRuntime();
  const {loadData} = useInBound();

  useEffect(() => {
    loadValidation(yearPlannerValidation);
    const userData = loadData();
    if(setValue) {
      setValue(`${paths.userData._path}`, userData);
    }
    // saveUserDataToContext();
  }, []);

  const saveDate = (dayInfo: DayInfo) => {
    if (getValue && setValue) {
      const activeDate = dayInfo?.date ?? undefined;
      const note = dayInfo?.note ?? "";
      if (!activeDate) {
        return;
      }

      // const year = activeDate.getFullYear();
      const month = activeDate.getMonth() + 1; // because month is 0 - 11
      const date = activeDate.getDate(); // 1 - 31

      const notePath = `runtime.calendar[${month - 1}][${date - 1}].note`;
      setValue(notePath, note);
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
      const newData = {...prevData, [`${names.year}${activeYear}`]: userData};
      localStorage.setItem('userData', JSON.stringify(newData));
      setValue(`${paths.userData._path}`, newData);
      // setValue(`${paths.userData._path}.${names.year}${activeYear}`, userData);
    }
  };

  const moveToYear = (
    inStrYear?: string,
    inCountry?: string,
    inState?: string
  ) => {
    // save use data of the active year
    saveData();
    if (!getValue || !setValue) {
      return {};
    }

    // get year, country & state from context if not pass in
    const strYear = inStrYear ? inStrYear : getValue(paths.runtime.year);
    let country = inCountry ? inCountry : getValue(paths.runtime.country);
    let state = inState ? inState : getValue(paths.runtime.state);

    // validate input
    const year = parseInt(strYear);
    if (!year || isNaN(year) || year < MinYear || year > MaxYear) {
      return {};
    }

    // generate calendar for new year
    const calendar = getCalendar({ year, country, state });

    if (!calendar) {
      return {};
    }

    // Populate user data to new calendar
    // Todo get from buffer or api call
    const userData = getValue(`${paths.userData._path}.${names.year}${year}`);
    const offset = `${names.date}`.length;

    if (userData && !isEmpty(userData)) {
      Object.keys(userData).forEach((strDate, index) => {
        const mm = parseInt(strDate.substr(offset + 4, 2)) - 1;
        const dd = parseInt(strDate.substr(offset + 6, 2)) - 1;
        if (isNumber(mm) && isNumber(dd) && calendar[mm][dd]) {
          calendar[mm][dd].note = userData[strDate].note;
        }
      });
    }

    setValue(paths.runtime[compKeys._path], {
      [names.calendar]: calendar,
      [names.year]: strYear,
      [names.country]: country,
      [names.state]: state
    })
  };

  return { saveDate, saveData, moveToYear };
};

export default useYearPlanner;
