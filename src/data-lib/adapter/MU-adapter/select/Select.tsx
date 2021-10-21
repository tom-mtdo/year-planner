import React from "react";
import {
  InputLabel,
  MenuItem,
  Select as MuSelect
} from "@material-ui/core";
import useComp, { IComp } from "../../../hook/useComp";

export default function Select(props: IComp) {
  const { compId, dataPath, label } = props;
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
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </MuSelect>
    </>
  );
}
