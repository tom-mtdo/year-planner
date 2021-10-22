import React from "react";
import { InputLabel, MenuItem, Select as MuSelect } from "@material-ui/core";
import useComp, { IComp } from "../../../hook/useComp";

// options = [
//   ["AU", "Australia"],
//   ["NZ", "New Zealand"]
// ]

export default function Select(props: IComp) {
  const { compId, dataPath, label, options } = props;
  const { compValue, compOnChange } = useComp({ dataPath });

  const myOnChange = (event: any) => {
    const compEvent = {
      target: {
        dataset: { dataPath },
        value: event.target.value,
      },
      originalEvent: event,
    };
    compOnChange(compEvent);
  };

  const items =
    options && Array.isArray(options) && options.length > 0 ? (
      options.map((value, index) => {
        return <MenuItem value={value[0]}>{value[1]}</MenuItem>;
      })
    ) : (
      <></>
    );

  return (
    <>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <MuSelect
        labelId="demo-simple-select-label"
        id={compId}
        value={compValue}
        label={label}
        onChange={myOnChange}
      >
        {items}
      </MuSelect>
    </>
  );
}
