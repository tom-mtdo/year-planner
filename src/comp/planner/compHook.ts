import { BOOLEAN_VALUES, TOTAL_COLUMN } from "../../util/constant";
import { DayInfo } from "../../util/util";
import usePlanner from '../../hook/usePlanner';
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";

// util functions
export const countPadding = (
  aMonth: DayInfo[]
): { left: number; right: number } => {
  const firstDay = aMonth[0].date.getDay();
  // padding left
  const left = firstDay === 0 ? 6 : firstDay - 1;
  // padding right
  const right = TOTAL_COLUMN - 1 - left - aMonth.length;

  return { left, right };
};

// logic hook
export const useCompHook = () => {
  const toDay = new Date();
  const year = toDay.getFullYear();
  const month = toDay.getMonth(); // 0 - 11
  const date = toDay.getDate(); // 1 - 31

  const { content } = usePlanner({ year });
  const isDayModalShownPath = "settings.isDayModalShown";
  const { setCompValue } = useContext(DataContext);

  const onDoubleClick = (dayInfo: DayInfo) => {
    if (setCompValue) {
      setCompValue(isDayModalShownPath, BOOLEAN_VALUES.TRUE);
    }
  };

  return {content, month, date, onDoubleClick}
}