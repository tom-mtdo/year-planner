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
import { SettingsPath, YearPath, BOOLEAN_VALUES, CountryPath, StatePath } from '../../util/constant';
import SettingsBody from "./SettingsBody";
import useYearPlanner from '../YearPlanner/useYearPlanner';

export interface ISettings {
  children: any;
}

export default function Settings(props: ISettings) {
  const { getValue } = useContext(DataContext);
  const { moveToYear } = useYearPlanner();
  const isShown = getValue
    ? getValue(SettingsPath.isShown)
    : false;

  const onApply = () => {
    if(!getValue) { return; }
    const activeYear = getValue(YearPath);
    const activeCountry = getValue(CountryPath);
    const activeState = getValue(StatePath);

    const settingsYear = getValue(SettingsPath.year);
    const settingsCountry = getValue(SettingsPath.country);
    const settingsState = getValue(SettingsPath.state);

    if (activeYear !== settingsYear || activeCountry !== settingsCountry || activeState !== settingsState) {
      moveToYear(settingsYear, settingsCountry, settingsState);
    }
  };
  
  const onCancel = () => {
    alert("Cancel settings...");
  };

  const onClose = () => {
    alert("Cancel settings...");
  };

  return BOOLEAN_VALUES.TRUE === isShown ? (
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
        &nbsp;&nbsp;
        <Button variant="contained" onClick={onCancel}>
          Reset
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </StyledSettingsFooter>
    </StyledSettingsBox>
  ) : (
    <></>
  );
}
