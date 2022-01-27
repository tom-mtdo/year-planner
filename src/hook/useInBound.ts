import { BOOLEAN_VALUES } from "../util/constant";
import { getCalendar, IGetCalendar } from "../util/util";
import { useEffect } from 'react';
import {v4 as uuidv4} from 'uuid';
import { isEmpty } from '../data-lib/util/validation';

export interface IUseInBound {
  [key: string]: any;
}

const UUID = 'uuid';

export default function useInBound(props?: any) {
  const toDay = new Date();
  const currentYear = toDay.getFullYear();
  const calendar = getCalendar({ year: currentYear } as IGetCalendar);

  // If uuid empty then generate a new one and save to local storage
  useEffect(() => {
    if (isEmpty(localStorage.getItem(UUID))) {
      localStorage.setItem(UUID, uuidv4());
    }
  }, [])

  const loadData = () => {
    const savedData = localStorage.getItem('userData') ?? '';
    let data;

    try {
      data = JSON.parse(savedData);
    } catch (ex) {
      data = undefined;
    }

    return data
    //   const year = getValue(YearPath);
    //   const userContentPath = `content.${year}`;
    //   const userContent = getValue(userContentPath);
    // const calendar = getValue(CalendarPath);
    // const draft = cloneDeep(calendar);
    // update whole lot
    //   if (userContent && !isEmpty(userContent)) {
    //     Object.keys(userContent).forEach((strDate, index) => {
    //       const mm = parseInt(strDate.substr(4, 2)) - 1;
    //       const dd = parseInt(strDate.substr(6, 2)) - 1;
    //       if (isNumber(mm) && isNumber(dd) && draft[mm][dd]) {
    //         draft[mm][dd].note = userContent.current[strDate].note;
    //       }
    //     });
    //     setValue(CalendarPath, draft);
    //   }
  };

  // set current year as default
  const prepopData = {
    runtime: {
      year: `${currentYear}`,
      calendar,
      country: "AU",
      state: "VIC",
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
    error: {}
    // userData: loadData()
    // },
    // content: {
    //     2021: {
    //         20210907: { note: 'Start using' },
    //         20211001: { note: 'Checkprogress' }
    //     }
    // }
  };

  return { prepopData, loadData };
}
