import React from "react";
import { DayInfo, getPathsInUserData } from '../../../util/util';
import { isEmpty } from '../../../data-lib/util/validation';
import { useContext } from 'react';
import { DataContext } from '../../../data-lib/context/DataProvider';
import {
  StyledDay,
  StyledDateNum,
  StyledNote,
  StyledHoliday,
  StyledButton
} from "./Day.style";

export interface IDay {
  dayInfo?: DayInfo | undefined;
  isCurrent?: boolean;
  children?: any;
  addNote?: any;
}

export default function Day(props: IDay) {
  const { dayInfo, isCurrent, addNote, children } = props;
  const {getValue} = useContext(DataContext);

  let dateNum = dayInfo?.date?.getDate() ?? "";
  const day = dayInfo?.date?.getDay() ?? 0;
  const isWeekend = day % 7 === 6 || day % 7 === 0;
  const styledProps = {
    isCurrent: isCurrent ?? false,
    isHoliday: Boolean(dayInfo?.holiday),
    isWeekend,
  };

  // get user data from context
  const { notePath } = getPathsInUserData(dayInfo?.date) || {};
  const note: string = getValue ? getValue(notePath) : '';

  return (
    <StyledDay {...styledProps} onDoubleClick={() => addNote(dayInfo)}>
      <StyledDateNum><StyledButton onClick={() => addNote(dayInfo)}>{dateNum}</StyledButton></StyledDateNum>
      <StyledNote>{note}</StyledNote>
      {children}
      <StyledHoliday>{dayInfo?.holiday}</StyledHoliday>
    </StyledDay>
  );
}
