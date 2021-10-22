import { Button } from "@material-ui/core";
import React from "react";
import { StyledH2 } from "../../lib/styles";
import { useContext } from "react";
import {
  StyledSettingsBox,
  StyledSettingsHeader,
  StyledSettingsFooter,
  StyledSettingsBody,
} from "./Settings.style";
import { DataContext } from "../../data-lib/context/DataProvider";
import { SettingsPath, YearPath } from '../../util/constant';
import SettingsBody from "./SettingsBody";
import useYearPlanner from '../YearPlanner/useYearPlanner';

export interface ISettings {
  children: any;
}

export default function Settings(props: ISettings) {
  const { getValue } = useContext(DataContext);
  const { moveToYear } = useYearPlanner();
  const isShown = getValue
    ? getValue(SettingsPath.showSettings)
    : false;

  const onApply = () => {
    if(!getValue) { return; }
    const activeYear = getValue(YearPath);
    const settingsYear = getValue(SettingsPath.year);
    if (activeYear !== settingsYear) {
      moveToYear(settingsYear);
    }
  };
  
  const onCancel = () => {
    alert("Cancel settings...");
  };

  return true === isShown ? (
    <StyledSettingsBox>
      <StyledSettingsHeader>
        <StyledH2>Settings</StyledH2>
      </StyledSettingsHeader>
      <StyledSettingsBody>
        <SettingsBody />
      </StyledSettingsBody>
      <StyledSettingsFooter>
        <Button variant="contained" onClick={onApply}>
          Apply
        </Button>
        <Button variant="contained" onClick={onCancel}>
          Cancel
        </Button>
      </StyledSettingsFooter>
    </StyledSettingsBox>
  ) : (
    <></>
  );
}
