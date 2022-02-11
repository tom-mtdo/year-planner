import React from "react";
import { ContentBox } from "./Calendar.style";
import Row from "../../../lib/row/Row";
import Cell from "../../../lib/cell/Cell";
import Day from "../day/Day";
import { countPadding, DayInfo } from "../../../util/util";
import Header from "./CalendarHeader";
import { useCalendar } from "./useCalendar";
import { Padding, MonthLabelCell } from "./comps";
export const MONTH_LABEL_MIN_WIDTH = "0";

export default function Calendar() {
  const {
    headerRow,
    calendar,
    isCurrentYear,
    currentMonth,
    currentDate,
    addNoteToADay,
  } = useCalendar();

  const months =
    calendar && Array.isArray(calendar) ? (
      calendar.map((aMonth: any, monthIndex: any) => {
        const monthCell = aMonth.map((aDay: DayInfo, dayIndex: any) => {
          // return a day
          const isToday =
            isCurrentYear &&
            monthIndex === currentMonth &&
            dayIndex === currentDate - 1
              ? true
              : false;
          return (
            <Cell key={dayIndex}>
              <Day
                addNote={addNoteToADay}
                dayInfo={aDay}
                isCurrent={isToday}
              ></Day>
            </Cell>
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
          <Row key={monthIndex} minHeight={'90px'}>
            <MonthLabelCell monthIndex={monthIndex} />
            {[leftPadding, ...monthCell, rightPadding]}
            <MonthLabelCell monthIndex={monthIndex} />
          </Row>
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
