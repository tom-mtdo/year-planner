import React from "react";
import { Button } from "@material-ui/core";
import { StyledH2 } from "../../lib/styles";
import {
  StyledSettingsBox,
  StyledSettingsHeader,
  StyledSettingsFooter,
  StyledSettingsBody,
} from "./Settings.style";
import SettingsBody from "./SettingsBody";
import styled from "styled-components";
import useSettings from './useSettings';
import { isTrue } from "../../data-lib/util/util";

// Form to collect settings from users
export default function Settings() {
  const {isEditing, isShown, resetSettings, closeSettings, applySettings} = useSettings();
  if (!isTrue(isShown)) { return <></>; }

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
