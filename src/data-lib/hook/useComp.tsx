import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import useHandler from "./useHandler";
import useForm from "./useForm";
import useRuntime from "./useRuntime";
import { paths } from "../util/constant";
import useRegistry from "./useRegistry";

export interface IGeneric {
  [key: string]: any;
}

export interface IComp extends IGeneric {
  compId?: string;
  dataPath?: string;
  compLabel?: string;
  compOnChange?: any;
  formDataPath?: string;
  compVisible?: any;
}

export default function useComp(props: IComp) {
  const {
    dataPath,
    onChange,
    onBlur,
    id,
    label,
    name,
    description,
    formDataPath,
    isVisible,
    validation,
    ...rest
  } = props;

  // TODO: build compId
  const compId = id;

  // context
  const { getValue } = useContext(DataContext);
  // hooks
  const { registerComp, unRegisterComp } = useRegistry();
  const { onChange: defaultOnChange, onBlur: devaultOnBlur } = useHandler();
  const { touchForm } = useForm();
  const { runFunction } = useRuntime();

  const compOnChangeInForm = (event: any) => {
    if (Boolean(formDataPath)) {
      touchForm(formDataPath);
    }
    defaultOnChange(event);
  };
  // return comp props, which handle by library
  // handlers
  const compOnChange = onChange || defaultOnChange;
  const compOnBlur = onBlur || devaultOnBlur;

  // to support dynamic values;
  // const dataPath = dataPath;
  const compLabel = label;
  const compName = name;
  const compDescription = description;

  const compValue = getValue ? getValue(dataPath ?? "") : undefined;
  // TODO: allow override root path for error
  const compError = getValue
    ? getValue(`${paths.error}['${dataPath}']`)
    : undefined;

  const compVisible =
    typeof isVisible === "function"
      ? runFunction(isVisible, { compId, compDataPath: dataPath, compValue })
      : isVisible;

  useEffect(() => {
    registerComp({compId, dataPath})

    return () => {
      unRegisterComp({compId});
    }
  }, []);

  return {
    ...rest,
    compId,
    compName,
    compLabel,
    compDescription,
    compError,
    dataPath,
    compValue,
    compVisible,
    compOnChange,
    compOnChangeInForm,
    compOnBlur,
  };
}
