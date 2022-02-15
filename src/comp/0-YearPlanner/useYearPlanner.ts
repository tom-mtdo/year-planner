import { useContext, useEffect } from "react";
import { DataContext } from "../../data-lib/context/DataProvider";
import useRuntime from "../../data-lib/hook/useRuntime";
import useOutBound from "../hook/useOutBound";
import { labels, paths, MinYear, MaxYear } from "../../util/constant";
import { getCalendar } from "../../util/util";
import { yearPlanner } from "./validation";
import useInBound from '../hook/useInBound';

const useYearPlanner = function () {
  const { getValue, setValue } = useContext(DataContext);
  const { loadValidation } = useRuntime();
  const { setUuid } = useOutBound();
  const {loadData} = useInBound();

  useEffect(() => {  
    loadData();
    setUuid();
    loadValidation(yearPlanner);
    
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

  return {};
};

export default useYearPlanner;
