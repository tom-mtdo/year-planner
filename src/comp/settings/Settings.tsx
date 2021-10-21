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
import { SettingsPath } from "../../util/constant";
import SettingsBody from "./SettingsBody";

export interface ISettings {
  children: any;
}

export default function Settings(props: ISettings) {
  const { getCompValue } = useContext(DataContext);
  const isShown = getCompValue
    ? getCompValue(SettingsPath.showSettings)
    : false;

  const onApply = () => {
    alert("Applying settings...");
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
