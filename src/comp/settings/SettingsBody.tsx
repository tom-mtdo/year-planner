import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import Select from "../../data-lib/adapter/MU-adapter/select/Select";
import { VSpacer } from "../../lib/styles";
import { CountriesToSelect, SettingsPath } from "../../util/constant";
import { useContext } from 'react';
import { DataContext } from '../../data-lib/context/DataProvider';
import { stateToSelect } from '../../util/util';

const StateSelect = () => {
    const {getValue} = useContext(DataContext);
    const country = getValue ? getValue(SettingsPath.country) : '';
    const options = getValue && country ? stateToSelect(country) : [];
    
    return (
        <Select
        compId="state"
        dataPath={SettingsPath.state}
        options = {options}
        label="State"
      />
    );
}

function SettingsBody() {

  return (
    <>
      <TextField
        compId={"runtime-dayModal-note"}
        dataPath={SettingsPath.year}
        label={"Year"}
      />
      <VSpacer />
      <Select
        compId="demo-simple-select"
        dataPath={SettingsPath.country}
        options = {CountriesToSelect}
        label="Country"
      />
      <VSpacer />
      <StateSelect />
    </>
  );
}

export default SettingsBody;
