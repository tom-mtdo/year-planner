import { BOOLEAN_VALUES, paths } from "../../../util/constant";
import { DayInfo, getHeader } from "../../../util/util";
import { useContext } from "react";
import { DataContext } from "../../../data-lib/context/DataProvider";

export const useCalendar = () => {
  const { getValue, setValue } = useContext(DataContext);
  const headerRow = getHeader();
  const year = getValue ? getValue(paths.runtime.year) : undefined;

  let calendar: any[] = [];
  if (getValue) {
    calendar = getValue(paths.runtime.calendar);
  }

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
    year,
    addNoteToADay,
  };
};
