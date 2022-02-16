import { StyledCell, StyledRow } from "./Calendar.style";
import DayLabel from "../day-label/DayLabel";
import { MONTH_LABEL_MIN_WIDTH } from "./Calendar";

export interface IHeader {
  headerData: string[];
}

export const Header = (props: IHeader) => {
  const { headerData } = props;

  let cornerR = (
    <StyledCell
      key={"corner-r"}
      border={"solid 1px burlywood"}
      minWidth={MONTH_LABEL_MIN_WIDTH}
    >
      <DayLabel colIndex={-5}></DayLabel>
    </StyledCell>
  );

  // header
  let headerCell: any;
  if (headerData && Array.isArray(headerData)) {
    headerCell = headerData.map((dayLabel, index) => {
      return (
        <StyledCell key={index}>
          <DayLabel colIndex={index}>
            <span>{dayLabel}</span>
          </DayLabel>
        </StyledCell>
      );
    });
  }
  
  const headerRow = (
    <StyledRow key={"label"} minHeight={"unset"}>
      {[...headerCell, cornerR]}
    </StyledRow>
  );

  return headerRow;
};

export default Header;
