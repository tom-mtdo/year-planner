import { StyledH1 } from "../comp.style";

import { StyledCtrBox, StyledHeader } from "./Header.style";
import Checkbox from "../../data-lib/adapter/MU-adapter/checkbox/Checkbox";
import { Button } from "@material-ui/core";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { isNumber } from "lodash";
import { paths } from "../../util/constant";
import useYearPlanner from "../1-YearPlanner/useYearPlanner";
import useComp, { IComp } from "../../data-lib/hook/useComp";
import { compKeys } from "../../data-lib/util/constant";
import useSettings from "../settings/useSettings";

export enum CHANGE_YEAR_TYPE {
  OFFSET = "offset",
  VALUE = "value",
}

const SettingsCheck = () => {
  const props: IComp = {
    dataPath: paths.temp.settings[compKeys._isShown],
    id: "temp-settings-isShown",
  };
  const { compValue, compId, dataPath, compLabel, compOnChange } =
    useComp(props);
  const { resetData: resetSettingsForm } = useSettings();

  const myCompOnChange = (event: any) => {
    resetSettingsForm();
    compOnChange(event);
  };
  
  return (
    <Checkbox
      compId={compId}
      dataPath={dataPath}
      compValue={compValue}
      compLabel={compLabel}
      compOnChange={myCompOnChange}
    />
  );
};

export default function Header() {
  const { getValue } = useContext(DataContext);
  const { moveToYear } = useYearPlanner();
  const strActiveYear = getValue ? getValue(paths.runtime.year) : "";
  const activeYear = parseInt(strActiveYear);

  const changeYear = (value: number, valueType?: CHANGE_YEAR_TYPE) => {
    if (isNumber(value)) {
      const newYear =
        CHANGE_YEAR_TYPE.VALUE === valueType ? value : activeYear + value;
      moveToYear(`${newYear}`);
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
        <SettingsCheck />
        <strong>Settings</strong>
      </StyledCtrBox>
    </StyledHeader>
  );
}
