import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import useHandler from "./useHandler";
import useForm from './useForm';

export interface IGeneric {
  [key: string]: any
}

export interface IComp extends IGeneric{
  compId?: string;
  dataPath?: string;
  compLabel?: string;
  compOnChange?: any;
  formDataPath?: string;
}

export default function useComp(props: IComp) {
  const { dataPath, onChange, id, label, name, description, formDataPath, ...rest } = props;
  
  // context
  const { getValue } = useContext(DataContext);
  // hooks
  const { onChange: defaultOnChange } = useHandler();
  const {touchForm} = useForm();

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
  const compId = id;
  // const dataPath = dataPath;
  const compLabel = label;
  const compName = name;
  const compDescription = description;
  
  const compValue = getValue ? getValue(dataPath ?? "") : undefined;

  return { compId, compName, compLabel, compDescription, dataPath, compValue, compOnChange, compOnChangeInForm, ...rest };
}
