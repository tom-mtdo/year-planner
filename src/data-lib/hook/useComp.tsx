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
  compDynaProp?: any; // whatever other unknown props like options in a select,
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
    dynaProp,
    ...rest
  } = props;

  // Build compId and dataPath
  // if no parent info and name, then it will use id & data path passed in
  const compId = id || buildId(parentId, name);
  const compDataPath = dataPath || buildPath(parentDataPath, name);

  // context
  const { getValue } = useContext(DataContext);
  // import hooks
  const { registerComp, unRegisterComp } = useRegistry();
  const { onChange: defaultOnChange, onBlur: devaultOnBlur } = useHandler();
  const { touchForm } = useForm();
  const { getRuntimeValue } = useRuntime();

  // ref
  let compRef: React.RefObject<HTMLElement> | undefined | null = undefined;

  const setCompRef = (ele: any) => {
    compRef = ele;
  }

  // Value & error
  const compValue = getValue ? getValue(compDataPath ?? "") : undefined;
  const compError = getValue
    ? getValue(`${paths.error}['${compDataPath}']`)
    : undefined;

  // Support dynamic props values;
  const compInfo = { compId, compDataPath, compValue };
  const compLabel = getRuntimeValue(label, compInfo);
  const compDescription = getRuntimeValue(description, compInfo);
  const compVisible = getRuntimeValue(isVisible, compInfo);
  const compDynaProp = getRuntimeValue(dynaProp, compInfo);

  // Handlers
  // -- For comp inside a form
  const compOnChangeInForm = (event: any) => {
    if (Boolean(formDataPath)) {
      touchForm(formDataPath);
    }
    defaultOnChange(event);
  };
  
  const compOnChange = onChange || defaultOnChange;
  const compOnBlur = onBlur || devaultOnBlur;

  // Registry
  useEffect(() => {
    registerComp({ compId, compDataPath, compRef });

    return () => {
      unRegisterComp({ compId });
    };
  }, []);

  // Prop processed and specific for data lib start with "comp"
  return {
    ...rest,
    name,
    compId,
    compDataPath,
    compRef,
    compLabel,
    compDescription,
    compError,
    compValue,
    compVisible,
    compDynaProp,
    compOnChange,
    compOnBlur,
    compOnChangeInForm,
    setCompRef,
  };
}
