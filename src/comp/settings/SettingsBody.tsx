import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import Select from "../../data-lib/adapter/MU-adapter/select/Select";
import { VSpacer } from "../../lib/styles";
import { CountriesToSelect, names, paths } from "../../util/constant";
import { useContext } from 'react';
import { DataContext } from "../../data-lib/context/DataProvider";
import { stateToSelect } from "../../util/util";
import { IComp } from "../../data-lib/hook/useComp";
import useComp from "../../data-lib/hook/useComp";
import { compKeys } from "../../data-lib/util/constant";
import { pathToId, getSiblingValue, isTrue } from "../../data-lib/util/util";
import { IRuntimeArgs } from "../../data-lib/hook/useRuntime";

const settingsId = pathToId(paths.temp.settings[compKeys._path]);

// Components in this page show how to use dynamic id & data path
// Dynamic id & data path are useful for repeating items
// To use static id & path, have a look at Header component

// Year text field
const YearTextField = (otherProps: any) => {
  const props: IComp = {
    parentId: settingsId,
    parentDataPath: paths.temp.settings[compKeys._path],
    name: names.year,

    label: "Year",
    formDataPath: paths.temp.settings[compKeys._path],
    ...otherProps,
  };
  const {
    compValue,
    compId,
    compDataPath,
    compLabel,
    compError,
    compOnBlur,
    compOnChangeInForm,
    setCompRef
  } = useComp(props);

  return (
    <TextField
      {...otherProps}
      setCompRef={setCompRef}
      compName={props.name}
      compId={compId}
      compDataPath={compDataPath}
      compValue={compValue}
      compLabel={compLabel}
      compOnChange={compOnChangeInForm}
      compOnBlur={compOnBlur}
      compError={compError}
    />
  );
};

// Country select
const CountrySelect = () => {
  const props: IComp = {
    parentId: settingsId,
    parentDataPath: paths.temp.settings[compKeys._path],
    name: names.country,

    label: "Country",
    formDataPath: paths.temp.settings[compKeys._path],
  };
  const {
    compValue,
    compId,
    compDataPath,
    compLabel,
    compOnBlur,
    compError,
    compOnChangeInForm,
  } = useComp(props);
  const { setValue } = useContext(DataContext);

  const onChange = (event: any) => {
    if (setValue) {
      setValue(paths.temp.settings.state, "");
    }
    compOnChangeInForm(event);
  };

  return (
    <Select
      compId={compId}
      compDataPath={compDataPath}
      compValue={compValue}
      compOptions={CountriesToSelect}
      compLabel={compLabel}
      compOnBlur={compOnBlur}
      compOnChange={onChange}
      compError={compError}
    />
  );
};

// State
// State -- Logic to generate dynamic values & props is separated from comp and handle by lib
const isStateShown = (param: IRuntimeArgs) => {
  const country = getSiblingValue(
    param.compDataPath,
    names.country,
    param.data
  );
  return Boolean(country);
};

const stateOptions = (param: IRuntimeArgs) => {
  const country = getSiblingValue(
    param.compDataPath,
    names.country,
    param.data
  );
  return Boolean(country) ? stateToSelect(country) : [];
};

// State -- comp
const StateSelect = () => {
  const props: IComp = {
    parentId: settingsId,
    parentDataPath: paths.temp.settings[compKeys._path],
    name: names.state,

    label: "State",
    formDataPath: paths.temp.settings[compKeys._path],
    isVisible: isStateShown,
    dynaProp: stateOptions,
  };
  const {
    compVisible,
    compValue,
    compId,
    compDataPath,
    compLabel,
    compOnBlur,
    compError,
    compDynaProp,
    compOnChangeInForm,
  } = useComp(props);

  if (!isTrue(compVisible)) {
    return <></>;
  }

  return (
    <Select
      compId={compId}
      compDataPath={compDataPath}
      compValue={compValue}
      compOptions={compDynaProp}
      compLabel={compLabel}
      compOnBlur={compOnBlur}
      compOnChange={compOnChangeInForm}
      compError={compError}
    />
  );
};

// Main
function SettingsBody() {
  return (
    <>
      <YearTextField />
      <VSpacer />
      <CountrySelect />
      <VSpacer />
      <StateSelect />
    </>
  );
}

export default SettingsBody;
