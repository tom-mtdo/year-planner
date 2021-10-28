import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import Select from "../../data-lib/adapter/MU-adapter/select/Select";
import { VSpacer } from "../../lib/styles";
import { CountriesToSelect, paths } from "../../util/constant";
import { useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { stateToSelect } from "../../util/util";
import useHandler from '../../data-lib/hook/useHandler';

const StateSelect = () => {
  const { getValue } = useContext(DataContext);
  const country = getValue ? getValue(paths.temp.settings.country) : "";

  if (!country) {
    return <></>;
  }

  const options = getValue && country ? stateToSelect(country) : [];
  return (
    <Select
      compId="state"
      dataPath={paths.temp.settings.state}
      options={options}
      label="State"
    />
  );
};

const CountrySelect = () => {
  const {onChange: defaultOnChange} = useHandler();
  const {setValue} = useContext(DataContext);

  const onChange = (event: any) => {
    if(setValue) {
      setValue(paths.temp.settings.state, '');
    }
    defaultOnChange(event);
  };

  return (
    <Select
      compId="country"
      dataPath={paths.temp.settings.country}
      options={CountriesToSelect}
      label="Country"
      onChange={onChange}
    />
  );
};

function SettingsBody() {
  return (
    <>
      <TextField
        compId={"runtime-dayModal-note"}
        dataPath={paths.temp.settings.year}
        label={"Year"}
      />
      <VSpacer />
      <CountrySelect />
      <VSpacer />
      <StateSelect />
    </>
  );
}

export default SettingsBody;
