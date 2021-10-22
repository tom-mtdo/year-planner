import React from "react";
import { Checkbox as MuCheckbox } from "@material-ui/core";
import useComp, { IComp } from "../../../hook/useComp";
import { BOOLEAN_STR_VALUES } from '../../../util/constant';

export default function Checkbox(props: IComp) {
  const { compId, dataPath } = props;
  const { compValue, compOnChange } = useComp({ dataPath });

  const myOnChange = (event: any) => {
    const compEvent = {
      target: {
        dataset: {
          dataPath,
        },
        value: event.target.checked ? BOOLEAN_STR_VALUES.TRUE : BOOLEAN_STR_VALUES.FALSE,
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
      checked={compValue === BOOLEAN_STR_VALUES.TRUE}
      data-data-path={dataPath}
    />
  );
}
