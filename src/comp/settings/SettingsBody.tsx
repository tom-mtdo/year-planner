import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import Select from "../../data-lib/adapter/MU-adapter/select/Select";
import { VSpacer } from "../../lib/styles";
import { CountriesToSelect, paths } from "../../util/constant";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { stateToSelect } from "../../util/util";
import { IComp } from '../../data-lib/hook/useComp';
import useComp from '../../data-lib/hook/useComp';

const StateSelect = () => {
  const props: IComp = {
    dataPath: paths.temp.settings.state,
    id: "temp-settings-state",
    label: "State"
  }
  const { compValue, compId, dataPath, compLabel, compOnChange } = useComp(props);

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
      compOnChange={compOnChange}
    />
  );
};

const CountrySelect = () => {
  const props: IComp = {
    dataPath: paths.temp.settings.country,
    id: "temp-settings-country",
    label: "Country"
  }
  const { compValue, compId, dataPath, compLabel, compOnChange } = useComp(props);
  const { setValue } = useContext(DataContext);

  const onChange = (event: any) => {
    if (setValue) {
      setValue(paths.temp.settings.state, "");
    }
    compOnChange(event);
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
  const props: IComp = {
    dataPath: paths.temp.settings.year,
    id: "temp-settings-year",
    label: "Year"
  }
  const { compValue, compId, dataPath, compLabel, compOnChange } = useComp(props);

  return (
    <TextField
      compId={compId}
      dataPath={dataPath}
      compValue={compValue}
      compLabel={compLabel}
      compOnChange={compOnChange}
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
