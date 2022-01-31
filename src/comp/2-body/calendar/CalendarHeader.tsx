import Cell from "../../../lib/cell/Cell";
import Row from "../../../lib/row/Row";
import DayLabel from "../day-label/DayLabel";
import { MONTH_LABEL_MIN_WIDTH } from "./Calendar";

export interface IHeader {
  headerData: string[];
}

export const Header = (props: IHeader) => {
  const { headerData } = props;

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
  let headerCell: any;
  if (headerData && Array.isArray(headerData)) {
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

export default Header;
