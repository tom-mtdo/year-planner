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
import { pathToId } from '../../data-lib/util/util';

const settingsId = pathToId(paths.temp.settings[compKeys._path]);

const YearTextField = () => {
  const props: IComp = {
    parentId: settingsId,
    parentDataPath: paths.temp.settings[compKeys._path],
    name: names.year,

    label: "Year",
    formDataPath: paths.temp.settings[compKeys._path]
  }
  const { compValue, compId, compDataPath, compLabel, compError, compOnBlur, compOnChangeInForm } = useComp(props);

  return (
    <TextField
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

const CountrySelect = () => {
  const props: IComp = {
    parentId: settingsId,
    parentDataPath: paths.temp.settings[compKeys._path],
    name: names.country,

    label: "Country",
    formDataPath: paths.temp.settings[compKeys._path]
  }
  const { compValue, compId, compDataPath, compLabel, compOnBlur, compError, compOnChangeInForm } = useComp(props);
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

const StateSelect = () => {
  const props: IComp = {
    parentId: settingsId,
    parentDataPath: paths.temp.settings[compKeys._path],
    name: names.state,

    label: "State",
    formDataPath: paths.temp.settings[compKeys._path]
  }
  const { compValue, compId, compDataPath, compLabel, compOnBlur, compError, compOnChangeInForm } = useComp(props);

  const { getValue } = useContext(DataContext);
  const country = getValue ? getValue(paths.temp.settings.country) : "";

  if (!country) {
    return <></>;
  }

  const options = Boolean(country) ? stateToSelect(country) : [];
  return (
    <Select
      compId={compId}
      compDataPath={compDataPath}
      compValue={compValue}
      compOptions={options}
      compLabel={compLabel}
      compOnBlur={compOnBlur}
      compOnChange={compOnChangeInForm}
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
