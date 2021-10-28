import { BOOLEAN_VALUES } from "../util/constant";
import { getCalendar, IGetCalendar } from "../util/util";

export interface IUseInBound {
  [key: string]: any;
}

export default function useInBound(props: any) {
  const toDay = new Date();
  const currentYear = toDay.getFullYear();
  const calendar = getCalendar({ year: currentYear } as IGetCalendar);

  // set current year as default
  const prepopData = {
    runtime: {
      year: `${currentYear}`,
      calendar,
    },
    temp: {
      settings: {
        isShown: BOOLEAN_VALUES.FALSE,
        country: "AU",
        state: "VIC",
      },
      dayModal: {
        isShown: BOOLEAN_VALUES.FALSE,
        dayInfo: {
          note: "",
        },
      },
    },
    // },
    // content: {
    //     2021: {
    //         20210907: { note: 'Start using' },
    //         20211001: { note: 'Checkprogress' }
    //     }
    // }
  };

  const loadData = () => {
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

  return { prepopData, loadData };
}
