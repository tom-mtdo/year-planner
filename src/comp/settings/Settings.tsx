import React from "react";
import { Button } from "@material-ui/core";
import { StyledH2 } from "../../lib/styles";
import {
  StyledSettingsBox,
  StyledSettingsHeader,
  StyledSettingsFooter,
  StyledSettingsBody,
} from "./Settings.style";
import { BOOLEAN_VALUES } from "../../util/constant";
import SettingsBody from "./SettingsBody";
import styled from "styled-components";
import useSettings from './useSettings';

// Form to collect settings from users
export default function Settings() {
  const {isEditing, isShown, resetSettings, closeSettings, applySettings} = useSettings();
  if (BOOLEAN_VALUES.TRUE !== isShown) { return <></>; }

  return (
    <StyledSettingsBox>
      <StyledSettingsHeader isEditing={isEditing}>
        <StyledH2>Settings</StyledH2>
        <EdittingPrompt isShown={isEditing} />
      </StyledSettingsHeader>
      <StyledSettingsBody>
        <SettingsBody />
      </StyledSettingsBody>
      <StyledSettingsFooter>
        <Button variant="contained" onClick={applySettings}>
          Apply
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" onClick={resetSettings}>
          Reset
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" onClick={closeSettings}>
          Close
        </Button>
      </StyledSettingsFooter>
    </StyledSettingsBox>
  );
}

/////////////////////////////////////////////////////////////////////////////////////////
/**
 * prompt: "Editting..."
 */
const StyledPrompt = styled.p`
  padding: 0;
  margin: 0;
  text-align: left;
`;

const EdittingPrompt = (props: { isShown: Boolean }) => {
  return props.isShown ? <StyledPrompt>Editting...</StyledPrompt> : <></>;
};
