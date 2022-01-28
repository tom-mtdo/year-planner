import { BOOLEAN_VALUES } from "../util/constant";
import { getCalendar, IGetCalendar } from "../util/util";

export interface IUseInBound {
  [key: string]: any;
}

// TODO: this hook and appConfig are overlap, need clean
export default function useInBound(props?: any) {
  const toDay = new Date();
  const currentYear = toDay.getFullYear();
  const calendar = getCalendar({ year: currentYear } as IGetCalendar);

  const loadData = () => {
    const savedData = localStorage.getItem('userData') ?? '';
    let data;

    try {
      data = JSON.parse(savedData);
    } catch (ex) {
      data = undefined;
    }

    return data
  };

  const savedData = loadData();
  const country = 'AU';
  const state = 'VIC';
  const year = `${currentYear}`;

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
    userData: savedData
  };

  return { prepopData, year, country, state };
}
