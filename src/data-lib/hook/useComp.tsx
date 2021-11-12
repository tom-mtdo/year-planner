import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import useHandler from "./useHandler";

export interface IGeneric {
  [key: string]: any
}

export interface IComp extends IGeneric{
  compId?: string;
  dataPath?: string;
  compLabel?: string;
  compOnChange?: any;
}

export default function useComp(props: IComp) {
  const { dataPath, onChange, id, label, name, description, ...rest } = props;
  
  // context
  const { getValue } = useContext(DataContext);
  // hooks
  const { onChange: defaultOnChange } = useHandler();

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

  return { compId, compName, compLabel, compDescription, dataPath, compValue, compOnChange, ...rest };
}
