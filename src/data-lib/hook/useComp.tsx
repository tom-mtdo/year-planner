import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import useHandler from "./useHandler";

export interface IGeneric {
  [key: string]: any
}

export interface IComp extends IGeneric{
  compId?: string;
  dataPath?: string;
  label?: string;

  onChange?: any;
}

export default function useComp(props: IComp) {
  const { compId, dataPath, onChange } = props;
  const { onChange: defaultOnChange } = useHandler();

  const compOnChange = onChange || defaultOnChange;

  // context
  const { getValue } = useContext(DataContext);
  // hooks
  
  const compValue = getValue ? getValue(dataPath ?? "") : undefined;

  return { compId, compValue, compOnChange };
}
