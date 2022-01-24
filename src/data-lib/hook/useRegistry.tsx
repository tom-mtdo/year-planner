import { pick, pickBy, startsWith } from "lodash";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { paths } from "../util/constant";
import { isEmpty } from "../util/validation";

export interface ICompEntry {
  compId: string;
  compDataPath?: string;
}

export default function useRegistry() {
  const { getValue, setValue, removeValue } = useContext(DataContext);

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

  const getCompEntry = (compId: string) => {
    if (!getValue) { return undefined; }
    return pick(getValue(paths.registry), compId);
  }

  const getAllEntries = () => {
    if(!getValue) { return undefined; }

    return getValue(paths.registry);
  }

  const getChildren = (parentId: string) => {
    if(!getValue) { return undefined; }
    const registry = getValue(paths.registry);

    return(
      pickBy(registry, (value: ICompEntry, key: string) => {
        // return all grandChildren as well
        return startsWith(key, parentId);
        // if return children only, no grand children:
        // return startsWith(key, parentId) &&  key.indexOf('-', parentId.length + 1) < 0;
      })
    );
  }

  return { registerComp, unRegisterComp, getCompEntry, getAllEntries, getChildren};
}
