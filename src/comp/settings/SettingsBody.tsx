import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import Select from "../../data-lib/adapter/MU-adapter/select/Select";
import { VSpacer } from "../../lib/styles";
import { CountriesToSelect, names, paths } from "../../util/constant";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { stateToSelect } from "../../util/util";
import { IComp } from '../../data-lib/hook/useComp';
import useComp from '../../data-lib/hook/useComp';
import { compKeys } from '../../data-lib/util/constant';
import { settings as settingsValidation } from './Settings.validation';

const StateSelect = () => {
  const props: IComp = {
    dataPath: paths.temp.settings.state,
    id: "temp-settings-state",
    label: "State",
    formDataPath: paths.temp.settings[compKeys._path]
  }
  const { compValue, compId, dataPath, compLabel, compOnChangeInForm } = useComp(props);

  const { getValue } = useContext(DataContext);
  const country = getValue ? getValue(paths.temp.settings.country) : "";

  if (!country) {
    return <></>;
  }

  const options = Boolean(country) ? stateToSelect(country) : [];
  return (
    <Select
      compId={compId}
      dataPath={dataPath}
      compValue={compValue}
      compOptions={options}
      compLabel={compLabel}
      compOnChange={compOnChangeInForm}
    />
  );
};

const CountrySelect = () => {
  const props: IComp = {
    dataPath: paths.temp.settings.country,
    id: "temp-settings-country",
    label: "Country",
    formDataPath: paths.temp.settings[compKeys._path]
  }
  const { compValue, compId, dataPath, compLabel, compOnChangeInForm } = useComp(props);
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
      dataPath={dataPath}
      compValue={compValue}
      compOptions={CountriesToSelect}
      compLabel={compLabel}
      compOnChange={onChange}
    />
  );
};

const YearTextField = () => {
  const compProps: IComp = {
    dataPath: paths.temp.settings.year,
    id: "temp-settings-year",
    label: "Year",
    formDataPath: paths.temp.settings[compKeys._path],
    validation: settingsValidation[names.year]
  }
  const { compValue, compId, dataPath, compLabel, compError, compOnBlur, compOnChangeInForm } = useComp(compProps);

  return (
    <TextField
      compName={names.year}
      compId={compId}
      dataPath={dataPath}
      compValue={compValue}
      compLabel={compLabel}
      compOnChange={compOnChangeInForm}
      compOnBlur={compOnBlur}
      compError={compError}
    />
  );
};

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
