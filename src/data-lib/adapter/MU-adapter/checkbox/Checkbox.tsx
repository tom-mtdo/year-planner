import React from "react";
import { Checkbox as MuCheckbox } from "@material-ui/core";
import useComp, { IComp } from "../../../hook/useComp";

export default function Checkbox(props: IComp) {
  const { compId, dataPath } = props;
  const { compValue, onChange } = useComp({ dataPath });

  const compOnChange = (event: any) => {
    const compEvent = {
      target: {
        dataset: {
          dataPath,
        },
        value: event.target.checked,
      },
    };
    onChange(compEvent);
  };

  return (
    <MuCheckbox
      id={compId}
      name={compId}
      onChange={compOnChange}
      checked={compValue === true}
      data-data-path={dataPath}
    />
  );
}
