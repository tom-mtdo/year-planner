import React from "react";
import { TextField as MUTextField } from "@material-ui/core";
import { IComp } from "../../../hook/useComp";
import FieldWrapper from "../../../../lib/fieldWrapper/FieldWrapper";
import { standardiseEvent } from "../../../util/util";

// just standardise comp event then pass to handlers
export default function TextField(props: IComp) {
  // Need to take out all props specific for data-lib
  const {
    compValue,
    compError,
    compId,
    compDataPath,
    compLabel,
    compOnChange,
    compOnBlur,
    compName,
    setCompRef,
    ...rest
  } = props;

  const myOnChange = (event: any) => {
    const myEvent = standardiseEvent(event, compDataPath);
    compOnChange(myEvent);
  };

  const myOnBlur = (event: any) => {
    const myEvent = standardiseEvent(event, compDataPath);
    compOnBlur(myEvent);
  };

  const wrapperProps = {
    key: `${compId}-wrapper`,
    errorMsg: compError
  }

  return (
    <FieldWrapper {...wrapperProps}>
      <MUTextField
        {...rest}
        inputRef={setCompRef}
        id={compId}
        name={compName}
        label={compLabel}
        value={compValue}
        onChange={myOnChange}
        onBlur={myOnBlur}
        data-data-path={compDataPath}
      />
    </FieldWrapper>
  );
}
