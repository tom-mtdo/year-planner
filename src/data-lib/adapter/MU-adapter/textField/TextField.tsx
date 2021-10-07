import React from "react";
import { TextField as MUTextField } from "@material-ui/core";
import useComp, { IComp } from "../../../hook/useComp";

export default function TextField(props: IComp) {
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
    <MUTextField
      id={compId}
      name={compId}
      label={label}
      value={compValue}
      onChange={myOnChange}
      data-data-path={dataPath}
    />
  );
}
