import { names, paths, values } from "../../util/constant";
import { useEffect, useContext } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { compKeys } from "../../data-lib/util/constant";
import { isEmpty } from "../../data-lib/util/validation";

export interface IUseInBound {
  [key: string]: any;
}

// Load data from local storage for now
// later can be S3
const fetchData = async () => {
  const strSavedData = localStorage.getItem(names.yearPlanner) ?? "";
  let data: any = {};

  try {
    data = JSON.parse(strSavedData);
  } catch (ex) {
    // data = undefined;
    console.log("error");
  }

  return data;
};

export default function useInBound(props?: any) {
  const { getValue, setValue } = useContext(DataContext);

  const loadData = async () => {
    if (!setValue) {
      return;
    }

    // set loading flag
    setValue(paths.runtime[compKeys._status], values.loading);

    const currentYear = getValue ? getValue(paths.runtime.year) : undefined;
    const currentCountry = getValue
      ? getValue(paths.runtime.country)
      : undefined;
    const currentState = getValue ? getValue(paths.runtime.state) : undefined;
    const currentUserData = getValue
      ? getValue(paths.userData[compKeys._path])
      : undefined;
    const currentRuntime = getValue
      ? getValue(paths.runtime[compKeys._path])
      : undefined;

    fetchData().then((res) => {
      const {
        year = currentYear,
        country = currentCountry,
        state = currentState,
        userData = {},
      } = res;

      if (
        (!isEmpty(year) && year !== currentYear) ||
        (!isEmpty(country) && country !== currentCountry) ||
        (!isEmpty(state) && state !== currentState)
      ) {
        setValue(paths.runtime[compKeys._path], {
          ...currentRuntime,
          year,
          country,
          state,
        });
      }

      if (!isEmpty(userData)) {
        setValue(paths.userData[compKeys._path], {
          ...currentUserData,
          ...userData,
        });
      }

      // set loaded flag
      setValue(paths.runtime[compKeys._status], values.loaded);
    });
  };

  return { loadData };
}
