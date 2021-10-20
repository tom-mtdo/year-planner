import { StyledH1 } from "../comp.style";

import { StyledCtrBox, StyledHeader } from "./Header.style";
import Checkbox from "../../data-lib/adapter/MU-adapter/checkbox/Checkbox";
import { Button } from "@material-ui/core";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { isNumber } from "lodash";
import { getCalendar } from "../../util/util";
import { CalendarPath, YearPath } from "../../util/constant";

export enum CHANGE_YEAR_VALUE_TYPE {
  OFFSET = "offset",
  VALUE = "value",
}

export default function Header() {
  const { getCompValue, setCompValue } = useContext(DataContext);
  const activeYear = getCompValue ? getCompValue(YearPath) : "";

  const changeYear = (value: number, valueType?: CHANGE_YEAR_VALUE_TYPE) => {
    
    if (setCompValue && value && isNumber(value)) {
      // Todo: save user data
      const calendar = getCalendar(activeYear);
      // Todo: combine these 2 set value into one
      setCompValue(
        YearPath,
        CHANGE_YEAR_VALUE_TYPE.VALUE === valueType ? value : activeYear + value
      );
      setCompValue(CalendarPath, calendar);

      // Todo: load user data
      // put this code into event handler when user change year
      // useEffect(() => {
      //   if (!isEmpty(userContent.current) && getCompValue && setCompValue) {
      //     const calendar = getCompValue(CalendarPath);
      //     const draft = cloneDeep(calendar);
      //     Object.keys(userContent.current).forEach((strDate, index) => {
      //       const mm = parseInt(strDate.substr(4, 2)) - 1;
      //       const dd = parseInt(strDate.substr(6, 2)) - 1;
      //       if (isNumber(mm) && isNumber(dd) && draft[mm][dd]) {
      //         draft[mm][dd].note = userContent.current[strDate].note;
      //       }
      //     });
      //     setCompValue(CalendarPath, draft);
      //   }
      // }, [getCompValue, setCompValue]);
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
