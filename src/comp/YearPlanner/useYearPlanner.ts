// import { cloneDeep, isNumber, isEmpty } from "lodash";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
// import { CalendarPath, YearPath } from "./YearPlanner";
import { DayInfo } from "../../util/util";
import {
  CalendarPath,
  MaxYear,
  MinYear,
  UserDataPath,
  YearPath,
} from "../../util/constant";
import { isEmpty, isNumber, set } from "lodash";

export const getStrDate = (aDate: Date) => {
  if (!aDate) {
    return "";
  }

  const year = aDate.getFullYear();
  const month = aDate.getMonth() + 1; // because month is 0 - 11
  const date = aDate.getDate(); // 1 - 31

  const strYear = "" + year;
  const strMonth = month < 10 ? "0" + month : "" + month;
  const strDate = date < 10 ? "0" + date : "" + date;

  return `${strYear}${strMonth}${strDate}`;
};

const useYearPlanner = function () {
  const { getCompValue, setCompValue } = useContext(DataContext);

  const updateCalendarAndContent = (dayInfo: DayInfo) => {
    if (getCompValue && setCompValue) {
      const activeDate = dayInfo?.date ?? undefined;
      const note = dayInfo?.note ?? "";
      if (!activeDate) {
        return;
      }

      // const year = activeDate.getFullYear();
      const month = activeDate.getMonth() + 1; // because month is 0 - 11
      const date = activeDate.getDate(); // 1 - 31

      const notePath = `runtime.calendar[${month - 1}][${date - 1}].note`;
      setCompValue(notePath, note);
    }
  };

  // Todo save to buffer then call api
  const saveData = () => {
    if (!getCompValue || !setCompValue) {
      return;
    }

    const activeYear = getCompValue(YearPath);
    const calendar = getCompValue(CalendarPath);
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
      setCompValue(`${UserDataPath}.year${activeYear}`, userData);
    }
  };

  const updateData = (calendar: any, year: number) => {
    if (!getCompValue || !setCompValue) {
      return {};
    }

    if (!year || isNaN(year) || year < MinYear || year > MaxYear) {
      return calendar;
    }

    // Todo get from buffer or api call
    const userData = getCompValue(`${UserDataPath}.year${year}`);
    const offset = "date".length;

    if (userData && !isEmpty(userData)) {
      Object.keys(userData).forEach((strDate, index) => {
        const mm = parseInt(strDate.substr(offset + 4, 2)) - 1;
        const dd = parseInt(strDate.substr(offset + 6, 2)) - 1;
        if (isNumber(mm) && isNumber(dd) && calendar[mm][dd]) {
          calendar[mm][dd].note = userData[strDate].note;
        }
      });
    }

    // Todo: combine
    setCompValue(CalendarPath, calendar);
    setCompValue(YearPath, year);
  };

  return { updateCalendarAndContent, saveData, updateData };
};

export default useYearPlanner;
