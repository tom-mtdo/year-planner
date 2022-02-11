import { BOOLEAN_VALUES, paths } from "../../../util/constant";
import { DayInfo, getHeader } from "../../../util/util";
import { useContext } from "react";
import { DataContext } from "../../../data-lib/context/DataProvider";

export const useCalendar = () => {
  const { getValue, setValue } = useContext(DataContext);

  const toDay = new Date();
  const currentYear = toDay.getFullYear();
  const currentMonth = toDay.getMonth(); // 0 - 11
  const currentDate = toDay.getDate(); // 1 - 31
  const headerRow = getHeader();

  let year = "";
  let calendar: any[] = [];

  if (getValue) {
    year = getValue(paths.runtime.year);
    calendar = getValue(paths.runtime.calendar);
  }

  const isCurrentYear = `${currentYear}` === year;
  const addNoteToADay = (dayInfo: DayInfo) => {
    if (setValue) {
      // Open modal
      setValue(paths.temp.dayModal._isShown, BOOLEAN_VALUES.TRUE);
      // to update details for dayInfo
      setValue(paths.temp.dayModal.dayInfo, dayInfo);
    }
  };

  return {
    headerRow,
    calendar,
    isCurrentYear,
    currentMonth,
    currentDate,
    addNoteToADay,
  };
};
