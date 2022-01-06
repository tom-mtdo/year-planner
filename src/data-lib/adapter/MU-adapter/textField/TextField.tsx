import React from "react";
import { TextField as MUTextField } from "@material-ui/core";
import { IComp } from "../../../hook/useComp";

// just standardise comp event then pass to handlers
export default function TextField(props: IComp) {
  const { compValue, compError, compId, dataPath, compLabel, compOnChange, compOnBlur, ...rest } = props;

  const standardiseEvent = (event: any) => {
    return {
      target: {
        dataset: { dataPath },
        value: event.target.value,
      },
      originalEvent: event,
    };
  }

  const myOnChange = (event: any) => {
    const myEvent = standardiseEvent(event);
    compOnChange(myEvent);
  };
  
  const myOnBlur = (event: any) => {
    const myEvent = standardiseEvent(event);
    compOnBlur(myEvent);
  };

  return (
    <MUTextField
      {...rest}
      id={compId}
      name={compId}
      label={compLabel}
      value={compValue}
      onChange={myOnChange}
      onBlur={myOnBlur}
      data-data-path={dataPath}
      error={compError}
    />
  );
}
