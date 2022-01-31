import React from "react";
import { DayInfo } from "../../../util/util";
// import { isWeekend, DayInfo } from '../../util/util';
import {
  StyledDay,
  StyledDateNum,
  StyledNote,
  StyledHoliday,
} from "./Day.style";

export interface IDay {
  dayInfo?: DayInfo | undefined;
  isCurrent?: boolean;
  children?: any;
  onDoubleClick?: any;
}

export default function Day(props: IDay) {
  const { dayInfo, isCurrent, onDoubleClick, children } = props;
  let dateNum = dayInfo?.date?.getDate() ?? "";
  const day = dayInfo?.date?.getDay() ?? 0;
  const isWeekend = day % 7 === 6 || day % 7 === 0;
  const styledProps = {
    isCurrent: isCurrent ?? false,
    isHoliday: Boolean(dayInfo?.holiday),
    day,
    isWeekend,
  };

  return (
    <StyledDay {...styledProps} onDoubleClick={() => onDoubleClick(dayInfo)}>
      <StyledDateNum>{dateNum}</StyledDateNum>
      <StyledNote>{dayInfo?.note}</StyledNote>
      {children}
      <StyledHoliday>{dayInfo?.holiday}</StyledHoliday>
    </StyledDay>
  );
}
