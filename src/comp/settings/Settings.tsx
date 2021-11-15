import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { StyledH2 } from "../../lib/styles";
import { useContext } from "react";
import {
  StyledSettingsBox,
  StyledSettingsHeader,
  StyledSettingsFooter,
  StyledSettingsBody,
} from "./Settings.style";
import { DataContext } from "../../data-lib/context/DataProvider";
import { paths, BOOLEAN_VALUES } from "../../util/constant";
import SettingsBody from "./SettingsBody";
import useYearPlanner from "../1-YearPlanner/useYearPlanner";
import useForm from "../../data-lib/hook/useForm";
import { FORM_STATUS } from "../../data-lib/hook/useForm";
import styled from "styled-components";

export default function Settings() {
  const { getValue } = useContext(DataContext);
  const { moveToYear } = useYearPlanner();
  const { resetForm } = useForm({ dataPath: paths.temp.settings._status });

  const isShown = getValue ? getValue(paths.temp.settings.isShown) : false;

  const onApply = () => {
    if (!getValue) {
      return;
    }
    const activeYear = getValue(paths.runtime.year);
    const activeCountry = getValue(paths.runtime.country);
    const activeState = getValue(paths.runtime.state);

    const settingsYear = getValue(paths.temp.settings.year);
    const settingsCountry = getValue(paths.temp.settings.country);
    const settingsState = getValue(paths.temp.settings.state);

    if (
      activeYear !== settingsYear ||
      activeCountry !== settingsCountry ||
      activeState !== settingsState
    ) {
      moveToYear(settingsYear, settingsCountry, settingsState);
    }
  };

  const onReset = () => {
    resetForm();
  };

  const onClose = () => {
    alert("Cancel settings...");
  };

  const domRef: any = React.createRef();

  useEffect(() => {
    // window.addEventListener('focusin', () => {alert('input')});
    if (domRef.current) {
      domRef.current.addEventListener("focusin", () => {
        alert("input");
      });
    }
  }, []);

  const isEditing =
    getValue && getValue(paths.temp.settings._status) === FORM_STATUS.DIRTY
      ? true
      : false;

  return BOOLEAN_VALUES.TRUE === isShown ? (
    <StyledSettingsBox ref={domRef}>
      <StyledSettingsHeader isEditing={isEditing}>
        <StyledH2>Settings</StyledH2>
        <EdittingPrompt isShown={isEditing} />
      </StyledSettingsHeader>
      <StyledSettingsBody>
        <SettingsBody />
      </StyledSettingsBody>
      <StyledSettingsFooter>
        <Button variant="contained" onClick={onApply}>
          Apply
        </Button>
        &nbsp;&nbsp;
        <Button variant="contained" onClick={onReset}>
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
