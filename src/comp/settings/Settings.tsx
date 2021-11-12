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
import { paths, BOOLEAN_VALUES } from '../../util/constant';
import SettingsBody from "./SettingsBody";
import useYearPlanner from '../1-YearPlanner/useYearPlanner';

export interface ISettings {
  children: any;
}

export default function Settings(props: ISettings) {
  const { getValue } = useContext(DataContext);
  const { moveToYear } = useYearPlanner();
  const isShown = getValue
    ? getValue(paths.temp.settings.isShown)
    : false;

  const onApply = () => {
    if(!getValue) { return; }
    const activeYear = getValue(paths.runtime.year);
    const activeCountry = getValue(paths.runtime.country);
    const activeState = getValue(paths.runtime.state);

    const settingsYear = getValue(paths.temp.settings.year);
    const settingsCountry = getValue(paths.temp.settings.country);
    const settingsState = getValue(paths.temp.settings.state);

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
