import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import useHandler from "./useHandler";

export interface IComp {
  compId?: string;
  dataPath?: string;
}

export default function useComp(props: IComp) {
  const { compId, dataPath } = props;

  // context
  const { getCompValue } = useContext(DataContext);
  // hooks
  const { onChange } = useHandler();
  const compValue = getCompValue ? getCompValue(dataPath ?? "") : undefined;

  return { compId, compValue, onChange };
}
