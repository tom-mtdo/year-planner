import { StyledH1, StyledTitleBox } from "./Header.style";

import {
  StyledBrief,
  StyledBriefBox,
  StyledCtrBox,
  StyledHeader,
} from "./Header.style";
import { Button } from "@material-ui/core";
import { get } from "lodash";
import { paths } from "../../util/constant";
import useComp from "../../data-lib/hook/useComp";
import { compKeys, BOOLEAN_STR_VALUES } from "../../data-lib/util/constant";
import { IRuntimeArgs } from "../../data-lib/hook/useRuntime";
import { isTrue } from "../../data-lib/util/util";
import useHeader, { ButtonNames } from "./useHeader";
import { IconButton } from "@material-ui/core";
import SettingsIcon from "@mui/icons-material/Settings";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

export enum CHANGE_YEAR_TYPE {
  OFFSET = "offset",
  VALUE = "value",
}

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
    <IconButton aria-label="Save" onClick={() => props.changeYear(-1)}>
      <NavigateBeforeIcon />
    </IconButton>
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
    <IconButton aria-label="Save" onClick={() => props.changeYear(1)}>
      <NavigateNextIcon />
    </IconButton>
  ) : (
    <></>
  );
};

const TitleBox = () => {
  const { activeYear, changeYear, handleClick } = useHeader();
  return (
    <StyledTitleBox>
      <PreviousYearBtn changeYear={changeYear} />
      <Button
        variant="text"
        onClick={() => handleClick({ buttonName: ButtonNames.TODAY })}
      >
        <StyledH1>Year Planner - {activeYear}</StyledH1>
      </Button>
      <NextYearBtn changeYear={changeYear} />
    </StyledTitleBox>
  );
};

const ControlBox = () => {
  const { handleClick } = useHeader();
  return (
    <StyledCtrBox>
      <IconButton
        aria-label="Save"
        size="small"
        onClick={() => handleClick({ buttonName: ButtonNames.SETTINGS })}
      >
        <SettingsIcon />
      </IconButton>
    </StyledCtrBox>
  );
};

export default function Header() {
  const { activeCountry, activeState } = useHeader();

  // This comp doesn't update state so can stay here
  const BriefBox = () => {
    return (
      <StyledBriefBox>
        <StyledBrief>
          {activeCountry}, {activeState}
        </StyledBrief>
      </StyledBriefBox>
    );
  };

  return (
    <StyledHeader>
      <TitleBox />
      <BriefBox />
      <ControlBox />
    </StyledHeader>
  );
}
