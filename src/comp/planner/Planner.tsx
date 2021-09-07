import React from "react";
import { ContentBox } from "./Planner.style";
import Row from "../../lib/row/Row";
import Cell from "../../lib/cell/Cell";
import Day from "../day/Day";
import { MONTH_SHORT_NAME, TOTAL_COLUMN } from "../../util/constant";
import usePlanner from "../../hook/usePlanner";
import { DayInfo } from "../../util/util";
import DayLabel from "../day-label/DayLabel";
import MonthLabel from "../month-label/MonthLabel";

export const MONTH_LABEL_MIN_WIDTH = "70px";

export const getPadding = (aMonth: DayInfo[]) => {
  // padding left
  const firstDay = aMonth[0].date.getDay();
  const leftIndent = firstDay === 0 ? 6 : firstDay - 1;
  const paddingLeft = [];
  for (let i = 0; i < leftIndent; i++) {
    paddingLeft.push(
      <Cell key={`l-${i}`} border={"solid 1px burlywood"}>
        <Day dayInfo={undefined}></Day>
      </Cell>
    );
  }

  // padding right
  const paddingRight = [];
  const restNum = TOTAL_COLUMN - 1 - leftIndent - aMonth.length;
  for (let i = 0; i < restNum; i++) {
    paddingRight.push(
      <Cell key={`r-${i}`} border={"solid 1px burlywood"}>
        <Day dayInfo={undefined}></Day>
      </Cell>
    );
  }

  return { paddingLeft, paddingRight };
};

export const getHeaderRow = (headerData: string[]) => {
  // corner
  let cornerL = (
    <Cell
      key={"corner-l"}
      border={"solid 1px burlywood"}
      minWidth={MONTH_LABEL_MIN_WIDTH}
    >
      <DayLabel colIndex={-5}></DayLabel>
    </Cell>
  );
  let cornerR = (
    <Cell
      key={"corner-r"}
      border={"solid 1px burlywood"}
      minWidth={MONTH_LABEL_MIN_WIDTH}
    >
      <DayLabel colIndex={-5}></DayLabel>
    </Cell>
  );

  // header
  let headerCell: any = [];
  if (Array.isArray(headerData)) {
    headerCell = headerData.map((dayLabel, index) => {
      return (
        <Cell key={index}>
          <DayLabel colIndex={index}>
            <span>{dayLabel}</span>
          </DayLabel>
        </Cell>
      );
    });
  }
  const headerRow = (
    <Row key={"label"} minHeight={"unset"}>
      {[cornerL, ...headerCell, cornerR]}
    </Row>
  );

  return headerRow;
};

export const getContentRow = (contentData: any[][] | undefined) => {
  if (!contentData) {
    return undefined;
  }
  const toDay = new Date();
  const month = toDay.getMonth(); // 0 - 11
  const date = toDay.getDate(); // 1 - 31

  const months = contentData.map((aMonth, monthIndex) => {
    const monthLabelL = (
      <Cell
        key={`month-label-${monthIndex}-L`}
        border={"solid 1px burlywood"}
        minWidth={MONTH_LABEL_MIN_WIDTH}
      >
        <MonthLabel>
          <span style={{ width: "100%", fontWeight: "bold" }}>
            <h2>{MONTH_SHORT_NAME[monthIndex]}</h2>
          </span>
        </MonthLabel>
      </Cell>
    );

    const monthLabelR = (
      <Cell
      key={`month-label-${monthIndex}-R`}
        border={"solid 1px burlywood"}
        minWidth={MONTH_LABEL_MIN_WIDTH}
      >
        <MonthLabel>
          <span style={{ width: "100%", fontWeight: "bold" }}>
            <h2>{MONTH_SHORT_NAME[monthIndex]}</h2>
          </span>
        </MonthLabel>
      </Cell>
    );
    const monthCell = aMonth.map((aDay: DayInfo, dayIndex) => {
      // return a day
      if (!aDay?.date) {
        // void day
        return (
          <Cell key={dayIndex} border={"solid 1px burlywood"}>
            <Day dayInfo={aDay}></Day>
          </Cell>
        );
      } else if (monthIndex === month && dayIndex === date - 1) {
        //  toDay
        return (
          <Cell key={dayIndex}>
            <Day dayInfo={aDay} isCurrent={true}></Day>
          </Cell>
        );
      } else {
        // Other days
        return (
          <Cell key={dayIndex}>
            <Day dayInfo={aDay}></Day>
          </Cell>
        );
      }
    });

    const padding = getPadding(aMonth);
    // return a month
    return (
      <Row key={monthIndex}>
        {[
          monthLabelL,
          ...padding.paddingLeft,
          ...monthCell,
          ...padding.paddingRight,
          monthLabelR
        ]}
      </Row>
    );
  });

  return months;
};

export default function Body() {
  const toDay = new Date();
  const year = toDay.getFullYear(); // 2021
  const { content } = usePlanner({ year });
  
  const headerRow = getHeaderRow(content?.header);
  const months = getContentRow(content?.content);

  const planner = [headerRow];
  if (Array.isArray(months)) {
    planner.push(...months);
  }

  return <ContentBox>{planner}</ContentBox>;
}
