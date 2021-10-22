import { BOOLEAN_VALUES, CalendarPath, YearPath } from "../../util/constant";
import { DayInfo, getHeader } from "../../util/util";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";

// logic hook
export const usePlanner = () => {
  const { getValue, setValue } = useContext(DataContext);
  const isDayModalShownPath = "runtime.dayModal.isShown";
  const dayModalDataPath = "runtime.dayModal.dayInfo";

  const toDay = new Date();
  const currentYear = toDay.getFullYear();
  const currentMonth = toDay.getMonth(); // 0 - 11
  const currentDate = toDay.getDate(); // 1 - 31
  const headerRow = getHeader();

  let year = '';
  let calendar: any[] = [];

  if (getValue) {
    year = getValue(YearPath);
    calendar = getValue(CalendarPath);
  }

  const isCurrentYear = `${currentYear}` === year;
  const onDoubleClick = (dayInfo: DayInfo) => {
    if (setValue) {
      // Open modal
      setValue(isDayModalShownPath, BOOLEAN_VALUES.TRUE);
      // to update details for dayInfo
      setValue(dayModalDataPath, dayInfo);
    }
  };

  return {
    headerRow,
    calendar,
    isCurrentYear,
    currentMonth,
    currentDate,
    onDoubleClick
  };
};
