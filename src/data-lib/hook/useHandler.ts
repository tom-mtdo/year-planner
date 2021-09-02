import { get } from "lodash";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

export default function useHandler() {
  const { setCompValue } = useContext(DataContext);

  const onChange = (event: any) => {
    const dataSet =
      event?.target?.dataset || event?.currentTarget?.dataset || undefined;
    const dataPath = get(dataSet, 'dataPath', 'unknown-comp');
    const value = event?.target?.value || event?.currentTarget?.value || undefined;

    if( setCompValue ) { setCompValue(dataPath, value); }
  };

  return { onChange }
}
