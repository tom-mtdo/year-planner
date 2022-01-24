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
import { paths, BOOLEAN_VALUES } from "../../util/constant";
import SettingsBody from "./SettingsBody";
import useYearPlanner from "../1-YearPlanner/useYearPlanner";
import useForm from "../../data-lib/hook/useForm";
import { FORM_STATUS } from "../../data-lib/hook/useForm";
import styled from "styled-components";
import useSettings from './useSettings';
import { compKeys, BOOLEAN_STR_VALUES } from '../../data-lib/util/constant';
import {yearPlanner as validation} from '../../util/validation';
import { isEmpty } from "../../data-lib/util/validation";

export default function Settings() {
  const { getValue, setValue } = useContext(DataContext);
  const { moveToYear } = useYearPlanner();
  const { resetForm, validateForm } = useForm();
  const {resetData} = useSettings();

  const isShown = getValue ? getValue(paths.temp.settings._isShown) : false;

  const onApply = () => {
    const errors = validateForm(paths.temp.settings[compKeys._path], validation);
    if (!isEmpty(errors)) { return; }

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
      resetForm(paths.temp.settings._path);
    }
  };

  const onReset = () => {
    resetData();
    resetForm(paths.temp.settings._path);
  };

  const onClose = () => {
    if (!getValue || !setValue) { return; }
    
    resetData();
    const isShown = getValue(paths.temp.settings[compKeys._isShown]);
    if (BOOLEAN_STR_VALUES.FALSE !== isShown) {
      setValue(paths.temp.settings[compKeys._isShown], BOOLEAN_STR_VALUES.FALSE);
    }
  };

  const isEditing =
    getValue && getValue(paths.temp.settings._status) === FORM_STATUS.DIRTY
      ? true
      : false;

  return BOOLEAN_VALUES.TRUE === isShown ? (
    <StyledSettingsBox>
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
