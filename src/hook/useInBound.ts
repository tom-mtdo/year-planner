import { BOOLEAN_VALUES } from "../util/constant";
import { getCalendar, IGetCalendar } from "../util/util";
import { YEAR_PLANNER } from "./useOutBound";

export interface IUseInBound {
  [key: string]: any;
}

// TODO: this hook and appConfig are overlap, need clean
export default function useInBound(props?: any) {
  const toDay = new Date();
  const currentYear = toDay.getFullYear();
  const calendar = getCalendar({ year: currentYear } as IGetCalendar);

  const loadData = () => {
    const savedData = localStorage.getItem(YEAR_PLANNER) ?? '';
    let data: any = {};

    try {
      data = JSON.parse(savedData);
    } catch (ex) {
      // data = undefined;
      console.log('error');
    }

    return data
  };

  const {year = currentYear, country = 'AU', state = 'VIC', userData = undefined} = loadData();

  // set current year as default
  const prepopData = {
    runtime: {
      year,
      calendar,
      country,
      state,
    },
    temp: {
      settings: {
        _isShown: BOOLEAN_VALUES.FALSE,
        country: "",
        state: "",
      },
      dayModal: {
        _isShown: BOOLEAN_VALUES.FALSE,
        dayInfo: {
          note: "",
        },
      },
    },
    error: {},
    userData
  };

  return { prepopData, year, country, state };
}
