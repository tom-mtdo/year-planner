import { StyledH1 } from "../comp.style";

import { StyledBrief, StyledBriefBox, StyledCtrBox, StyledHeader } from "./Header.style";
import Checkbox from "../../data-lib/adapter/MU-adapter/checkbox/Checkbox";
import { Button } from "@material-ui/core";
import { get } from "lodash";
import { paths } from "../../util/constant";
import useComp, { IComp } from "../../data-lib/hook/useComp";
import { compKeys, BOOLEAN_STR_VALUES } from "../../data-lib/util/constant";
import useSettings from "../settings/useSettings";
import { IRuntimeArgs } from "../../data-lib/hook/useRuntime";
import { isTrue } from "../../data-lib/util/util";
import useOutBound from "../../hook/useOutBound";
import useHeader from "./useHeader";

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

const isQuickNavVisible = (args: IRuntimeArgs) => {
  const isSettingsShown = get(
    args.data,
    paths.temp.settings[compKeys._isShown]
  );
  return BOOLEAN_STR_VALUES.FALSE === isSettingsShown;
};

const PreviousYearBtn = (props: { changeYear: any }) => {
  const compProps = {
    id: "btnPreviousYear",
    isVisible: isQuickNavVisible,
  };

  const { compVisible } = useComp(compProps);

  return isTrue(compVisible) ? (
    <Button onClick={() => props.changeYear(-1)}>{"<"}</Button>
  ) : (
    <></>
  );
};

const NextYearBtn = (props: { changeYear: any }) => {
  const compProps = {
    id: "btnNextYear",
    isVisible: isQuickNavVisible,
  };

  const { compVisible } = useComp(compProps);

  return isTrue(compVisible) ? (
    <Button onClick={() => props.changeYear(1)}>{">"}</Button>
  ) : (
    <></>
  );
};

export default function Header() {
  const { activeYear, activeCountry, activeState, changeYear } = useHeader();
  const { saveData } = useOutBound();

  return (
    <StyledHeader>
      <PreviousYearBtn changeYear={changeYear} />
      <StyledH1>Year Planner - {activeYear}</StyledH1>
      <NextYearBtn changeYear={changeYear} />
      <StyledBriefBox>
        <StyledBrief>{activeCountry}, {activeState}</StyledBrief>
      </StyledBriefBox>
      <StyledCtrBox>
        <Button variant="outlined" onClick={saveData}>
          Save
        </Button>
        &nbsp;
        <SettingsCheck />
        <strong>Settings</strong>
      </StyledCtrBox>
    </StyledHeader>
  );
}
