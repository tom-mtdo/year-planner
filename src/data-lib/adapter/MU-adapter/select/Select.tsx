import React from "react";
import { InputLabel, MenuItem, Select as MuSelect } from "@material-ui/core";
import { IComp } from "../../../hook/useComp";

// options = [
//   ["AU", "Australia"],
//   ["NZ", "New Zealand"]
// ]

export default function Select(props: IComp) {
  const {
    compValue,
    compId,
    dataPath,
    compLabel,
    compOnChange,
    compOptions,
    ...rest
  } = props;

  // const { compId, dataPath, label, options } = props;
  // const { compValue, compOnChange } = useComp(props);

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
    Array.isArray(compOptions) && compOptions.length > 0 ? (
      compOptions.map((value, index) => {
        return <MenuItem value={value[0]}>{value[1]}</MenuItem>;
      })
    ) : (
      <></>
    );

  const labelId = `${compId}-label`;

  return (
    <>
      <InputLabel id={labelId}>{compLabel}</InputLabel>
      <MuSelect
        {...rest}
        labelId={labelId}
        id={compId}
        value={compValue}
        label={compLabel}
        onChange={myOnChange}
      >
        {items}
      </MuSelect>
    </>
  );
}
