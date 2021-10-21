import TextField from "../../data-lib/adapter/MU-adapter/textField/TextField";
import Select from "../../data-lib/adapter/MU-adapter/select/Select";
import { VSpacer } from "../../lib/styles";
import { SettingsPath } from "../../util/constant";

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
        dataPath={SettingsPath.year}
        label="Age"
      />
    </>
  );
}

export default SettingsBody;
