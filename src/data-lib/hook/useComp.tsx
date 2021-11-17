import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import useHandler from "./useHandler";
import useForm from './useForm';
import useRuntime from "./useRuntime";

export interface IGeneric {
  [key: string]: any
}

export interface IComp extends IGeneric{
  compId?: string;
  dataPath?: string;
  compLabel?: string;
  compOnChange?: any;
  formDataPath?: string;
  compVisible?: any;
}

export default function useComp(props: IComp) {
  const { dataPath, onChange, id, label, name, description, formDataPath, isVisible, ...rest } = props;
  const compId = id;

  // context
  const { getValue } = useContext(DataContext);
  // hooks
  const { onChange: defaultOnChange } = useHandler();
  const {touchForm} = useForm();
  const { runFunction } = useRuntime();

  const compOnChangeInForm = (event: any) => {
    if (Boolean(formDataPath)) {
      touchForm(formDataPath);
    }
    defaultOnChange(event);
  }
  // return comp props, which handle by library
  // handlers
  const compOnChange = onChange || defaultOnChange;
  

  // to support dynamic values;
  // const dataPath = dataPath;
  const compLabel = label;
  const compName = name;
  const compDescription = description;
  
  const compValue = getValue ? getValue(dataPath ?? "") : undefined;

  const compVisible = typeof isVisible === 'function' ? runFunction(isVisible, {compId, compDataPath: dataPath, compValue})
  : isVisible

  return { compId, compName, compLabel, compDescription, dataPath, compValue, compVisible, compOnChange, compOnChangeInForm, ...rest };
}
