import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { paths } from "../util/constant";
import { isEmpty } from "../util/validation";

export interface ICompEntry {
  compId: string;
  dataPath?: string;
}

export default function useRegistry() {
  const { setValue, removeValue } = useContext(DataContext);

  const registerComp = (params: ICompEntry) => {
    const {dataPath, compId} = params;
    // Check need at least compId or dataPath
    if (isEmpty(params) || !Boolean(compId) || !Boolean(dataPath) || !setValue) {
      return;
    }

    const registerPath = `${paths.registry}['${compId}']`;
    const compEntry = {dataPath};
    setValue(registerPath, compEntry);
  };

  const unRegisterComp = (params: Pick<ICompEntry, 'compId'>) => {
    const {compId} = params;
    // Check need at least compId or dataPath
    if (isEmpty(params) || !Boolean(compId) || !removeValue) {
      return;
    }
    removeValue(paths.registry, compId);
  };

  return { registerComp, unRegisterComp};
}
