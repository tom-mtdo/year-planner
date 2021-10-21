import { StyledH1 } from "../comp.style";

import { StyledCtrBox, StyledHeader } from "./Header.style";
import Checkbox from "../../data-lib/adapter/MU-adapter/checkbox/Checkbox";
import { Button } from "@material-ui/core";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { isNumber } from "lodash";
import { getCalendar } from "../../util/util";
import { YearPath } from "../../util/constant";
import useYearPlanner from "../YearPlanner/useYearPlanner";

export enum CHANGE_YEAR_VALUE_TYPE {
  OFFSET = "offset",
  VALUE = "value",
}

export default function Header() {
  const { getCompValue, setCompValue } = useContext(DataContext);
  const { saveData, updateData } = useYearPlanner();
  const activeYear = getCompValue ? getCompValue(YearPath) : "";

  const changeYear = (value: number, valueType?: CHANGE_YEAR_VALUE_TYPE) => {
    if (setCompValue && value && isNumber(value)) {
      saveData();
      const newYear =
        CHANGE_YEAR_VALUE_TYPE.VALUE === valueType ? value : activeYear + value;
      const calendar = getCalendar(newYear);
      updateData(calendar, newYear);
    }
  };

  return (
    <StyledHeader>
      <Button onClick={() => changeYear(-1)}>{"<"}</Button>
      <StyledH1>Year Planner - {activeYear}</StyledH1>
      <Button onClick={() => changeYear(1)}>{">"}</Button>
      <StyledCtrBox>
        <Button variant="outlined" onClick={() => alert("Saving data...")}>
          Save
        </Button>
        &nbsp;
        <Checkbox
          compId={"settings.showSettings"}
          dataPath={"settings.showSettings"}
        />
        <strong>Settings</strong>
      </StyledCtrBox>
    </StyledHeader>
  );
}
