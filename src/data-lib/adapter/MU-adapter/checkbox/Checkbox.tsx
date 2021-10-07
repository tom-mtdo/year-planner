import React from "react";
import { Checkbox as MuCheckbox } from "@material-ui/core";
import useComp, { IComp } from "../../../hook/useComp";

export default function Checkbox(props: IComp) {
  const { compId, dataPath } = props;
  const { compValue, compOnChange } = useComp({ dataPath });

  const myOnChange = (event: any) => {
    const compEvent = {
      target: {
        dataset: {
          dataPath,
        },
        value: event.target.checked,
      },
      originalEvent: event
    };
    compOnChange(compEvent);
  };

  return (
    <MuCheckbox
      id={compId}
      name={compId}
      onChange={myOnChange}
      checked={compValue === true}
      data-data-path={dataPath}
    />
  );
}
