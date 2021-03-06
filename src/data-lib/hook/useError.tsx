import { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import { paths } from "../util/constant";

export default function useError() {
  const { setValue, removeValue } = useContext(DataContext);

  const setError = (compDataPath: string, errorMsg: string) => {
    // save error
    // note error is an object, which has:
    // each key is data path, value is error message.
    // this make it easier to check if there is any error or not.
    // e.g. data: {
    //   error: {
    //      settings: "Please complete the form"
    //      settings.year: "Length should be 4 chars"
    //      settings.state: "Please select a state"
    //   }
    // }

    if (errorMsg && setValue) {
      const errorPath = `${paths.error}['${compDataPath}']`;
      setValue(errorPath, errorMsg);
    }
  };

  // remove error of children as well for now
  const removeError = (compDataPath: string) => {
    if (!removeValue) {
      return;
    }

    removeValue(paths.error, compDataPath, true);
  };

  return { setError, removeError };
}
