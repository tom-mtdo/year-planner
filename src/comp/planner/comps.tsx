import Cell from "../../lib/cell/Cell";
import { MONTH_SHORT_NAME } from "../../util/constant";
import Day from "../day/Day";
import { MONTH_LABEL_MIN_WIDTH } from "./Planner";
import MonthLabel from "../month-label/MonthLabel";

// padding left & right
export interface IPadding {
  count: number;
}
export const Padding = ({ count }: IPadding) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(
      <Cell key={`l-${i}`} border={"solid 1px burlywood"}>
        <Day dayInfo={undefined}></Day>
      </Cell>
    );
  }

  return <>{result}</>;
};

// Month label
export interface IMonthLabel {
  monthIndex: number;
}
export const MonthLabelCell = ({monthIndex}: IMonthLabel) => {

  return(
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
};