import { StyledH1 } from "../comp.style";

import { StyledCtrBox, StyledHeader } from "./Header.style";
import Checkbox from "../../data-lib/adapter/MU-adapter/checkbox/Checkbox";
import { Button } from "@material-ui/core";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { get, isNumber } from "lodash";
import { paths } from "../../util/constant";
import useYearPlanner from "../1-YearPlanner/useYearPlanner";
import useComp, { IComp } from "../../data-lib/hook/useComp";
import { compKeys, BOOLEAN_STR_VALUES } from '../../data-lib/util/constant';
import useSettings from "../settings/useSettings";
import { IRuntimeArgs } from "../../data-lib/hook/useRuntime";
import { isTrue } from "../../data-lib/util/util";

export enum CHANGE_YEAR_TYPE {
  OFFSET = "offset",
  VALUE = "value",
}

const SettingsCheck = () => {
  const props: IComp = {
    // parentId: settingsId,
    // parentDataPath: paths.temp.settings[compKeys._path],
    // name: names._isShown,
  
    dataPath: paths.temp.settings[compKeys._isShown],
    id: "temp-settings-isShown",
  };
  const { compValue, compId, compDataPath, compLabel, compOnChange } =
    useComp(props);
  const { resetSettings } = useSettings();

  const myCompOnChange = (event: any) => {
    resetSettings();
    compOnChange(event);
  };

  return (
    <Checkbox
      compId={compId}
      compDataPath={compDataPath}
      compValue={compValue}
      compLabel={compLabel}
      compOnChange={myCompOnChange}
    />
  );
};

const isVisible = (args: IRuntimeArgs) => {
  const isSettingsShown = get(args.data, paths.temp.settings[compKeys._isShown]);
  return BOOLEAN_STR_VALUES.FALSE === isSettingsShown;
};

const PreviousYearBtn = (props: {changeYear: any}) => {
  const compProps = {
    id: "btnPreviousYear",
    isVisible,
  };

  const { compVisible } = useComp(compProps);

  return isTrue(compVisible) ? <Button onClick={() => props.changeYear(-1)}>{"<"}</Button> : <></>;
};

const NextYearBtn = (props: {changeYear: any}) => {
  const compProps = {
    id: "btnNextYear",
    isVisible,
  };

  const { compVisible } = useComp(compProps);

  return isTrue(compVisible) ? <Button onClick={() => props.changeYear(1)}>{">"}</Button> : <></>;
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
      <PreviousYearBtn changeYear={changeYear} />
      <StyledH1>Year Planner - {activeYear}</StyledH1>
      <NextYearBtn changeYear={changeYear} />
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
