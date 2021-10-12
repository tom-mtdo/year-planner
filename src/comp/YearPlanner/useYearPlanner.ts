import { cloneDeep, isNumber, isEmpty } from "lodash";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { CalendarPath, YearPath } from "./YearPlanner";
import { DayInfo } from "../../util/util";

const useYearPlanner = function () {
  const { getCompValue, setCompValue } = useContext(DataContext);

  const updateCalendarAndContent = (dayInfo: DayInfo) => {
    if (getCompValue && setCompValue) {
      //   const year = getCompValue(YearPath);
      //   const userContentPath = `content.${year}`;
      //   const userContent = getCompValue(userContentPath);
      const calendar = getCompValue(CalendarPath);
      const draft = cloneDeep(calendar);

      // update whole lot
      //   if (userContent && !isEmpty(userContent)) {
      //     Object.keys(userContent).forEach((strDate, index) => {
      //       const mm = parseInt(strDate.substr(4, 2)) - 1;
      //       const dd = parseInt(strDate.substr(6, 2)) - 1;
      //       if (isNumber(mm) && isNumber(dd) && draft[mm][dd]) {
      //         draft[mm][dd].note = userContent.current[strDate].note;
      //       }
      //     });
      //     setCompValue(CalendarPath, draft);
      //   }

      const activeDate = dayInfo?.date ?? undefined;
      const note = dayInfo?.note ?? '';
      if (!activeDate) {
        return;
      }

      const year = activeDate.getFullYear();
      const month = activeDate.getMonth() + 1; // because month is 0 - 11
      const date = activeDate.getDate(); // 1 - 31

      const strYear = "" + year;
      const strMonth = month < 10 ? "0" + month : "" + month;
      const strDate = date < 10 ? "0" + date : "" + date;

      const path = `content.${strYear}.${strYear}${strMonth}${strDate}.note`;

      // content.${strYear}.${strYear}${strMonth}${strDate}.note
      // update user content: to save later
      setCompValue(path, note);
      // update calendar
      draft[month - 1][date-1].note = note;
      setCompValue(CalendarPath, draft);
    }
  };

  return { updateCalendarAndContent };
};

export default useYearPlanner;
