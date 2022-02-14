import { useContext, useEffect } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import useRuntime from "../../data-lib/hook/useRuntime";
import useCommon from "../hook/useCommon";
import useInBound from "../hook/useInBound";
import useOutBound from "../hook/useOutBound";
import { labels, paths, names, MinYear, MaxYear } from "../../util/constant";
import { yearPlanner as yearPlannerValidation } from "./validation";
import { getCalendar } from "../../util/util";

const useYearPlanner = function () {
  const { getValue, setValue } = useContext(DataContext);
  const { loadValidation } = useRuntime();
  // const { year, country, state } = useInBound();
  const { setUuid } = useOutBound();
  // const { moveToYear } = useCommon();

  useEffect(() => {
    
    // loadValidation(yearPlannerValidation);
    // setUuid();
    // moveToYear(year, country, state);
    document.title = labels.yearPlanner;
    console.log("YearPlanner construction completed");
  }, []);

  const year = getValue ? getValue(paths.runtime.year) : undefined;
  const country = getValue ? getValue(paths.runtime.country) : undefined;
  const state = getValue ? getValue(paths.runtime.state) : undefined;

  useEffect(() => {
    if (!setValue) {
      return;
    }

    // validate input
    const numYear = parseInt(year);
    if (!numYear || isNaN(numYear) || numYear < MinYear || numYear > MaxYear) {
      return;
    }

    // generate calendar for new year
    console.log('Calling getCalendar');
    const calendar = getCalendar({ year, country, state });
    
    if (!calendar) {
      return;
    }

    setValue(paths.runtime.calendar, calendar);
  }, [year, country, state]);

  // TODO: review this function to be more efficient
  // useEffect(() => {
  //   if (!getValue) {
  //     return;
  //   }
  //   // save current year, country, state
  //   // similar to saveData but not looking for userData
  //   // used when navigate to a new year
  //   const year = getValue(paths.runtime.year);
  //   const country = getValue(paths.runtime.country);
  //   const state = getValue(paths.runtime.state);

  //   const userData = getValue(paths.userData._path);

  //   const storeData = {
  //     year,
  //     country,
  //     state,
  //     userData,
  //   };
  //   localStorage.setItem(names.yearPlanner, JSON.stringify(storeData));
  // }, [getValue]);

  return {};
};

export default useYearPlanner;
