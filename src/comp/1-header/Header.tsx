import { StyledH1, StyledH1Static, StyledTitleBox, StyledButton } from "./Header.style";

import {
  StyledBrief,
  StyledBriefBox,
  StyledCtrBox,
  StyledHeader,
} from "./Header.style";
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
import { styled } from '@material-ui/styles';

export enum CHANGE_YEAR_TYPE {
  OFFSET = "offset",
  VALUE = "value",
}

const MyNavigateBeforeIcon = styled(NavigateBeforeIcon)({
  color: 'mediumvioletred',
});

const MyNavigateNextIcon = styled(NavigateNextIcon)({
  color: 'mediumvioletred',
});

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
      <MyNavigateBeforeIcon />
    </IconButton>
  ) : (
    <></>
  );
};

const CurrentYearBtn = (props: { handleClick: any, label: string }) => {
  
  const compProps = {
    id: "btnCurrentYear",
    isVisible: isQuickNavVisible,
  };

  const { compVisible } = useComp(compProps);

  return isTrue(compVisible) ? (
    <StyledButton onClick={() => props.handleClick({ buttonName: ButtonNames.TODAY })}>
      <StyledH1>{props.label}</StyledH1>
      </StyledButton>
  ) : (
    <></>
  );
};

const CurrentYearTitle = (props: {label: string}) => {
  const compProps = {
    id: "currentYearStaticTitle",
    isVisible: isQuickNavVisible,
  };

  const { compVisible } = useComp(compProps);
  return !compVisible ? <StyledH1Static>{props.label}</StyledH1Static> : <></>
}


const NextYearBtn = (props: { changeYear: any }) => {
  const compProps = {
    id: "btnNextYear",
    isVisible: isQuickNavVisible,
  };

  const { compVisible } = useComp(compProps);

  return isTrue(compVisible) ? (
    <IconButton aria-label="Save" onClick={() => props.changeYear(1)}>
      <MyNavigateNextIcon />
    </IconButton>
  ) : (
    <></>
  );
};

const TitleBox = () => {
  const { activeYear, changeYear, handleClick } = useHeader();
  const strTitle = `Year Planner - ${activeYear}`;
  return (
    <StyledTitleBox>
      <PreviousYearBtn changeYear={changeYear} />
      <CurrentYearBtn handleClick={handleClick} label={strTitle} />
      <CurrentYearTitle label={strTitle}/>
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
