import React from "react";
import { ContentBox } from "./Calendar.style";
import Day from "../day/Day";
import { countPadding, DayInfo, getToday } from "../../../util/util";
import Header from "./CalendarHeader";
import { useCalendar } from "./useCalendar";
import { Padding, MonthLabelCell } from "./comps";
import { StyledCell, StyledRow } from "../../../lib/styles";
export const MONTH_LABEL_MIN_WIDTH = "0";

export default function Calendar() {
  const { headerRow, calendar, year, addNoteToADay } = useCalendar();

  const { thisYear, thisMonth, thisDate } = getToday();

  const months =
    Array.isArray(calendar) ? (
      calendar.map((aMonth: any, monthIndex: any) => {
        const monthCell = aMonth.map((aDay: DayInfo, dayIndex: any) => {
          // return a day
          const isToday =
            year === thisYear &&
            monthIndex === thisMonth && // get month return 0 - 11
            dayIndex === thisDate - 1 // get date return 1 - 31
              ? true
              : false;
          return (
            <StyledCell key={dayIndex}>
              <Day
                addNote={addNoteToADay}
                dayInfo={aDay}
                isCurrent={isToday}
              ></Day>
            </StyledCell>
          );
        });

        const paddingCounts = countPadding(aMonth);
        const leftPadding = (
          <Padding key="left-padding" count={paddingCounts.left} />
        );
        const rightPadding = (
          <Padding key="right-padding" count={paddingCounts.right} />
        );

        // return a month
        return (
          <StyledRow key={monthIndex} minHeight={"90px"}>
            <MonthLabelCell monthIndex={monthIndex} />
            {[leftPadding, ...monthCell, rightPadding]}
            <MonthLabelCell monthIndex={monthIndex} />
          </StyledRow>
        );
      })
    ) : (
      <></>
    );

  return (
    <ContentBox>
      <Header headerData={headerRow} />
      {months}
    </ContentBox>
  );
}
