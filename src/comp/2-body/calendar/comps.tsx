import Cell from "../../../lib/cell/Cell";
import { MONTH_SHORT_NAME } from "../../../util/constant";
import { MONTH_LABEL_MIN_WIDTH } from "./Calendar";
import { StyledDayVoid } from "../day/Day.style";
import {StyledMonthLabelCell, StyledMonthLabel} from './Calendar.style';

// padding left & right
export interface IPadding {
  count: number;
}
export const Padding = ({ count }: IPadding) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(
      <Cell key={`${i}`} border={"solid 1px burlywood"}>
        <StyledDayVoid />
      </Cell>
    );
  }

  return <>{result}</>;
};

// Month label
export interface IMonthLabel {
  monthIndex: number;
}



export const MonthLabelCell = ({ monthIndex }: IMonthLabel) => {
  return (
    <Cell
      key={`month-label-${monthIndex}-L`}
      border={"solid 1px burlywood"}
      minWidth={MONTH_LABEL_MIN_WIDTH}
    >
      <StyledMonthLabelCell>
        <StyledMonthLabel>{MONTH_SHORT_NAME[monthIndex]}</StyledMonthLabel>
      </StyledMonthLabelCell>
    </Cell>
  );
};
