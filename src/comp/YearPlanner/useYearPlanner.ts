import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
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
  const { getValue, setValue } = useContext(DataContext);

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

    const activeYear = getValue(YearPath);
    const calendar = getValue(CalendarPath);
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
      setValue(`${UserDataPath}.year${activeYear}`, userData);
    }
  };

  const updateData = (calendar: any, year: number) => {
    if (!getValue || !setValue) {
      return {};
    }

    if (!year || isNaN(year) || year < MinYear || year > MaxYear) {
      return calendar;
    }

    // Todo get from buffer or api call
    const userData = getValue(`${UserDataPath}.year${year}`);
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
    setValue(CalendarPath, calendar);
    setValue(YearPath, year);
  };

  return { saveDate, saveData, updateData };
};

export default useYearPlanner;
