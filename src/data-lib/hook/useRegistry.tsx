import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { paths } from "../util/constant";
import { isEmpty } from "../util/validation";

export interface ICompEntry {
  compId: string;
  compDataPath?: string;
}

export default function useRegistry() {
  const { setValue, removeValue } = useContext(DataContext);

  const registerComp = (params: ICompEntry) => {
    const {compDataPath, compId} = params;
    // Check need at least compId or compDataPath
    if (isEmpty(params) || !Boolean(compId) || !Boolean(compDataPath) || !setValue) {
      return;
    }

    const registerPath = `${paths.registry}['${compId}']`;
    const compEntry = {compDataPath};
    setValue(registerPath, compEntry);
  };

  const unRegisterComp = (params: Pick<ICompEntry, 'compId'>) => {
    const {compId} = params;
    if (isEmpty(params) || !Boolean(compId) || !removeValue) {
      return;
    }
    removeValue(paths.registry, compId);
  };

  return { registerComp, unRegisterComp};
}
