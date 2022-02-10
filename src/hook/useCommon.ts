import { isNumber } from "lodash";
import { useContext } from 'react';
import { DataContext } from "../data-lib/context/DataProvider";
import { isEmpty } from "../data-lib/util/validation";
import { MaxYear, MinYear, names, paths } from "../util/constant";
import { DayInfo, getCalendar } from "../util/util";
import { compKeys } from "../data-lib/util/constant";

const useCommon = function () {
  const { getValue, setValue } = useContext(DataContext);

  const saveDate = (dayInfo: DayInfo) => {
    let notePath = undefined;
    if (getValue && setValue) {
      const activeDate = dayInfo?.date ?? undefined;
      const note = dayInfo?.note ?? "";
      if (!activeDate) {
        return;
      }

      // const year = activeDate.getFullYear();
      const month = activeDate.getMonth() + 1; // because month is 0 - 11
      const date = activeDate.getDate(); // 1 - 31

      notePath = `runtime.calendar[${month - 1}][${date - 1}].note`;
      setValue(notePath, note);
    }
    return notePath;
  };

  const moveToYear = (
    inStrYear?: string,
    inCountry?: string,
    inState?: string
  ) => {
    // save user data of the active year
    // saveData();
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
      [names.state]: state,
    });
  };
  return { saveDate, moveToYear };
};

export default useCommon;
