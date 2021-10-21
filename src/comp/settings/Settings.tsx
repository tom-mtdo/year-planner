import { Button } from "@material-ui/core";
import React from "react";
import { StyledH2 } from "../../lib/styles";
import { useContext } from 'react';
import {
  StyledSettingsBox,
  StyledSettingsHeader,
  StyledSettingsFooter,
  StyledSettingsBody
} from "./Settings.style";
import { DataContext } from "../../data-lib/context/DataProvider";

export interface ISettings {
  children: any;
}

export const SettingsPath = 'settings';
export const ShowSettingsPath = `${SettingsPath}.showSettings`;

export default function Modal(props: ISettings) {
  const { children } = props;
  const {getCompValue} = useContext(DataContext);
  const isShown = getCompValue ? getCompValue(ShowSettingsPath) : false;

  const onApply = () => {
    alert('Applying settings...');
  };
  const onCancel = () => {
    alert('Cancel settings...');
  };

  return !isShown ? (
    <></>
  ) : (
    <StyledSettingsBox>
        <StyledSettingsHeader>
          <StyledH2>Settings</StyledH2>
        </StyledSettingsHeader>
        <StyledSettingsBody>
          {children}
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
  );
}

Modal.defaultProps = {
  isShown: true,
  onConfirm: () => alert("Close modal"),
};
