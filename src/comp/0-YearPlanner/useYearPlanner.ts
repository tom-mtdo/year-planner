import { useContext, useEffect } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import useRuntime from "../../data-lib/hook/useRuntime";
import useCommon from "../../hook/useCommon";
import useInBound from "../../hook/useInBound";
import useOutBound, { YEAR_PLANNER } from "../../hook/useOutBound";
import { labels, paths } from "../../util/constant";
import { yearPlanner as yearPlannerValidation} from './validation';

const useYearPlanner = function () {
  const { getValue } = useContext(DataContext);
  const { loadValidation } = useRuntime();
  const { year, country, state } = useInBound();
  const { setUuid } = useOutBound();
  const { moveToYear } = useCommon();

  useEffect(() => {
    loadValidation(yearPlannerValidation);
    setUuid();
    moveToYear(year, country, state);
    document.title = labels.yearPlanner;
  }, []);

  // TODO: review this function to be more efficient
  useEffect(() => {
    if (!getValue) {
      return;
    }
    // save current year, country, state
    // similar to saveData but not looking for userData
    // used when navigate to a new year
    const year = getValue(paths.runtime.year);
    const country = getValue(paths.runtime.country);
    const state = getValue(paths.runtime.state);

    const userData = getValue(paths.userData._path);

    const storeData = {
      year,
      country,
      state,
      userData,
    };
    localStorage.setItem(YEAR_PLANNER, JSON.stringify(storeData));
  }, [getValue]);

  return {};
};

export default useYearPlanner;
