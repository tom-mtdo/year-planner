import React from "react";
import { ContentBox } from "./Planner.style";
import Row from "../../lib/row/Row";
import Cell from "../../lib/cell/Cell";
import Day from "../day/Day";
import { DayInfo } from "../../util/util";
import Header from "./Header";
import { countPadding, useCompHook } from "./compHook";
import { Padding, MonthLabelCell } from "./comps";
export const MONTH_LABEL_MIN_WIDTH = "70px";

export default function Planner() {
  const { content, month, date, onDoubleClick } = useCompHook();

  const months = content?.content.map((aMonth: any, monthIndex: any) => {
    const monthCell = aMonth.map((aDay: DayInfo, dayIndex: any) => {
      // return a day
      const isToday =
        monthIndex === month && dayIndex === date - 1 ? true : false;
      return (
        <Cell key={dayIndex}>
          <Day
            onDoubleClick={onDoubleClick}
            dayInfo={aDay}
            isCurrent={isToday}
          ></Day>
        </Cell>
      );
    });

    const paddingCounts = countPadding(aMonth);
    const leftPadding = <Padding key='left-padding' count={paddingCounts.left} />;
    const rightPadding = <Padding key='right-padding' count={paddingCounts.right} />;

    // return a month
    return (
      <Row key={monthIndex}>
        <MonthLabelCell monthIndex={monthIndex} />
        {[leftPadding, ...monthCell, rightPadding]}
        <MonthLabelCell monthIndex={monthIndex} />
      </Row>
    );
  });

  return (
    <ContentBox>
      <Header headerData={content?.header} />
      {months}
    </ContentBox>
  );
}
