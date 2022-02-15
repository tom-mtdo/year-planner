// If uuid empty then generate a new one and save to local storage

import { isEmpty } from "../../data-lib/util/validation";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import { names, paths, values } from '../../util/constant';
import { compKeys } from "../../data-lib/util/constant";

const useOutBound = function () {
  const { getValue } = useContext(DataContext);

  // id to know which user, will be replaced by userId provided by Single Sign On (SSO)
  const setUuid = () => {
    if (isEmpty(localStorage.getItem(names.uuid))) {
      localStorage.setItem(names.uuid, uuidv4());
    }
  };

  // save data to storage
  const year = getValue ? getValue(paths.runtime.year) : undefined;
  const country = getValue ? getValue(paths.runtime.country) : undefined;
  const state = getValue ? getValue(paths.runtime.state) : undefined;
  const userData = getValue
    ? getValue(paths.userData[compKeys._path])
    : undefined;
  const status = getValue
    ? getValue(paths.runtime[compKeys._status])
    : undefined;

  useEffect(() => {
    // only start auto saving after initial loading data completed
    if (status !== values.loaded) { return; }

    const storeData = {
      year,
      country,
      state,
      userData,
    };

    localStorage.setItem(names.yearPlanner, JSON.stringify(storeData));
  }, [year, country, state, userData, status]);

  return { setUuid };
};

export default useOutBound;
