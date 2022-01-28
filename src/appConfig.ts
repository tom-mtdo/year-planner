import { BOOLEAN_VALUES } from "./util/constant";
import { getCalendar, IGetCalendar } from "./util/util";


// All config functions and parametter.
// These functions will be call before loading landding component
// So there will be no context or hook available yet

export const getInitData = () => {
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
    const initData = {
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

    return initData
  
}