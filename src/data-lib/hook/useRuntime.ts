import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { paths } from "../util/constant";

export interface IRuntimeArgs {
  compId?: string;
  compDataPath?: string;
  compValue?: any;
  data?: any;
}
const useRuntime = () => {
  const { data, getValue, setValue } = useContext(DataContext);

  const runFunction = (
    inFunction: any,
    args: IRuntimeArgs,
    defaultValue?: any // the whole data the app has at this runtime
  ) => {
    if (typeof inFunction !== "function") {
      return inFunction ?? defaultValue ?? undefined;
    }

    const input = {
      ...args,
      data,
    };

    try {
      return inFunction(input);
    } catch (e) {
      return defaultValue ?? "Function at runtime error";
    }
  };

  const getRuntimeValue = (inValue: any, args: IRuntimeArgs) => {
    return runFunction(inValue, args);
  };

  const loadValidation = (validation: any) => {
    if(!setValue) { return; }

    setValue(paths.validation, validation);
  }

  const getValidation = () => {
    if(!getValue) { return; }

    return getValue(paths.validation);
  }

  return { getRuntimeValue, runFunction, loadValidation, getValidation };
};

export default useRuntime;
