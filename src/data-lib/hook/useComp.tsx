import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import useHandler from "./useHandler";
import useForm from "./useForm";
import useRuntime from "./useRuntime";
import { paths } from "../util/constant";
import useRegistry from "./useRegistry";
import { buildId, buildPath } from "../util/util";

export interface IGeneric {
  [key: string]: any;
}

export interface IComp extends IGeneric {
  compId?: string;
  compDataPath?: string;
  compLabel?: string;
  compOnChange?: any;
  compVisible?: any;
  formDataPath?: string;
}

export default function useComp(props: IComp) {
  const {
    parentId,
    parentDataPath,
    name,
    dataPath,
    onChange,
    onBlur,
    id,
    label,
    description,
    formDataPath,
    isVisible,
    ...rest
  } = props;

  // Build compId and dataPath
  // if no parent info and name, then it will use id & data path passed in
  const compId = id || buildId(parentId, name);
  const compDataPath = dataPath || buildPath(parentDataPath, name);

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
  const compDescription = description;

  const compValue = getValue ? getValue(compDataPath ?? "") : undefined;
  // TODO: allow override root path for error
  const compError = getValue
    ? getValue(`${paths.error}['${compDataPath}']`)
    : undefined;

  const compVisible =
    typeof isVisible === "function"
      ? runFunction(isVisible, { compId, compDataPath, compValue })
      : isVisible;

  useEffect(() => {
    registerComp({compId, compDataPath})

    return () => {
      unRegisterComp({compId});
    }
  }, []);

  // Prop processed and specific for data lib start with "comp"
  return {
    ...rest,
    name,
    compId,
    compDataPath,
    compLabel,
    compDescription,
    compError,
    compValue,
    compVisible,
    compOnChange,
    compOnChangeInForm,
    compOnBlur,
  };
}
