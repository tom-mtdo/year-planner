import React from "react";
import { InputLabel, MenuItem, Select as MuSelect } from "@material-ui/core";
import { IComp } from "../../../hook/useComp";
import FieldWrapper from "../../../../lib/fieldWrapper/FieldWrapper";
import { standardiseEvent } from "../../../util/util";

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
    compOnBlur,
    compOptions,
    compError,
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

  const myOnBlur = (event: any) => {
    const myEvent = standardiseEvent(event, dataPath);
    compOnBlur(myEvent);
  };

  const items =
    Array.isArray(compOptions) && compOptions.length > 0 ? (
      compOptions.map((value, index) => {
        return <MenuItem key={index} value={value[0]}>{value[1]}</MenuItem>;
      })
    ) : (
      <></>
    );

  const labelId = `${compId}-label`;

  const wrapperProps = {
    key: `${compId}-wrapper`,
    errorMsg: compError
  }

  return (
    <FieldWrapper {...wrapperProps}>
      <InputLabel id={labelId}>{compLabel}</InputLabel>
      <MuSelect
        {...rest}
        labelId={labelId}
        id={compId}
        value={compValue}
        label={compLabel}
        onBlur={myOnBlur}
        onChange={myOnChange}
      >
        {items}
      </MuSelect>
    </FieldWrapper>
  );
}
