import React from "react";
import { TextField as MUTextField } from "@material-ui/core";
import { IComp } from "../../../hook/useComp";

export default function TextField(props: IComp) {
  const { compValue, compId, dataPath, compLabel, compOnChange, ...rest } = props;

  const myOnChange = (event: any) => {
    const myEvent = {
      target: {
        dataset: { dataPath },
        value: event.target.value,
      },
      originalEvent: event,
    };
    compOnChange(myEvent);
  };

  return (
    <MUTextField
      {...rest}
      id={compId}
      name={compId}
      label={compLabel}
      value={compValue}
      onChange={myOnChange}
      data-data-path={dataPath}
    />
  );
}
