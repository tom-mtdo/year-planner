import Holidays from "date-holidays";
import { countries } from './constant';
import {
  DAY_SHORT_NAME,
  MaxYear,
  MinYear,
  MONTH_NAME,
  MONTH_SHORT_NAME,
  TOTAL_COLUMN,
} from "./constant";

export interface MonthInfo {
  month: number; // 0 - 11
  firstDate: Date;
  lastDate: Date;
  numDay: number;
  shortName: string; // Jan
  name: string; // January
}

export interface DayInfo {
  date: Date;
  holiday?: string; // Queen birthday .etc
  note?: string;
}



export const getMonthInfo = (year: number, month: number): MonthInfo => {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);

  return {
    month,
    firstDate,
    lastDate,
    numDay: lastDate.getDate(),
    name: MONTH_NAME[month],
    shortName: MONTH_SHORT_NAME[month],
  };
};

export const countPadding = (
  aMonth: DayInfo[]
): { left: number; right: number } => {
  const firstDay = aMonth[0].date.getDay();
  // padding left
  const left = firstDay === 0 ? 6 : firstDay - 1;
  // padding right
  const right = TOTAL_COLUMN - 1 - left - aMonth.length;

  return { left, right };
};

export const getHeader = (): any => {
  const header = [];
  for (let i = 0; i < TOTAL_COLUMN - 1; i++) {
    header.push(DAY_SHORT_NAME[i % 7]);
  }

  return header;
};

export const getYearContent = (input: IGetCalendar): any[][] => {
  const {year, country, state} = input;
  const aYear = [];
  let aMonth;
  let aDay;
  for (let i = 0; i < 12; i++) {
    aMonth = [];

    // get month info
    const monthInfo = getMonthInfo(year, i);

    // other days in month
    for (let j = 1; j <= monthInfo.numDay; j++) {
      // use UTC zone so date.toISOstring() will stay in same day
      aDay = new Date(Date.UTC(year, i, j));
      aMonth.push({
        date: aDay,
        note: "",
        holiday: "",
      });
    }

    aYear.push(aMonth);
  }

  addHoliday(aYear, country, state, year);

  return aYear;
};

export interface IGetCalendar {
  year: number,
  country: string,
  state: string
};

export const getCalendar = (input: IGetCalendar) => {
  const {year} = input;
  if (year < MinYear || year > MaxYear) {
    return;
  }

  return getYearContent(input);
};

export const isWeekend = (day: number) => {
  return Math.abs(day) % 7 === 5 || Math.abs(day) % 7 === 6;
};

export const addHoliday = (aYear: any[][], country='AU', state='VIC', yearNumber: number) => {
  const hd = new Holidays(country, state);
  const holidays = hd.getHolidays(yearNumber);
  holidays.forEach((holiday, index) => {
    const aDate = new Date(holiday.date);
    const month = aDate.getMonth();
    const dateNum = aDate.getDate();
    aYear[month][dateNum - 1].holiday = holiday.name;
  });
  return aYear;
};

// TODO use singleton for Holidays
export const countriesToSelect = (countriesObject: any = []) => {
  return Object.keys(countriesObject).map((code, index) => {
    return [code, countriesObject[code]];
  });

};

export const getCountries = () => {
  // const hd = new Holidays();
  // return hd.getCountries();

  // few countries don't have state and not sorted, so use short list for now
  return {
    'AU': 'Australia',
    'CA': 'Canada',
    'GB': 'United Kingdom',
    'NZ': 'New Zealand',
    'US': 'United States of America',
  };
}

// TODO use singleton for Holidays
export const stateToSelect = (countryCode: string) => {
  const hd = new Holidays();
  const states = hd.getStates(countryCode) ?? [];
  return Object.keys(states).map((code, index) => {
    return [code, states[code]];
  });
}

export const countryCodeToName = (countryCode: string) => {
  // @ts-ignore
  return countries[countryCode] ?? ''; 
}

export const getStrDate = (aDate: Date) => {
  if (!aDate) {
    return "";
  }

  const year = aDate.getFullYear();
  const month = aDate.getMonth() + 1; // because month is 0 - 11
  const date = aDate.getDate(); // 1 - 31

  const strYear = "" + year;
  const strMonth = month < 10 ? "0" + month : "" + month;
  const strDate = date < 10 ? "0" + date : "" + date;

  return `${strYear}${strMonth}${strDate}`;
};