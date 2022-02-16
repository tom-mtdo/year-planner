import { MONTH_SHORT_NAME } from "../../../util/constant";
import { MONTH_LABEL_MIN_WIDTH } from "./Calendar";
import { StyledDayVoid } from "../day/Day.style";
import {StyledMonthLabelBox, StyledMonthLabel} from './Calendar.style';
import { StyledCell } from './Calendar.style';

// padding left & right
export interface IPadding {
  count: number;
}
export const Padding = ({ count }: IPadding) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(
      <StyledCell key={`${i}`} border={"solid 1px burlywood"}>
        <StyledDayVoid />
      </StyledCell>
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
    <StyledCell
      key={`month-label-${monthIndex}-L`}
      border={"solid 1px burlywood"}
      minWidth={MONTH_LABEL_MIN_WIDTH}
    >
      <StyledMonthLabelBox>
        <StyledMonthLabel>{MONTH_SHORT_NAME[monthIndex]}</StyledMonthLabel>
      </StyledMonthLabelBox>
    </StyledCell>
  );
};
