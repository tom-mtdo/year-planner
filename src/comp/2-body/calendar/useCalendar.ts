import { BOOLEAN_VALUES, paths } from "../../../util/constant";
import { DayInfo, getHeader, getPathsInUserData } from '../../../util/util';
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
    if (!getValue || !setValue) { return; }

      // Open modal
      setValue(paths.temp.dayModal._isShown, BOOLEAN_VALUES.TRUE);
      // to update details for dayInfo
      const newDayInfo = {
        ...dayInfo,
        note: getValue(getPathsInUserData(dayInfo.date)?.notePath)
      };
      setValue(paths.temp.dayModal.dayInfo, newDayInfo);

  };

  return {
    headerRow,
    calendar,
    year,
    addNoteToADay,
  };
};
