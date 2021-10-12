import { BOOLEAN_VALUES } from "../../util/constant";
import { DayInfo, getHeader } from "../../util/util";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { YearPath, CalendarPath } from "../YearPlanner/YearPlanner";

// logic hook
export const usePlanner = () => {
  const { getCompValue, setCompValue } = useContext(DataContext);
  const isDayModalShownPath = "runtime.dayModal.isShown";
  const dayModalDataPath = "runtime.dayModal.dayInfo";

  const toDay = new Date();
  const currentYear = toDay.getFullYear();
  const currentMonth = toDay.getMonth(); // 0 - 11
  const currentDate = toDay.getDate(); // 1 - 31
  const headerRow = getHeader();

  let year = 0;
  let calendar: any[] = [];

  if (getCompValue) {
    year = getCompValue(YearPath);
    calendar = getCompValue(CalendarPath);
  }

  const isCurrentYear = currentYear === year;
  const onDoubleClick = (dayInfo: DayInfo) => {
    if (setCompValue) {
      // Open modal
      setCompValue(isDayModalShownPath, BOOLEAN_VALUES.TRUE);
      // to update details for dayInfo
      setCompValue(dayModalDataPath, dayInfo);
    }
  };

  return {
    headerRow,
    calendar,
    isCurrentYear,
    currentMonth,
    currentDate,
    onDoubleClick,
  };
};
